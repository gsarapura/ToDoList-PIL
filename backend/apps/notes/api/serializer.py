# Rest imports
from rest_framework import serializers

# Models imports
from apps.notes.models import Note

# Serializer
class NoteListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'id': instance['id'],
            'name': instance['name'],
            'completed': instance['completed'],
            'id_user': instance['id_user'],
        }