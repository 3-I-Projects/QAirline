from rest_framework import generics, permissions

from posts.models import *
from posts.serializers import *
from posts.permissions import *


class UserList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


class AnnouncementCategoryList(generics.ListCreateAPIView):
    queryset = AnnouncementCategory.objects.all()
    serializer_class = AnnouncementCategorySerializer


class AnnouncementCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = AnnouncementCategory.objects.all()
    serializer_class = AnnouncementCategorySerializer


class AnnouncementList(generics.ListCreateAPIView):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer

    # authenticated requests get read-write access, unauthenticated requests get read-only access.
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # associate the author with the announcement
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    

class AnnouncementDetail(generics.RetrieveUpdateDestroyAPIView):                        
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


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