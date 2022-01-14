from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from grants.models import Grants
from .serializers import GrantSerializer
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# serializer and view for customizing login token claims
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['department'] = user.department
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class GrantList(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = GrantSerializer
    queryset = Grants.objects.all()


class GrantDetail(generics.RetrieveDestroyAPIView):

    serializer_class = GrantSerializer

    def get_object(self):
        id = self.kwargs.get('pk')
        return get_object_or_404(Grants, id=id)


class CreateGrant(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = GrantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditGrant(generics.UpdateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = GrantSerializer
    queryset = Grants.objects.all()


class DeleteGrant(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = GrantSerializer
    queryset = Grants.objects.all()
