from rest_framework.viewsets import ModelViewSet
from rest_framework_extensions.cache.mixins import CacheResponseMixin

from .serializers import *


class UserViewSet(CacheResponseMixin, ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PostingViewSet(CacheResponseMixin, ModelViewSet):
    queryset = Posting.objects.all()
    serializer_class = PostingSerializer

    #todo based on pages return 20 records.


class RepostingViewSet(CacheResponseMixin, ModelViewSet):
    queryset = Reposting.objects.all()
    serializer_class = PostingSerializer

