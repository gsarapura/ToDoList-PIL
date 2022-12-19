# Rest imports
from rest_framework import serializers

# Models imports
from apps.notes.models import Note

# Serializer
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__' 

class UserNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'id': instance['id'],
            'name': instance['name'],
            'completed': instance['completed'],
        }
