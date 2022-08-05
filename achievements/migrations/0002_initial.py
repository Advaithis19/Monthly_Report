# Generated by Django 4.0.1 on 2022-02-13 15:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('achievements', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='achievement',
            name='f_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='faculty involved'),
        ),
    ]
