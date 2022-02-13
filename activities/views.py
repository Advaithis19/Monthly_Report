from django.shortcuts import get_object_or_404
from .models import Activity
from .serializers import ActivitySerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth import get_user_model

User = get_user_model()


class ActivityUserWritePermission(BasePermission):
    message = 'Editing activities is restricted to the author only.'

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True
        print(request.user)
        return obj.f_id == request.user


class ActivityList(generics.ListAPIView):
    permission_classes = [ActivityUserWritePermission]
    serializer_class = ActivitySerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            department = user.department

            if user.is_teacher:
                return Activity.objects.filter(f_id=user)

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                return Activity.objects.filter(f_id__in=users_in_dept)

            if user.is_superadmin:
                return Activity.objects.all()


class ActivityDetail(generics.RetrieveAPIView):

    permission_classes = [ActivityUserWritePermission]
    serializer_class = ActivitySerializer
    queryset = Activity.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class CreateActivity(generics.ListCreateAPIView):
    # update below to allow only authenticated users to create activities
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = ActivitySerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditActivity(generics.RetrieveUpdateAPIView):
    permission_classes = [ActivityUserWritePermission]
    serializer_class = ActivitySerializer
    queryset = Activity.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class DeleteActivity(generics.RetrieveDestroyAPIView):
    permission_classes = [ActivityUserWritePermission]
    serializer_class = ActivitySerializer
    queryset = Activity.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class ActivityListDateFilter(generics.ListAPIView):
    permission_classes = [ActivityUserWritePermission]
    permission_classes = [permissions.AllowAny]
    serializer_class = ActivitySerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            department = user.department

            start_date_range = self.kwargs['start_date']
            end_date_range = self.kwargs['end_date']

            if user.is_teacher:
                combined_set = Activity.objects.filter(
                    f_id=user)
                return combined_set.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                combined_set = Activity.objects.filter(
                    f_id__in=users_in_dept)
                return combined_set.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_superadmin:
                return Activity.objects.filter(date_added__range=(start_date_range, end_date_range))
