from django.db import DatabaseError
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .content import PORTFOLIO
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class PortfolioView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        return Response(PORTFOLIO)

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    authentication_classes = []
    permission_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_create(serializer)
        except DatabaseError:
            return Response(
                {"detail": "Contact service is temporarily unavailable."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        return Response({"detail": "Message received.", "id": serializer.data["id"]}, status=status.HTTP_201_CREATED)
