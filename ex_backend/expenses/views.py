# from django.shortcuts import render

# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from PIL import Image
# import torch
# # from transformers import Qwen2_5_VLForConditionalGeneration, AutoProcessor
# from transformers import Qwen2_5_VLForConditionalGeneration
# from qwen_vl_utils import process_vision_info
# import os


# # Create your views here.
# # views.py
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from django.http import HttPResponse

# def home(request):
#     return HttPResponse('Home')
# # @api_view(['POST'])
# # def ocr_receipt(request):
# #     # Handle file upload and OCR logic here
# #     # Return extracted data as JSON
# #     return Response({
# #         "company": "Starbucks",
# #         "date": "2024-07-06",
# #         "amount": "24.75",
# #         "items": [
# #             {"name": "Latte", "price": 5.95},
# #             # ...
# #         ]
# #     })
    
# # Load model and processor once (global scope)
# model = Qwen2_5_VLForConditionalGeneration.from_pretrained(
#     "Qwen/Qwen2.5-VL-3B-Instruct", torch_dtype=torch.float16, device_map="cuda:0"
# )
# processor = AutoProcessor.from_pretrained("Qwen/Qwen2.5-VL-3B-Instruct")

# @csrf_exempt
# def extract_receipt_info(request):
#     if request.method == "POST" and request.FILES.get("image"):
#         # Save image
#         image_file = request.FILES["image"]
#         image = Image.open(image_file)
#         image = image.resize((512, 512))

#         messages = [
#             {
#                 "role": "user",
#                 "content": [
#                     {"type": "image", "image": image},
#                     {"type": "text", "text": (
#                         "Extract the following from this receipt or utility bill image:\n\n"
#                         "📋 Basic Info:\n"
#                         "- Company Name\n"
#                         "- Date of the transaction (most recent)\n"
#                         "- Total Amount (include tax if it’s part of final bill)\n\n"
#                         "📦 Items:\n"
#                         "List only line items showing products or services paid for. Only include final price (like Quantity × Unit Price).\n"
#                         "DO NOT include:\n"
#                         "- Tax rows like SGST, CGST, VAT\n"
#                         "- Summary or total rows like 'Grand Total', 'Total Charges', 'Due Amount', 'Balance', 'Rounding'\n"
#                         "- Unrelated or descriptive text like 'Your Gas Consumption Pattern'\n\n"
#                         "📄 Format:\n"
#                         "Company Name: <value>\n"
#                         "Date: <value>\n"
#                         "Total Amount: <value>\n\n"
#                         "Items:\n"
#                         "- Item: <name>, Price: <price>\n"
#                         "(Continue listing each)"
#                     )}
#                 ]
#             }
#         ]

#         text = processor.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
#         image_inputs, video_inputs = process_vision_info(messages)
#         inputs = processor(
#             text=[text],
#             images=image_inputs,
#             videos=video_inputs,
#             padding=True,
#             return_tensors="pt",
#         ).to("cuda")

#         torch.cuda.empty_cache()
#         generated_ids = model.generate(**inputs, max_new_tokens=400)
#         generated_ids_trimmed = [
#             out_ids[len(in_ids):] for in_ids, out_ids in zip(inputs.input_ids, generated_ids)
#         ]
#         output_text = processor.batch_decode(
#             generated_ids_trimmed, skip_special_tokens=True, clean_up_tokenization_spaces=False
#         )[0]

#         # Post-process
#         details = {}
#         items = []
#         parsing_items = False
#         exclude_keywords = {
#             "sgst", "cgst", "vat", "tax", "cr", "total current charges", "rounding",
#             "grand total", "change", "due", "balance", "summary", "consumption pattern"
#         }

#         def should_exclude(name): return name.lower().strip() in exclude_keywords

#         for line in output_text.split("\n"):
#             line = line.strip().lstrip("*").replace("**", "").replace("-", "").strip()
#             if line.lower().startswith("items"):
#                 parsing_items = True
#                 continue
#             if parsing_items and "Item:" in line and "Price:" in line:
#                 try:
#                     item_part, price_part = line.split("Price:")
#                     item_name = item_part.split("Item:")[1].strip().strip(",")
#                     price = price_part.strip()
#                     if not should_exclude(item_name):
#                         items.append({"Item": item_name, "Price": price})
#                 except:
#                     continue
#             elif ":" in line and not parsing_items:
#                 key, value = line.split(":", 1)
#                 details[key.strip()] = value.strip()

#         if "Total Amount" in details and (
#             "cr" in details["Total Amount"].lower() or not details["Total Amount"].replace(",", "").replace(".", "").isdigit()
#         ):
#             total = sum(float(item["Price"].replace(",", "")) for item in items if item["Price"].replace(".", "").isdigit())
#             details["Total Amount"] = f"{total:.2f}"

