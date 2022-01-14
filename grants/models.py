from django.db import models
from django.db.models.constraints import UniqueConstraint
from django.db.models.deletion import CASCADE
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class Grants(models.Model):

    title = models.CharField(max_length=50)
    agency = models.CharField(max_length=50)
    sanc_amt = models.DecimalField(max_digits=15, decimal_places=2)
    year = models.IntegerField(default=2022)
    remarks = models.CharField(max_length=50, null=True)
    slug = models.SlugField(max_length=250)
    date_added = models.DateField(default=timezone.now())

    PI = models.ForeignKey(User, on_delete=CASCADE,
                           related_name='grants_prinvestigated', null=True)
    CO_PI = models.ForeignKey(
        User, on_delete=CASCADE, related_name='grants_coprinvestigated', null=True)

    UniqueConstraint(fields=['title', 'PI', 'CO_PI'], name='unique_grant')

    class Meta:
        ordering = ('-date_added',)

    def __str__(self):
        return self.title
