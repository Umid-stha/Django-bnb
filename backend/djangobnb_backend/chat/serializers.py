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

class ConversationDetailSerailizer(serializers.ModelSerializer):
    users = UserDetailSerilizers(many=True, read_only=True)
    class Meta:
        model = Conversations
        fields = [
            'id',
            'users',
            'modefied_at',
        ]

class ConversationMessageSerializer(serializers.ModelSerializer):
    sent_to = UserDetailSerilizers(many=False, read_only=True)
    created_by = UserDetailSerilizers(many=False, read_only=True)

    class Meta:
        model = ConversationMessage
        fields =  ['id', 'body', 'sent_to', 'created_by']
