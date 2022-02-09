from django.urls import path
from .views import UserDetail, UserList, CustomUserCreate, BlacklistTokenUpdateView, activate, password_reset_request

app_name = 'users'

urlpatterns = [
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),

    # path to activate account through email
    path('accounts/activate/<uidb64>/<token>', activate, name='activate'),

    # path to reset password
    path("password_reset/",
         password_reset_request, name="password_reset"),

    path('create/', CustomUserCreate.as_view(), name="createuser"),
    path('', UserList.as_view(), name='listuser'),
    path('<int:pk>/', UserDetail.as_view(), name='detailuser')
]
