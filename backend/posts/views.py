from rest_framework import permissions, viewsets
from rest_framework.response import Response

from posts.models import *
from posts.serializers import *
from posts.permissions import *


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    permission_classes = [permissions.IsAdminUser]


class AnnouncementCategoryViewSet(viewsets.ModelViewSet):
    queryset = AnnouncementCategory.objects.all()
    serializer_class = AnnouncementCategorySerializer

    permission_classes = [IsAdminOrReadOnly]


class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer

    # authenticated requests get read-write access, unauthenticated requests get read-only access.
    permission_classes = [IsAdminOrReadOnly]

    # associate the author with the announcement
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def partial_update(self, request, pk=None):
        """
        Allow partial updates of Announcement objects using PATCH requests.
        """
        announcement = self.get_object()
        serializer = self.get_serializer(announcement, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class DiscountCategoryViewSet(viewsets.ModelViewSet):
    queryset = DiscountCategory.objects.all()
    serializer_class = DiscountCategorySerializer

    permission_classes = [IsAdminOrReadOnly]


class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer

    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def partial_update(self, request, pk=None):
        """
        Allow partial updates of Announcement objects using PATCH requests.
        """
        announcement = self.get_object()
        serializer = self.get_serializer(announcement, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class InformationCategoryViewSet(viewsets.ModelViewSet):
    queryset = InformationCategory.objects.all()
    serializer_class = InformationCategorySerializer

    permission_classes = [IsAdminOrReadOnly]


class InformationViewSet(viewsets.ModelViewSet):
    queryset = Information.objects.all()
    serializer_class = InformationSerializer

    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def partial_update(self, request, pk=None):
        """
        Allow partial updates of Announcement objects using PATCH requests.
        """
        announcement = self.get_object()
        serializer = self.get_serializer(announcement, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class NewsCategoryViewSet(viewsets.ModelViewSet):
    queryset = NewsCategory.objects.all()
    serializer_class = NewsCategorySerializer

    permission_classes = [IsAdminOrReadOnly]


class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def partial_update(self, request, pk=None):
        """
        Allow partial updates of Announcement objects using PATCH requests.
        """
        announcement = self.get_object()
        serializer = self.get_serializer(announcement, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)