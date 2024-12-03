# Generated by Django 5.1.3 on 2024-12-01 14:27

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_alter_post_id'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AnnouncementCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='DiscountCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='InformationCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='NewsCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.RemoveField(
            model_name='post',
            name='type',
        ),
        migrations.AddField(
            model_name='post',
            name='author',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Announcement',
            fields=[
                ('post_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='posts.post')),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('alert_level', models.CharField(choices=[('high', 'High'), ('medium', 'Medium'), ('low', 'Low')], default='low', max_length=10)),
                ('tag', models.ManyToManyField(to='posts.announcementcategory')),
            ],
            bases=('posts.post',),
        ),
        migrations.CreateModel(
            name='Discount',
            fields=[
                ('post_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='posts.post')),
                ('tag', models.ManyToManyField(to='posts.discountcategory')),
            ],
            bases=('posts.post',),
        ),
        migrations.CreateModel(
            name='Information',
            fields=[
                ('post_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='posts.post')),
                ('tag', models.ManyToManyField(to='posts.informationcategory')),
            ],
            bases=('posts.post',),
        ),
        migrations.CreateModel(
            name='News',
            fields=[
                ('post_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='posts.post')),
                ('tag', models.ManyToManyField(to='posts.newscategory')),
            ],
            bases=('posts.post',),
        ),
        migrations.DeleteModel(
            name='PostType',
        ),
    ]
