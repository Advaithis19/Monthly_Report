from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models

User = get_user_model()


class UserAdminConfig(UserAdmin):

    model = User
    search_fields = ('email', 'username', 'first_name',)
    list_filter = ('email', 'username', 'first_name', 'is_active', 'is_staff')
    ordering = ('-start_date',)
    list_display = ('id', 'email', 'username', 'first_name', 'department',
                    'is_active', 'is_teacher', 'is_admin', 'is_superadmin')
    fieldsets = (
        (None, {'fields': ('email', 'username',
         'first_name', 'last_name', 'department')}),
        ('Permissions', {'fields': ('is_staff', 'is_active',
         'is_teacher', 'is_admin', 'is_superadmin')}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'first_name', 'last_name', 'password1', 'password2', 'is_teacher', 'is_admin', 'is_superadmin', 'department', 'is_active', 'is_staff')}
         ),
    )


admin.site.register(User, UserAdminConfig)
