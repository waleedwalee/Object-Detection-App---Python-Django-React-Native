import os
import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from django.conf import settings
from ultralytics import YOLO
from .serializers import ImageUploadSerializer
import time

# Initialize the logger
logger = logging.getLogger(__name__)

class ObjectDetectionView(APIView):
    def post(self, request):
        logger.info("Received a request for object detection")

        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid():
            image = serializer.validated_data['image']
            logger.info(f"Image received: {image.name}, size: {image.size}")

            try:
                # Save the uploaded image
                timestamp = int(time.time())  # Generate a unique timestamp
                image_name = f"{timestamp}_{image.name}"
                image_path = os.path.join(default_storage.location, 'uploads', image_name)
                with default_storage.open(image_path, 'wb+') as file:
                    file.write(image.read())
                    logger.info(f"Image saved to: {image_path}")

                    # Load YOLOv8 model and perform detection
                    model = YOLO('yolov8s.pt')  # Ensure the model path is correct
                    results = model.predict(source=image_path)  # Perform detection
                    logger.info(f"Detection results: {results}")

                    # Assuming you want to save and return an annotated image
                    output_image_path = os.path.join(default_storage.location, 'uploads', 'annotated_' + image_name)
                    results[0].save(output_image_path)  # Save the annotated image
                    logger.info(f"Annotated image saved to: {output_image_path}")

                    # Prepare the response URL
                    annotated_image_url = os.path.join(settings.MEDIA_URL, 'uploads', 'annotated_' + image_name)

                    # Extract detected objects
                    detected_objects = []
                    for obj in results[0].boxes:
                        detected_objects.append({
                            'name': model.names[obj.cls.item()],  # Fetching the object name using class id
                            'confidence': obj.conf.item()
                        })
                    logger.info(f"Detected objects: {detected_objects}")

                    response_data = {
                        'result_image_url': request.build_absolute_uri(annotated_image_url),
                        'detected_objects': detected_objects
                    }

                    return Response(response_data, status=status.HTTP_200_OK)

            except Exception as e:
                logger.error(f"Error during object detection: {str(e)}")
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            logger.error(f"Serializer errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        logger.info("Object detection completed successfully")
        return Response(status=status.HTTP_200_OK)
