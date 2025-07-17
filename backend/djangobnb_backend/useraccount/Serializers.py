from rest_framework import serializers

from .models import User

class UserDetailSerilizers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'name',
            'avatar_url'
        ]