from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class DashboardOverview(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Example: widget summary—expand as needed!
        return Response({
            "widgets": [
                {"type": "note_count", "value": 5},
                {"type": "last_login", "value": str(request.user.last_login)}
            ],
            "message": "Welcome to your Dashboard!"
        })
