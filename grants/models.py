from django.db import models
from django.db.models.constraints import UniqueConstraint
from django.db.models.deletion import CASCADE
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator

User = get_user_model()


class Grant(models.Model):

    title = models.CharField("title", max_length=50)
    agency = models.CharField("agency sanctioning grant", max_length=50)
    sanc_amt = models.DecimalField(
        "sanctioned amount", max_digits=15, decimal_places=2)
    year = models.IntegerField("year of sanction", default=2022, validators=[
        MaxValueValidator(2030),
        MinValueValidator(2022)
    ])
    remarks = models.CharField("additional remarks", max_length=50, null=True)
    date_added = models.DateField("recorded date", default=timezone.now())

    PI = models.ForeignKey(User, on_delete=CASCADE,
                           related_name='grants_prinvestigated', null=True, verbose_name="principle investigator")
    CO_PI = models.ForeignKey(
        User, on_delete=CASCADE, related_name='grants_coprinvestigated', null=True, verbose_name="co-principle investigator")

    UniqueConstraint(fields=['title', 'PI', 'CO_PI'], name='unique_grant')

    class Meta:
        ordering = ('-date_added',)
        db_table = 'grant'

    def __str__(self):
        return self.title
