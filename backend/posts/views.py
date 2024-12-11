from rest_framework import generics, permissions, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from posts.models import *
from posts.serializers import *
from posts.permissions import *


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


class AnnouncementCategoryViewSet(viewsets.ModelViewSet):
    queryset = AnnouncementCategory.objects.all()
    serializer_class = AnnouncementCategorySerializer


class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer

    # authenticated requests get read-write access, unauthenticated requests get read-only access.
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    # associate the author with the announcement
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class DiscountCategoryList(generics.ListCreateAPIView):
    queryset = DiscountCategory.objects.all()
    serializer_class = DiscountCategorySerializer


class DiscountCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = DiscountCategory.objects.all()
    serializer_class = DiscountCategorySerializer


class DiscountList(generics.ListCreateAPIView):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer


class DiscountDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer


class InformationCategoryList(generics.ListCreateAPIView):
    queryset = InformationCategory.objects.all()
    serializer_class = InformationCategorySerializer



class InformationCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = InformationCategory.objects.all()
    serializer_class = InformationCategorySerializer


class InformationList(generics.ListCreateAPIView):
    queryset = Information.objects.all()
    serializer_class = InformationSerializer


class InformationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Information.objects.all()
    serializer_class = InformationSerializer


class NewsCategoryList(generics.ListCreateAPIView):
    queryset = NewsCategory.objects.all()
    serializer_class = NewsCategorySerializer


class NewsCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = NewsCategory.objects.all()
    serializer_class = NewsCategorySerializer


class NewsList(generics.ListCreateAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer


class NewsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer