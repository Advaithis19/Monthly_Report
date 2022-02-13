from tabnanny import verbose
from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator

User = get_user_model()


class Industrial_visit(models.Model):

    purpose = models.CharField("purpose of visit", max_length=100)
    industry = models.CharField("industry", max_length=50)
    semester = models.IntegerField("semester",
                                   validators=[
                                       MaxValueValidator(8),
                                       MinValueValidator(1)
                                   ]
                                   )
    n_stud = models.IntegerField("no. of students", null=True, blank=True)
    slug = models.SlugField(max_length=250)
    date_added = models.DateField("recorded date", default=timezone.now())

    f_id = models.ManyToManyField(
        User, verbose_name="faculty involved", related_name='industrial_visits_faculty_involved')

    class Meta:
        ordering = ('-date_added',)
        db_table = 'industrial_visit'
        verbose_name_plural = 'industrial visits'

    def get_faculty(self):
        return ",".join([str(p) for p in self.f_id.all()])

    def __str__(self):
        return self.industry
