from .models import *
from rest_framework import serializers

class AnnouncementCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AnnouncementCategory
        fields = '__all__'


class AnnouncementSerializer(serializers.ModelSerializer):
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