from math import perm
from django.shortcuts import get_object_or_404
from .models import Membership
from .serializers import MembershipSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth import get_user_model

User = get_user_model()


class MembershipUserWritePermission(BasePermission):
    message = 'Editing memberships is restricted to the author only.'

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True
        print(request.user)
        return request.user in obj.f_id.all()


class MembershipList(generics.ListAPIView):
    permission_classes = [MembershipUserWritePermission]
    serializer_class = MembershipSerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            department = user.department

            if user.is_teacher:
                membership_list = [{'membership_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                                   for e in Membership.objects.all()]
                res_qs = Membership.objects.none()

                for membership in membership_list:
                    if user in membership['faculty_involved']:
                        res_qs = res_qs | Membership.objects.filter(
                            id=membership['membership_id'])
                return res_qs

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                membership_list = [{'membership_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                                   for e in Membership.objects.all()]
                res_qs = Membership.objects.none()

                for membership in membership_list:
                    for user in users_in_dept:
                        if user in membership['faculty_involved']:
                            res_qs = res_qs | Membership.objects.filter(
                                id=membership['membership_id'])
                return res_qs

            if user.is_superadmin:
                return Membership.objects.all()


class MembershipDetail(generics.RetrieveAPIView):

    permission_classes = [MembershipUserWritePermission]
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class CreateMembership(generics.ListCreateAPIView):
    # update below to allow only authenticated users to create memberships
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = MembershipSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditMembership(generics.RetrieveUpdateAPIView):
    permission_classes = [MembershipUserWritePermission]
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class DeleteMembership(generics.RetrieveDestroyAPIView):
    permission_classes = [MembershipUserWritePermission]
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class MembershipListDateFilter(generics.ListAPIView):
    permission_classes = [MembershipUserWritePermission]
    permission_classes = [permissions.AllowAny]
    serializer_class = MembershipSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            department = user.department

            start_date_range = self.kwargs['start_date']
            end_date_range = self.kwargs['end_date']

            if user.is_teacher:
                membership_list = [{'membership_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                                   for e in Membership.objects.all()]
                res_qs = Membership.objects.none()

                for membership in membership_list:
                    if user in membership['faculty_involved']:
                        res_qs = res_qs | Membership.objects.filter(
                            id=membership['membership_id'])
                return res_qs.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                membership_list = [{'membership_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                                   for e in Membership.objects.all()]
                res_qs = Membership.objects.none()

                for membership in membership_list:
                    for user in users_in_dept:
                        if user in membership['faculty_involved']:
                            res_qs = res_qs | Membership.objects.filter(
                                id=membership['membership_id'])
                return res_qs.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_superadmin:
                return Membership.objects.filter(date_added__range=(start_date_range, end_date_range))
