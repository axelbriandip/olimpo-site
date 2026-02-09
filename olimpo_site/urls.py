from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Rutas de Club (Incluye Home)
    path('', include('club.urls')),
    
    # Rutas de Sport (Prefijo 'futbol/')
    path('futbol/', include('sport.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)