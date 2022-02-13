from django.urls import path, re_path
from .views import MembershipList, MembershipDetail, CreateMembership, EditMembership, DeleteMembership, MembershipListDateFilter

app_name = 'memberships'

urlpatterns = [
    path('', MembershipList.as_view(), name='listmembership'),
    path('<int:pk>/', MembershipDetail.as_view(), name='detailmembership'),
    path('create/', CreateMembership.as_view(), name='createmembership'),
    path('edit/<int:pk>/', EditMembership.as_view(), name='editmembership'),
    path('delete/<int:pk>/', DeleteMembership.as_view(), name='deletemembership'),
    re_path(r'filter/date/(?P<start_date>\d{4}-\d{2}-\d{2})/(?P<end_date>\d{4}-\d{2}-\d{2})/',
            MembershipListDateFilter.as_view(), name='filtermembership'),
]
