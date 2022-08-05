from django.shortcuts import get_object_or_404
from grants.models import Grant
from .serializers import GrantSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth import get_user_model

User = get_user_model()


class GrantUserWritePermission(BasePermission):
    message = 'Editing grants is restricted to the author only.'

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True
        print(request.user)
        return obj.PI == request.user or obj.CO_PI == request.user


class GrantList(generics.ListAPIView):
    permission_classes = [GrantUserWritePermission]
    serializer_class = GrantSerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            department = user.department

            if user.is_teacher:
                return Grant.objects.filter(PI=user) | Grant.objects.filter(CO_PI=user)

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                return Grant.objects.filter(PI__in=users_in_dept) | Grant.objects.filter(CO_PI__in=users_in_dept)

            if user.is_superadmin:
                return Grant.objects.all()


class GrantDetail(generics.RetrieveAPIView):

    permission_classes = [GrantUserWritePermission]
    serializer_class = GrantSerializer
    queryset = Grant.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class CreateGrant(generics.ListCreateAPIView):
    # update below to allow only authenticated users to create grants
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = GrantSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditGrant(generics.RetrieveUpdateAPIView):
    permission_classes = [GrantUserWritePermission]
    serializer_class = GrantSerializer
    queryset = Grant.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class DeleteGrant(generics.RetrieveDestroyAPIView):
    permission_classes = [GrantUserWritePermission]
    serializer_class = GrantSerializer
    queryset = Grant.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class GrantListDateFilter(generics.ListAPIView):
    permission_classes = [GrantUserWritePermission]
    permission_classes = [permissions.AllowAny]
    serializer_class = GrantSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            department = user.department

            start_date_range = self.kwargs['start_date']
            end_date_range = self.kwargs['end_date']

            if user.is_teacher:
                combined_set = Grant.objects.filter(
                    PI=user) | Grant.objects.filter(CO_PI=user)
                return combined_set.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                combined_set = Grant.objects.filter(
                    PI__in=users_in_dept) | Grant.objects.filter(CO_PI__in=users_in_dept)
                return combined_set.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_superadmin:
                return Grant.objects.filter(date_added__range=(start_date_range, end_date_range))
