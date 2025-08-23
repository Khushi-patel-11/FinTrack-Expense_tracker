# from django.shortcuts import render
# from django.contrib.auth.models import User
# from django.contrib.auth.hashers import make_password
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth import authenticate
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# import json
# from django.shortcuts import render
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
# # Create your views here.

# # @csrf_exempt
# # def signup(request):
# #     if request.method == 'POST':
# #         try:
# #             data = json.loads(request.body)
# #             name = data.get('name')
# #             email = data.get('email')
# #             password = data.get('password')

# #             if User.objects.filter(username=email).exists():
# #                 return JsonResponse({'error': 'User already exists'}, status=400)

# #             user = User.objects.create(
# #                 username=email,
# #                 first_name=name,
# #                 email=email,
# #                 password=password
# #             )

# #             return JsonResponse({'message': 'User created successfully'}, status=201)

# #         except Exception as e:
# #             return JsonResponse({'error': str(e)}, status=500)

# #     return JsonResponse({'error': 'Invalid request'}, status=400)

# @csrf_exempt
# @permission_classes([AllowAny])
# def signup(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             name = data.get('name')
#             email = data.get('email')
#             password = data.get('password')

#             if User.objects.filter(username=email).exists():
#                 return JsonResponse({'error': 'User already exists'}, status=400)

#             user = User.objects.create_user(
#                 username=email,
#                 first_name=name,
#                 email=email,
#             )
#             user.set_password(password)  # ✅ properly hashes the password
#             user.save()

#             return JsonResponse({'message': 'User created successfully'}, status=201)

#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=500)

#     return JsonResponse({'error': 'Invalid request'}, status=400)

# # @api_view(['POST'])
# # def signin(request):
# #     email = request.data.get('email')
# #     password = request.data.get('password')

# #     if not email or not password:
# #         return Response({'error': 'Email and password are required'}, status=400)

# #     user = authenticate(username=email, password=password)
# #     if user:
# #         return Response({
# #             'message': 'Login successful',
# #             'name': user.first_name  # include user's name
# #         }, status=200)

# #     return Response({'error': 'Invalid email or password'}, status=400)

# @api_view(['POST'])
# @permission_classes([AllowAny]) # Add this if not already present, assuming signin is public
# def signin(request):
    
#     print('In signin page')
    
#     email = request.data.get('email')
#     print('Emain is got : ', email)
#     password = request.data.get('password')
#     print('Password is got : ', password)

#     if not email or not password:
#         return JsonResponse({'error': 'Email and password are required'}, status=400) # Changed to JsonResponse for consistency

#     user = authenticate(username=email, password=password) # This should work if email is username
#     print('user is ',user)
#     if user:
#         # If authentication is successful, you might want to log the user in
#         # (if you are using Django's session-based authentication)
#         # login(request, user) # Uncomment if you need session login

#         return JsonResponse({
#             'message': 'Login successful',
#             # You might want to return user data or a token here
#             'username': user.username,
#             'email': user.email,
#         }, status=200) # Changed status to 200 for successful login
#     else:
#         return JsonResponse({'error': 'Invalid email or password'}, status=401) # Return specific error for authentication failure


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view, permission_classes
from expenses.serializers import ExpenseSerializer
from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from django.conf import settings
from .models import PasswordResetToken
import datetime
from rest_framework.permissions import AllowAny
from django.utils.http import urlsafe_base64_decode , urlsafe_base64_encode
from django.contrib.auth.hashers import make_password
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.encoding import force_str
# ✅ Signup - Publicly Accessible
@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def signup(request):
    try:
        data = request.data
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not all([name, email, password]):
            return Response({'error': 'Missing required fields'}, status=400)

        if User.objects.filter(username=email).exists():
            return Response({'error': 'User already exists'}, status=400)

        user = User.objects.create_user(
            username=email,
            email=email,
            first_name=name
        )
        user.set_password(password)
        user.save()

        token, _ = Token.objects.get_or_create(user=user)
        print('token is the : ',token)
        return Response({'message': 'Signup successful', 'token': token.key}, status=201)

    except Exception as e:
        return Response({'error': str(e)}, status=500)

# ✅ Signin - Publicly Accessible
@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def signin(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=400)

    user = authenticate(username=email, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        print('token is : ',token)
        return Response({
            'message': 'Login successful',
            'token': token.key,
            'name': user.first_name
        }, status=200)

    return Response({'error': 'Invalid email or password'}, status=401)

# ✅ Protected Example View
class ProtectedExampleView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': f'Hello, {request.user.username}. You are authenticated.'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_expense(request):
    serializer = ExpenseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)  # associate with authenticated user
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class ForgotPasswordView(APIView):
#     permission_classes = [AllowAny]
#     def post(self, request):
#         email = request.data.get('email')

#         if not email:
#             return Response({"message": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             user = User.objects.get(email=email)
#         except User.DoesNotExist:
#             return Response({"message": "No account found with this email"}, status=status.HTTP_404_NOT_FOUND)

#         # Create token
#         token = get_random_string(50)
#         expiry_time = datetime.datetime.now() + datetime.timedelta(hours=1)

#         PasswordResetToken.objects.create(
#             user=user,
#             token=token,
#             expires_at=expiry_time
#         )

#         # Construct reset link
#         reset_link = f"http://localhost:3000/reset-password/{token}"

