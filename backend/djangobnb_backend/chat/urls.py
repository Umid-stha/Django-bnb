from django.urls import path
from . import views

urlpatterns = [
    path('', views.conversation_list),
    path('<uuid:pk>/', views.conversation_detail, name='api_conversation_detail'),
]