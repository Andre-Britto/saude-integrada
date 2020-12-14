from cpf_field.models import CPFField
from django.db import models
import uuid
from django.urls import reverse
from apps.account.models import FollowUserModel, User

ACESSO_CHOICES = (
    (1, 'Professor'),
    (0, 'Aluno'),
)


class Setor(FollowUserModel):
    secretaria = models.CharField(max_length=255, verbose_name="Secretaria")
    diretoria = models.CharField(max_length=255, verbose_name="Diretoria")
    divisao = models.CharField(max_length=255, verbose_name="Divisão")
    setor = models.CharField(max_length=255, verbose_name="Setor")
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Slug")

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        if is_new:
            super(Setor, self).save()
            self.slug = uuid.uuid4()

        super(Setor, self).save(*args, **kwargs)

    def __str__(self):
        return self.setor

    def get_absolute_url(self):
        return reverse('events.views.details', args=[str(self.id)])

    class Meta:
        verbose_name_plural = 'Setores'
        db_table = u'setor'


class Pessoa(FollowUserModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Usuário')
    acesso = models.IntegerField(choices=ACESSO_CHOICES, null=True, blank=True, verbose_name="Tipo de Acesso")
    nome = models.CharField(max_length=255, verbose_name="Nome")
    data_nascimento = models.DateField(verbose_name="Data de Nascimento")
    cpf = CPFField(verbose_name="CPF")
    email = models.EmailField(verbose_name="Email")
    whats = models.CharField(max_length=15, verbose_name="WhatsApp")
    setor = models.ForeignKey(Setor, on_delete=models.CASCADE, verbose_name='Setor')
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Slug")

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        if is_new:
            super(Pessoa, self).save()
            self.slug = uuid.uuid4()

        super(Pessoa, self).save(*args, **kwargs)

    def __str__(self):
        return self.nome

    def get_absolute_url(self):
        return reverse('events.views.details', args=[str(self.id)])

    class Meta:
        verbose_name_plural = 'Pessoas'
        db_table = u'pessoa'
