# Generated by Django 4.1.4 on 2022-12-19 02:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("notes", "0003_alter_note_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="note",
            name="name",
            field=models.CharField(max_length=255, unique=True),
        ),
    ]