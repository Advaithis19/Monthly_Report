from rest_framework import serializers
from grants.models import Grant
from django.contrib.auth import get_user_model

User = get_user_model()


class UserField(serializers.RelatedField):
    def to_representation(self, value):
        return '%s %s' % (value.first_name, value.last_name)

    def to_internal_value(self, data):
        return User.objects.get(id=data)


class GrantSerializer(serializers.ModelSerializer):

    # using SlugRelatedField instead of CustomField
    # PI = serializers.SlugRelatedField(
    #     slug_field='email', queryset=User.objects.all())
    # CO_PI = serializers.SlugRelatedField(
    #     slug_field='email', queryset=User.objects.all())

    PI = UserField(queryset=User.objects.all())
    CO_PI = UserField(queryset=User.objects.all())

    class Meta:
        model = Grant
        fields = ('id', 'title', 'agency', 'sanc_amt', 'year', 'remarks', 'slug',
                  'PI', 'CO_PI')
        # extra_kwargs = {'id': {'read_only': True}}

    def validate(self, attrs):

        user = self.context['request'].user
        if not user.is_authenticated:
            raise serializers.ValidationError(
                "You must be logged in to create a grant!")

        if user.is_authenticated and not user.is_active:
            raise serializers.ValidationError(
                "Your account is inactive. Please re-activate")

        return attrs
