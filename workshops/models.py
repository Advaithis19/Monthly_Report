from re import T
from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class Workshop(models.Model):

    event_name = models.CharField("name of event", unique=True, max_length=50)
    venue = models.CharField("venue", max_length=100)
    date = models.DateField("date of event")
    slug = models.SlugField(max_length=250)
    date_added = models.DateField("recorded date", default=timezone.now())

    u_id = models.ManyToManyField(
        User, verbose_name="faculty involved", related_name='workshops_faculty_involved')

    class Meta:
        ordering = ('-date_added',)
        db_table = 'Workshop'

    def get_faculty(self):
        return ",".join([str(p) for p in self.u_id.all()])

    def __str__(self):
        return self.event_name
