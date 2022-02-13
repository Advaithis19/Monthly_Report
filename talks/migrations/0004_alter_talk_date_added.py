# Generated by Django 3.2.8 on 2022-02-13 07:32

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('talks', '0003_alter_talk_date_added'),
    ]

    operations = [
        migrations.AlterField(
            model_name='talk',
            name='date_added',
            field=models.DateField(default=datetime.datetime(2022, 2, 13, 7, 32, 23, 568000, tzinfo=utc), verbose_name='recorded date'),
        ),
    ]
