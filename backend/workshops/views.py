from django.shortcuts import get_object_or_404
from .models import Workshop
from .serializers import WorkshopSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth import get_user_model

User = get_user_model()


class WorkshopUserWritePermission(BasePermission):
    message = 'Editing workshops is restricted to the author only.'

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True
        print(request.user)
        return request.user in obj.f_id.all()


class WorkshopList(generics.ListAPIView):
    permission_classes = [WorkshopUserWritePermission]
    serializer_class = WorkshopSerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            department = user.department

            if user.is_teacher:
                workshop_list = [{'workshop_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                                 for e in Workshop.objects.all()]
                res_qs = Workshop.objects.none()

                for workshop in workshop_list:
                    if user in workshop['faculty_involved']:
                        res_qs = res_qs | Workshop.objects.filter(
                            id=workshop['workshop_id'])
                return res_qs

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                workshop_list = [{'workshop_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                                 for e in Workshop.objects.all()]
                res_qs = Workshop.objects.none()

                for workshop in workshop_list:
                    for user in users_in_dept:
                        if user in workshop['faculty_involved']:
                            res_qs = res_qs | Workshop.objects.filter(
                                id=workshop['workshop_id'])
                return res_qs

            if user.is_superadmin:
                return Workshop.objects.all()


class WorkshopDetail(generics.RetrieveAPIView):

    permission_classes = [WorkshopUserWritePermission]
    serializer_class = WorkshopSerializer
    queryset = Workshop.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class CreateWorkshop(generics.ListCreateAPIView):
    # update below to allow only authenticated users to create workshops
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = WorkshopSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditWorkshop(generics.RetrieveUpdateAPIView):
    permission_classes = [WorkshopUserWritePermission]
    serializer_class = WorkshopSerializer
    queryset = Workshop.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class DeleteWorkshop(generics.RetrieveDestroyAPIView):
    permission_classes = [WorkshopUserWritePermission]
    serializer_class = WorkshopSerializer
    queryset = Workshop.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class WorkshopListDateFilter(generics.ListAPIView):
    permission_classes = [WorkshopUserWritePermission]
    permission_classes = [permissions.AllowAny]
    serializer_class = WorkshopSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            department = user.department

            start_date_range = self.kwargs['start_date']
            end_date_range = self.kwargs['end_date']

            if user.is_teacher:
                workshop_list = [{'workshop_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                                 for e in Workshop.objects.all()]
                res_qs = Workshop.objects.none()

                for workshop in workshop_list:
                    if user in workshop['faculty_involved']:
                        res_qs = res_qs | Workshop.objects.filter(
                            id=workshop['workshop_id'])
                return res_qs.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                workshop_list = [{'workshop_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                                 for e in Workshop.objects.all()]
                res_qs = Workshop.objects.none()

                for workshop in workshop_list:
                    for user in users_in_dept:
                        if user in workshop['faculty_involved']:
                            res_qs = res_qs | Workshop.objects.filter(
                                id=workshop['workshop_id'])
                return res_qs.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_superadmin:
                return Workshop.objects.filter(date_added__range=(start_date_range, end_date_range))
