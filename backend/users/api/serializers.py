from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # include username and is_admin in the token
        token['username'] = user.username
        token['is_admin'] = user.is_staff

        return token