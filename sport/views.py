from django.shortcuts import render

def first_team(request):
    # Primera y Reserva
    return render(request, 'sport/first_team.html')

def youth_league(request):
    # Juveniles (Sub-13 a Sub-17)
    return render(request, 'sport/youth_league.html')

def junior_league(request):
    # Infantiles (Sub-7 a Sub-11)
    return render(request, 'sport/junior_league.html')

def fixtures(request):
    # Fixture
    return render(request, 'sport/fixtures.html')