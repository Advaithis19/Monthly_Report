from django.db import models
from django.db.models.constraints import UniqueConstraint
from django.db.models.deletion import CASCADE
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class Activity(models.Model):

    activity = models.CharField("activity", max_length=100)
    date = models.DateField("date of activity")
    slug = models.SlugField(max_length=250)
    date_added = models.DateField("recorded date", default=timezone.now())

    f_id = models.ForeignKey(User, on_delete=CASCADE,
                             verbose_name="faculty involved")

    class Meta:
        ordering = ('-date_added',)
        db_table = 'other_activity'
        verbose_name_plural = 'other activities'

    def __str__(self):
        return self.activity
