from django.db import models
from django.db.models.constraints import UniqueConstraint
from django.db.models.deletion import CASCADE
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class Consultancy(models.Model):

    title = models.CharField("title", max_length=50)
    fund_agency = models.CharField(
        "agency funding consultancy", max_length=50)
    rec_amt = models.DecimalField(
        "sanctioned amount", max_digits=15, decimal_places=2)
    slug = models.SlugField(max_length=250)
    date_added = models.DateField("recorded date", default=timezone.now())

    f_id = models.ForeignKey(User, on_delete=CASCADE)
    UniqueConstraint(fields=['title', 'f_id'], name='unique_consultancy')

    class Meta:
        ordering = ('-date_added',)
        db_table = 'consultancy'

    def __str__(self):
        return self.title
