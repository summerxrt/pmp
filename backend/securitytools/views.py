from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class SecurityToolsOverview(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "message": "Welcome to Security Tools!",
            "tools": [
                {"name": "Port Scanner", "status": "coming soon"},
                {"name": "Bandit SAST", "status": "coming soon"},
                {"name": "OWASP ZAP", "status": "coming soon"},
            ]
        })
