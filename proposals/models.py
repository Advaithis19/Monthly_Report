from django.db import models
from django.db.models.constraints import UniqueConstraint
from django.db.models.deletion import CASCADE
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class Proposal(models.Model):

    title = models.CharField("title", max_length=50)
    submitted_to = models.CharField("submitted", max_length=50)
    budg_amt = models.DecimalField(
        "budgetted amount", max_digits=10, decimal_places=2)

    ACCEPT = 'AC'
    REJECT = 'RE'
    ONGOING = 'ON'

    status_list = [
        (ACCEPT, 'Accepted'),
        (REJECT, 'Rejected'),
        (ONGOING, 'Ongoing'),
    ]

    status = models.CharField("status",
                              max_length=3,
                              choices=status_list,
                              null=True,
                              blank=True
                              )
    slug = models.SlugField(max_length=250)

    date_added = models.DateField("recorded date", default=timezone.now())

    PI = models.ForeignKey(User, on_delete=CASCADE,
                           related_name='proposals_prinvestigated', null=True, verbose_name="principle investigator")
    CO_PI = models.ForeignKey(
        User, on_delete=CASCADE, related_name='proposals_coprinvestigated', null=True, verbose_name="co-principle investigator")

    UniqueConstraint(fields=['title', 'PI', 'CO_PI'], name='unique_proposal')

    class Meta:
        ordering = ('-date_added',)
        db_table = 'proposal'

    def __str__(self):
        return self.title
