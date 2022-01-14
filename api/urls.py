from .views import CreateGrant, DeleteGrant, EditGrant, GrantList, GrantDetail
from django.urls import path
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

app_name = 'api'

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('grants/', GrantList.as_view(), name='listgrant'),
    path('grants/<int:pk>/', GrantDetail.as_view(), name='detailgrant'),
    path('grants/create/', CreateGrant.as_view(), name='creategrant'),
    path('grants/edit/<int:pk>/', EditGrant.as_view(), name='editgrant'),
    path('grants/delete/<int:pk>/', DeleteGrant.as_view(), name='deletegrant'),
]
