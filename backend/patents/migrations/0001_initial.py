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
            name='Patent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, unique=True, verbose_name='title')),
                ('topic', models.CharField(max_length=50, verbose_name='topic')),
                ('status', models.CharField(blank=True, choices=[('AC', 'Accepted'), ('RE', 'Rejected'), ('ON', 'Ongoing')], max_length=3, null=True, verbose_name='status')),
                ('date_added', models.DateField(default=datetime.datetime(2022, 2, 13, 15, 24, 49, 786838, tzinfo=utc), verbose_name='recorded date')),
            ],
            options={
                'db_table': 'patent',
                'ordering': ('-date_added',),
            },
        ),
    ]