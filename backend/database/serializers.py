import collections
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework_extensions.serializers import PartialUpdateSerializerMixin
import datetime

from .models import *
from .myfuncs import *


class UserSerializer(PartialUpdateSerializerMixin, ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class PostingSerializer(PartialUpdateSerializerMixin, ModelSerializer):
    posting_num = serializers.SerializerMethodField(label='posting_number')
    relative_posting_time = serializers.SerializerMethodField(label='relative_posting_time')
    relative_reply_time = serializers.SerializerMethodField(label='relative_reply_time')
    formated_posting_time = serializers.SerializerMethodField(label='formated_posting_time')
    user_nickname = serializers.SerializerMethodField(label='user_nickname')
    user_head = serializers.SerializerMethodField(label='user_head')


    class Meta:
        model = Posting
        fields = ['posting_id', 'user_head','posting_num', 'posting_user', 'user_nickname',
                  'relative_posting_time', 'relative_reply_time', 'reply_num',
                  'theme', 'posting_content', 'category_id', 'posting_thumb_num', 'formated_posting_time']

    def get_formated_posting_time(self, obj):
        return obj.posting_time.strftime("%Y-%m-%d %H:%M:%S")

    def get_posting_num(self, obj):
        return Posting.objects.filter(category_id=obj.category_id).count()

    def get_relative_posting_time(self, obj):
        return calculate_relative_time(obj.posting_time)

    def get_relative_reply_time(self, obj):
        return calculate_relative_time(obj.reply_time)

    def get_user_nickname(self, obj):
        return obj.posting_user.nickname

    def get_user_head(self, obj):
        return obj.posting_user.head

class RepostingSerializer(PartialUpdateSerializerMixin, ModelSerializer):
    reposting_num = serializers.SerializerMethodField(label='reposting_number')
    relative_reposting_time = serializers.SerializerMethodField(label='relative_reposting_time')
    user_nickname = serializers.SerializerMethodField(label='user_nickname')
    user_head = serializers.SerializerMethodField(label='user_head')
    reply_posting = serializers.SerializerMethodField(label='reply_posting')
    floor = serializers.SerializerMethodField(label='floor')
    formated_reposting_time = serializers.SerializerMethodField(label='formated_reposting_time')

    class Meta:
        model = Reposting
        fields = ['reposting_id', 'reposting_user', 'relative_reposting_time',
                  'reposting_content', 'reposting_thumb_num', 'reposting_num',
                  'user_nickname', 'user_head', 'reply_posting', 'floor', 'formated_reposting_time']

    def get_formated_reposting_time(self, obj):
        return obj.reposting_time.strftime("%Y-%m-%d %H:%M:%S")

    def get_reposting_num(self, obj):
        return Posting.objects.filter(posting_id=obj.main_posting.posting_id)[0].reply_num

    def get_relative_reposting_time(self, obj):
        return calculate_relative_time(obj.reposting_time)

    def get_user_nickname(self, obj):
        return obj.reposting_user.nickname

    def get_user_head(self, obj):
        return obj.reposting_user.head

    def get_reply_posting(self, obj):
        if obj.reply_id == -1:
            return None
        else:
            reply_posting = Reposting.objects.filter(reposting_id=obj.reply_id)[0]
            return reply_posting.reposting_user.nickname, reply_posting.reposting_content

    def get_floor(self, obj):
        return obj.floor

class CategorySerializer(PartialUpdateSerializerMixin, ModelSerializer):
    relative_new_reply_time = serializers.SerializerMethodField(label='relative_new_reply_time')
    manager = serializers.SerializerMethodField(label='manager')

    class Meta:
        model = Category
        fields = ['category_id', 'category_content', 'posting_num',
                  'reposting_num', 'relative_new_reply_time', 'manager']

    def get_relative_new_reply_time(self, obj):
        return calculate_relative_time(obj.new_reply_time)

    def get_manager(self, obj):
        manager = []
        admin_set = Administration.objects.filter(category=obj.category_id)
        for admin in admin_set:
            user = User.objects.filter(user_id=admin.user_id).first()
            res = collections.OrderedDict()
            res['user_id'] = user.user_id
            res['nickname'] = user.nickname
            res['head'] = user.head
            manager.append(res)
        return manager