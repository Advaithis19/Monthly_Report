from django.contrib import admin
from . import models


@admin.register(models.Patent)
class PatentAdmin(admin.ModelAdmin):
    list_display = ('title', 'topic', 'status', 'get_faculty')
