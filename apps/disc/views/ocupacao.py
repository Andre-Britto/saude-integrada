import json
from datetime import datetime

from django.contrib.auth.decorators import login_required

from apps.account.views import ano
from apps.disc.models.ocupacao import Ocupacao, TipoOcupacao, OcupacaoLeitos
from django.contrib import messages
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.template.loader import render_to_string
from apps.disc.forms.forms import OcupacaoForm


@login_required(login_url='/accounts/login/')
def disc(request):
    if request.user.projeto.nome == 'Disc' or request.user.projeto.nome == 'Administrador':
        context = {
            'ano': ano
        }

        return render(request, 'diretorias/disc/home_disc.html', context)
    else:
        return render(request, 'home/permissao_negada.html')


@login_required(login_url='/accounts/login/')
def ocupacao_list(request):
    if request.user.projeto.nome == 'Disc' or request.user.projeto.nome == 'Administrador':
        ocupacao = Ocupacao.objects.raw(
            'select o.*, o.leito_disponivel, ((o.leito_ocupado):: float/(o.leito_disponivel):: float)*100 taxa '
            'from disc.ocupacao as o where o.status = 1')
        taxa_dia = Ocupacao.objects.raw('select t.*,'
                                        '(select ((o.leito_ocupado):: float/(o.leito_disponivel):: float)*100 taxa '
                                        'from disc.ocupacao as o where o.tipo_ocupacao_id = t.id and o.data_ocupacao = current_date)'
                                        'from disc.ocupacao_leito as t')
        taxa_geral = Ocupacao.objects.raw(
            'select 1 as id, (sum(o.leito_ocupado):: float/sum(o.leito_disponivel):: float)*100 as geral '
            'from disc.ocupacao as o where o.data_ocupacao = current_date ')
        tipo = TipoOcupacao.objects.filter(status=1).distinct()
        hoje = Ocupacao.objects.filter(data_ocupacao=datetime.now().strftime('%Y-%m-%d'))
        dias = list()
        for dia in hoje:
            dias.append(dia.tipo_ocupacao_id)

        mes = request.GET.get("mes")
        mes_atual = datetime.now().month
        if mes:
            ocupacaos = Ocupacao.objects.raw('select * from disc.taxa_ocupacao where extract(month from dia)= %s',
                                             [mes])
        else:
            ocupacaos = Ocupacao.objects.raw('select * from disc.taxa_ocupacao where extract(month from dia)= %s',
                                             [mes_atual])
        data = list()
        uti_covid_data = list()
        uti_geral_data = list()
        leito_covid_data = list()
        leito_geral_data = list()
        taxa_geral_data = list()
        for entry in ocupacaos:
            data.append(str(entry.dia))
            uti_covid_data.append(entry.uti_covid)
            uti_geral_data.append(entry.uti_geral)
            leito_covid_data.append(entry.leito_clinico_covid)
            leito_geral_data.append(entry.leito_clinico_geral)
            taxa_geral_data.append(entry.geral)
        plotOptions = {
            'line': {
                'dataLabels': {
                    'enabled': 'true',
                    'rotation': -90,
                    'color': '#FFFFFF',
                    'align': 'center',
                    'format': '{point.y:.1f}',
                    'y': 10,
                    'style': {
                        'fontSize': '10px',
                        'fontFamily': 'Verdana, sans-serif'
                    },
                }
            }
        }
        legend = {
            'align': 'right',
            'x': -30,
            'itemDistance': 35,
            'verticalAlign': 'top',
            'y': 0,
            'fontWeight': 'bold',
            'floating': 'true',
            'backgroundColor': 'white',
            'borderColor': 'white',
            'borderWidth': 1,
            'shadow': 'false',
            'useHTML': 'true'
        }
        uti_covid_series = {
            'name': 'UTI COVID-19',
            'data': uti_covid_data,
            'color': 'red'
        }
        uti_geral_series = {
            'name': 'UTI Geral',
            'data': uti_geral_data,
            'color': 'orange'
        }
        leito_covid_series = {
            'name': 'Leito Clínico COVID-19',
            'data': leito_covid_data,
            'color': 'green'
        }
        leito_geral_series = {
            'name': 'Leito Clínico Geral',
            'data': leito_geral_data,
            'color': 'blue'
        }
        taxa_geral_series = {
            'name': 'Taxa Geral',
            'data': taxa_geral_data,
            'color': 'black'
        }
        taxas_ocupacao = {
            'chart': {'type': 'line'},
            'plotOptions': plotOptions,
            'legend': legend,
            'title': {'text': 'Taxas de Ocupações por Mês'},
            'xAxis': {'categories': data},
            'yAxis': {
                'title': {
                    'text': 'Valor %'
                }
            },

            'tooltip': {
                'headerFormat': '<span style="font-size:12px; font-weight: bold; font-style:normal;">Data: {point.key}</span>'
                                '<table>',
                'pointFormat': '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                               '<td style="padding:0"><b>{point.y:.2f} %</b></td></tr>',
                'footerFormat': '</table>',
                'shared': 'true',
                'useHTML': 'true'
            },
            'series': [uti_covid_series, uti_geral_series, leito_covid_series, leito_geral_series, taxa_geral_series]
        }

        taxa_ocupacao = json.dumps(taxas_ocupacao)
        context = {
            'ocupacao': ocupacao,
            'tipos': tipo,
            'taxa': taxa_dia,
            'geral': taxa_geral,
            'ano': ano,
            'hoje': dias,
            'taxa_ocupacao': taxa_ocupacao
        }

        return render(request, 'diretorias/disc/ocupacao/ocupacao.html', context)
    else:
        return render(request, 'home/permissao_negada.html')


