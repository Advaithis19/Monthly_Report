from math import perm
from django.shortcuts import get_object_or_404
from .models import Book
from .serializers import BookSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth import get_user_model

User = get_user_model()


class BookUserWritePermission(BasePermission):
    message = 'Editing books is restricted to the author only.'

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True
        print(request.user)
        return request.user in obj.f_id.all()


class BookList(generics.ListAPIView):
    permission_classes = [BookUserWritePermission]
    serializer_class = BookSerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            department = user.department

            if user.is_teacher:
                book_list = [{'book_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                             for e in Book.objects.all()]
                res_qs = Book.objects.none()

                for book in book_list:
                    if user in book['faculty_involved']:
                        res_qs = res_qs | Book.objects.filter(
                            id=book['book_id'])
                return res_qs

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                book_list = [{'book_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                             for e in Book.objects.all()]
                res_qs = Book.objects.none()

                for book in book_list:
                    for user in users_in_dept:
                        if user in book['faculty_involved']:
                            res_qs = res_qs | Book.objects.filter(
                                id=book['book_id'])
                return res_qs

            if user.is_superadmin:
                return Book.objects.all()


class BookDetail(generics.RetrieveAPIView):

    permission_classes = [BookUserWritePermission]
    serializer_class = BookSerializer
    queryset = Book.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class CreateBook(generics.ListCreateAPIView):
    # update below to allow only authenticated users to create books
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = BookSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditBook(generics.RetrieveUpdateAPIView):
    permission_classes = [BookUserWritePermission]
    serializer_class = BookSerializer
    queryset = Book.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class DeleteBook(generics.RetrieveDestroyAPIView):
    permission_classes = [BookUserWritePermission]
    serializer_class = BookSerializer
    queryset = Book.objects.all()

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj


class BookListDateFilter(generics.ListAPIView):
    permission_classes = [BookUserWritePermission]
    permission_classes = [permissions.AllowAny]
    serializer_class = BookSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            department = user.department

            start_date_range = self.kwargs['start_date']
            end_date_range = self.kwargs['end_date']

            if user.is_teacher:
                book_list = [{'book_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                             for e in Book.objects.all()]
                res_qs = Book.objects.none()

                for book in book_list:
                    if user in book['faculty_involved']:
                        res_qs = res_qs | Book.objects.filter(
                            id=book['book_id'])
                return res_qs.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_admin:
                users_in_dept = User.objects.filter(department=department)
                book_list = [{'book_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                             for e in Book.objects.all()]
                res_qs = Book.objects.none()

                for book in book_list:
                    for user in users_in_dept:
                        if user in book['faculty_involved']:
                            res_qs = res_qs | Book.objects.filter(
                                id=book['book_id'])
                return res_qs.filter(date_added__range=(start_date_range, end_date_range))

            if user.is_superadmin:
                return Book.objects.filter(date_added__range=(start_date_range, end_date_range))
