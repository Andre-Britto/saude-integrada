from django.shortcuts import render, redirect

from apps.account.views import ano


def divs(request):
    return render(request, 'diretorias/divs/home_divs.html', {'ano': ano})
