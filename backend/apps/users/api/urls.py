# Django imports
from django.urls import path


# Views imports
from apps.users.api.views import (
    user_api_view,
    user_detail_view
)


# Urls
urlpatterns = [
    path(
        'user-list/',
        user_api_view,
        name='usuario_api_view'
    ),
    path(
        'user-detail/<int:pk>/',
        user_detail_view,
        name='user_detail_api_view'
    )
]