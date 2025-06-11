# This code defines a Django model for a Note, which includes fields for the title, content, and creation timestamp.
# It also includes a string representation method to return the title of the note.
from django.db import models

class Note(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
