from django.contrib import admin
from . import models


@admin.register(models.Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'venue', 'n_stud',
                    'n_fac', 'n_ind', 'date', 'get_faculty')
