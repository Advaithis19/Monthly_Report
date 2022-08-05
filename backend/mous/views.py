from math import perm
from django.shortcuts import get_object_or_404
from .models import Mou
from .serializers import MouSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth import get_user_model

User = get_user_model()


class MouUserWritePermission(BasePermission):
    message = 'Editing MoUs is restricted to the author only.'

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True
        print(request.user)
        return request.user in obj.f_id.all()


class MouList(generics.ListAPIView):
    permission_classes = [MouUserWritePermission]
    serializer_class = MouSerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            department = user.department

            if user.is_teacher:
                mou_list = [{'mou_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                            for e in Mou.objects.all()]
                res_qs = Mou.objects.none()

                for mou in mou_list:
                    if user in mou['faculty_involved']:
                        res_qs = res_qs | Mou.objects.filter(
                            id=mou['mou_id'])
                return res_qs

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                mou_list = [{'mou_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                            for e in Mou.objects.all()]
                res_qs = Mou.objects.none()

                for mou in mou_list:
                    for user in users_in_dept:
                        if user in mou['faculty_involved']:
                            res_qs = res_qs | Mou.objects.filter(
                                id=mou['mou_id'])
                return res_qs

            if user.is_superadmin:
                return Mou.objects.all()


class MouDetail(generics.RetrieveAPIView):

    permission_classes = [MouUserWritePermission]
    serializer_class = MouSerializer
    queryset = Mou.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class CreateMou(generics.ListCreateAPIView):
    # update below to allow only authenticated users to create MoUs
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = MouSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditMou(generics.RetrieveUpdateAPIView):
    permission_classes = [MouUserWritePermission]
    serializer_class = MouSerializer
    queryset = Mou.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class DeleteMou(generics.RetrieveDestroyAPIView):
    permission_classes = [MouUserWritePermission]
    serializer_class = MouSerializer
    queryset = Mou.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class MouListDateFilter(generics.ListAPIView):
    permission_classes = [MouUserWritePermission]
    permission_classes = [permissions.AllowAny]
    serializer_class = MouSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            department = user.department

            start_date_range = self.kwargs['start_date']
            end_date_range = self.kwargs['end_date']

            if user.is_teacher:
                mou_list = [{'mou_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                            for e in Mou.objects.all()]
                res_qs = Mou.objects.none()

                for mou in mou_list:
                    if user in mou['faculty_involved']:
                        res_qs = res_qs | Mou.objects.filter(
                            id=mou['mou_id'])
                return res_qs.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                mou_list = [{'mou_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                            for e in Mou.objects.all()]
                res_qs = Mou.objects.none()

                for mou in mou_list:
                    for user in users_in_dept:
                        if user in mou['faculty_involved']:
                            res_qs = res_qs | Mou.objects.filter(
                                id=mou['mou_id'])
                return res_qs.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_superadmin:
                return Mou.objects.filter(date_added__range=(start_date_range, end_date_range))
