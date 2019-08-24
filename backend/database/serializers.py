from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework_extensions.serializers import PartialUpdateSerializerMixin

from .models import *


class UserSerializer(PartialUpdateSerializerMixin, ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class PostingSerializer(PartialUpdateSerializerMixin, ModelSerializer):
    posting_num = serializers.SerializerMethodField(label='posting_number')

    class Meta:
        model = Posting
        fields = ['posting_num', 'posting_user', 'posting_time', 'reply_time', 'reply_num',
                  'theme', 'posting_content', 'category', 'posting_thumb_num']

    def get_posting_num(self, obj):
        return Posting.objects.count()


class RepostingSerializer(PartialUpdateSerializerMixin, ModelSerializer):
    class Meta:
        model = Reposting
        fields = '__all__'
