from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, username, first_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, username, first_name, password, **other_fields)

    def create_user(self, email, username, first_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))
        if not password:
            raise ValueError('Users must provide a password')

        email = self.normalize_email(email)
        user = self.model(email=email, username=username,
                          first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):

    AEROSPACE = 'AE'
    BIOTECH = 'BT'
    CHEMICAL = 'CE'
    CIVIL = 'CIV'
    COMPUTERSC = 'CSE'
    ELECTRICAL = 'EEE'
    ELECTRONICSCM = 'ECE'
    ELECTRONICSIN = 'EIE'
    INDUSTRIAL = 'IEM'
    INFORMATIONSC = 'ISE'
    MASTERCA = 'MCA'
    MECHANICAL = 'ME'
    ELECTRONICSTE = 'ETE'
    BASICSC = 'BSC'

    DEPARTMENT = [
        (AEROSPACE, 'Aerospace Engineering'),
        (BIOTECH, 'Biotechnology'),
        (CHEMICAL, 'Chemical Engineering'),
        (CIVIL, 'Civil Engineering'),
        (COMPUTERSC, 'Computer Science and Engineering'),
        (ELECTRICAL, 'Electrical and Electronics Engineering'),
        (ELECTRONICSCM, 'Electronics and Communication Engineering'),
        (ELECTRONICSIN, 'Electronics and Instrumentation Engineering'),
        (INDUSTRIAL, 'Industrial Engineering and Management'),
        (INFORMATIONSC, 'Information Science and Engineering'),
        (MASTERCA, 'Master of Computer Applications'),
        (MECHANICAL, 'Mechanical Engineering'),
        (ELECTRONICSTE, 'Electronics and Telecommunication Engineering (Telecommunication Engineering)'),
        (BASICSC, 'Basic Sciences'),
    ]

    email = models.EmailField("email", max_length=255, unique=True)
    username = models.CharField("username", max_length=150, unique=True)
    first_name = models.CharField("first name", max_length=150, blank=True)
    last_name = models.CharField("last name", max_length=150, blank=True)
    start_date = models.DateTimeField("date of join", default=timezone.now)

    is_staff = models.BooleanField(
        "staff?", default=False)
    is_active = models.BooleanField("user active?", default=True)

    # below attributes are defined for providing other functionalities
    is_teacher = models.BooleanField("teacher?", default=False)
    is_admin = models.BooleanField(
        "admin?", default=False)
    is_superadmin = models.BooleanField(
        "super-admin?", default=False)

    department = models.CharField(
        "department",
        max_length=3,
        choices=DEPARTMENT,
        default=INFORMATIONSC,
    )

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name']
    EMAIL_FIELD = 'email'

    class Meta:
        ordering = ('-start_date',)
        db_table = 'user'

    def __str__(self):
        return self.username
