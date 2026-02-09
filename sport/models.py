from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50) # Ej: Primera, Reserva
    order = models.IntegerField(default=0, help_text="Orden de aparición en el menú")

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Tournament(models.Model):
    name = models.CharField(max_length=100) # Ej: Apertura 2024
    season = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name

class Stadium(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200, blank=True)
    photo = models.ImageField(upload_to='stadiums/', blank=True, null=True)

    def __str__(self):
        return self.name

class Team(models.Model):
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='logos/', blank=True, null=True) # Escudo
    is_rival = models.BooleanField(default=True, help_text="Marcar si es un equipo rival")

    def __str__(self):
        return self.name

class Squad(models.Model): # Antes "Plantel"
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    season = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    group_photo = models.ImageField(upload_to='squads/', blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.season}"

class Player(models.Model):
    POSITIONS = [
        ('GK', 'Goalkeeper'), # Arquero
        ('DEF', 'Defender'),
        ('MID', 'Midfielder'),
        ('FWD', 'Forward'),   # Delantero
    ]
    
    squad = models.ForeignKey(Squad, on_delete=models.CASCADE, related_name='players')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    nickname = models.CharField(max_length=50, blank=True)
    position = models.CharField(max_length=3, choices=POSITIONS)
    jersey_number = models.PositiveIntegerField(null=True, blank=True) # Dorsal
    birth_date = models.DateField(null=True, blank=True)
    photo = models.ImageField(upload_to='players/', blank=True, null=True)
    
    def __str__(self):
        return f"{self.last_name}, {self.first_name} ({self.position})"

class Staff(models.Model): # Cuerpo Técnico
    ROLES = [
        ('HC', 'Head Coach'),       # DT
        ('AC', 'Assistant Coach'),  # Ayudante
        ('FT', 'Fitness Coach'),    # PF
        ('MD', 'Medic/Physio'),     # Médico
        ('KM', 'Kitman'),           # Utilero
    ]
    squad = models.ForeignKey(Squad, on_delete=models.CASCADE, related_name='staff')
    full_name = models.CharField(max_length=150)
    role = models.CharField(max_length=2, choices=ROLES)
    photo = models.ImageField(upload_to='staff/', blank=True, null=True)

    class Meta:
        verbose_name_plural = "Staff"

    def __str__(self):
        return f"{self.full_name} - {self.get_role_display()}"

class Match(models.Model):
    STATUS_CHOICES = [
        ('SCH', 'Scheduled'),  # Programado
        ('LIV', 'Live'),       # En Vivo
        ('FIN', 'Finished'),   # Finalizado
        ('SUS', 'Suspended'),  # Suspendido
    ]
    
    date_time = models.DateTimeField()
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    stadium = models.ForeignKey(Stadium, on_delete=models.SET_NULL, null=True)
    
    # Teams
    home_team = models.ForeignKey(Team, related_name='home_matches', on_delete=models.CASCADE)
    away_team = models.ForeignKey(Team, related_name='away_matches', on_delete=models.CASCADE)
    
    # Score
    home_goals = models.PositiveIntegerField(default=0)
    away_goals = models.PositiveIntegerField(default=0)
    
    status = models.CharField(max_length=3, choices=STATUS_CHOICES, default='SCH')
    report = models.TextField(blank=True, help_text="Crónica o resumen del partido")

    class Meta:
        verbose_name_plural = "Matches"

    def __str__(self):
        return f"{self.home_team} vs {self.away_team} ({self.date_time.date()})"