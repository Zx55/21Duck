import collections
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework_extensions.serializers import PartialUpdateSerializerMixin

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
    user_nickname = serializers.SerializerMethodField(label='user_nickname')
    user_head = serializers.SerializerMethodField(label='user_head')

    class Meta:
        model = Posting
        fields = ['posting_id', 'user_head','posting_num', 'posting_user', 'user_nickname',
                  'relative_posting_time', 'relative_reply_time', 'reply_num',
                  'theme', 'posting_content', 'category_id', 'posting_thumb_num']

    def get_posting_num(self, obj):
        return Posting.objects.count()

    def get_relative_posting_time(self, obj):
        return calculate_relative_time(obj.posting_time)

    def get_relative_reply_time(self, obj):
        return calculate_relative_time(obj.reply_time)

    def get_user_nickname(self, obj):
        return obj.posting_user.nickname

    def get_user_head(self, obj):
        return obj.posting_user.head

class RepostingSerializer(PartialUpdateSerializerMixin, ModelSerializer):
    class Meta:
        model = Reposting
        fields = '__all__'

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