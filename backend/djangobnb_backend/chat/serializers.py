from rest_framework import serializers

from .models import ConversationMessage, Conversations

from useraccount.Serializers import UserDetailSerilizers

class ConversationListSerializer(serializers.ModelSerializer):
    users = UserDetailSerilizers(many=True, read_only=True)

    class Meta:
        model = Conversations
        fields = [
            'id',
            'users',
            'modefied_at',
        ]