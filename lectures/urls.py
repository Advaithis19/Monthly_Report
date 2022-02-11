from django.urls import path, re_path
from .views import CreateLecture, DeleteLecture, EditLecture, LectureList, LectureDetail, LectureListDateFilter

app_name = 'lectures'

urlpatterns = [
    path('', LectureList.as_view(), name='listlecture'),
    path('<int:pk>/', LectureDetail.as_view(), name='detaillecture'),
    path('create/', CreateLecture.as_view(), name='createlecture'),
    path('edit/<int:pk>/', EditLecture.as_view(), name='editlecture'),
    path('delete/<int:pk>/', DeleteLecture.as_view(), name='deletelecture'),
    re_path(r'filter/date/(?P<start_date>\d{4}-\d{2}-\d{2})/(?P<end_date>\d{4}-\d{2}-\d{2})/',
            LectureListDateFilter.as_view(), name='filterlecture'),
]
