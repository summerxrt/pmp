# This code sets up the URL routing for the notes application using Django REST Framework's router.
# It registers the NoteViewSet with the router, allowing for CRUD operations on notes.
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NoteViewSet

router = DefaultRouter()
router.register(r'notes', NoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
