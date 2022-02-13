# Generated by Django 3.2.8 on 2022-02-13 07:32

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activity', models.CharField(max_length=100, verbose_name='activity')),
                ('date', models.DateField(verbose_name='date of activity')),
                ('slug', models.SlugField(max_length=250)),
                ('date_added', models.DateField(default=datetime.datetime(2022, 2, 13, 7, 32, 23, 580999, tzinfo=utc), verbose_name='recorded date')),
                ('f_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='faculty involved')),
            ],
            options={
                'verbose_name_plural': 'other_activities',
                'db_table': 'other_activity',
                'ordering': ('-date_added',),
            },
        ),
    ]
