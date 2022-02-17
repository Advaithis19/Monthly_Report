from django.urls import path, include
from users.views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import AggregateCount

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # users
    path('users/', include('users.urls')),

    # grants
    path('grants/', include('grants.urls')),

    # events
    path('events/', include('events.urls')),

    # proposals
    path('proposals/', include('proposals.urls')),

    # consultancies
    path('consultancies/', include('consultancies.urls')),

    # workshops
    path('workshops/', include('workshops.urls')),

    # lectures
    path('lectures/', include('lectures.urls')),

    # talks
    path('talks/', include('talks.urls')),

    # achievements
    path('achievements/', include('achievements.urls')),

    # conferences
    path('conferences/', include('conferences.urls')),

    # patents
    path('patents/', include('patents.urls')),

    # activities
    path('activities/', include('activities.urls')),

    # books
    path('books/', include('books.urls')),

    # industrial_visits
    path('industrial_visits/', include('industrial_visits.urls')),

    # mous
    path('mous/', include('mous.urls')),

    # memberships
    path('memberships/', include('memberships.urls')),

    # for chart data
    path('aggregate/', AggregateCount.as_view(), name='listcount')
]
