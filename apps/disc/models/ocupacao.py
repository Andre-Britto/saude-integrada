import uuid

from django.db import models

from django.urls import reverse

from apps.account.models import FollowUserModel


class TipoOcupacao(FollowUserModel):
    nome = models.CharField(max_length=255, blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Slug")

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        if is_new:
            super(TipoOcupacao, self).save()
            self.slug = uuid.uuid4()

        super(TipoOcupacao, self).save(*args, **kwargs)

    def __str__(self):
        return self.nome

    def get_absolute_url(self):
        return reverse('events.views.details', args=[str(self.id)])

    class Meta:
        verbose_name_plural = 'Tipo de Ocupação'
        db_table = u'tipo_ocupacao'


class OcupacaoLeitos(FollowUserModel):
    tipo_ocupacao = models.ForeignKey(TipoOcupacao, blank=True, null=True, on_delete=models.CASCADE)
    quantidade = models.IntegerField(blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Slug")

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        if is_new:
            super(OcupacaoLeitos, self).save()
            self.slug = uuid.uuid4()

        super(OcupacaoLeitos, self).save(*args, **kwargs)

    def __int__(self):
        return self.tipo_ocupacao_id

    def get_absolute_url(self):
        return reverse('events.views.details', args=[str(self.id)])

    class Meta:
        verbose_name_plural = 'Quantidade de Ocupações'
        db_table = u'ocupacao_leito'


class Ocupacao(FollowUserModel):
    tipo_ocupacao = models.ForeignKey(TipoOcupacao, blank=True, null=True, on_delete=models.CASCADE)
    data_ocupacao = models.DateField()
    leito_ocupado = models.IntegerField(blank=True, null=True)
    leito_disponivel = models.IntegerField(blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Slug")

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        if is_new:
            super(Ocupacao, self).save()
            self.slug = uuid.uuid4()

        super(Ocupacao, self).save(*args, **kwargs)

    def __str__(self):
        return self.tipo_ocupacao

    def get_absolute_url(self):
        return reverse('events.views.details', args=[str(self.id)])

    class Meta:
        verbose_name_plural = 'Ocupação'
        db_table = u'ocupacao'
