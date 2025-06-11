from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from notes.models import Note

class DashboardOverview(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        note_count = Note.objects.filter(user=request.user).count()
        last_login = str(request.user.last_login)
        recent_notes = Note.objects.filter(user=request.user).order_by('-created_at')[:5]
        return Response({
            "message": f"Welcome, {request.user.username}!",
            "widgets": [
                {"type": "note_count", "value": note_count},
                {"type": "last_login", "value": last_login},
                {
                    "type": "recent_notes",
                    "value": [
                        {"title": n.title, "created": n.created_at.strftime("%Y-%m-%d %H:%M:%S")}
                        for n in recent_notes
                    ]
                },
            ]
        })
