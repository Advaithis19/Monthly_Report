from django.urls import path, re_path
from .views import CreateAchievement, DeleteAchievement, EditAchievement, AchievementList, AchievementDetail, AchievementListDateFilter

app_name = 'achievements'

urlpatterns = [
    path('', AchievementList.as_view(), name='listachievement'),
    path('<int:pk>/', AchievementDetail.as_view(), name='detailachievement'),
    path('create/', CreateAchievement.as_view(), name='createachievement'),
    path('edit/<int:pk>/', EditAchievement.as_view(), name='editachievement'),
    path('delete/<int:pk>/', DeleteAchievement.as_view(), name='deleteachievement'),
    re_path(r'filter/date/(?P<start_date>\d{4}-\d{2}-\d{2})/(?P<end_date>\d{4}-\d{2}-\d{2})/',
            AchievementListDateFilter.as_view(), name='filterachievement'),
]
