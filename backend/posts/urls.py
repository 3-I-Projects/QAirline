from django.urls import path, include
from  rest_framework import routers
from .views import *

# url configuration
router = routers.DefaultRouter()
router.register('announcementCategory', AnnouncementCategoryViewSet)
router.register('announcement', AnnouncementViewSet)
router.register('discountCategory', DiscountCategoryViewSet)
router.register('discount', DiscountViewSet)
router.register('informationCategory', InformationCategoryViewSet)
router.register('information', InformationViewSet)
router.register('newsCategory', NewsCategoryViewSet)
router.register('news', NewsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]