from django.urls import path, include
from rest_framework import routers

from posts.views import *


router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'announcementCategorys', AnnouncementCategoryViewSet, basename='announcementCategory')
router.register(r'announcements', AnnouncementViewSet, basename='announcement')
router.register(r'discountCategory', DiscountCategoryViewSet, basename='discountCategory')
router.register(r'discount', DiscountViewSet, basename='discount')
router.register(r'informationCategory', InformationCategoryViewSet, basename='informationCategory')
router.register(r'information', InformationViewSet, basename='information')
router.register(r'newsCategory', NewsCategoryViewSet, basename='newsCategory')
router.register(r'news', NewsViewSet, basename='news')

urlpatterns = [
    path('', include(router.urls)),
]