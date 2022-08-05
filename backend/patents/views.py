from math import perm
from django.shortcuts import get_object_or_404
from .models import Patent
from .serializers import PatentSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth import get_user_model

User = get_user_model()


class PatentUserWritePermission(BasePermission):
    message = 'Editing patents is restricted to the author only.'

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True
        print(request.user)
        return request.user in obj.f_id.all()


class PatentList(generics.ListAPIView):
    permission_classes = [PatentUserWritePermission]
    serializer_class = PatentSerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            department = user.department

            if user.is_teacher:
                patent_list = [{'patent_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                               for e in Patent.objects.all()]
                res_qs = Patent.objects.none()

                for patent in patent_list:
                    if user in patent['faculty_involved']:
                        res_qs = res_qs | Patent.objects.filter(
                            id=patent['patent_id'])
                return res_qs

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                patent_list = [{'patent_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                               for e in Patent.objects.all()]
                res_qs = Patent.objects.none()

                for patent in patent_list:
                    for user in users_in_dept:
                        if user in patent['faculty_involved']:
                            res_qs = res_qs | Patent.objects.filter(
                                id=patent['patent_id'])
                return res_qs

            if user.is_superadmin:
                return Patent.objects.all()


class PatentDetail(generics.RetrieveAPIView):

    permission_classes = [PatentUserWritePermission]
    serializer_class = PatentSerializer
    queryset = Patent.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class CreatePatent(generics.ListCreateAPIView):
    # update below to allow only authenticated users to create patents
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = PatentSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditPatent(generics.RetrieveUpdateAPIView):
    permission_classes = [PatentUserWritePermission]
    serializer_class = PatentSerializer
    queryset = Patent.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class DeletePatent(generics.RetrieveDestroyAPIView):
    permission_classes = [PatentUserWritePermission]
    serializer_class = PatentSerializer
    queryset = Patent.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class PatentListDateFilter(generics.ListAPIView):
    permission_classes = [PatentUserWritePermission]
    permission_classes = [permissions.AllowAny]
    serializer_class = PatentSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            department = user.department

            start_date_range = self.kwargs['start_date']
            end_date_range = self.kwargs['end_date']

            if user.is_teacher:
                patent_list = [{'patent_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                               for e in Patent.objects.all()]
                res_qs = Patent.objects.none()

                for patent in patent_list:
                    if user in patent['faculty_involved']:
                        res_qs = res_qs | Patent.objects.filter(
                            id=patent['patent_id'])
                return res_qs.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                patent_list = [{'patent_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                               for e in Patent.objects.all()]
                res_qs = Patent.objects.none()

                for patent in patent_list:
                    for user in users_in_dept:
                        if user in patent['faculty_involved']:
                            res_qs = res_qs | Patent.objects.filter(
                                id=patent['patent_id'])
                return res_qs.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_superadmin:
                return Patent.objects.filter(date_added__range=(start_date_range, end_date_range))
