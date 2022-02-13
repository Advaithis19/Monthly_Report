from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class Mou(models.Model):

    organisation = models.CharField("organisation", unique=True, max_length=50)
    mod_col = models.CharField("mode of collaboration", max_length=25)
    validity = models.IntegerField("validity")
    date = models.DateField("date of mou")
    slug = models.SlugField(max_length=250)
    date_added = models.DateField("recorded date", default=timezone.now())

    u_id = models.ManyToManyField(
        User, verbose_name="faculty involved", related_name='mou_faculty_involved')

    class Meta:
        ordering = ('-date_added',)
        db_table = 'mous'
        verbose_name_plural = 'MoUs'

    def get_faculty(self):
        return ",".join([str(p) for p in self.u_id.all()])

    def __str__(self):
        return self.organisation
