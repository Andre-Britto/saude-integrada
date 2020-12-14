from django import forms

from apps.disc.models.ocupacao import *


class OcupacaoForm(forms.ModelForm):
    class Meta:
        model = Ocupacao
        fields = ('tipo_ocupacao', 'data_ocupacao', 'leito_disponivel', 'leito_ocupado')
        widgets = {
            'tipo_ocupacao': forms.Select(attrs={'class': 'form-control', 'title': 'Tipo de Ocupação'}),

            'data_ocupacao': forms.DateInput(attrs={
                'type': 'date',
                'data-provide': 'datepicker',
                'data-date-format': 'yyyy-mm-dd', 'title': 'Data da Ocupação'
            },
                format='%Y-%m-%d'),
            'leito_disponivel': forms.TextInput(
                attrs={'min': '0', 'class': 'form-control', 'title': 'Leitos Disponivel'}),
            'leito_ocupado': forms.TextInput(
                attrs={'min': '0', 'class': 'form-control', 'title': 'Leitos Ocupados'}),

        }

    def __init__(self, *args, **kwargs):
        super(OcupacaoForm, self).__init__(*args, **kwargs)
        self.fields['tipo_ocupacao'].queryset = TipoOcupacao.objects.filter(status=1)
