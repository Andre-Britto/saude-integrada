from datetime import datetime
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

ano = datetime.now()


@login_required(login_url='/accounts/login/')
def home(request):
    template_name = 'home/home.html'
    user = getattr(request, 'user', None)
    context = {
        'user': user,
        'ano': ano
    }
    return render(request, template_name, context)


@login_required(login_url='/admin/login/')
def log_out(request):
    logout(request)
    return redirect('/')