from django.urls import path, re_path
from .views import CreateActivity, DeleteActivity, EditActivity, ActivityList, ActivityDetail, ActivityListDateFilter

urlpatterns = [
    path('', ActivityList.as_view(), name='listactivity'),
    path('<int:pk>/', ActivityDetail.as_view(), name='detailactivity'),
    path('create/', CreateActivity.as_view(), name='createactivity'),
    path('edit/<int:pk>/', EditActivity.as_view(), name='editactivity'),
    path('delete/<int:pk>/', DeleteActivity.as_view(), name='deleteactivity'),
    re_path(r'filter/date/(?P<start_date>\d{4}-\d{2}-\d{2})/(?P<end_date>\d{4}-\d{2}-\d{2})/',
            ActivityListDateFilter.as_view(), name='filteractivity'),
]