#         if items:
#             details["Items"] = items

#         return JsonResponse(details)

#     return JsonResponse({"error": "POST an image file"}, status=400)


# import os
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.core.files.storage import default_storage
# from transformers import AutoTokenizer
# from modelscope import AutoModelForCausalLM, GenerationConfig
# from PIL import Image
# import torch

# # Load model and tokenizer once
# checkpoint_path = "qwen/Qwen-VL-Chat"  # or local path if you downloaded it manually

# tokenizer = AutoTokenizer.from_pretrained(checkpoint_path, trust_remote_code=True)
# model = AutoModelForCausalLM.from_pretrained(
#     checkpoint_path,
#     device_map="cuda" if torch.cuda.is_available() else "cpu", 
#     trust_remote_code=True
# ).eval()
# model.generation_config = GenerationConfig.from_pretrained(checkpoint_path, trust_remote_code=True)

# @csrf_exempt
# def extract_receipt_info(request):
#     if request.method == 'POST' and request.FILES.get('image'):
#         image_file = request.FILES['image']
#         file_path = default_storage.save('tmp/' + image_file.name, image_file)

#         # NOTE: Replace this with Qwen's image inference logic
#         prompt = f"<img>{os.path.abspath(file_path)}</img> What is shown in the image?"
#         response, _ = model.chat(tokenizer, prompt, history=[])

#         return JsonResponse({'result': response})

#     return JsonResponse({'error': 'POST an image to extract.'}, status=400)


# views.py
# from django.http import JsonResponse
# from .qwen_model import model, tokenizer

# def ask_qwen(request):
#     if request.method == "POST":
#         query = request.POST.get("query", "")
#         if not query:
#             return JsonResponse({"error": "No input provided"}, status=400)

#         history = []
#         response, _ = model.chat(tokenizer, query, history=history)
#         return JsonResponse({"response": response})
#     else:
#         return JsonResponse({"error": "Invalid request method"}, status=405)

# from django.http import JsonResponse
# from .qwen_model import load_model, model, tokenizer

# def ask_qwen(request):
#     if request.method == "POST":
#         query = request.POST.get("query", "")
#         if not query:
#             return JsonResponse({"error": "No input provided"}, status=400)

#         # Ensure model and tokenizer are loaded
#         load_model()

#         # Do inference
#         history = []
#         response, _ = model.chat(tokenizer, query, history=history)
#         return JsonResponse({"response": response})
    
#     return JsonResponse({"error": "Invalid request method"}, status=405)

# from django.shortcuts import render
# from django.http import HttpResponse

# def upload_receipt(request):
#     return HttpResponse("Receipt upload page placeholder")

# def extract_receipt_info(request):
#     return HttpResponse("Extract receipt info placeholder")

# views.py - this is my final code 
import os
import torch
from PIL import Image
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# from .qwen_model import load_model, model, processor
from . import qwen_model 
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view  ,permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ExpenseSerializer , ExpenseItemSerializer
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Expense , ExpenseItem ,MonthlyBudgetPlan , BudgetSummary
# from .models import Expense , ExpenseItem 
from .predict_category import predict_category
from datetime import datetime , timedelta , date
from django.db.models.functions import TruncMonth
from django.db.models import Sum
import numpy as np
from sklearn.linear_model import LinearRegression
from django.utils.timezone import now
from django.utils import timezone
from decimal import Decimal
from rest_framework import generics
from rest_framework.generics import RetrieveUpdateDestroyAPIView, UpdateAPIView

