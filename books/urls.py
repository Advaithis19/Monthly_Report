from django.urls import path, re_path
from .views import BookList, BookDetail, CreateBook, EditBook, DeleteBook, BookListDateFilter

app_name = 'books'

urlpatterns = [
    path('', BookList.as_view(), name='listbook'),
    path('<int:pk>/', BookDetail.as_view(), name='detailbook'),
    path('create/', CreateBook.as_view(), name='createbook'),
    path('edit/<int:pk>/', EditBook.as_view(), name='editbook'),
    path('delete/<int:pk>/', DeleteBook.as_view(), name='deletebook'),
    re_path(r'filter/date/(?P<start_date>\d{4}-\d{2}-\d{2})/(?P<end_date>\d{4}-\d{2}-\d{2})/',
            BookListDateFilter.as_view(), name='filterbook'),
]
