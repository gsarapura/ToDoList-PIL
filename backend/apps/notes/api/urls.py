# Django imports
from django.urls import path


# Views imports
from apps.notes.api.views import (
    all_notes_api_view,
)


# Urls
urlpatterns = [
    path(
        'all-notes-list/',
        all_notes_api_view,
        name='all_notes_api_view'
    ),
]