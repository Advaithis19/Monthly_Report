from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class Event(models.Model):

    title = models.CharField("title", max_length=50)
    venue = models.CharField("venue of event", max_length=100)
    n_stud = models.IntegerField("number of students", null=True, blank=True)
    n_fac = models.IntegerField("number of faculty", null=True, blank=True)
    n_ind = models.IntegerField("number from industry", null=True, blank=True)
    slug = models.SlugField(max_length=250)
    date = models.DateField("date of event")
    date_added = models.DateField("recorded date", default=timezone.now())

    u_id = models.ManyToManyField(
        User, verbose_name="faculty involved", related_name='faculty_involved', through='Event_User')

    class Meta:
        ordering = ('-date_added',)
        db_table = 'event'

    def get_faculty(self):
        return ",".join([str(p) for p in self.u_id.all()])

    def __str__(self):
        return self.title


class Event_User(models.Model):
    event = models.ForeignKey(
        Event, verbose_name="event", on_delete=models.CASCADE)
    user = models.ForeignKey(
        User, verbose_name="faculty", on_delete=models.CASCADE)

    class Meta:
        db_table = 'event_user'
