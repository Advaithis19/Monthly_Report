# Generated by Django 3.2.8 on 2022-02-13 06:36

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_event_u_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='date_added',
            field=models.DateField(default=datetime.datetime(2022, 2, 13, 6, 36, 26, 427487, tzinfo=utc), verbose_name='recorded date'),
        ),
    ]
