# Django imports
from django.urls import path


# Views imports
from apps.notes.api.views import (
    all_notes_api_view,
    note_user_view,
    note_detail_view,
)


# Urls
urlpatterns = [
    path(
        'all-notes-list/',
        all_notes_api_view,
        name='all_notes_api_view'
    ),
    path(
        'note-user/<int:fk>/',
        note_user_view,
        name='note_user_api_view'
    ),
    path(
        'note-detail/<int:pk>/',
        note_detail_view,
        name='note_detail_api_view'
    ),
]