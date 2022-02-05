from django.urls import path, re_path
from . import views

app_name = 'users'

urlpatterns = [
    path('create/', views.CustomUserCreate.as_view(), name="createuser"),
    path("", views.UserList.as_view(), name="listuser"),
    path('logout/blacklist/', views.BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    path('activate/<uidb64>/<token>', views.activate, name='activate'),
]
