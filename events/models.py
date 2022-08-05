from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class Event(models.Model):

    title = models.CharField("title", unique=True, max_length=50)
    venue = models.CharField("venue of event", max_length=100)
    n_stud = models.IntegerField("number of students", null=True)
    n_fac = models.IntegerField("number of faculty", null=True)
    n_ind = models.IntegerField("number from industry", null=True)
    date = models.DateField("date of event")
    date_added = models.DateField("recorded date", default=timezone.now())

    f_id = models.ManyToManyField(
        User, verbose_name="faculty involved", related_name='faculty_involved')

    class Meta:
        ordering = ('-date_added',)
        db_table = 'event'

    def get_faculty(self):
        return ",".join([str(p) for p in self.f_id.all()])

    def __str__(self):
        return self.title
