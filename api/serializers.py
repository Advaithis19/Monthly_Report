from rest_framework import serializers
from grants.models import Grants


class GrantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grants
        fields = ('id', 'title', 'agency', 'sanc_amt', 'year', 'remarks', 'slug',
                  'PI', 'CO_PI')
