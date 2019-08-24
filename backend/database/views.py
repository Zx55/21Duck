from rest_framework.viewsets import ModelViewSet
from rest_framework_extensions.cache.mixins import CacheResponseMixin
from rest_framework.response import Response

from .serializers import *


class UserViewSet(CacheResponseMixin, ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class PostingViewSet(CacheResponseMixin, ModelViewSet):
    queryset = Posting.objects.all()
    serializer_class = PostingSerializer


    # 15pages for each showing
    def list(self, request, *args, **kwargs):
        if request.method == 'GET':
            page = request.GET.get('page')
            category = request.GET.get('category')
            EACH_PAGE = 15    #numbers for each page

            if page and category:
                page = int(page)
                category = int(category)
                if category != 0:
                    self.queryset = Posting.objects.filter(category_id=category).order_by("-reply_time")[page * EACH_PAGE : (page + 1) * EACH_PAGE]
                else:
                    self.queryset = Posting.objects.all().order_by("-reply_time")[page * EACH_PAGE : (page + 1) * EACH_PAGE]
            else:
                return Response(False)

            queryset = self.filter_queryset(self.get_queryset())

            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

class RepostingViewSet(CacheResponseMixin, ModelViewSet):
    queryset = Reposting.objects.all()
    serializer_class = RepostingSerializer

class CategoryViewSet(CacheResponseMixin, ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

