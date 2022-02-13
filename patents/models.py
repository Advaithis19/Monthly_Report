from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class Patent(models.Model):

    title = models.CharField("title", max_length=50)
    topic = models.CharField("topic", max_length=50)

    ACCEPT = 'AC'
    REJECT = 'RE'
    ONGOING = 'ON'

    status_list = [
        (ACCEPT, 'Accepted'),
        (REJECT, 'Rejected'),
        (ONGOING, 'Ongoing'),
    ]

    status = models.CharField("status",
                              max_length=3,
                              choices=status_list,
                              null=True,
                              blank=True
                              )

    slug = models.SlugField(max_length=250)
    date_added = models.DateField("recorded date", default=timezone.now())

    f_id = models.ManyToManyField(
        User, verbose_name="faculty involved", related_name='patents_faculty_involved')

    class Meta:
        ordering = ('-date_added',)
        db_table = 'patent'

    def get_faculty(self):
        return ",".join([str(p) for p in self.f_id.all()])

    def __str__(self):
        return self.title
