from .models import *
from rest_framework import serializers
from users.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    announcements = serializers.PrimaryKeyRelatedField(many=True, queryset=Announcement.objects.all())
    # announcements = serializers.HyperlinkedIdentityField(many=True, view_name='announcement-detail', read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'announcements']

    def to_representation(self, instance):
        return instance.username


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'announcements']


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
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Discount
        fields = '__all__'

class InformationCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = InformationCategory
        fields = '__all__'


class InformationSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Information
        fields = '__all__'


class NewsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsCategory
        fields = '__all__'


class NewsSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = News
        fields = '__all__'