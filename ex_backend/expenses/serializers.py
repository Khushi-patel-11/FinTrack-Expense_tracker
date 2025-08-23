    
from rest_framework import serializers
from .models import Expense, ExpenseItem ,MonthlyBudgetPlan 
# from .models import Expense, ExpenseItem 

class ExpenseItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseItem
        # fields = ['name', 'price']
        fields = ['name', 'price', 'category']

class ExpenseSerializer(serializers.ModelSerializer):
    items = ExpenseItemSerializer(many=True , required=False)

    class Meta:
        model = Expense
        fields = ['id', 'company', 'total_amount', 'date', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        expense = Expense.objects.create(**validated_data)
        for item_data in items_data:
            ExpenseItem.objects.create(expense=expense, **item_data)
        return expense
    
    def update(self, instance, validated_data):
        items_data = validated_data.pop('items', None)
        instance.company = validated_data.get('company', instance.company)
        instance.total_amount = validated_data.get('total_amount', instance.total_amount)
        instance.date = validated_data.get('date', instance.date)
        instance.save()

        if items_data is not None:
            instance.items.all().delete()
            for item_data in items_data:
                ExpenseItem.objects.create(expense=instance, **item_data)

        return instance

    # def update(self, instance, validated_data):
    #     items_data = validated_data.pop('items', [])
    #     instance.company = validated_data.get('company', instance.company)
    #     instance.total_amount = validated_data.get('total_amount', instance.total_amount)
    #     instance.date = validated_data.get('date', instance.date)
    #     instance.save()

    #     # Clear existing items & recreate
    #     instance.items.all().delete()
    #     for item_data in items_data:
    #         ExpenseItem.objects.create(expense=instance, **item_data)
    #     return instance
    
    
class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthlyBudgetPlan 
        fields = ['id', 'category', 'amount', 'month']

class MonthlyBudgetPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthlyBudgetPlan
        fields = '__all__'
        