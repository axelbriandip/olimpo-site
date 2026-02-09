from django.shortcuts import render

# --- HOME VIEW ---
def home(request):
    return render(request, 'home.html')

# --- INSTITUTIONAL VIEWS ---
def history(request):
    # El archivo se llama history.html
    return render(request, 'club/history.html')

def board(request):
    # Directiva -> board.html
    return render(request, 'club/board.html')

def statute(request):
    return render(request, 'club/statute.html')

def contact(request):
    return render(request, 'club/contact.html')

# --- NEWS & MEDIA VIEWS ---
def news_list(request):
    return render(request, 'club/news_list.html')

def gallery(request):
    return render(request, 'club/gallery.html')

def videos(request):
    return render(request, 'club/videos.html')