
from django.urls import path
from .views import ObjectDetectionView

urlpatterns = [
    path('upload/', ObjectDetectionView.as_view(), name='upload_image'),
    # other paths for detection app
]