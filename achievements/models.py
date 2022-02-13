from django.db import models
from django.db.models.constraints import UniqueConstraint
from django.db.models.deletion import CASCADE
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class Achievement(models.Model):

    title = models.CharField("title", max_length=50)
    organisation = models.CharField("organisation", max_length=50)
    date_added = models.DateField("recorded date", default=timezone.now())

    f_id = models.ForeignKey(User, on_delete=CASCADE,
                             verbose_name="faculty involved")
    UniqueConstraint(fields=['topic', 'f_id'], name='unique_achievement')

    class Meta:
        ordering = ('-date_added',)
        db_table = 'achievement'

    def __str__(self):
        return self.title
