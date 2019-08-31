import os
from urllib.request import urlopen

from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.viewsets import ModelViewSet
from rest_framework_extensions.cache.mixins import CacheResponseMixin
from rest_framework.response import Response

from .serializers import *
from .myfuncs import *


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
            category = request.GET.get('category_id')
            user = request.GET.get('user_id')
            EACH_PAGE = 15    #numbers for each page
            is_thumb_list = []

            if page and category and user:
                page = int(page)
                category = int(category)
                number = Posting.objects.filter(category_id=category).count()
                if category != 0:
                    self.queryset = Posting.objects.filter(category_id=category).order_by("-reply_time")[page * EACH_PAGE : (page + 1) * EACH_PAGE]
                else:
                    self.queryset = Posting.objects.all().order_by("-reply_time")[page * EACH_PAGE : (page + 1) * EACH_PAGE]
                if user == '0':
                    is_thumb_list = [False for _ in range(number)]
                else:
                    is_thumb_list = []
                    for posting in self.queryset:
                        if ThumbPosting.objects.filter(posting_id=posting.posting_id, user_id=user):
                            is_thumb_list.append(True)
                        else:
                            is_thumb_list.append(False)
            elif page and user:
                page = int(page)
                number = Posting.objects.filter(posting_user=user).count()
                self.queryset = Posting.objects.filter(posting_user=user).order_by("-reply_time")[page * EACH_PAGE : (page + 1) * EACH_PAGE]
            else:
                return Response(False)

            queryset = self.filter_queryset(self.get_queryset())

            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True)
            return Response({
                'postings': serializer.data,
                'posting_num': number,
                'thumbs': is_thumb_list
            })

    def retrieve(self, request, *args, **kwargs):
        category = request.GET.get('category_id')
        user = request.GET.get('user_id')
        is_thumb = False
        instance = self.get_object()

        if instance.category_id == int(category):
            if ThumbPosting.objects.filter(posting_id=instance.posting_id, user_id=user):
                is_thumb = True
            serializer = self.get_serializer(instance)
            return Response({
                    'posting' : serializer.data,
                    'thumb' : is_thumb
                    })
        else:
            return Response(False)

class RepostingViewSet(CacheResponseMixin, ModelViewSet):
    queryset = Reposting.objects.all()
    serializer_class = RepostingSerializer

    def list(self, request, *args, **kwargs):
        if request.method == 'GET':
            page = request.GET.get('page')
            posting = request.GET.get('posting_id')
            category = request.GET.get('category_id')
            user = request.GET.get('user_id')
            EACH_PAGE = 15
            if page and posting and category and user:
                if Posting.objects.get(posting_id=posting).category_id != int(category):
                    return Response(False)
                else:
                    number = Posting.objects.get(posting_id=posting).reply_num
                    page = int(page)
                    posting = int(posting)
                    if user == '0':
                        is_thumb_list = [False for _ in range(number)]
                        self.queryset = Reposting.objects.filter(main_posting=posting).order_by("-reposting_time")[page * EACH_PAGE : (page + 1) * EACH_PAGE]
                    else:
                        is_thumb_list = []
                        self.queryset = Reposting.objects.filter(main_posting=posting).order_by("-reposting_time")[page * EACH_PAGE : (page + 1) * EACH_PAGE]
                        for reposting in self.queryset:
                            if ThumbReposting.objects.filter(reposting_id=reposting.reposting_id, user_id=user):
                                is_thumb_list.append(True)
                            else:
                                is_thumb_list.append(False)
            else:
                return Response(False)

            queryset = self.filter_queryset(self.get_queryset())

            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True)

            return Response({
                'repostings': serializer.data,
                'reposting_num': number,
                'thumbs': is_thumb_list
            })

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
                'scores' : return_user.scores,
                'register' : return_user.register,
                'blocktime' : return_user.blocktime,
                'identity' : return_user.identify,
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
        identify = 3   # 0 not sign in ; 1 normal user ; 2 manager ; 3 newly registering uer
        blocktime = 0
        scores = 0
        cover = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        if User.objects.filter(user_id=user):
            return JsonResponse({'register_status':'Username already exists'})
        else:
            User.objects.create(user_id=user,password=encrypt_md5(pwd),
                                head=head,nickname=nickname,identify=identify,
                                blocktime=blocktime,scores=scores,cover=cover)
            return JsonResponse({'register_status':'success'})
    else:
        return JsonResponse({'Error':'Request method error'})

@csrf_exempt
def agreement(request):
    url = 'http://114.115.204.217:7500/newhand.txt'
    if request.method == 'GET':
        text = str(urlopen(url).read(), 'utf-8').encode("utf-8").decode("utf-8")
        return JsonResponse({'content':text})

@csrf_exempt
def password(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        new_password = request.POST.get('new_password')
        old_password = request.POST.get('old_password')

        if User.objects.filter(user_id=username, password=encrypt_md5(old_password)):
            User.objects.filter(user_id=username).update(password=encrypt_md5(new_password))
            return JsonResponse({'success':True})
        else:
            return JsonResponse({'success':False})

@csrf_exempt
def thumbposting(request):
    if request.method == 'POST':
        user = request.POST.get('user_id')
        posting = request.POST.get('posting_id')
        ThumbPosting.objects.create(user_id=user, posting_id=posting)
        return JsonResponse({'create':'success'})
    elif request.method == 'DELETE':
        user = request.GET.get('user_id')
        posting = request.GET.get('posting_id')
        ThumbPosting.objects.filter(user_id=user, posting_id=posting).delete()
        return JsonResponse({'delete':'success'})
    else:
        return JsonResponse({'operation':False})

@csrf_exempt
def thumbreposting(request):
    if request.method == 'POST':
        user = request.POST.get('user_id')
        reposting = request.POST.get('reposting_id')
        ThumbReposting.objects.create(user_id=user, reposting_id=reposting)
        return JsonResponse({'create': 'success'})
    elif request.method == 'DELETE':
        user = request.GET.get('user_id')
        reposting = request.GET.get('reposting_id')
        ThumbReposting.objects.filter(user_id=user, reposting_id=reposting).delete()
        return JsonResponse({'delete': 'success'})
    else:
        return JsonResponse({'operation':False})