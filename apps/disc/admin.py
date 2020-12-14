from django.contrib import admin

from apps.disc.models.ocupacao import *


@admin.register(TipoOcupacao)
class TipoOcupacaoAdmin(admin.ModelAdmin):
    search_fields = ('nome', 'status')


@admin.register(OcupacaoLeitos)
class OcupacaoLeitoAdmin(admin.ModelAdmin):
    search_fields = ('tipo_ocupacao', 'status')