@csrf_exempt
@api_view(['POST'])
def extract_receipt_info(request):
    try:
        print("📥 Received extract request")
        print("➡️ FILES:", request.FILES)
        print("➡️ POST:", request.POST)

        if request.method != "POST" or 'receipt' not in request.FILES:
            return JsonResponse({"error": "No image provided"}, status=400)

        # Load model
        qwen_model.load_qwen_model()
        print('load model is done')
        if qwen_model.model is None :
            print('MOdel is not loaded')
            return JsonResponse({"error": "Model not loaded properly. Check logs."}, status=500)
        
        if qwen_model.processor is None:
            print('Processor is not loaded')
            return JsonResponse({"error": "Processor is None"}, status=500)
        print('Check both model and processor')
        # Save and load image
        image_file = request.FILES['receipt']   
        print('image file fetched')
        image_path = default_storage.save("tmp/" + image_file.name, image_file) 
        print('image path is done')
        image = Image.open(os.path.join(default_storage.location, image_path)).convert("RGB")
        print('image is opend')
        image = image.resize((512, 512))
        print('image resized is done')
        
        print('Image is done')
        # Prompt
        messages = [{
            "role": "user",
            "content": [
                {"type": "image", "image": image},
                {"type": "text", "text": (
                    "Extract the following from this receipt image:\n\n"
                    "📋 Basic Info:\n- Company Name\n- Date\n- Total Amount\n\n"
                    "📦 Items:\nOnly final items with total price. Skip tax and total rows.\n\n"
                    "📄 Format:\nCompany Name: <value>\nDate: <value>\nTotal Amount: <value>\n\n"
                    "Items:\n- Item: <name>, Price: <price>"
                )}
            ]
        }]
        print('Message is seen')

        # Format inputs
        text = qwen_model.processor.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
        print('text is done')
        
        image_inputs, video_inputs = process_vision_info(messages)
        print('inputs are done')
        inputs = processor(
            text=[text], images=image_inputs, videos=video_inputs, padding=True, return_tensors="pt"
        ).to("cpu")
        print('inputs are done with cuda' )

        # Generate
        with torch.no_grad():
            generated_ids = qwen_model.model.generate(**inputs, max_new_tokens=400)
        print('generated ids are done')
        
        output = qwen_model.processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
        print('output is done')

        # Parse output
        details = {}
        items = []
        parsing_items = False
        exclude = {"sgst", "cgst", "vat", "tax", "total", "due", "balance", "rounding"}

        for line in output.splitlines():
            line = line.strip().lstrip("*").replace("**", "").replace("-", "").strip()

            if line.lower().startswith("items"):
                parsing_items = True
                continue

            if parsing_items and "Item:" in line and "Price:" in line:
                try:
                    item_part, price_part = line.split("Price:")
                    item = item_part.split("Item:")[1].strip().strip(",")
                    price = price_part.strip()
                    if item.lower() not in exclude:
                        items.append({"Item": item, "Price": price})
                except:
                    continue
            elif ":" in line and not parsing_items:
                key, value = line.split(":", 1)
                details[key.strip()] = value.strip()
        print('loop is done')
        if items:
            details["Items"] = items

        return JsonResponse(details)

    except Exception as e:
        print('Its an error')
        import traceback
        traceback.print_exc()
        return JsonResponse({"error": str(e)}, status=500)

class ExpenseCreateAPIView(CreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]  # 👈 Only logged-in users

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        print("👤 Authenticated user:", self.request.user)
        print("🔐 Token from request:", self.request.META.get('HTTP_AUTHORIZATION'))

class ExpenseListAPIView(ListAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user).order_by('-date')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def categorize_items(request):
#     try:
#         items = request.data.get("items", [])
#         print('Categorize items in categories :',items)
#         # if not items:
#         #     return Response({"error": "No items provided."}, status=status.HTTP_400_BAD_REQUEST)

#         results = []
#         for item in items:
#             item_name = item.get("name", "")
#             category = predict_category(item)
#             results.append({
#                 "name": item,
#                 "category": category
#             })

#         return Response({"results": results}, status=status.HTTP_200_OK)

#     except Exception as e:
#         import traceback
#         traceback.print_exc()
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def categorize_items(request):
    try:
        items = request.data.get("items", [])
        print('Categorize items in categories :', items)

        results = []
        for item in items:
            item_name = item.get("name", "")  # ✅ Extract the name string
            category = predict_category(item_name)  # Pass only the name string
            results.append({
                "name": item_name,
                "category": category
            })

        return Response({"results": results}, status=status.HTTP_200_OK)

    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