#         # Send email
#         send_mail(
#             "Password Reset Request",
#             f"Click the link below to reset your password:\n\n{reset_link}",
#             settings.DEFAULT_FROM_EMAIL,
#             [email],
#             fail_silently=False,
#         )

#         return Response({"message": "Password reset link sent successfully"}, status=status.HTTP_200_OK)
    
User = get_user_model()

class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')

        if not email:
            return Response({"message": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"message": "No account found with this email"}, status=status.HTTP_404_NOT_FOUND)

        # ✅ Generate Django password reset UID and token
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        # ✅ Construct reset link for frontend
        reset_link = f"http://localhost:5173/reset-password/{uidb64}/{token}"

        # Send email
        send_mail(
            "Password Reset Request",
            f"Click the link below to reset your password:\n\n{reset_link}",
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )

        return Response({"message": "Password reset link sent successfully"}, status=status.HTTP_200_OK)


class ResetPasswordConfirmView(APIView):
    permission_classes = [AllowAny]  
    """
    Confirm password reset, securely generate a new auth token, and invalidate the old one.
    """

    def post(self, request):
        uidb64 = request.data.get("uidb64")
        token = request.data.get("token")
        new_password = request.data.get("new_password")

        if not uidb64 or not token or not new_password:
            return Response({"error": "Missing parameters."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError, OverflowError):
            return Response({"error": "Invalid user."}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)

        # Reset password
        user.set_password(new_password)
        user.save()

        # 🔐 Delete old token to prevent reuse
        Token.objects.filter(user=user).delete()

        # 🔄 Create a new auth token
        auth_token = Token.objects.create(user=user)

        return Response({
            "message": "Password reset successful.",
            "token": auth_token.key
        }, status=status.HTTP_200_OK)
# class ResetPasswordConfirmView(APIView):
#     permission_classes = [AllowAny]  
#     """
#     Confirm password reset, create a new auth token, and prevent reuse of the old token.
#     """

#     def post(self, request):
#         uidb64 = request.data.get("uidb64")
#         token = request.data.get("token")
#         new_password = request.data.get("new_password")

#         if not uidb64 or not token or not new_password:
#             return Response({"error": "Missing parameters."}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             uid = force_str(urlsafe_base64_decode(uidb64))
#             user = User.objects.get(pk=uid)
#         except (User.DoesNotExist, ValueError, TypeError, OverflowError):
#             return Response({"error": "Invalid user."}, status=status.HTTP_400_BAD_REQUEST)

#         if not default_token_generator.check_token(user, token):
#             return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)

#         # Reset password
#         user.set_password(new_password)
#         user.save()

#         # Create new auth token for the user
#         auth_token, created = Token.objects.get_or_create(user=user)

#         return Response({
#             "message": "Password reset successful.",
#             "token": auth_token.key
#         }, status=status.HTTP_200_OK)
        
class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]  # Ensure no auth required here

    def post(self, request):
        uidb64 = request.data.get('uidb64')
        token = request.data.get('token')
        new_password = request.data.get('new_password')

        if not uidb64 or not token or not new_password:
            return Response({"error": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"error": "Invalid UID."}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Just update password — don't touch the token
        user.set_password(new_password)
        user.save()

        return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)

# class PasswordResetConfirmView(APIView):
#     permission_classes = [AllowAny]
#     authentication_classes = []
#     def post(self, request):
#         uidb64 = request.data.get('uidb64')
#         token = request.data.get('token')
#         new_password = request.data.get('new_password')

#         if not uidb64 or not token or not new_password:
#             return Response({"error": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             # Decode UID
#             uid = urlsafe_base64_decode(uidb64).decode()
#             user = User.objects.get(pk=uid)
#         except (TypeError, ValueError, OverflowError, User.DoesNotExist):
#             return Response({"error": "Invalid UID."}, status=status.HTTP_400_BAD_REQUEST)

#         # Check token validity
#         if not default_token_generator.check_token(user, token):
#             return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)

#         # Set the new password
#         user.set_password(new_password)
#         user.save()

#         return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)
    
# class PasswordResetConfirmView(APIView):
#     def post(self, request):
#         token = request.data.get("token")
#         password = request.data.get("password")

#         if not token or not password:
#             return Response({"message": "Token and password are required"}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             # Connect to MongoDB
#             client = MongoClient("mongodb://localhost:27017")
#             db = client["FairPlayAI"]

#             # Look up the reset token in your password reset token collection
#             token_doc = db.passwordresettoken.find_one({"token": token})
#             if not token_doc:
#                 return Response({"message": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

#             user_id = token_doc.get("user_id")
#             if not user_id:
#                 return Response({"message": "Invalid token data"}, status=status.HTTP_400_BAD_REQUEST)

#             # Find the user
#             user_doc = db.appuser.find_one({"_id": ObjectId(user_id)})
#             if not user_doc:
#                 return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

#             # Update the password (hashed)
#             hashed_password = make_password(password)
#             db.appuser.update_one({"_id": ObjectId(user_id)}, {"$set": {"password": hashed_password}})

#             # Delete the used token
#             db.passwordresettoken.delete_one({"_id": token_doc["_id"]})

#             client.close()

#             return Response({"message": "Password has been reset successfully"}, status=status.HTTP_200_OK)

#         except Exception as e:
#             return Response({"message": "Something went wrong", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)