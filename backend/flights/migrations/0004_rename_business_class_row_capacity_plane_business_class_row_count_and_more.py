# Generated by Django 5.1.4 on 2024-12-16 17:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('flights', '0003_rename_business_class_capacity_plane_business_class_row_capacity_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='plane',
            old_name='business_class_row_capacity',
            new_name='business_class_row_count',
        ),
        migrations.RenameField(
            model_name='plane',
            old_name='economy_class_row_capacity',
            new_name='economy_class_row_count',
        ),
        migrations.RenameField(
            model_name='plane',
            old_name='first_class_row_capacity',
            new_name='first_class_row_count',
        ),
        migrations.RenameField(
            model_name='plane',
            old_name='premium_class_row_capacity',
            new_name='premium_class_row_count',
        ),
    ]
