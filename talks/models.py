from django.db import models
from django.db.models.constraints import UniqueConstraint
from django.db.models.deletion import CASCADE
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class Talk(models.Model):

    topic = models.CharField("topic", max_length=50)
    venue = models.CharField("venue", max_length=100)
    n_stud = models.IntegerField("no. of students", null=True, blank=True)
    n_fac = models.IntegerField("no. of faculty", null=True, blank=True)
    n_ind = models.IntegerField("no. from industry", null=True, blank=True)
    date = models.DateField("date of talk")
    slug = models.SlugField(max_length=250)
    date_added = models.DateField("recorded date", default=timezone.now())

    f_id = models.ForeignKey(User, on_delete=CASCADE,
                             verbose_name="faculty involved")
    UniqueConstraint(fields=['topic', 'f_id'], name='unique_talk')

    class Meta:
        ordering = ('-date_added',)
        db_table = 'talk'

    def __str__(self):
        return self.topic
