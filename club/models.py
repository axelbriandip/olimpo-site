from django.db import models
from sport.models import Player, Match 

class News(models.Model):
    title = models.CharField(max_length=200, verbose_name="Título")
    summary = models.CharField(max_length=300, verbose_name="Bajada", help_text="Breve resumen")
    content = models.TextField(verbose_name="Contenido")
    published_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Publicación")
    cover_image = models.ImageField(upload_to='news/', verbose_name="Imagen de Portada")
    is_published = models.BooleanField(default=True, verbose_name="Publicada")
    
    related_player = models.ForeignKey(Player, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Jugador Relacionado")
    related_match = models.ForeignKey(Match, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Partido Relacionado")

    class Meta:
        verbose_name = "Noticia"
        verbose_name_plural = "Noticias"

    def __str__(self):
        return self.title

class HistoryEvent(models.Model):
    year = models.IntegerField(verbose_name="Año")
    title = models.CharField(max_length=150, verbose_name="Título")
    description = models.TextField(verbose_name="Descripción")
    photo = models.ImageField(upload_to='history/', blank=True, null=True, verbose_name="Foto")

    class Meta:
        verbose_name = "Hito Histórico"
        verbose_name_plural = "Historia del Club"
        ordering = ['year']

    def __str__(self):
        return f"{self.year} - {self.title}"

class BoardMember(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre")
    role = models.CharField(max_length=100, verbose_name="Cargo") # Ej: Presidente
    photo = models.ImageField(upload_to='board/', blank=True, null=True, verbose_name="Foto")
    order = models.PositiveIntegerField(default=99, verbose_name="Orden Jerárquico")
    period = models.CharField(max_length=50, blank=True, verbose_name="Período", help_text="Ej: 2024-2028")

    class Meta:
        verbose_name = "Directivo"
        verbose_name_plural = "Comisión Directiva"
        ordering = ['order']

    def __str__(self):
        return f"{self.role}: {self.name}"

class GalleryAlbum(models.Model):
    title = models.CharField(max_length=100, verbose_name="Título")
    date = models.DateField(verbose_name="Fecha")
    cover = models.ImageField(upload_to='gallery_covers/', verbose_name="Portada")

    class Meta:
        verbose_name = "Álbum de Fotos"
        verbose_name_plural = "Galería de Fotos"

    def __str__(self):
        return self.title

class GalleryPhoto(models.Model):
    album = models.ForeignKey(GalleryAlbum, related_name='photos', on_delete=models.CASCADE, verbose_name="Álbum")
    image = models.ImageField(upload_to='gallery_photos/', verbose_name="Imagen")
    caption = models.CharField(max_length=200, blank=True, verbose_name="Descripción")

    class Meta:
        verbose_name = "Foto de Galería"
        verbose_name_plural = "Fotos de Galería"

    def __str__(self):
        return f"Foto de {self.album.title}"