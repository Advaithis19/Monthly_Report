from django.contrib import admin
from . import models


@admin.register(models.Industrial_visit)
class Industrial_visitAdmin(admin.ModelAdmin):
    list_display = ('purpose', 'industry', 'semester', 'n_stud', 'get_faculty')
