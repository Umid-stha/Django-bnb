from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Property, Reservation
from .serializers import PropertiesListSerializer, PropertiesDetailSerializer, ReservationSerializer
from .forms import PropertyForm

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def properties_list(request):
    properties = Property.objects.all()
    landlord_id = request.GET.get('landlord_id', '')
    if landlord_id:
        properties = properties.filter(landlord_id=landlord_id)
    serializer = PropertiesListSerializer(properties, many=True)

    return JsonResponse({
            'data' : serializer.data
        }
    )

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def properties_detail(request, id):
    property = Property.objects.get(id=id)
    serializer = PropertiesDetailSerializer(property)

    return JsonResponse({
        'data': serializer.data
    })

@api_view(['POST', 'FILES'])
def create_property(request):
    form = PropertyForm(request.POST, request.FILES)
    user = request.user

    if form.is_valid():
        property = form.save(commit=False)
        property.landlord = user
        property.save()

        return JsonResponse({'success': True})
    else:
        print('error', form.errors, form.non_field_errors)
        return JsonResponse({'errors': form.errors.as_json()}, status = 400)


@api_view(['POST'])
def book_property(request, id):
    try:
        start_date = request.POST.get('start_date', '')
        end_date = request.POST.get('end_date', '')
        number_of_nights = request.POST.get('number_of_nights', '')
        total_price = request.POST.get('total_price', '')
        guests = request.POST.get('guests', '')

        property = Property.objects.get(id=id)
        Reservation.objects.create(
            property=property,
            start_date=start_date,
            end_date=end_date,
            number_of_nights=number_of_nights,
            total_price= total_price,
            guests = guests,
            created_by = request.user
        )
        
        return JsonResponse({'success': True})
    except Exception as e:
        print('Error', e)

        return JsonResponse({'success': False})

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_reservations(request, id):
    property = Property.objects.get(id = id)
    reservations = property.reservations.all()

    serializer = ReservationSerializer(reservations, many=True)

    return JsonResponse(serializer.data, safe=False)