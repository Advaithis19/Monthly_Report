from django.contrib import admin
from . import models


@admin.register(models.Proposal)
class ProposalAdmin(admin.ModelAdmin):
    list_display = ('title', 'submitted_to', 'budg_amt',
                    'status', 'PI', 'CO_PI', 'date_added')
