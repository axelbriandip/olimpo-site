from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    
    # URL en Español (Browser) -> Vista en Inglés (Código)
    path('historia/', views.history, name='history'),
    path('directiva/', views.board, name='board'),
    path('estatuto/', views.statute, name='statute'),
    path('contacto/', views.contact, name='contact'),
    
    path('noticias/', views.news_list, name='news_list'),
    path('galeria/', views.gallery, name='gallery'),
    path('videos/', views.videos, name='videos'),
]