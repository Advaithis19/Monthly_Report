from django.shortcuts import get_object_or_404
from .models import Consultancy
from .serializers import ConsultancySerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth import get_user_model

User = get_user_model()


class ConsultancyUserWritePermission(BasePermission):
    message = 'Editing consultancies is restricted to the author only.'

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True
        print(request.user)
        return obj.f_id == request.user


class ConsultancyList(generics.ListAPIView):
    permission_classes = [ConsultancyUserWritePermission]
    serializer_class = ConsultancySerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            department = user.department

            if user.is_teacher:
                return Consultancy.objects.filter(f_id=user)

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                return Consultancy.objects.filter(f_id__in=users_in_dept)

            if user.is_superadmin:
                return Consultancy.objects.all()


class ConsultancyDetail(generics.RetrieveAPIView):

    permission_classes = [ConsultancyUserWritePermission]
    serializer_class = ConsultancySerializer
    queryset = Consultancy.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class CreateConsultancy(generics.ListCreateAPIView):
    # update below to allow only authenticated users to create consultancies
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = ConsultancySerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditConsultancy(generics.RetrieveUpdateAPIView):
    permission_classes = [ConsultancyUserWritePermission]
    serializer_class = ConsultancySerializer
    queryset = Consultancy.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class DeleteConsultancy(generics.RetrieveDestroyAPIView):
    permission_classes = [ConsultancyUserWritePermission]
    serializer_class = ConsultancySerializer
    queryset = Consultancy.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class ConsultancyListDateFilter(generics.ListAPIView):
    permission_classes = [ConsultancyUserWritePermission]
    permission_classes = [permissions.AllowAny]
    serializer_class = ConsultancySerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            department = user.department

            start_date_range = self.kwargs['start_date']
            end_date_range = self.kwargs['end_date']

            if user.is_teacher:
                combined_set = Consultancy.objects.filter(
                    f_id=user)
                return combined_set.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                combined_set = Consultancy.objects.filter(
                    f_id__in=users_in_dept)
                return combined_set.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_superadmin:
                return Consultancy.objects.filter(date_added__range=(start_date_range, end_date_range))
