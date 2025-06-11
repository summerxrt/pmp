from django.urls import path
from .views import SecurityToolsOverview

urlpatterns = [
    path('', SecurityToolsOverview.as_view(), name='securitytools-overview'),
]
