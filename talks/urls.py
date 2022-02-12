from django.urls import path, re_path
from .views import CreateTalk, DeleteTalk, EditTalk, TalkList, TalkDetail, TalkListDateFilter

app_name = 'talks'

urlpatterns = [
    path('', TalkList.as_view(), name='listtalk'),
    path('<int:pk>/', TalkDetail.as_view(), name='detailtalk'),
    path('create/', CreateTalk.as_view(), name='createtalk'),
    path('edit/<int:pk>/', EditTalk.as_view(), name='edittalk'),
    path('delete/<int:pk>/', DeleteTalk.as_view(), name='deletetalk'),
    re_path(r'filter/date/(?P<start_date>\d{4}-\d{2}-\d{2})/(?P<end_date>\d{4}-\d{2}-\d{2})/',
            TalkListDateFilter.as_view(), name='filtertalk'),
]