# views.py
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_expense_items(request, expense_id):
    try:
        expense = Expense.objects.get(id=expense_id, user=request.user)
        items = expense.items.all()  # related_name='items' from your model

        item_data = [
            {
                "id": item.id,
                "name": item.name,
                "price": item.price,
                "category": item.category
            } for item in items
        ]

        return Response(item_data, status=status.HTTP_200_OK)

    except Expense.DoesNotExist:
        return Response({"error": "Expense not found."}, status=status.HTTP_404_NOT_FOUND)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_monthly_totals(request):
    try:
        monthly_expenses = (
            Expense.objects.filter(user=request.user)
            .annotate(month=TruncMonth('date'))
            .values('month')
            .annotate(total=Sum('total_amount'))
            .order_by('month')
        )

        data = [
            {
                'month': m['month'].strftime('%b'),  # e.g., 'Jan'
                'amount': float(m['total'])
            }
            for m in monthly_expenses
        ]

        return Response(data, status=status.HTTP_200_OK)

    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def predict_next_month(request):
    
    monthly_totals = (
        Expense.objects.filter(user=request.user)
        .annotate(month=TruncMonth('date'))
        .values('month')
        .annotate(total=Sum('total_amount'))
        .order_by('month')
    )

    monthly_totals_list = list(monthly_totals)
    if not monthly_totals or len(monthly_totals_list) < 2:
        # Instead of error, return nulls for frontend to handle gracefully
        return Response({
            'predicted_month': None,
            'predicted_total': None
        })

    X = np.arange(len(monthly_totals_list)).reshape(-1, 1)
    y = np.array([float(m['total']) for m in monthly_totals_list])

    model = LinearRegression()
    model.fit(X, y)

    next_month_index = len(monthly_totals_list)
    predicted_total = model.predict([[next_month_index]])[0]

    last_month = monthly_totals_list[-1]['month']
    next_month = (last_month.replace(day=28) + timedelta(days=4)).replace(day=1)
    predicted_month = next_month.strftime('%b')

    return Response({
        'predicted_month': predicted_month,
        'predicted_total': round(predicted_total, 2)
    })
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_budget(request):
    user = request.user
    month = timezone.now().date().replace(day=1)

    print("DEBUG 🔍 Raw request.data:", request.data)

    try:
        # Safely parse total
        total_value = request.data.get('total', 0)
        print("DEBUG 🧮 Raw total value:", total_value)

        total = Decimal(str(total_value))

        # ✅ Save total in BudgetSummary
        summary, created = BudgetSummary.objects.update_or_create(
            user=user,
            month=month,
            defaults={'total': total}
        )
        print(f"✅ BudgetSummary saved: {summary}")

        for category, amount in request.data.items():
            if category == "total":
                continue
            print(f"📦 Saving category {category} with amount {amount}")
            MonthlyBudgetPlan.objects.update_or_create(
                user=user,
                category=category,
                month=month,
                defaults={'amount': Decimal(str(amount))}
            )

        return Response({"message": "Budget set successfully"})

    except Exception as e:
        print("❌ ERROR in set_budget view:", str(e))
        return Response({"error": str(e)}, status=500)    
  
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_budget(request):
    try:
        user = request.user
        today = now().date()
        month_start = today.replace(day=1)

        # Get all budget entries for this month
        budget_items = MonthlyBudgetPlan.objects.filter(user=user, month=month_start)

        if not budget_items.exists():
            # Try last month's budgets
            last_month = (month_start - timedelta(days=1)).replace(day=1)
            budget_items = MonthlyBudgetPlan.objects.filter(user=user, month=last_month)

            if not budget_items.exists():
                return Response({"error": "No budget set yet."}, status=404)

        data = {}
        total = 0
        for item in budget_items:
            data[item.category] = float(item.amount)
            total += float(item.amount)

        data['total'] = total
        data['month'] = month_start.strftime('%Y-%m')

        return Response(data, status=200)

    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({"error": str(e)}, status=500)
  
  
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def category_summary(request):
    today = date.today()

    try:
        summary = (
            ExpenseItem.objects
            .filter(
                expense__user=request.user,
                expense__date__year=today.year,
                expense__date__month=today.month
            )
            .values('category')
            .annotate(total=Sum('price'))
            .order_by('-total')
        )

        summary_list = [
            {
                "category": item["category"] or "Uncategorized",
                "total": float(item["total"] or 0)
            }
            for item in summary
        ]

        return Response(summary_list)

    except Exception as e:
        # This will help you see the exact error in the console
        print("❌ category_summary error:", str(e))
        return Response({"error": str(e)}, status=500)
  
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def category_summary(request):
#     today = date.today()

#     # Filter for current month for logged-in user
#     summary = (
#         ExpenseItem.objects
#         .filter(
#             expense__user=request.user,
#             expense__date__year=today.year,
#             expense__date__month=today.month
#         )
#         .values('category')
#         .annotate(total=Sum('price'))
#         .order_by('-total')
#     )

#     # Replace null categories with "Uncategorized"
#     summary_list = [
#         {
#             "category": item["category"] or "Uncategorized",
#             "total": item["total"] or 0
#         }
#         for item in summary
#     ]

#     return Response(summary_list)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_budget(request):
#     try:
#         user = request.user
#         today = now().date()
#         month_start = today.replace(day=1)

#         try:
#             budget = MonthlyBudgetPlan.objects.get(user=user, month=month_start)
#         except MonthlyBudgetPlan.DoesNotExist:
#             # Try to get last month's budget
#             last_month = (month_start - timedelta(days=1)).replace(day=1)
#             budget = MonthlyBudgetPlan.objects.filter(user=user, month=last_month).first()
#             if budget is None:
#                 return Response({"error": "No budget set yet."}, status=404)

#         data = {
#             "groceries": budget.groceries,
#             "food": budget.food,
#             "personalCare": budget.personal_care,
#             "entertainment": budget.entertainment,
#             "electronics": budget.electronics,
#             "stationery": budget.stationery,
#             "clothing": budget.clothing,
#             "household": budget.household,
#             "travel": budget.travel,
#             "medical": budget.medical,
#             "total": budget.total,
#             "month": budget.month.strftime('%Y-%m'),
#         }

