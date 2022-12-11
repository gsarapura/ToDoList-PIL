# Rest imports
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Serializer imports
from apps.notes.api.serializer import NoteListSerializer

# Model import
from apps.notes.models import Note

# View
@api_view(['GET'])
def all_notes_api_view(request):
    """
    Listar y crear notas.
    """

    # List
    if request.method == 'GET':
        notes = Note.objects.all().values('id', 'name', 'completed', 'id_user')
        notes_serializer = NoteListSerializer(notes, many=True)

        return Response(data=notes_serializer.data, status=status.HTTP_200_OK)