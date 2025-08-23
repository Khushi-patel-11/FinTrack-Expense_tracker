from django.contrib import admin
# from .models import Expense, ExpenseItem 
from .models import Expense, ExpenseItem ,MonthlyBudgetPlan , BudgetSummary

# Register your models here.

# class ItemInline(admin.TabularInline):
#     model = Item
#     extra = 1

# class ExpenseAdmin(admin.ModelAdmin):
#     inlines = [ItemInline]

# admin.site.register(Expense, ExpenseAdmin)

class ExpenseItemInline(admin.TabularInline):
    model = ExpenseItem
    extra = 1  # Number of empty item forms shown

class ExpenseAdmin(admin.ModelAdmin):
    inlines = [ExpenseItemInline]  # Attach the item inline to Expense

admin.site.register(Expense, ExpenseAdmin)
admin.site.register(MonthlyBudgetPlan)
admin.site.register(BudgetSummary)


# BUt  pie chart for give diffenernt on then which categories most used from monthly total budget and progress bar is  used for each categories e.x food categorey budget is 3000 and spend the 2000 so the progres bar gives 66% something so that is why i asked that which place is appropriate to see the catergory wise progress bar.



 