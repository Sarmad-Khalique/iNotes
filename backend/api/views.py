from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth import get_user_model

from api.serializers import NotesSerializer, MyTokenObtainPairSerializer, UserSerializer
from notes.models import Notes

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class GetAllNotesByUser(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = NotesSerializer

    def get_queryset(self):
        return Notes.objects.filter(user=self.request.user.id)


class NotesCreateView(CreateAPIView):
    serializer_class = NotesSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Notes.objects.all()

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            return serializer.save(user=self.request.user)
        else:
            return serializer.save()

class NotesDeleteView(DestroyAPIView):
    permission_classes=(IsAuthenticated,)
    serializer_class = NotesSerializer
    queryset = Notes.objects.all()

class NotesUpdateView(UpdateAPIView):
    permission_classes=(IsAuthenticated,)
    serializer_class = NotesSerializer
    queryset = Notes.objects.all()


User = get_user_model()

class UserCreateiew(CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def perform_create(self, serializer):
        instance = serializer.save()
        instance.set_password(instance.password)
        instance.save()