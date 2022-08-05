# Generated by Django 4.0.1 on 2022-02-13 15:24

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='email')),
                ('username', models.CharField(max_length=150, unique=True, verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('start_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date of join')),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_teacher', models.BooleanField(default=False, verbose_name='teacher?')),
                ('is_admin', models.BooleanField(default=False, verbose_name='admin?')),
                ('is_superadmin', models.BooleanField(default=False, verbose_name='super-admin?')),
                ('department', models.CharField(choices=[('AE', 'Aerospace Engineering'), ('BT', 'Biotechnology'), ('CE', 'Chemical Engineering'), ('CIV', 'Civil Engineering'), ('CSE', 'Computer Science and Engineering'), ('EEE', 'Electrical and Electronics Engineering'), ('ECE', 'Electronics and Communication Engineering'), ('EIE', 'Electronics and Instrumentation Engineering'), ('IEM', 'Industrial Engineering and Management'), ('ISE', 'Information Science and Engineering'), ('MCA', 'Master of Computer Applications'), ('ME', 'Mechanical Engineering'), ('ETE', 'Electronics and Telecommunication Engineering (Telecommunication Engineering)'), ('BSC', 'Basic Sciences')], default='ISE', max_length=3, verbose_name='department')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'db_table': 'user',
                'ordering': ('-start_date',),
            },
        ),
    ]