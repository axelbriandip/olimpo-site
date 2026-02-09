from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from club.views import home  # <--- Importamos la vista que acabamos de crear

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),  # <--- Ruta vacía = Página de inicio
]

# Esto es para que se vean las fotos que subas en modo desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)