from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50, verbose_name="Nombre")
    order = models.IntegerField(default=0, verbose_name="Orden", help_text="Orden de aparición en el menú")

    class Meta:
        verbose_name = "Categoría"
        verbose_name_plural = "Categorías"
        ordering = ['order']

    def __str__(self):
        return self.name

class Tournament(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre")
    season = models.CharField(max_length=50, blank=True, verbose_name="Temporada")

    class Meta:
        verbose_name = "Torneo"
        verbose_name_plural = "Torneos"

    def __str__(self):
        return self.name

class Stadium(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre")
    address = models.CharField(max_length=200, blank=True, verbose_name="Dirección")
    photo = models.ImageField(upload_to='stadiums/', blank=True, null=True, verbose_name="Foto")

    class Meta:
        verbose_name = "Estadio"
        verbose_name_plural = "Estadios"

    def __str__(self):
        return self.name

class Team(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre")
    logo = models.ImageField(upload_to='logos/', blank=True, null=True, verbose_name="Escudo")
    is_rival = models.BooleanField(default=True, verbose_name="Es Rival", help_text="Marcar si es un equipo rival")

    class Meta:
        verbose_name = "Equipo"
        verbose_name_plural = "Equipos"

    def __str__(self):
        return self.name

class Squad(models.Model):
    # Campo 'name' eliminado para evitar redundancia
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name="Categoría")
    season = models.CharField(max_length=50, verbose_name="Temporada")
    is_active = models.BooleanField(default=True, verbose_name="Activo")
    group_photo = models.ImageField(upload_to='squads/', blank=True, null=True, verbose_name="Foto Grupal")

    class Meta:
        verbose_name = "Plantel"
        verbose_name_plural = "Planteles"

    def __str__(self):
        return f"{self.category.name} - {self.season}"

class Player(models.Model):
    POSITIONS = [
        ('GK', 'Arquero'),
        ('DEF', 'Defensor'),
        ('MID', 'Mediocampista'),
        ('FWD', 'Delantero'),
    ]
    
    squad = models.ForeignKey(Squad, on_delete=models.CASCADE, related_name='players', verbose_name="Plantel")
    first_name = models.CharField(max_length=100, verbose_name="Nombre")
    last_name = models.CharField(max_length=100, verbose_name="Apellido")
    nickname = models.CharField(max_length=50, blank=True, verbose_name="Apodo")
    position = models.CharField(max_length=3, choices=POSITIONS, verbose_name="Posición")
    jersey_number = models.PositiveIntegerField(null=True, blank=True, verbose_name="Dorsal")
    birth_date = models.DateField(null=True, blank=True, verbose_name="Fecha de Nacimiento")
    photo = models.ImageField(upload_to='players/', blank=True, null=True, verbose_name="Foto")
    
    class Meta:
        verbose_name = "Jugador"
        verbose_name_plural = "Jugadores"

    def __str__(self):
        return f"{self.last_name}, {self.first_name} ({self.position})"

class Staff(models.Model):
    ROLES = [
        ('HC', 'Director Técnico'),
        ('AC', 'Ayudante de Campo'),
        ('FT', 'Preparador Físico'),
        ('MD', 'Médico/Kinesiólogo'),
        ('KM', 'Utilero'),
    ]
    squad = models.ForeignKey(Squad, on_delete=models.CASCADE, related_name='staff', verbose_name="Plantel")
    full_name = models.CharField(max_length=150, verbose_name="Nombre Completo")
    role = models.CharField(max_length=2, choices=ROLES, verbose_name="Rol")
    photo = models.ImageField(upload_to='staff/', blank=True, null=True, verbose_name="Foto")

    class Meta:
        verbose_name = "Cuerpo Técnico"
        verbose_name_plural = "Cuerpo Técnico"

    def __str__(self):
        return f"{self.full_name} - {self.get_role_display()}"

class Match(models.Model):
    STATUS_CHOICES = [
        ('SCH', 'Programado'),
        ('LIV', 'En Juego'),
        ('FIN', 'Finalizado'),
        ('SUS', 'Suspendido'),
    ]
    
    date_time = models.DateTimeField(verbose_name="Fecha y Hora")
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, verbose_name="Torneo")
    stadium = models.ForeignKey(Stadium, on_delete=models.SET_NULL, null=True, verbose_name="Estadio")
    
    home_team = models.ForeignKey(Team, related_name='home_matches', on_delete=models.CASCADE, verbose_name="Local")
    away_team = models.ForeignKey(Team, related_name='away_matches', on_delete=models.CASCADE, verbose_name="Visitante")
    
    home_goals = models.PositiveIntegerField(default=0, verbose_name="Goles Local")
    away_goals = models.PositiveIntegerField(default=0, verbose_name="Goles Visitante")
    
    status = models.CharField(max_length=3, choices=STATUS_CHOICES, default='SCH', verbose_name="Estado")
    report = models.TextField(blank=True, verbose_name="Crónica", help_text="Resumen del partido")

    class Meta:
        verbose_name = "Partido"
        verbose_name_plural = "Partidos"

    def __str__(self):
        return f"{self.home_team} vs {self.away_team} ({self.date_time.date()})"