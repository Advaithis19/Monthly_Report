from django.contrib import admin
from . import models


@admin.register(models.Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display = ('membership', 'association', 'term', 'get_faculty')
    prepopulated_fields = {'slug': ('membership',), }
