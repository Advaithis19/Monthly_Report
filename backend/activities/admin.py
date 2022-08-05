from django.contrib import admin
from . import models


@admin.register(models.Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('activity', 'date', 'f_id', 'date_added')
