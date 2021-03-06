from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()

router.register('user', views.UserViewSet, base_name='user')
router.register('posting', views.PostingViewSet, base_name='posting')
router.register('reposting', views.RepostingViewSet, base_name='reposting')
router.register('category', views.CategoryViewSet, base_name='category')

urlpatterns = router.urls
urlpatterns += [
    path('login',views.login),
    path('register',views.register),
    path('agreement',views.agreement),
    path('password',views.password),
    path('posting/thumb',views.thumbposting),
    path('reposting/thumb',views.thumbreposting),
    path('head',views.head),
    path('resource',views.resource)
]