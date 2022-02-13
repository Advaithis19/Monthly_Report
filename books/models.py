from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class Book(models.Model):

    n_isbn = models.IntegerField("ISBN #", unique=True)
    name = models.CharField("name", max_length=50)
    publisher = models.CharField("publisher", max_length=50)
    slug = models.SlugField(max_length=250)
    date_added = models.DateField("recorded date", default=timezone.now())

    f_id = models.ManyToManyField(
        User, verbose_name="faculty involved", related_name='books_faculty_involved')

    class Meta:
        ordering = ('-date_added',)
        db_table = 'book'

    def get_faculty(self):
        return ",".join([str(p) for p in self.f_id.all()])

    def __str__(self):
        return self.name