def save_ocupacao_form(request, form, template_name):
    data = dict()
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            data['form_is_valid'] = True
            ocupacao = Ocupacao.objects.all()
            data['html_ocupacao_list'] = render_to_string('diretorias/disc/ocupacao/ocupacao_list.html', {
                'ocupacao': ocupacao
            })
        else:
            data['form_is_valid'] = False
    context = {'form': form}
    data['html_form'] = render_to_string(template_name, context, request=request)
    return JsonResponse(data)


def ocupacao_create(request):
    if request.method == 'POST':
        hoje = Ocupacao.objects.filter(data_ocupacao=datetime.now().strftime('%Y-%m-%d'))
        dias = list()
        for dia in hoje:
            dias.append(dia.tipo_ocupacao_id)
        if str(request.POST['tipo_ocupacao']) in str(dias):
            messages.error(request, 'Tipo de Ocupação já foi inserido nessa data!!!')
            return redirect('/disc/ocupacao/')
        else:
            disponivel = OcupacaoLeitos.objects.values('quantidade').filter(
                tipo_ocupacao_id=request.POST['tipo_ocupacao'])
            ocupacao = Ocupacao(
                status=1,
                tipo_ocupacao_id=request.POST['tipo_ocupacao'],
                data_ocupacao=request.POST['data_ocupacao'],
                leito_ocupado=request.POST['leito_ocupado'],
                leito_disponivel=disponivel
            )
            ocupacao.save()
            messages.success(request, 'Ocupação Inserida com Sucesso!!!')
            return redirect('ocupacao')


def ocupacao_update(request, slug=None):
    ocupacao = get_object_or_404(Ocupacao, slug=slug)
    if request.method == 'POST':
        form = OcupacaoForm(request.POST, instance=ocupacao)
        messages.success(request, 'Ocupação Inserida com Sucesso!!!')
    else:
        form = OcupacaoForm(instance=ocupacao)
    return save_ocupacao_form(request, form, 'diretorias/disc/ocupacao/ocupacao_update.html')


def ocupacao_desativar(request, slug=None):
    if request.method == 'GET':
        ocupacao = Ocupacao.objects.get(slug=slug)
        ocupacao.delete()
        messages.success(request, 'Ocupação Excluida com Sucesso!!!')
    return redirect('ocupacao')


def leitos_create(request, slug=None):
    if request.method == 'GET':
        ocupacao = OcupacaoLeitos.objects.get(slug=slug)
        ocupacao.quantidade = request.POST['quantidade']
        messages.success(request, 'Quantidade de leitos atualizada com Sucesso!!!')
    return redirect('ocupacao')
