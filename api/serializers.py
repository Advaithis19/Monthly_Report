from rest_framework import serializers
from grants.models import Grants


class GrantSerializer(serializers.ModelSerializer):
    # PI = serializers.PrimaryKeyRelatedField(
    #     default=serializers.CurrentUserDefault()
    # )

    class Meta:
        model = Grants
        fields = ('id', 'title', 'agency', 'sanc_amt', 'year', 'remarks', 'slug',
                  'PI', 'CO_PI')
