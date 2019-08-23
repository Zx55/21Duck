# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from datetime import datetime


class Notify(models.Model):
    notify_id = models.AutoField(primary_key=True)
    notify_user = models.ForeignKey('User', models.DO_NOTHING)
    notify_content = models.CharField(max_length=16384, blank=True, null=True)
    notify_time = models.DateTimeField(datetime.now())
    notify_status = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'notify'


class Posting(models.Model):
    posting_id = models.AutoField(primary_key=True)
    posting_user = models.ForeignKey('User', models.DO_NOTHING)
    posting_time = models.DateTimeField(default=datetime.now())
    reply_time = models.DateTimeField(default=datetime.now())
    reply_num = models.IntegerField(default=0)
    theme = models.CharField(max_length=256)
    posting_content = models.CharField(max_length=16384)
    category = models.CharField(max_length=256)
    posting_thumb_num = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'posting'


class Reposting(models.Model):
    reposting_id = models.AutoField(primary_key=True)
    reply_id = models.IntegerField()
    main_posting = models.ForeignKey(Posting, models.DO_NOTHING)
    reposting_user = models.ForeignKey('User', models.DO_NOTHING)
    repostring_time = models.DateTimeField(datetime.now())
    reposting_content = models.CharField(max_length=16384)
    reposting_thumb_num = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'reposting'


class User(models.Model):
    user_id = models.IntegerField(primary_key=True)
    password = models.CharField(max_length=256)
    nickname = models.CharField(max_length=64)
    age = models.IntegerField(blank=True, null=True)
    school = models.CharField(max_length=128, blank=True, null=True)
    head = models.CharField(max_length=128, blank=True, null=True)
    profile = models.CharField(max_length=256, blank=True, null=True)
    identify = models.IntegerField()
    blocktime = models.IntegerField(default=-1)
    scores = models.IntegerField(default=0)
    register = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'
