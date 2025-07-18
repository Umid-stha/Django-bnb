from django.urls import path
from . import views

urlpatterns = [
    path('', views.properties_list, name='api_properties_list'),
    path('create/', views.create_property, name='api_property_create'),
    path('<uuid:id>', views.properties_detail, name = 'api_property_detail'),
    path('<uuid:id>/book/', views.book_property, name = 'api_book_property'),
    path('<uuid:id>/reservations/', views.property_reservations, name = 'api_property_reservation'),
    path('<uuid:pk>/toggle_favorite/', views.toggle_favorite, name = 'api_toggle_favorite'),
]