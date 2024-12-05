from django.urls import path, include
from  rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

# url configuration
# router = routers.DefaultRouter()
# router.register('announcementCategory', AnnouncementCategoryViewSet)
# router.register('announcement', AnnouncementViewSet)
# router.register('discountCategory', DiscountCategoryViewSet)
# router.register('discount', DiscountViewSet)
# router.register('informationCategory', InformationCategoryViewSet)
# router.register('information', InformationViewSet)
# router.register('newsCategory', NewsCategoryViewSet)
# router.register('news', NewsViewSet)

urlpatterns = [
    # path('', include(router.urls)),
    path('announcements/', AnnouncementList.as_view()),
    path('announcements/<int:pk>', AnnouncementDetail.as_view()),
    path('announcementCategories/', AnnouncementCategoryList.as_view()),
    path('announcementCategories/<int:pk>', AnnouncementCategoryDetail.as_view()),
    path('discounts/', DiscountList.as_view()),
    path('discounts/<int:pk>', DiscountDetail.as_view()),
    path('discountCategories/', DiscountCategoryList.as_view()),
    path('discountCategories/<int:pk>', DiscountCategoryDetail.as_view()),
    path('informations/', InformationList.as_view()),
    path('informations/<int:pk>', InformationDetail.as_view()),
    path('informationCategories/', InformationCategoryList.as_view()),
    path('informationCategories/<int:pk>', InformationCategoryDetail.as_view()),
    path('news/', NewsList.as_view()),
    path('news/<int:pk>', NewsDetail.as_view()),
    path('newsCategories/', NewsCategoryList.as_view()),
    path('newsCategories/<int:pk>', NewsCategoryDetail.as_view()),
    path('users/', UserList.as_view()),
    path('users/<int:pk>', UserDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)