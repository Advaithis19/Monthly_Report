from django.urls import path, include
from users.views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

app_name = 'api'

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # users
    path('users/', include('users.urls', namespace='users')),

    # grants
    path('grants/', include('grants.urls', namespace='grants')),
]
