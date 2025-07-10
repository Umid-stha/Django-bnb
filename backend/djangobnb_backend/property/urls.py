from django.urls import path
from . import views

urlpatterns = [
    path('', views.properties_list, name='api_properties_list'),
    path('create/', views.create_property, name='api_property_create')
]