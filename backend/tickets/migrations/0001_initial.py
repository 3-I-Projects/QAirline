# Generated by Django 5.1.3 on 2024-12-02 17:14

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('flights', '0001_initial'),
        ('users', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.IntegerField()),
                ('ordered_time', models.DateTimeField(auto_now_add=True)),
                ('booked_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets', to=settings.AUTH_USER_MODEL)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tickets', to='users.customer')),
                ('flight', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookings', to='flights.flight')),
                ('seat', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='booked_ticket', to='flights.seat')),
            ],
            options={
                'verbose_name_plural': 'ticketzzzzzz',
            },
        ),
    ]
