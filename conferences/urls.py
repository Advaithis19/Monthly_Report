from django.urls import path, re_path
from .views import CreateConference, DeleteConference, EditConference, ConferenceList, ConferenceDetail, ConferenceListDateFilter

app_name = 'conferences'

urlpatterns = [
    path('', ConferenceList.as_view(), name='listconference'),
    path('<int:pk>/', ConferenceDetail.as_view(), name='detailconference'),
    path('create/', CreateConference.as_view(), name='createconference'),
    path('edit/<int:pk>/', EditConference.as_view(), name='editconference'),
    path('delete/<int:pk>/', DeleteConference.as_view(), name='deleteconference'),
    re_path(r'filter/date/(?P<start_date>\d{4}-\d{2}-\d{2})/(?P<end_date>\d{4}-\d{2}-\d{2})/',
            ConferenceListDateFilter.as_view(), name='filterconference'),
]
