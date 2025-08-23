# your_app_name/backends.py (replace your_app_name with your actual app name)
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            # Attempt to find the user by email
            user = UserModel.objects.get(email=username)
        except UserModel.DoesNotExist:
            return None # User not found with this email

        # Check if the password is correct for the found user
        if user.check_password(password):
            return user
        return None

    def get_user(self, user_id):
        UserModel = get_user_model()
        try:
            return UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None