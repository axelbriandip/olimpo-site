from django.contrib import admin
from .models import News, HistoryEvent, BoardMember, GalleryAlbum, GalleryPhoto

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'published_at', 'is_published')
    list_filter = ('is_published', 'published_at')
    search_fields = ('title',)

@admin.register(HistoryEvent)
class HistoryEventAdmin(admin.ModelAdmin):
    list_display = ('year', 'title')
    ordering = ('year',)

@admin.register(BoardMember)
class BoardMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'order')
    list_editable = ('order',) # Permite editar el orden rápido desde la lista

class GalleryPhotoInline(admin.TabularInline):
    model = GalleryPhoto
    extra = 1

@admin.register(GalleryAlbum)
class GalleryAlbumAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    inlines = [GalleryPhotoInline] # Permite cargar fotos DENTRO del álbum directamente