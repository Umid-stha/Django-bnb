from django.http import JsonResponse
from rest_framework.decorators import api_view

from .models import ConversationMessage, Conversations

from .serializers import ConversationListSerializer

@api_view(['GET'])
def conversation_list(request):
    serailizer = ConversationListSerializer(request.user.conversations.all(), many=True)

    return JsonResponse(serailizer.data, safe=False)