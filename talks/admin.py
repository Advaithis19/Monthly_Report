from django.contrib import admin
from . import models


@admin.register(models.Talk)
class TalkAdmin(admin.ModelAdmin):
    list_display = ('topic', 'venue', 'n_stud', 'n_fac',
                    'n_ind', 'date', 'f_id', 'date_added')
    prepopulated_fields = {'slug': ('topic',), }
