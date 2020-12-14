from django.db import models
from django.conf import settings
import uuid

from django.urls import reverse

from apps.account.models import FollowUserModel, User


class Curso(FollowUserModel):
    nome = models.CharField(max_length=255, verbose_name="Nome do Curso")
    description = models.TextField(verbose_name="Descrição Simples", blank=True)
    about = models.TextField(verbose_name="Sobre o Curso", blank=True)
    data_inicio = models.DateField(verbose_name='Data de Início', null=True, blank=True)
    image = models.ImageField(upload_to='courses/images', verbose_name='Imagem do Curso', null=True, blank=True)
    professor = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Usuário')
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Slug")

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        if is_new:
            super(Curso, self).save()
            self.slug = uuid.uuid4()

        super(Curso, self).save(*args, **kwargs)

    def __str__(self):
        return self.nome

    def get_absolute_url(self):
        return reverse('events.views.details', args=[str(self.id)])

    class Meta:
        verbose_name_plural = 'Cursos'
        db_table = u'curso'


class Aula(FollowUserModel):
    nome = models.CharField(verbose_name="Nome", max_length=100)
    description = models.TextField(verbose_name='Descrição', blank=True)
    ordem = models.IntegerField(verbose_name='Número (Ordem)', blank=True, default=0)
    data_liberacao = models.DateField('Data de Liberação', blank=True, null=True)
    time = models.TimeField(auto_now=False, auto_now_add=False, blank=True, null=True)
    curso = models.ForeignKey(Curso, verbose_name='Curso', on_delete=models.CASCADE, related_name='aulas')
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Slug")

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        if is_new:
            super(Aula, self).save()
            self.slug = uuid.uuid4()

        super(Aula, self).save(*args, **kwargs)

    def __str__(self):
        return self.nome

    def get_absolute_url(self):
        return reverse('events.views.details', args=[str(self.id)])

    class Meta:
        verbose_name_plural = 'Aulas'
        db_table = u'aula'


class Material(FollowUserModel):
    nome = models.CharField(verbose_name='Nome', max_length=100)
    embedded = models.TextField('Vídeo embedded', blank=True)
    file = models.FileField(upload_to='aulas/materiais', blank=True, null=True)
    aula = models.ForeignKey(Aula, verbose_name='Aula', on_delete=models.CASCADE, related_name='materiais')
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Slug")

    def is_embedded(self):
        return bool(self.embedded)

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        if is_new:
            super(Material, self).save()
            self.slug = uuid.uuid4()

        super(Material, self).save(*args, **kwargs)

    def __str__(self):
        return self.nome

    def get_absolute_url(self):
        return reverse('events.views.details', args=[str(self.id)])

    class Meta:
        verbose_name_plural = 'Materiais'
        db_table = u'material'


class Inscricao(FollowUserModel):
    APROVADO_CHOICES = (
        (0, 'Pendente'),
        (1, 'Aprovado'),
        (2, 'Cancelado'),
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, verbose_name='Usuário', on_delete=models.CASCADE,
        related_name='inscritos'
    )
    course = models.ForeignKey(
        Curso, verbose_name='Curso', related_name='inscritos', on_delete=models.CASCADE,
    )

    situacao = models.IntegerField(
        verbose_name='Situação', choices=APROVADO_CHOICES, default=1, blank=True
    )
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Slug")

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        if is_new:
            super(Inscricao, self).save()
            self.slug = uuid.uuid4()

        super(Inscricao, self).save(*args, **kwargs)

    def __str__(self):
        return self.curso

    def get_absolute_url(self):
        return reverse('events.views.details', args=[str(self.id)])

    class Meta:
        verbose_name_plural = 'Inscrições'
        db_table = u'inscricao'


class Movimento(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, verbose_name='Usuário', on_delete=models.CASCADE,
        related_name='movimentos'
    )
    objeto_id = models.IntegerField()
    objeto_nome = models.CharField(max_length=255)
    start = models.DateTimeField()

    class Meta:
        verbose_name_plural = 'Movimentos'
        db_table = u'movimento'