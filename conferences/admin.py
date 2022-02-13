from django.contrib import admin
from . import models


@admin.register(models.Conference)
class ConferenceAdmin(admin.ModelAdmin):
    list_display = ('title', 'conference', 'volume', 'issue',
                    'n_page', 'nat_int', 'f_id', 'date_added')
