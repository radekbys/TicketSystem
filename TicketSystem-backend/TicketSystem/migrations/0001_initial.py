# Generated by Django 5.2.4 on 2025-07-03 11:06

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField()),
                ('content', models.TextField()),
                ('status', models.CharField()),
                ('creationDate', models.DateField()),
            ],
        ),
    ]
