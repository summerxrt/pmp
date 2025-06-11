from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from notes.models import Note
from rest_framework_simplejwt.tokens import AccessToken

class DashboardOverview(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        note_count = Note.objects.filter(user=request.user).count()
        last_login = str(request.user.last_login)
        recent_notes = Note.objects.filter(user=request.user).order_by('-created_at')[:5]

        # JWT Expiry calculation
        access_token = request.auth
        try:
            exp = AccessToken(access_token).get('exp')
            import datetime
            exp_datetime = datetime.datetime.fromtimestamp(exp)
            jwt_expiry = exp_datetime.strftime("%Y-%m-%d %H:%M:%S")
        except Exception:
            jwt_expiry = "Unknown"

        return Response({
            "message": f"Welcome, {request.user.username}!",
            "widgets": [
                {"type": "note_count", "value": note_count},
                {"type": "last_login", "value": last_login},
                {"type": "jwt_expiry", "value": jwt_expiry},
                {
                    "type": "recent_notes",
                    "value": [
                        {"title": n.title, "created": n.created_at.strftime("%Y-%m-%d %H:%M:%S")}
                        for n in recent_notes
                    ]
                },
                {
                    "type": "user_info",
                    "value": {
                        "email": request.user.email,
                        "joined": request.user.date_joined.strftime("%Y-%m-%d"),
                    }
                },
            ]
        })
