from django.db import models
from users.models import CustomUser

# Create your models here.
class Post(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]

    ALERT_LEVEL = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]

    title = models.CharField(max_length=200, default='Untitled')
    body = models.TextField(null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING, null=True)

    def type(self):
        if isinstance(self, Announcement):
            return 'Announcement'
        if isinstance(self, Information):
            return 'Information'
        if isinstance(self, News):
            return 'News'
        if isinstance(self, Discount):
            return 'Discount'
        return 'Post'
    
    def __str__(self):
        return self.title
    

class AnnouncementCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Announcement(Post):
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    # tag = models.ManyToManyField(AnnouncementCategory)
    alert_level = models.CharField(max_length=10, choices=Post.ALERT_LEVEL, default='low')

    # def type(self):
    #     return 'Announcement'
        
    def __str__(self):
        return self.title


class InformationCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Information(Post):
    # tag = models.ManyToManyField(InformationCategory)

    # def type(self):
    #     return 'Information'
    
    def __str__(self):
        return self.title


class NewsCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class News(Post):
    # tag = models.ManyToManyField(NewsCategory)

    # def type(self):
    #     return 'News'
    
    def __str__(self):
        return self.title


class DiscountCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Discount(Post):
    # tag = models.ManyToManyField(DiscountCategory)

    # def type(self):
    #     return 'Discount'
    
    def __str__(self):
        return self.title