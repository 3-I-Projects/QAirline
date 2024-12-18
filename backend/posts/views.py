from rest_framework import permissions, viewsets

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


class DiscountCategoryViewSet(viewsets.ModelViewSet):
    queryset = DiscountCategory.objects.all()
    serializer_class = DiscountCategorySerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


class InformationCategoryViewSet(viewsets.ModelViewSet):
    queryset = InformationCategory.objects.all()
    serializer_class = InformationCategorySerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


class InformationViewSet(viewsets.ModelViewSet):
    queryset = Information.objects.all()
    serializer_class = InformationSerializer


class NewsCategoryViewSet(viewsets.ModelViewSet):
    queryset = NewsCategory.objects.all()
    serializer_class = NewsCategorySerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]