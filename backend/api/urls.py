from django.urls import path
from api.views import GetAllNotesByUser, NotesCreateView, MyTokenObtainPairView, NotesDeleteView, NotesUpdateView

app_name = "notes"

urlpatterns = [
    path("getNotes/all/", GetAllNotesByUser.as_view(), name="get_user_notes"),
    path("createNotes/", NotesCreateView.as_view(), name="create_user_notes"),
    path("deleteNotes/<int:pk>/", NotesDeleteView.as_view(), name="delete_user_notes"),
    path("updateNotes/<int:pk>/", NotesUpdateView.as_view(), name="update_user_notes"),
    path('customToken/', MyTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
]
