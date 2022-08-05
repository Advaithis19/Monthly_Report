from django.contrib import admin
from . import models


@admin.register(models.Grant)
class GrantAdmin(admin.ModelAdmin):
    list_display = ('title', 'agency', 'sanc_amt',
                    'year', 'PI', 'CO_PI', 'date_added')
