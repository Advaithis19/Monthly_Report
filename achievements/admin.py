from django.contrib import admin
from . import models


@admin.register(models.Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('title', 'organisation', 'f_id', 'date_added')
