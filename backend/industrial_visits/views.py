from math import perm
from django.shortcuts import get_object_or_404
from .models import Industrial_visit
from .serializers import Industrial_visitSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth import get_user_model

User = get_user_model()


class Industrial_visitUserWritePermission(BasePermission):
    message = 'Editing industrial-visit records is restricted to the author only.'

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True
        print(request.user)
        return request.user in obj.f_id.all()


class Industrial_visitList(generics.ListAPIView):
    permission_classes = [Industrial_visitUserWritePermission]
    serializer_class = Industrial_visitSerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            department = user.department

            if user.is_teacher:
                industrial_visit_list = [{'industrial_visit_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                                         for e in Industrial_visit.objects.all()]
                res_qs = Industrial_visit.objects.none()

                for industrial_visit in industrial_visit_list:
                    if user in industrial_visit['faculty_involved']:
                        res_qs = res_qs | Industrial_visit.objects.filter(
                            id=industrial_visit['industrial_visit_id'])
                return res_qs

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                industrial_visit_list = [{'industrial_visit_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                                         for e in Industrial_visit.objects.all()]
                res_qs = Industrial_visit.objects.none()

                for industrial_visit in industrial_visit_list:
                    for user in users_in_dept:
                        if user in industrial_visit['faculty_involved']:
                            res_qs = res_qs | Industrial_visit.objects.filter(
                                id=industrial_visit['industrial_visit_id'])
                return res_qs

            if user.is_superadmin:
                return Industrial_visit.objects.all()


class Industrial_visitDetail(generics.RetrieveAPIView):

    permission_classes = [Industrial_visitUserWritePermission]
    serializer_class = Industrial_visitSerializer
    queryset = Industrial_visit.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class CreateIndustrial_visit(generics.ListCreateAPIView):
    # update below to allow only authenticated users to create industrial_visits
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = Industrial_visitSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditIndustrial_visit(generics.RetrieveUpdateAPIView):
    permission_classes = [Industrial_visitUserWritePermission]
    serializer_class = Industrial_visitSerializer
    queryset = Industrial_visit.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class DeleteIndustrial_visit(generics.RetrieveDestroyAPIView):
    permission_classes = [Industrial_visitUserWritePermission]
    serializer_class = Industrial_visitSerializer
    queryset = Industrial_visit.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class Industrial_visitListDateFilter(generics.ListAPIView):
    permission_classes = [Industrial_visitUserWritePermission]
    permission_classes = [permissions.AllowAny]
    serializer_class = Industrial_visitSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            department = user.department

            start_date_range = self.kwargs['start_date']
            end_date_range = self.kwargs['end_date']

            if user.is_teacher:
                industrial_visit_list = [{'industrial_visit_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                                         for e in Industrial_visit.objects.all()]
                res_qs = Industrial_visit.objects.none()

                for industrial_visit in industrial_visit_list:
                    if user in industrial_visit['faculty_involved']:
                        res_qs = res_qs | Industrial_visit.objects.filter(
                            id=industrial_visit['industrial_visit_id'])
                return res_qs.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                industrial_visit_list = [{'industrial_visit_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                                         for e in Industrial_visit.objects.all()]
                res_qs = Industrial_visit.objects.none()

                for industrial_visit in industrial_visit_list:
                    for user in users_in_dept:
                        if user in industrial_visit['faculty_involved']:
                            res_qs = res_qs | Industrial_visit.objects.filter(
                                id=industrial_visit['industrial_visit_id'])
                return res_qs.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_superadmin:
                return Industrial_visit.objects.filter(date_added__range=(start_date_range, end_date_range))
