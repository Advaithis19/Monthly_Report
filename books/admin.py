from django.contrib import admin
from . import models


@admin.register(models.Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('n_isbn', 'name', 'publisher', 'get_faculty')
    prepopulated_fields = {'slug': ('name',), }
