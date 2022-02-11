from django.contrib import admin
from . import models


@admin.register(models.Workshop)
class WorkshopAdmin(admin.ModelAdmin):
    list_display = ('event_name', 'venue', 'date', 'get_faculty')
    prepopulated_fields = {'slug': ('event_name',), }
