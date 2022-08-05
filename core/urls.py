from django.conf.urls import include
from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views
from django.shortcuts import redirect


front_end_url = 'http://127.0.0.1:3000/'


def redirect_view(request):
    return redirect(front_end_url)


urlpatterns = [
    path('', redirect_view, name='redirect'),

    # path for admin site
    path('admin/', admin.site.urls),

    # path for api
    path('api/', include('api.urls')),

    # path for Browsable Api login/logout interface
    path('api-auth/', include('rest_framework.urls')),

    # paths for password reset
    path('accounts/password_reset/done/', auth_views.PasswordResetDoneView.as_view(
        template_name='users/password/password_reset_done.html'), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(
        template_name="users/password/password_reset_confirm.html"), name='password_reset_confirm'),
    path('accounts/reset/done/', auth_views.PasswordResetCompleteView.as_view(
        template_name='users/password/password_reset_complete.html'), name='password_reset_complete'),
]
