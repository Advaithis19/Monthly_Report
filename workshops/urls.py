from django.urls import path, re_path
from .views import WorkshopList, WorkshopDetail, CreateWorkshop, EditWorkshop, DeleteWorkshop, WorkshopListDateFilter

app_name = 'workshops'

urlpatterns = [
    path('', WorkshopList.as_view(), name='listworkshop'),
    path('<int:pk>/', WorkshopDetail.as_view(), name='detailworkshop'),
    path('create/', CreateWorkshop.as_view(), name='createworkshop'),
    path('edit/<int:pk>/', EditWorkshop.as_view(), name='editworkshop'),
    path('delete/<int:pk>/', DeleteWorkshop.as_view(), name='deleteworkshop'),
    re_path(r'filter/date/(?P<start_date>\d{4}-\d{2}-\d{2})/(?P<end_date>\d{4}-\d{2}-\d{2})/',
            WorkshopListDateFilter.as_view(), name='filterworkshop'),
]
