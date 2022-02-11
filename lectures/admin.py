from django.contrib import admin
from . import models


@admin.register(models.Lecture)
class LectureAdmin(admin.ModelAdmin):
    list_display = ('topic', 'res_person', 'organisation',
                    'n_stud', 'n_stud', 'n_stud', 'f_id', 'date_added')
    prepopulated_fields = {'slug': ('topic',), }
