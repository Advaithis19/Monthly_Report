from django.db import models
from django.db.models.constraints import UniqueConstraint
from django.db.models.deletion import CASCADE
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class Lecture(models.Model):

    topic = models.CharField("topic", max_length=50)
    res_person = models.CharField("resource person", max_length=50)
    organisation = models.CharField("organisation", max_length=50)
    n_stud = models.IntegerField("no. of students", null=True)
    n_fac = models.IntegerField("no. of faculty", null=True)
    n_ind = models.IntegerField("no. from industry", null=True)
    date_added = models.DateField("recorded date", default=timezone.now())

    f_id = models.ForeignKey(User, on_delete=CASCADE,
                             verbose_name="faculty involved")
    UniqueConstraint(fields=['topic', 'f_id'], name='unique_lecture')

    class Meta:
        ordering = ('-date_added',)
        db_table = 'lecture'

    def __str__(self):
        return self.topic
