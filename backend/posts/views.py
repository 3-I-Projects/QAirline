from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import Http404
from .models import *
from .serializers import *


# Create your views here.
class AnnouncementCategoryViewSet(viewsets.ModelViewSet):
    queryset = AnnouncementCategory.objects.all()
    serializer_class = AnnouncementCategorySerializer


# class AnnouncementViewSet(viewsets.ModelViewSet):
#     queryset = Announcement.objects.all()
#     serializer_class = AnnouncementSerializer

class AnnouncementList(APIView):
    def get(self, request, format=None):
        announcements = Announcement.objects.all()
        serializer = AnnouncementSerializer(announcements, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = AnnouncementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class AnnouncementDetail(APIView):
    def get_object(self, pk):
        try:
             return Announcement.objects.get(pk=pk)
        except Announcement.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):
        announcement = self.get_object(pk)
        serializer = AnnouncementSerializer(announcement)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        announcement = self.get_object(pk)
        serializer = AnnouncementSerializer(announcement, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        announcement = self.get_object(pk)
        announcement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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