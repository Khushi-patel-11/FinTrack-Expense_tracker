from django.urls import path 
from . import views 

urlpatterns =[
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('forgot-password/', views.ForgotPasswordView.as_view(), name='forgot-password'),
    # path("reset-password-confirm/", views.PasswordResetConfirmView.as_view(), name="reset-password-confirm"),
    path('reset-password-confirm/', views.ResetPasswordConfirmView.as_view(), name='reset-password-confirm'),

]