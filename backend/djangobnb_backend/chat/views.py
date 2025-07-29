from django.http import JsonResponse
from rest_framework.decorators import api_view

from .models import ConversationMessage, Conversations
from useraccount.models import User

from .serializers import ConversationListSerializer, ConversationDetailSerailizer, ConversationMessageSerializer

@api_view(['GET'])
def conversation_list(request):
    serailizer = ConversationListSerializer(request.user.conversations.all(), many=True)

    return JsonResponse(serailizer.data, safe=False)

@api_view(['GET'])
def conversation_detail(request, pk):
    conversation = request.user.conversations.get(pk=pk)

    conversation_serializer = ConversationDetailSerailizer(conversation, many = False)
    messages_serailizer = ConversationMessageSerializer(conversation.messages.all(), many = True)

    return JsonResponse({
        'conversation': conversation_serializer.data,
        'messages': messages_serailizer.data
    }, safe=False
    )

@api_view(['GET'])
def conversations_start(request, user_id):
    conversations = Conversations.objects.filter(users__in=[user_id]).filter(users__in=[request.user.id])

    if conversations.count() > 0:
        conversation = conversations.first()
        return JsonResponse({'success': True, "conversation_id": conversation.id})
    else:
        user = User.objects.get(pk=user_id)
        conversation = Conversations.objects.create()
        conversation.users.add(request.user)
        conversation.users.add(user)
        conversation.save()
        return JsonResponse({'success': True, "conversation_id": conversation.id})

