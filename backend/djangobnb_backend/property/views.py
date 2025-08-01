from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.tokens import AccessToken
from .models import Property, Reservation
from .serializers import PropertiesListSerializer, PropertiesDetailSerializer, ReservationSerializer
from .forms import PropertyForm
from useraccount.models import User

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def properties_list(request):
    try:
        token = request.META['HTTP_AUTHORIZATION'].split('Bearer ')[1]
        token = AccessToken(token)
        user_id = token.payload['user_id']
        user = User.objects.get(pk=user_id)
    except Exception as e:
        user = None
    favorites = []
    properties = Property.objects.all()

    #filters
    is_favorites = request.GET.get('is_favorite', '')
    landlord_id = request.GET.get('landlord_id', '')

    country = request.GET.get('country','')
    category = request.GET.get('category','')
    check_in = request.GET.get('checkIn','')
    check_out = request.GET.get('checkOut','')
    bedrooms = request.GET.get('numBedroom','')
    guest = request.GET.get('numGuest','')
    bathrooms = request.GET.get('numBathroom','')

    if check_in and check_out:
        exact_matches = Reservation.objects.filter(start_date = check_in) | Reservation.objects.filter(end_date = check_out)
        overlay_matches = Reservation.objects.filter(start_date__lte=check_out, end_date__gte = check_out)
        all_matches = []

        for reservation in exact_matches or overlay_matches:
            all_matches.append(reservation.property_id)

        properties = properties.exclude(id__in = all_matches)
    
    if landlord_id:
        properties = properties.filter(landlord_id=landlord_id)
    if is_favorites:
        properties = properties.filter(favorited__in=[user])
    if guest:
        properties = properties.filter(guest__gte=guest)
    if bedrooms:
        properties = properties.filter(bedrooms__gte=bedrooms)
    if bathrooms:
        properties = properties.filter(bathrooms__gte=bathrooms)
    if country:
        properties = properties.filter(country=country)
    if category and category != 'undefined':
        properties = properties.filter(category=category)

    serializer = PropertiesListSerializer(properties, many=True)

    if user:    
        for property in properties:
            if user in property.favorited.all():
                favorites.append(property.id)

    return JsonResponse({
            'data' : serializer.data,
            'favorites': favorites
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

@api_view(['POST'])
def toggle_favorite(request, pk):
    property = Property.objects.get(pk=pk)

    if request.user in property.favorited.all():
        property.favorited.remove(request.user)

        return JsonResponse({'is_favorite': False})
    else:
        property.favorited.add(request.user)

        return JsonResponse({'is_favorite': True})