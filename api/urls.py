from .views import CreateGrant, DeleteGrant, EditGrant, GrantList, GrantDetail, GrantListDateFilter
from django.urls import path, re_path
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
    re_path(r'grants/filter/date/(?P<start_date>\d{4}-\d{2}-\d{2})/(?P<end_date>\d{4}-\d{2}-\d{2})/',
            GrantListDateFilter.as_view(), name='filtergrant')
]
