from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer

from notes.models import Notes

User = get_user_model()

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['name'] = user.username
        token['email'] = user.email
        token['is_active'] = user.is_active

        return token


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class NotesSerializer(ModelSerializer):
    class Meta:
        model = Notes
        fields = ("id","title","text")
