# Generated by Django 5.1.4 on 2024-12-06 06:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_customer_created_by'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='announcements',
        ),
    ]
