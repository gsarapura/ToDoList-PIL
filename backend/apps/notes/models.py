from django.db import models

from apps.users.models import User

# Create your models here.
class Note(models.Model):
    name = models.CharField(max_length=255, unique=True)
    completed = models.BooleanField(default=False)
    id_user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    
    REQUIRED_FIELDS = ['name','id_user']