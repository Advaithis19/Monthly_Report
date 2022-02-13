from django.contrib import admin
from . import models


@admin.register(models.Mou)
class MouAdmin(admin.ModelAdmin):
    list_display = ('organisation', 'mod_col',
                    'validity', 'date', 'get_faculty')
    prepopulated_fields = {'slug': ('organisation',), }