#         return Response(data, status=200)

#     except Exception as e:
#         import traceback
#         traceback.print_exc()
#         return Response({"error": str(e)}, status=500)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def monthly_budget_progress(request):
    user = request.user

    # 1. Get current year and month
    now = datetime.now()
    current_year = now.year
    current_month = now.month

    # 2. Get budget plans for this month
    budget_plans = MonthlyBudgetPlan.objects.filter(
        user=user,
        month__year=current_year,
        month__month=current_month
    )

    # 3. Get total spent per category from receipt items this month
    spent_by_category = ExpenseItem.objects.filter(
        expense__user=user,
        expense__date__year=current_year,
        expense__date__month=current_month
    ).values('category').annotate(total_spent=Sum('price'))

    # Convert spent to a dict for quick lookup
    spent_dict = {item['category']: item['total_spent'] for item in spent_by_category}

    # 4. Combine and prepare response data
    result = []
    for plan in budget_plans:
        category = plan.category
        budget_amount = plan.amount
        spent_amount = spent_dict.get(category, 0)

        result.append({
            'category': category,
            'budget': budget_amount,
            'spent': spent_amount,
            'percentage': round((spent_amount / budget_amount) * 100, 2) if budget_amount > 0 else 0,
        })

    return Response({'status': 'success', 'data': result})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_category_monthly_budget(request):
    user = request.user
    month_str = request.query_params.get('month')  # Format: YYYY-MM

    try:
        # Determine month range
        if month_str:
            try:
                year, month = map(int, month_str.split('-'))
                start_of_month = datetime(year, month, 1).date()
            except:
                return Response({'error': 'Invalid month format. Use YYYY-MM'}, status=400)
        else:
            today = now().date()
            start_of_month = today.replace(day=1)

        # End of current month (exclusive)
        if start_of_month.month == 12:
            end_of_month = datetime(start_of_month.year + 1, 1, 1).date()
        else:
            end_of_month = datetime(start_of_month.year, start_of_month.month + 1, 1).date()

        # 1. Check if budget set for **any date** in selected month
        current_month_budgets = MonthlyBudgetPlan.objects.filter(
            user=user,
            month__gte=start_of_month,
            month__lt=end_of_month
        )

        # 2. If not found, fallback to **any budget in previous month**
        if not current_month_budgets.exists():
            prev_month_end = start_of_month - timedelta(days=1)
            prev_month_start = prev_month_end.replace(day=1)

            current_month_budgets = MonthlyBudgetPlan.objects.filter(
                user=user,
                month__gte=prev_month_start,
                month__lte=prev_month_end
            )

            if not current_month_budgets.exists():
                return Response({"error": "No budget found for this or previous month."}, status=404)
            # Still using current month for expense filtering

        # Build category-wise budget and spent summary
        category_summary = {}
        total_budget = 0

        for item in current_month_budgets:
            category = item.category
            budget_amount = float(item.amount)

            # Get expenses in this category for current month
            expenses = ExpenseItem.objects.filter(
                expense__user=user,
                category=category,
                expense__date__gte=start_of_month,
                expense__date__lt=end_of_month
            )
            spent = sum(float(e.price) for e in expenses)

            category_summary[category] = {
                'budget': budget_amount,
                'spent': spent,
                'percent_used': round((spent / budget_amount) * 100, 2) if budget_amount else 0
            }

            total_budget += budget_amount

        return Response({
            'month': start_of_month.strftime('%Y-%m'),
            'total_budget': total_budget,
            'categories': category_summary
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_budget_dashboard_stats(request):
    try:
        user = request.user
        today = now().date()
        month_start = today.replace(day=1)
        next_month = (month_start + timedelta(days=32)).replace(day=1)

        print("➡️ User:", user)
        print("➡️ Date range:", month_start, "to", next_month)

        # Get total expenses for this month
        total_expenses = Expense.objects.filter(
            user=user, date__gte=month_start, date__lt=next_month
        ).aggregate(total=Sum('total_amount'))['total'] or 0

        print("💸 Total expenses:", total_expenses)

        # Get total transactions
        total_transactions = Expense.objects.filter(
            user=user, date__gte=month_start, date__lt=next_month
        ).count()

        print("🧾 Total transactions:", total_transactions)

        # Get monthly budget for this month (or last month if not set)
        monthly_budgets = MonthlyBudgetPlan.objects.filter(
            user=user, month__lte=month_start
        ).order_by('-month')

        if monthly_budgets.exists():
            total_budget = sum(float(b.amount) for b in monthly_budgets if b.amount)
            category_count = monthly_budgets.count()
        else:
            total_budget = 0
            category_count = 0

        print("📊 Total budget:", total_budget)
        print("📂 Categories tracked:", category_count)

        # Daily average
        days_passed = today.day
        daily_avg = total_expenses / days_passed if days_passed else 0

        return Response({
            "totalExpenses": total_expenses,
            "monthlyBudget": total_budget,
            "transactions": total_transactions,
            "categoriesTracked": category_count,
            "dailyAverage": round(daily_avg, 2),
            "monthlyChange": today.strftime('%Y-%m'),
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({"error": str(e)}, status=500)
# Update a single expense item
class ExpenseItemUpdateAPIView(generics.UpdateAPIView):
    queryset = ExpenseItem.objects.all()
    serializer_class = ExpenseItemSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'  

class ExpenseDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    lookup_field = "id"

    def get_queryset(self):
        # Ensure user can only see their own expenses
        return Expense.objects.filter(user=self.request.user)

from rest_framework.generics import DestroyAPIView

class ExpenseItemDeleteAPIView(DestroyAPIView):
    queryset = ExpenseItem.objects.all()
    serializer_class = ExpenseItemSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

# Get / Update / Delete a single expense
# class ExpenseDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Expense.objects.all()
#     serializer_class = ExpenseSerializer
#     permission_classes = [IsAuthenticated]
#     lookup_field ='id'
    

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_budget_dashboard_stats(request):
#     try:
#         user = request.user
#         today = now().date()
#         month_start = today.replace(day=1)
#         next_month = (month_start + timedelta(days=32)).replace(day=1)
#         last_month_start = (month_start - timedelta(days=1)).replace(day=1)
#         last_month_end = month_start

#         # Total expenses for this and last month
#         total_expenses = Expense.objects.filter(user=user, date__gte=month_start, date__lt=next_month).aggregate(total=models.Sum('total_amount'))['total'] or 0
#         last_month_expenses = Expense.objects.filter(user=user, date__gte=last_month_start, date__lt=last_month_end).aggregate(total=models.Sum('total_amount'))['total'] or 0

#         # Transactions & budget
#         total_transactions = Expense.objects.filter(user=user, date__gte=month_start, date__lt=next_month).count()
#         monthly_budgets = MonthlyBudgetPlan.objects.filter(user=user, month__year=month_start.year, month__month=month_start.month)
#         total_budget = sum([float(b.amount) for b in monthly_budgets]) if monthly_budgets.exists() else 0

#         # Daily average
#         days_passed = today.day
#         daily_avg = total_expenses / days_passed if days_passed else 0

#         # Category count
#         category_count = monthly_budgets.count();

#         # Calculate monthly change % vs last month
#         if last_month_expenses > 0:
#             monthly_change = ((total_expenses - last_month_expenses) / last_month_expenses) * 100
#         else:
#             monthly_change = 0  # Or maybe 100 if you prefer showing it as a spike

#         data = {
#             "totalExpenses": total_expenses,
#             "monthlyBudget": total_budget,
#             "transactions": total_transactions,
#             "categoriesTracked": category_count,
#             "dailyAverage": round(daily_avg, 2),
#             "monthlyChange": round(monthly_change, 2),  # ✅ Now a percentage number
#         }
#         return Response(data)
#     except Exception as e:
#         import traceback
#         traceback.print_exc()
#         return Response({"error": str(e)}, status=500)
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_budget_dashboard_stats(request):
#     user = request.user
#     today = now().date()
#     month_start = today.replace(day=1)
#     next_month = (month_start + timedelta(days=32)).replace(day=1)

#     # Get total expenses for this month
#     total_expenses = Expense.objects.filter(user=user, date__gte=month_start, date__lt=next_month).aggregate(total=models.Sum('total_amount'))['total'] or 0

#     # Get total transactions (expenses)
#     total_transactions = Expense.objects.filter(user=user, date__gte=month_start, date__lt=next_month).count()

#     # Get monthly budget (sum of all category budgets)
#     monthly_budgets = MonthlyBudgetPlan.objects.filter(user=user, month__year=month_start.year, month__month=month_start.month)
#     total_budget = sum([float(b.amount) for b in monthly_budgets]) if monthly_budgets.exists() else 0

#     # Calculate daily average
#     days_passed = today.day
#     daily_avg = total_expenses / days_passed if days_passed else 0

#     # For category count
#     category_count = monthly_budgets.count()

#     data = {
#         "totalExpenses": total_expenses,
#         "monthlyBudget": total_budget,
#         "transactions": total_transactions,
#         "categoriesTracked": category_count,
#         "dailyAverage": round(daily_avg, 2),
#         "monthlyChange": month_start.strftime('%Y-%m'),
#     }
#     return Response(data)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_category_monthly_budget(request):
#     user = request.user
#     month_str = request.query_params.get('month')  # Format: YYYY-MM

#     try:
#         # Parse or default to current month
#         if not month_str:
#             today = now().date()
#             month_start = today.replace(day=1)
#         else:
#             try:
#                 year, month = map(int, month_str.split('-'))
#                 month_start = datetime(year, month, 1).date()
#             except:
#                 return Response({'error': 'Invalid month format. Use YYYY-MM'}, status=400)

#         # Try to get budget for this month
#         budget_items = MonthlyBudgetPlan.objects.filter(user=user, month=month_start)

#         # Fallback to previous month if no data
#         if not budget_items.exists():
#             last_month = (month_start - timedelta(days=1)).replace(day=1)
#             budget_items = MonthlyBudgetPlan.objects.filter(user=user, month=last_month)
#             if not budget_items.exists():
#                 return Response({"error": "No budget set yet."}, status=404)
#             month_start = last_month  # update month_start

#         # Prepare category data
#         result = {}
#         total_budget = 0

#         for item in budget_items:
#             category = item.category
#             budget_amount = float(item.amount)

#             # Sum expenses in this category for the given month
#             expenses = ExpenseItem.objects.filter(
#                 expense__user=user,
#                 category=category,
#                 expense__date__gte=month_start,
#                 expense__date__lt=(month_start + timedelta(days=32)).replace(day=1)  # next month start
#             )

#             spent = sum(float(e.price) for e in expenses)

#             result[category] = {
#                 'budget': budget_amount,
#                 'spent': spent,
#                 'percent_used': round((spent / budget_amount) * 100, 2) if budget_amount else 0
#             }

#             total_budget += budget_amount

#         return Response({
#             'month': month_start.strftime('%Y-%m'),
#             'total_budget': total_budget,
#             'categories': result
#         })

#     except Exception as e:
#         import traceback
#         traceback.print_exc()
#         return Response({'error': str(e)}, status=500)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def savings_summary(request):
    user = request.user

    # Sum all budgets (all months, all categories)
    total_budget = MonthlyBudgetPlan.objects.filter(user=user).aggregate(total=Sum('amount'))['total'] or 0

    # Sum all expenses (all months)
    total_expenses = Expense.objects.filter(user=user).aggregate(total=Sum('total_amount'))['total'] or 0

    savings = float(total_budget) - float(total_expenses)

    return Response({
        "total_budget": float(total_budget),
        "total_expenses": float(total_expenses),
        "savings": round(savings, 2)
    })
#         # Try to get budget for the given month
#         budget_items = MonthlyBudgetPlan.objects.filter(user=user, month=month_start)

#         # Fallback to last month if no budget for this month
#         if not budget_items.exists():
#             last_month = (month_start - timedelta(days=1)).replace(day=1)
#             budget_items = MonthlyBudgetPlan.objects.filter(user=user, month=last_month)

#             if not budget_items.exists():
#                 return Response({"error": "No budget set yet."}, status=404)

#             # Update month_start to reflect fallback month
#             month_start = last_month

#         # Prepare response data
#         category_budgets = {}
#         total = 0
#         for item in budget_items:
#             category_budgets[item.category] = float(item.amount)
#             total += float(item.amount)

#         response = {
#             'month': month_start.strftime('%Y-%m'),
#             'total': total,
#             'budgets': category_budgets
#         }

#         return Response(response, status=200)

#     except Exception as e:
#         import traceback
#         traceback.print_exc()
#         return Response({'error': str(e)}, status=500)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_category_monthly_budget(request):
#     user = request.user
#     month_str = request.query_params.get('month')  # Format: YYYY-MM

#     if not month_str:
#         return Response({'error': 'Month is required as YYYY-MM'}, status=400)

#     try:
#         year, month = map(int, month_str.split('-'))
#         month_start = datetime(year, month, 1).date()
#     except:
#         return Response({'error': 'Invalid month format. Use YYYY-MM'}, status=400)

#     budgets = MonthlyBudget.objects.filter(user=user, month=month_start)
#     serializer = MonthlyBudgetSerializer(budgets, many=True)
#     return Response(serializer.data)
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def predict_next_month(request):
#     # Aggregate total by month
#     monthly_totals = (
#         Expense.objects.filter(user=request.user)
#         .annotate(month=TruncMonth('date'))
#         .values('month')
#         .annotate(total=Sum('total_amount'))
#         .order_by('month')
#     )

#     if len(monthly_totals) < 2:
#         return Response({'error': 'Need at least 2 months of data to predict.'}, status=400)

#     # Convert to X (months index) and y (amounts)
#     X = np.arange(len(monthly_totals)).reshape(-1, 1)
#     y = np.array([float(m['total']) for m in monthly_totals])

#     # Train model
#     model = LinearRegression()
#     model.fit(X, y)

#     # Predict next point
#     next_month_index = len(monthly_totals)
#     predicted_total = model.predict([[next_month_index]])[0]

#     # Format predicted month (next one after last)
#     monthly_totals_list = list(monthly_totals)
#     last_month = monthly_totals_list[-1]['month']

#     next_month = (last_month.replace(day=1) + timedelta(days=32)).replace(day=1)
#     predicted_month = next_month.strftime('%b')  # e.g., 'Jul'

#     return Response({
#         'predicted_month': predicted_month,
#         'predicted_total': round(predicted_total, 2)
#     })

# @api_view(['GET'])
# @permission_classes([IsAuthenticated]) 
# def predict_next_month_expense(request):
#     # Get user's monthly total expenses
#     expenses = (
#         Expense.objects.filter(user=request.user)
#         .annotate(month=TruncMonth("date"))
#         .values("month")
#         .annotate(total=Sum("total_amount"))
#         .order_by("month")
#     )

#     # Convert to pandas DataFrame
#     df = pd.DataFrame(expenses)
#     if df.empty or len(df) < 2:
#         return JsonResponse({"error": "Not enough data to predict"}, status=400)

#     # Convert date to ordinal for regression model
#     df["month_ordinal"] = df["month"].map(lambda x: x.toordinal())
#     X = df[["month_ordinal"]]
#     y = df["total"]

#     # Fit linear regression model
#     model = LinearRegression()
#     model.fit(X, y)

#     # Predict next month's total
#     last_month = df["month"].max()
#     next_month_date = last_month + pd.DateOffset(months=1)
#     next_month_ordinal = next_month_date.toordinal()
#     predicted_total = model.predict([[next_month_ordinal]])[0]

#     return JsonResponse({
#         "predicted_month": next_month_date.strftime("%B %Y"),
#         "predicted_total": round(predicted_total, 2)
#     })

# @csrf_exempt
# @api_view(['POST'])
# def extract_receipt_info(request):
#     if request.method != "POST" or 'receipt' not in request.FILES:
#         return JsonResponse({"error": "No image provided"}, status=400)

#     # Load Qwen model
#     load_model()
    
#     if model is None or processor is None:
#         return JsonResponse({"error": "Model not loaded properly. Check logs."}, status=500)


#     # Save and open image
#     image_file = request.FILES['receipt']
#     image_path = default_storage.save("tmp/" + image_file.name, image_file)
#     image = Image.open(os.path.join(default_storage.location, image_path)).convert("RGB")
#     image = image.resize((512, 512))

#     # Prompt
#     messages = [{
#         "role": "user",
#         "content": [
#             {"type": "image", "image": image},
#             {"type": "text", "text": (
#                 "Extract the following from this receipt image:\n\n"
#                 "📋 Basic Info:\n- Company Name\n- Date\n- Total Amount\n\n"
#                 "📦 Items:\nOnly final items with total price. Skip tax and total rows.\n\n"
#                 "📄 Format:\nCompany Name: <value>\nDate: <value>\nTotal Amount: <value>\n\n"
#                 "Items:\n- Item: <name>, Price: <price>"
#             )}
#         ]
#     }]

#     # Format input
#     text = processor.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
#     image_inputs, video_inputs = process_vision_info(messages)
#     inputs = processor(
#         text=[text], images=image_inputs, videos=video_inputs, padding=True, return_tensors="pt"
#     ).to("cuda")

#     # Generate
#     with torch.no_grad():
#         generated_ids = model.generate(**inputs, max_new_tokens=400)
#     output = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]

#     # Parse result
#     details = {}
#     items = []
#     parsing_items = False

#     exclude = {"sgst", "cgst", "vat", "tax", "total", "due", "balance", "rounding"}

#     for line in output.splitlines():
#         line = line.strip().lstrip("*").replace("**", "").replace("-", "").strip()

#         if line.lower().startswith("items"):
#             parsing_items = True
#             continue

#         if parsing_items and "Item:" in line and "Price:" in line:
#             try:
#                 item_part, price_part = line.split("Price:")
#                 item = item_part.split("Item:")[1].strip().strip(",")
#                 price = price_part.strip()
#                 if item.lower() not in exclude:
#                     items.append({"Item": item, "Price": price})
#             except:
#                 continue
#         elif ":" in line and not parsing_items:
#             key, value = line.split(":", 1)
#             details[key.strip()] = value.strip()

#     if items:
#         details["Items"] = items

#     return JsonResponse(details)

# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt

# @csrf_exempt
# def extract_receipt_info(request):
#     if request.method == 'POST':
#         # process image and return JSON
#         return JsonResponse({"Company Name": "ABC Ltd", "Total Amount": "2000"})
#     return JsonResponse({"error": "Only POST allowed"}, status=400)
#     return JsonResponse({"error": "Only POST allowed"}, status=400)
