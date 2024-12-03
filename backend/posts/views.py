from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *

# Create your views here.
class AnnouncementCategoryViewSet(viewsets.ModelViewSet):
    queryset = AnnouncementCategory.objects.all()
    serializer_class = AnnouncementCategorySerializer


class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer


class DiscountCategoryViewSet(viewsets.ModelViewSet):
    queryset = DiscountCategory.objects.all()
    serializer_class = DiscountCategorySerializer


class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer


class InformationCategoryViewSet(viewsets.ModelViewSet):
    queryset = InformationCategory.objects.all()
    serializer_class = InformationCategorySerializer


class InformationViewSet(viewsets.ModelViewSet):
    queryset = Information.objects.all()
    serializer_class = InformationSerializer


class NewsCategoryViewSet(viewsets.ModelViewSet):
    queryset = NewsCategory.objects.all()
    serializer_class = NewsCategorySerializer


class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer