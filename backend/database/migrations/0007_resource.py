# Generated by Django 2.2.4 on 2019-08-31 11:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0006_thumbposting_thumbreposting'),
    ]

    operations = [
        migrations.CreateModel(
            name='Resource',
            fields=[
                ('resource_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(blank=True, max_length=255, null=True)),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'resource',
                'managed': False,
            },
        ),
    ]