from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()

router.register('user', views.UserViewSet, base_name='user')
router.register('posting', views.PostingViewSet, base_name='posting')

urlpatterns = router.urls