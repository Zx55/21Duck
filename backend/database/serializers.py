from rest_framework.serializers import ModelSerializer
from rest_framework_extensions.serializers import PartialUpdateSerializerMixin

from .models import *


class UserSerializer(PartialUpdateSerializerMixin, ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class PostingSerializer(PartialUpdateSerializerMixin, ModelSerializer):
    class Meta:
        model = Posting
        exclude = ['posting_id']

class RepostingSerializer(PartialUpdateSerializerMixin, ModelSerializer):
    class Meta:
        model = Reposting
        fields = '__all__'

