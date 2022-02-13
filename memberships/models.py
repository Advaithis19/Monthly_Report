from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class Membership(models.Model):

    membership = models.CharField("membership", max_length=50)
    association = models.CharField("association", max_length=50)
    term = models.IntegerField("term of membership", null=True, blank=True)
    slug = models.SlugField(max_length=250)
    date_added = models.DateField("recorded date", default=timezone.now())

    f_id = models.ManyToManyField(
        User, verbose_name="faculty involved", related_name='memberships_faculty_involved')

    class Meta:
        ordering = ('-date_added',)
        db_table = 'memberships'

    def get_faculty(self):
        return ",".join([str(p) for p in self.f_id.all()])

    def __str__(self):
        return self.membership
