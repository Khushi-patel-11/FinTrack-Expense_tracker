from rest_framework import serializers
from expenses.models import Expense, ExpenseItem

class ExpenseItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseItem
        fields = ['id', 'name', 'price']

class ExpenseSerializer(serializers.ModelSerializer):
    items = ExpenseItemSerializer(many=True)
    total_amount = serializers.FloatField()
    class Meta:
        model = Expense
        fields = ['id', 'company', 'date', 'items']


