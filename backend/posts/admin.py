from django.contrib import admin
from .models import Post, AnnouncementCategory, Announcement, InformationCategory, Information,NewsCategory, News, Discount, DiscountCategory

# Register your models here.
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'created_at', 'last_update', 'status', 'type')
    search_fields = ('title', 'body')
    list_filter = ('created_at', 'status')

admin.site.register(AnnouncementCategory)


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'created_at', 'last_update', 'status', 'type', 'get_tag')
    search_fields = ('title', 'body')
    list_filter = ('created_at', 'status')

    def get_tag(self, obj):
        return ', '.join([tag.name for tag in obj.tag.all()])
    
    def type(self, obj):
        return obj.type()


admin.site.register(InformationCategory)
admin.site.register(Information)
admin.site.register(NewsCategory)
admin.site.register(News)
admin.site.register(DiscountCategory)
admin.site.register(Discount)