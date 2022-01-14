from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView, UserList

app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="createuser"),
    path("", UserList.as_view(), name="listuser"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist')
]
