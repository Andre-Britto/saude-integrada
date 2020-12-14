import datetime
from django.shortcuts import render
from apps.ead.models import Curso


def ead(request):
    user = getattr(request, 'user', None)
    if user.projeto.ead == "EAD":
        curso = Curso.objects.filter(data_inicio__lte=datetime.date.today())
        ano = datetime.date.today()

        context = {
            'user': user,
            'ano': ano,
            'cursos': curso
        }
        return render(request, 'ead/ead_dashboard.html', context)
    else:
        return render(request, 'home/permissao_negada.html')