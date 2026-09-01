# from django.contrib import admin
# from django.urls import path, include
# from django.conf import settings
# from django.conf.urls.static import static

# urlpatterns = [
#     path("admin/", admin.site.urls),
#     path("api/", include("portfolio.urls")),
# ]

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

# Simple status view for the root endpoint
def health_check(request):
    return JsonResponse({"status": "ok", "message": "API is running"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', health_check),  # Handles the root URL '/'
    path('api/', include('https://wasihun-teferi.vercel.app/.urls')),  # Include your app routes
]