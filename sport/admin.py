from django.contrib import admin
from .models import Category, Tournament, Stadium, Team, Squad, Player, Staff, Match

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')

@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = ('name', 'season')

@admin.register(Stadium)
class StadiumAdmin(admin.ModelAdmin):
    list_display = ('name', 'address')

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_rival')
    list_filter = ('is_rival',)

@admin.register(Squad)
class SquadAdmin(admin.ModelAdmin):
    # Quitamos 'name' de la lista
    list_display = ('category', 'season', 'is_active')
    list_filter = ('category', 'is_active')

@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('last_name', 'first_name', 'position', 'squad', 'jersey_number')
    list_filter = ('squad', 'position')
    search_fields = ('last_name', 'first_name')

@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'role', 'squad')
    list_filter = ('role', 'squad')

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ('date_time', 'home_team', 'away_team', 'status', 'tournament')
    list_filter = ('status', 'tournament')
    date_hierarchy = 'date_time'