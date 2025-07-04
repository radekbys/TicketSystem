from rest_framework import serializers
from .models import Ticket


# serializer transforming ticket python object into a json
class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ["id", "title", "content", "status", "creationDate"]
