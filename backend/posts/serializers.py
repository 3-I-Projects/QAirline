from .models import *
from rest_framework import serializers
from users.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    announcements = serializers.PrimaryKeyRelatedField(many=True, queryset=Announcement.objects.all())

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'announcements']


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username']


class AnnouncementCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AnnouncementCategory
        fields = '__all__'


class AnnouncementSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    # author = AuthorSerializer(read_only=True)

    # tag = AnnouncementCategorySerializer(many=True)

    class Meta:
        model = Announcement
        fields = '__all__'


class DiscountCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscountCategory
        fields = '__all__'


class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = '__all__'

class InformationCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = InformationCategory
        fields = '__all__'


class InformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Information
        fields = '__all__'


class NewsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsCategory
        fields = '__all__'


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'