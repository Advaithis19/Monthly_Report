from django.urls import path, re_path
from .views import EventList, EventDetail, CreateEvent, EditEvent, DeleteEvent, EventListDateFilter

urlpatterns = [
    path('', EventList.as_view(), name='listevent'),
    path('<int:pk>/', EventDetail.as_view(), name='detailevent'),
    path('create/', CreateEvent.as_view(), name='createevent'),
    path('edit/<int:pk>/', EditEvent.as_view(), name='editevent'),
    path('delete/<int:pk>/', DeleteEvent.as_view(), name='deleteevent'),
    re_path(r'filter/date/(?P<start_date>\d{4}-\d{2}-\d{2})/(?P<end_date>\d{4}-\d{2}-\d{2})/',
            EventListDateFilter.as_view(), name='filterevent'),
]
