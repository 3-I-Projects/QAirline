from django.urls import path, include
from rest_framework import routers

from posts.views import *


router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'announcementCategorys', AnnouncementCategoryViewSet, basename='announcementCategory')
router.register(r'announcements', AnnouncementViewSet, basename='announcement')
# router.register('discountCategory', DiscountCategoryViewSet)
# router.register('discount', DiscountViewSet)
# router.register('informationCategory', InformationCategoryViewSet)
# router.register('information', InformationViewSet)
# router.register('newsCategory', NewsCategoryViewSet)
# router.register('news', NewsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('discounts/', DiscountList.as_view(), name='discount-list'),
    path('discounts/<int:pk>', DiscountDetail.as_view(), name='discount-detail'),
    path('discountCategories/', DiscountCategoryList.as_view(), name='discountCategory-list'),
    path('discountCategories/<int:pk>', DiscountCategoryDetail.as_view(), name='discountCategory-detail'),
    path('informations/', InformationList.as_view(), name='information-list'),
    path('informations/<int:pk>', InformationDetail.as_view(), name='information-detail'),
    path('informationCategories/', InformationCategoryList.as_view(), name='informationCategory-list'),
    path('informationCategories/<int:pk>', InformationCategoryDetail.as_view(), name='informationCategory-detail'),
    path('news/', NewsList.as_view(), name='news-list'),
    path('news/<int:pk>', NewsDetail.as_view(), name='news-detail'),
    path('newsCategories/', NewsCategoryList.as_view(), name='newsCategory-list'),
    path('newsCategories/<int:pk>', NewsCategoryDetail.as_view(), name='newsCategory-detail'),
]