# Generated by Django 4.0.1 on 2022-02-13 15:24

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Lecture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topic', models.CharField(max_length=50, verbose_name='topic')),
                ('res_person', models.CharField(max_length=50, verbose_name='resource person')),
                ('organisation', models.CharField(max_length=50, verbose_name='organisation')),
                ('n_stud', models.IntegerField(null=True, verbose_name='no. of students')),
                ('n_fac', models.IntegerField(null=True, verbose_name='no. of faculty')),
                ('n_ind', models.IntegerField(null=True, verbose_name='no. from industry')),
                ('date_added', models.DateField(default=datetime.datetime(2022, 2, 13, 15, 24, 49, 778826, tzinfo=utc), verbose_name='recorded date')),
            ],
            options={
                'db_table': 'lecture',
                'ordering': ('-date_added',),
            },
        ),
    ]
