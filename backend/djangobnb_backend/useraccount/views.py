from .models import User
from .Serializers import UserDetailSerilizers
from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from property.serializers import ReservationSerializer
# Create your views here.

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def landlord_details(request, pk):
    user = User.objects.get(pk = pk)

    serializer = UserDetailSerilizers(user)

    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def reservation_list(request):
    reservations = request.user.reservations.all()
    serailizers = ReservationSerializer(reservations, many=True)
    return JsonResponse(serailizers.data, safe=False)
