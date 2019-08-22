# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Notify(models.Model):
    notify_id = models.IntegerField(primary_key=True)
    notify_user_id = models.IntegerField()
    notify_content = models.CharField(max_length=16384, blank=True, null=True)
    notify_time = models.DateTimeField()
    notify_status = models.CharField(max_length=256, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'notify'


class Posting(models.Model):
    postingid = models.AutoField(primary_key=True)
    posting_user_id = models.IntegerField()
    posting_time = models.DateTimeField()
    reply_time = models.DateTimeField()
    reply_num = models.IntegerField()
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
    main_posting_id = models.IntegerField()
    reposting_user_id = models.IntegerField()
    repostring_time = models.DateTimeField()
    reposting_content = models.CharField(max_length=16384)
    reposting_thumb_num = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'reposting'


class User(models.Model):
    user_id = models.IntegerField(primary_key=True)
    password = models.CharField(max_length=64)
    nickname = models.CharField(max_length=64)
    age = models.IntegerField(blank=True, null=True)
    school = models.CharField(max_length=128, blank=True, null=True)
    head = models.CharField(max_length=128, blank=True, null=True)
    profile = models.CharField(max_length=256, blank=True, null=True)
    status = models.CharField(max_length=256, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'
