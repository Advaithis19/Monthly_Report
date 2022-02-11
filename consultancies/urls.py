from django.urls import path, re_path
from .views import CreateConsultancy, DeleteConsultancy, EditConsultancy, ConsultancyList, ConsultancyDetail, ConsultancyListDateFilter

app_name = 'consultancies'

urlpatterns = [
    path('', ConsultancyList.as_view(), name='listconsultancy'),
    path('<int:pk>/', ConsultancyDetail.as_view(), name='detailconsultancy'),
    path('create/', CreateConsultancy.as_view(), name='createconsultancy'),
    path('edit/<int:pk>/', EditConsultancy.as_view(), name='editconsultancy'),
    path('delete/<int:pk>/', DeleteConsultancy.as_view(), name='deleteconsultancy'),
    re_path(r'filter/date/(?P<start_date>\d{4}-\d{2}-\d{2})/(?P<end_date>\d{4}-\d{2}-\d{2})/',
            ConsultancyListDateFilter.as_view(), name='filterconsultancy'),
]
