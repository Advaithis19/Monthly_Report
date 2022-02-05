from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path('create/', views.CustomUserCreate.as_view(), name="createuser"),
    path("", views.UserList.as_view(), name="listuser"),
    path('logout/blacklist/', views.BlacklistTokenUpdateView.as_view(),
         name='blacklist'),

    # path to activate account through email
    path('accounts/activate/<uidb64>/<token>', views.activate, name='activate'),

    # path to reset password
    path("password_reset/",
         views.password_reset_request, name="password_reset")
]
