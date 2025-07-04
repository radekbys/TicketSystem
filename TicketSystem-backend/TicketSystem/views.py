from django.http import JsonResponse
from .models import Ticket
from .serializers import TicketSerializer
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


# This is the view for getting whole list and posting a single ticket
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def ticket_list(request):
    if request.method == "GET":
        tickets = Ticket.objects.all()
        serializer = TicketSerializer(tickets, many=True)
        return JsonResponse({"tickets": serializer.data})

    elif request.method == "POST":
        serializer = TicketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


# This is the view for getting details about a single ticket, changing a single record and deleting a ticket
@api_view(["GET", "PUT", "DELETE"])
def ticket_details(request, id):
    try:
        ticket = Ticket.objects.get(pk=id)
    except Ticket.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = TicketSerializer(ticket)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == "PUT":
        serializer = TicketSerializer(ticket, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        ticket.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
