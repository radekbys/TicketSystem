from django.db import models
import uuid


# ORM model representing a single ticket, id and creation date are set autoasmtically on creation
class Ticket(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=8
    )
    title = models.CharField()
    content = models.TextField()
    status = models.CharField()
    creationDate = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
