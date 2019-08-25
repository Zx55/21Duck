from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
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

    def list(self, request, *args, **kwargs):
        if request.method == 'GET':
            page = request.GET.get('page')
            posting_id = request.GET.get('posting_id')
            if page and posting_id:
                page = int(page)
                posting_id = int(posting_id)
                if page == 0:
                    EACH_PAGE = 14
                else:
                    EACH_PAGE = 15
                self.queryset = Reposting.objects.filter(main_posting=posting_id).order_by("-reposting_time")[page * EACH_PAGE : (page + 1) * EACH_PAGE]
            else:
                return Response(False)

            queryset = self.filter_queryset(self.get_queryset())

            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

class CategoryViewSet(CacheResponseMixin, ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

@csrf_exempt
def login(request):
    if request.method == 'POST':
        user = request.POST.get('username')
        pwd = request.POST.get('password')
        if User.objects.filter(user_id=user, password=encrypt_md5(pwd)):
            return_user = User.objects.filter(user_id=user)[0]
            return_json = {
                'success' : True,
                'user_nickname' : return_user.nickname,
                'user_head' : return_user.head,
                'user_id' : user,
                'identify' : return_user.identify,
                'scores' : none_filter(return_user.scores),
                'register' : none_filter(return_user.register),
                'blocktime' : none_filter(return_user.blocktime)
            }
            return JsonResponse(return_json)
        else:
            return JsonResponse({'success':False})
    else:
        return JsonResponse({'Error':'Request method error'})

@csrf_exempt
def register(request):
    if request.method == 'POST':
        user = request.POST.get('username')
        pwd = request.POST.get('password')
        nickname = request.POST.get('nickname')
        head = 'https://b-ssl.duitang.com/uploads/item/201805/31/20180531220859_wufxi.jpg'
        identify = 1
        blocktime = 0
        scores = 0
        if User.objects.filter(user_id=user):
            return JsonResponse({'register_status':'Username already exists'})
        else:
            User.objects.create(user_id=user,password=encrypt_md5(pwd),
                                head=head,nickname=nickname,identify=identify,
                                blocktime=blocktime,scores=scores)
            return JsonResponse({'register_status':'success'})
    else:
        return JsonResponse({'Error':'Request method error'})