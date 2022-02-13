from rest_framework import serializers
from .models import Talk
from django.contrib.auth import get_user_model

User = get_user_model()


class UserField(serializers.RelatedField):
    def to_representation(self, value):
        return '%s %s' % (value.first_name, value.last_name)

    def to_internal_value(self, data):
        return User.objects.get(id=data)


class TalkSerializer(serializers.ModelSerializer):

    f_id = UserField(queryset=User.objects.all())

    class Meta:
        model = Talk
        fields = ('id', 'topic', 'venue', 'n_stud',
                  'n_fac', 'n_ind', 'date', 'f_id')
        # extra_kwargs = {'id': {'read_only': True}}

    def validate(self, attrs):

        user = self.context['request'].user
        if not user.is_authenticated:
            raise serializers.ValidationError(
                "You must be logged in to create a talk!")

        if user.is_authenticated and not user.is_active:
            raise serializers.ValidationError(
                "Your account is inactive. Please re-activate")

        return attrs
