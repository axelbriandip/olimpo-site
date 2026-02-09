from django.db import models
from sport.models import Player, Match 

class News(models.Model):
    title = models.CharField(max_length=200)
    summary = models.CharField(max_length=300, help_text="Bajada o resumen corto")
    content = models.TextField()
    published_at = models.DateTimeField(auto_now_add=True)
    cover_image = models.ImageField(upload_to='news/')
    is_published = models.BooleanField(default=True)
    
    # Relaciones opcionales
    related_player = models.ForeignKey(Player, on_delete=models.SET_NULL, null=True, blank=True)
    related_match = models.ForeignKey(Match, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        verbose_name_plural = "News"

    def __str__(self):
        return self.title

class HistoryEvent(models.Model):
    year = models.IntegerField()
    title = models.CharField(max_length=150)
    description = models.TextField()
    photo = models.ImageField(upload_to='history/', blank=True, null=True)

    class Meta:
        ordering = ['year']

    def __str__(self):
        return f"{self.year} - {self.title}"

class BoardMember(models.Model): # Directivos
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100) # Cargo (Presidente, etc.)
    photo = models.ImageField(upload_to='board/', blank=True, null=True)
    order = models.PositiveIntegerField(default=99, help_text="Orden de jerarquía")
    period = models.CharField(max_length=50, blank=True, help_text="Ej: 2024-2028")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.role}: {self.name}"

class GalleryAlbum(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateField()
    cover = models.ImageField(upload_to='gallery_covers/')

    def __str__(self):
        return self.title

class GalleryPhoto(models.Model):
    album = models.ForeignKey(GalleryAlbum, related_name='photos', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='gallery_photos/')
    caption = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return f"Photo from {self.album.title}"