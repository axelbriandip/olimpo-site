from django.urls import path
from . import views

urlpatterns = [
    # URL (Español) -> View (Inglés)
    path('primera/', views.first_team, name='first_team'),
    
    # Juveniles
    path('juveniles/', views.youth_league, name='youth_league'),
    
    # Infantiles
    path('infantiles/', views.junior_league, name='junior_league'),
    
    path('fixture/', views.fixtures, name='fixtures'),
]