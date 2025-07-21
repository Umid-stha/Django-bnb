from django.http import JsonResponse
from rest_framework.decorators import api_view

from .models import ConversationMessage, Conversations

from .serializers import ConversationListSerializer, ConversationDetailSerailizer

@api_view(['GET'])
def conversation_list(request):
    serailizer = ConversationListSerializer(request.user.conversations.all(), many=True)

    return JsonResponse(serailizer.data, safe=False)

@api_view(['GET'])
def conversation_detail(request, pk):
    conversation = request.user.conversations.get(pk=pk)

    conversation_serializer = ConversationDetailSerailizer(conversation, many = False)

    return JsonResponse({
        'conversation': conversation_serializer.data, 
    }, safe=False
    )

