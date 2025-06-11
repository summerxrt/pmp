from django.urls import path
from .views import DashboardOverview

urlpatterns = [
    path('', DashboardOverview.as_view(), name='dashboard-overview'),
]
