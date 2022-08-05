from django.urls import path, re_path
from .views import PatentList, PatentDetail, CreatePatent, EditPatent, DeletePatent, PatentListDateFilter

urlpatterns = [
    path('', PatentList.as_view(), name='listpatent'),
    path('<int:pk>/', PatentDetail.as_view(), name='detailpatent'),
    path('create/', CreatePatent.as_view(), name='createpatent'),
    path('edit/<int:pk>/', EditPatent.as_view(), name='editpatent'),
    path('delete/<int:pk>/', DeletePatent.as_view(), name='deletepatent'),
    re_path(r'filter/date/(?P<start_date>\d{4}-\d{2}-\d{2})/(?P<end_date>\d{4}-\d{2}-\d{2})/',
            PatentListDateFilter.as_view(), name='filterpatent'),
]
