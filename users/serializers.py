from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    password2 = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'password2',
                  'department', 'first_name', 'last_name', 'is_teacher', 'is_admin', 'is_superadmin')
        # extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):

        email = attrs['email'].lower()
        dom_name = email.split('@')[1]
        if dom_name != 'rvce.edu.in':
            raise serializers.ValidationError(
                "You must use an RVCE email address!!")

        r = User.objects.filter(email=email)
        if r.count():
            raise serializers.ValidationError("Email already exists!")

        username = attrs['username']
        r = User.objects.filter(username=username)
        if r.count():
            raise serializers.ValidationError("Username already exists!")

        password1 = attrs['password']
        password2 = attrs['password2']

        if password1 and password2 and password1 != password2:
            raise serializers.ValidationError("Passwords don't match")

        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        password2 = validated_data.pop('password2', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserSelectSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name')
