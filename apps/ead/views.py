import datetime

from django.shortcuts import render
from apps.ead.models import Curso


def ead(request):
    curso = Curso.objects.filter(data_inicio__lte=datetime.date.today())
    return render(request, 'ead/ead_home.html', {'cursos': curso})
