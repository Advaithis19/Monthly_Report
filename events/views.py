from math import perm
from django.shortcuts import get_object_or_404
from .models import Event
from .serializers import EventSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth import get_user_model

User = get_user_model()


# class EventUserWritePermission(BasePermission):
#     message = 'Editing events is restricted to the author only.'

#     def has_object_permission(self, request, view, obj):

#         if request.method in SAFE_METHODS:
#             return True
#         print(request.user)
#         return request.user in obj.u_id


class EventList(generics.ListAPIView):
    # permission_classes = [EventUserWritePermission]
    permission_classes = [permissions.AllowAny]
    serializer_class = EventSerializer
    query_set = Event.objects.all()

    # def get_queryset(self):
    #     user = self.request.user

    #     if user.is_authenticated:
    #         department = user.department

    #         if user.is_teacher:
    #             return Event.objects.filter(u_id__contains=user)

    #         if user.is_admin:
    #             users_in_dept = User.objects.filter(department=department)
    #             res_qs = []
    #             for user in users_in_dept:
    #                 res_qs.append(Event.objects.filter(u_id__contains=user))
    #             return res_qs

    #         if user.is_superadmin:
    #             return Event.objects.all()


# class EventDetail(generics.RetrieveAPIView):

#     permission_classes = [EventUserWritePermission]
#     serializer_class = EventSerializer
#     queryset = Event.objects.all()

#     def get_object(self):
#         obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
#         self.check_object_permissions(self.request, obj)
#         return obj


# class CreateEvent(generics.ListCreateAPIView):
#     # update below to allow only authenticated users to create events
#     permission_classes = [permissions.AllowAny]

#     def post(self, request, format=None):
#         serializer = EventSerializer(
#             data=request.data, context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class EditEvent(generics.RetrieveUpdateAPIView):
#     permission_classes = [EventUserWritePermission]
#     serializer_class = EventSerializer
#     queryset = Event.objects.all()

#     def get_object(self):
#         obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
#         self.check_object_permissions(self.request, obj)
#         return obj


# class DeleteEvent(generics.RetrieveDestroyAPIView):
#     permission_classes = [EventUserWritePermission]
#     serializer_class = EventSerializer
#     queryset = Event.objects.all()

#     def get_object(self):
#         obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
#         self.check_object_permissions(self.request, obj)
#         return obj


# class EventListDateFilter(generics.ListAPIView):
#     permission_classes = [EventUserWritePermission]
#     permission_classes = [permissions.AllowAny]
#     serializer_class = EventSerializer

#     def get_queryset(self):
#         user = self.request.user
#         if user.is_authenticated:
#             department = user.department

#             start_date_range = self.kwargs['start_date']
#             end_date_range = self.kwargs['end_date']

#             if user.is_teacher:
#                 combined_set = Event.objects.filter(
#                     PI=user) | Event.objects.filter(CO_PI=user)
#                 return combined_set.filter(date_added__range=(start_date_range, end_date_range))

#             if user.is_admin:
#                 users_in_dept = User.objects.filter(department=department)
#                 combined_set = Event.objects.filter(
#                     PI__in=users_in_dept) | Event.objects.filter(CO_PI__in=users_in_dept)
#                 return combined_set.filter(date_added__range=(start_date_range, end_date_range))

#             if user.is_superadmin:
#                 return Event.objects.filter(date_added__range=(start_date_range, end_date_range))
