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
    related_posting_time = serializers.SerializerMethodField(label='related_posting_time')
    related_reply_time = serializers.SerializerMethodField(label='related_reply_time')

    class Meta:
        model = Posting
        fields = ['posting_num', 'posting_user', 'related_posting_time', 'related_reply_time', 'reply_num',
                  'theme', 'posting_content', 'category_id', 'posting_thumb_num']

    def get_posting_num(self, obj):
        return Posting.objects.count()

    def get_related_posting_time(self, obj):
        return calculate_related_time(obj.posting_time)

    def get_related_reply_time(self, obj):
        return calculate_related_time(obj.reply_time)


"""
add new prop to serializer output
"""


class RepostingSerializer(PartialUpdateSerializerMixin, ModelSerializer):
    class Meta:
        model = Reposting
        fields = '__all__'
