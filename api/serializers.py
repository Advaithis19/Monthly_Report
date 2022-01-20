from rest_framework import serializers
from grants.models import Grants


class GrantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Grants
        fields = ('id', 'title', 'agency', 'sanc_amt', 'year', 'remarks', 'slug',
                  'PI', 'CO_PI')

    def validate(self, attrs):

        user = self.context['request'].user
        if not user.is_authenticated:
            raise serializers.ValidationError(
                "You must be logged in to create a grant!")

        if user.is_authenticated and not user.is_active:
            raise serializers.ValidationError(
                "Your account is inactive. Please re-activate")

        return attrs
