from django.db import models
from django.db.models.constraints import UniqueConstraint
from django.db.models.deletion import CASCADE
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class Conference(models.Model):

    title = models.CharField("title of publication",
                             unique=True, max_length=50)
    conference = models.CharField("conference", max_length=100)
    volume = models.IntegerField("volume #")
    issue = models.IntegerField("issue #")
    n_page = models.IntegerField("page #")

    NATIONAL = 'NAT'
    INTERNATIONAL = 'INT'

    choice_list = [
        (NATIONAL, 'National'),
        (INTERNATIONAL, 'International'),
    ]

    nat_int = models.CharField("national/international",
                               max_length=3,
                               choices=choice_list,
                               null=True,
                               )
    date_added = models.DateField("recorded date", default=timezone.now())

    f_id = models.ForeignKey(User, on_delete=CASCADE,
                             verbose_name="faculty involved")
    UniqueConstraint(fields=['title', 'f_id'], name='unique_conference')

    class Meta:
        ordering = ('-date_added',)
        db_table = 'conference'

    def __str__(self):
        return self.title
