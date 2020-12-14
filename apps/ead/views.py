import datetime
from django.shortcuts import render
from apps.ead.models import Curso
from django.contrib.auth.decorators import login_required
from apps.ead.models import Pessoa


@login_required(login_url='/accounts/login/')
def ead(request):
    user = getattr(request, 'user', None)
    professor = Pessoa.objects.filter(user_id=user.id, acesso=1) and Pessoa.objects.filter(acesso=1).first()
    if professor:
        curso = Curso.objects.filter(data_inicio__lte=datetime.date.today())
        ano = datetime.date.today()

        context = {
            'user': user,
            'ano': ano,
            'cursos': curso,
            'professores': professor
        }
        return render(request, 'ead/ead_dashboard.html', context)
    else:
        return render(request, 'ead/ead_home.html')
