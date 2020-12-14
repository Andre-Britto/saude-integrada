import datetime
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from apps.account.views import ano
from apps.divs.models.vigilancia.covid import *


def covid(request):
    return render(request, 'diretorias/divs/covid/covid.html', {'ano': ano})


def date_convert(date_to_convert):
    return datetime.datetime.strptime(date_to_convert, '%b %d,% Y').strftime(' % m / % d / % Y')


@login_required(login_url='/accounts/login/')
def semIdgeo(request):
    paciente = NotificaVS.objects.raw(
        'select v.load_id as id, l.id_loadcovid19,l.cod_notificacao notificacao, l.paciente, l.cep,'
        'l.logradouro, l.numero, l.bairro, l.classificacao_final, v.idgeo '
        'from pentaho.tb_loadcovid19 as l '
        'inner join divs.notifica_vs as v '
        'on l.id_loadcovid19 = v.load_id '
        'where (v.idgeo is null or v.idgeo = 0)'
    )
    return render(request, 'diretorias/divs/covid/semidgeo.html',
                  {'pacientes': paciente, 'ano': ano})


@login_required(login_url='/accounts/login/')
def altera_idgeo(request, pk=None):
    paci = NotificaVS.objects.get(id=pk)
    paciente = NotificaVS.objects.raw(
        'select v.load_id as id, l.id_loadcovid19,l.cod_notificacao notificacao, l.paciente, l.cep,'
        'l.logradouro, l.numero, l.bairro, l.classificacao_final, v.idgeo '
        'from pentaho.tb_loadcovid19 as l '
        'inner join divs.notifica_vs as v '
        'on l.id_loadcovid19 = v.load_id '
        'where (v.idgeo is null or v.idgeo = 0) and v.load_id = %s', [paci.id])

    logradouro = request.GET.get("logradouro")
    rua = {}
    for tt in paciente:
        rua = str(tt.logradouro)
    if request.method == 'GET':
        if logradouro:
            rua = NotificaVS.objects.raw(
                'select distinct i.id, l.nome as logradouro, i.numero , c.numero as cep '
                'from territorializacao.imoveis as i '
                'inner join territorializacao.logradouros as l on i.logradouro_id = l.id '
                'and upper(l.nome) like upper(%s) '
                'inner join territorializacao.cep as c on c.id = i.cep_id  '
                'order by numero',
                ['%' + logradouro + '%'])
        else:
            rua = NotificaVS.objects.raw(
                'select distinct i.id, l.nome as logradouro, i.numero , c.numero as cep '
                'from territorializacao.imoveis as i '
                'inner join territorializacao.logradouros as l on i.logradouro_id = l.id '
                'and upper(l.nome) like upper(%s) '
                'inner join territorializacao.cep as c on c.id = i.cep_id  '
                'order by numero',
                ['%' + rua + '%'])

        context = {
                'pacientes': paciente,
                'ruas': rua
            }
        return render(request, 'diretorias/divs/covid/alterar_idgeo.html', context)
    else:
        paciente = NotificaVS.objects.get(id=pk)
        paciente.idgeo = request.POST['idgeo']
        paciente.save()
        messages.success(request, 'IDGEO Inserido com Sucesso!!!')
    return redirect('/divs/semidgeo/')
