# from django.db import models

# Create your models here.

# from django.contrib.auth.models import User

# class Expense(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='expenses')  # 👈 Add this line
#     company = models.CharField(max_length=100)
#     date = models.DateField()
#     description = models.TextField(blank=True)

#     def __str__(self):
#         return f"{self.company} - {self.date}"

# class Item(models.Model):
#     expense = models.ForeignKey(Expense, related_name='items', on_delete=models.CASCADE)
#     name = models.CharField(max_length=100)
#     price = models.DecimalField(max_digits=10, decimal_places=2)

#     def __str__(self):
#         return f"{self.name} - ₹{self.price}"

from django.db import models
from django.contrib.auth.models import User
from datetime import date

class Expense(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    company = models.CharField(max_length=255)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

class ExpenseItem(models.Model):
    expense = models.ForeignKey(Expense, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100, null=True, blank=True)

class BudgetSummary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    month = models.DateField()
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.user.username} - {self.month.strftime('%B %Y')} - ₹{self.total}"


class MonthlyBudgetPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    month = models.DateField()


class MonthlyBudget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    month = models.DateField()

    def __str__(self):
        return f"{self.user.username} - {self.category} - {self.month.strftime('%B %Y')}"

