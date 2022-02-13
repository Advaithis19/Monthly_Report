from django.urls import path, re_path
from .views import MouList, MouDetail, CreateMou, EditMou, DeleteMou, MouListDateFilter

app_name = 'mous'

urlpatterns = [
    path('', MouList.as_view(), name='listmou'),
    path('<int:pk>/', MouDetail.as_view(), name='detailmou'),
    path('create/', CreateMou.as_view(), name='createmou'),
    path('edit/<int:pk>/', EditMou.as_view(), name='editmou'),
    path('delete/<int:pk>/', DeleteMou.as_view(), name='deletemou'),
    re_path(r'filter/date/(?P<start_date>\d{4}-\d{2}-\d{2})/(?P<end_date>\d{4}-\d{2}-\d{2})/',
            MouListDateFilter.as_view(), name='filtermou'),
]
