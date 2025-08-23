# from django.urls import path
# from . import views
# # from .views import ExpenseCreateAPIView

# urlpatterns = [
#     # path('api/ocr/', views.ocr_receipt, name='ocr_receipt'),
#     # path('', views.ask_qwen, name='home'),  
#     path("extract/", views.extract_receipt_info, name="extract_receipt"),
#     path("expenses/", views.ExpenseCreateAPIView.as_view(), name="create-expense"),
#     path("expenses/list/", views.ExpenseListAPIView.as_view(), name="list-expenses"),
#     # path("upload/", views.upload_receipt, name="upload_receipt"),

#     # ...other endpoints
# ] 


from django.urls import path
from .views import (
    ExpenseCreateAPIView, ExpenseListAPIView, extract_receipt_info, categorize_items,
    get_expense_items, get_monthly_totals, predict_next_month, set_budget, get_budget,
    monthly_budget_progress, get_category_monthly_budget, get_budget_dashboard_stats,
    category_summary, ExpenseDetailAPIView, ExpenseItemUpdateAPIView, ExpenseItemDeleteAPIView
)
from . import views

urlpatterns = [
    path("extract/", extract_receipt_info, name="extract-receipt"),
    path("", ExpenseCreateAPIView.as_view(), name="create-expense"),
    path("list/", ExpenseListAPIView.as_view(), name="list-expense"),
    path("categorize-items/", categorize_items, name="categorize-items"),
    path('<int:expense_id>/items/', get_expense_items, name='get-expense-items'),
    path('monthly-totals/', get_monthly_totals, name='monthly-totals'),
    path("predict-next-month/", predict_next_month, name="predict-next-month"),
    path('set-budget/', set_budget, name='set-budget'),
    path('get-budget/', get_budget, name='get-budget'),
    path('monthly-budget-progress/', monthly_budget_progress, name='monthly-budget-progress'),
    path('category-month-budget/', get_category_monthly_budget, name='category-month-budget'),
    path('budget-dashboard/', get_budget_dashboard_stats, name='budget-dashboard'),
    path('category-summary/', category_summary, name='category-summary'),
    path("<int:id>/", ExpenseDetailAPIView.as_view(), name="expense-detail"),
    path("expense-items/<int:id>/", ExpenseItemUpdateAPIView.as_view(), name="expense-item-update"),
    path("expense-items/delete/<int:id>/", ExpenseItemDeleteAPIView.as_view(), name="expense-item-delete"),
    path("savings-summary/", views.savings_summary, name="savings-summary"),
]
