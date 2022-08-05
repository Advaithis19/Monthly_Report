from django.urls import path, re_path
from .views import Industrial_visitList, Industrial_visitDetail, CreateIndustrial_visit, EditIndustrial_visit, DeleteIndustrial_visit, Industrial_visitListDateFilter

urlpatterns = [
    path('', Industrial_visitList.as_view(), name='listindustrial_visit'),
    path('<int:pk>/', Industrial_visitDetail.as_view(),
         name='detailindustrial_visit'),
    path('create/', CreateIndustrial_visit.as_view(),
         name='createindustrial_visit'),
    path('edit/<int:pk>/', EditIndustrial_visit.as_view(),
         name='editindustrial_visit'),
    path('delete/<int:pk>/', DeleteIndustrial_visit.as_view(),
         name='deleteindustrial_visit'),
    re_path(r'filter/date/(?P<start_date>\d{4}-\d{2}-\d{2})/(?P<end_date>\d{4}-\d{2}-\d{2})/',
            Industrial_visitListDateFilter.as_view(), name='filterindustrial_visit'),
]
