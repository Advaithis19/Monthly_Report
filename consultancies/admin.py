from django.contrib import admin
from . import models


@admin.register(models.Consultancy)
class ConsultancyAdmin(admin.ModelAdmin):
    list_display = ('title', 'fund_agency', 'rec_amt',
                    'f_id', 'date_added')
    prepopulated_fields = {'slug': ('title',), }
