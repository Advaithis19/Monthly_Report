from django.urls import path, re_path
from .views import CreateProposal, DeleteProposal, EditProposal, ProposalList, ProposalDetail, ProposalListDateFilter

urlpatterns = [
    path('', ProposalList.as_view(), name='listproposal'),
    path('<int:pk>/', ProposalDetail.as_view(), name='detailproposal'),
    path('create/', CreateProposal.as_view(), name='createproposal'),
    path('edit/<int:pk>/', EditProposal.as_view(), name='editproposal'),
    path('delete/<int:pk>/', DeleteProposal.as_view(), name='deleteproposal'),
    re_path(r'filter/date/(?P<start_date>\d{4}-\d{2}-\d{2})/(?P<end_date>\d{4}-\d{2}-\d{2})/',
            ProposalListDateFilter.as_view(), name='filterproposal'),
]
