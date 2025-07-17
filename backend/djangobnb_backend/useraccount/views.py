from .models import User
from .Serializers import UserDetailSerilizers
from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
# Create your views here.

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def landlord_details(request, pk):
    user = User.objects.get(pk = pk)

    serializer = UserDetailSerilizers(user)

    return JsonResponse(serializer.data, safe=False)
