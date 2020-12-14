from django.contrib.gis.db import models

from apps.account.models import FollowUserModel

TIPO_IMOVEL_CHOICES = (
    (0, 'Residência'),
    (1, 'Comércio'),
    (2, 'Órgão Público'),
    (3, 'Terreno Baldio'),
    (5, 'Ponto Estratégico'),
    (6, 'Outros'),
)


class Estado(FollowUserModel):
    nome_estado = models.CharField(max_length=100)
    pais = models.CharField(max_length=100)
    continente = models.CharField(max_length=100)
    geom = models.MultiPolygonField(srid=4326)

    def __unicode__(self):
        return self.nome_estado

    class Meta:
        verbose_name_plural = 'Estados'
        db_table = u'estados'


class Municipio(FollowUserModel):
    codigo = models.IntegerField()
    nome_municipio = models.CharField(max_length=100)
    estado = models.ForeignKey(Estado, on_delete=models.CASCADE, related_name='estado')
    geom = models.MultiPolygonField(srid=4326)

    def __unicode__(self):
        return self.nome_municipio

    class Meta:
        verbose_name_plural = 'Municípios'
        db_table = u'municipios'


class Distrito_Sanitario(FollowUserModel):
    nome_distrito = models.CharField(max_length=100)
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE, related_name='distrito_municipio')
    geom = models.MultiPolygonField(srid=4326)

    def __unicode__(self):
        return self.nome_distrito

    class Meta:
        verbose_name_plural = 'Distritos Sanitários'
        db_table = u'distritos_sanitarios'


class Estrato(FollowUserModel):
    nome_estrato = models.CharField(max_length=100)
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE, related_name='estrato_municipio')
    geom = models.MultiPolygonField(srid=4326)

    def __unicode__(self):
        return self.nome_estrato

    class Meta:
        verbose_name_plural = 'Estratos'
        db_table = u'estratos'


class Bairro(FollowUserModel):
    nome_bairro = models.CharField(max_length=100)
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE, related_name='bairro_municipio')
    geom = models.MultiPolygonField(srid=4326)

    def __unicode__(self):
        return self.nome_bairro

    class Meta:
        verbose_name_plural = 'Bairros'
        db_table = u'bairros'


class Setor_Censitario(FollowUserModel):
    nome_setor = models.CharField(max_length=100)
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE, related_name='setor_municipio')
    geom = models.MultiPolygonField(srid=4326)

    def __unicode__(self):
        return self.nome_setor

    class Meta:
        verbose_name_plural = 'Setores Censitários'
        db_table = u'setores_censitarios'


class Territorio(FollowUserModel):
    cnes = models.IntegerField()
    nome_territorio = models.CharField(max_length=100)
    distrito_sanitario = models.ForeignKey(Distrito_Sanitario, on_delete=models.CASCADE,
                                           related_name='distrito_sanitario')
    geom = models.MultiPolygonField(srid=4326)

    def __unicode__(self):
        return self.nome_territorio

    class Meta:
        verbose_name_plural = 'Territórios'
        db_table = u'territorios'


class Area(FollowUserModel):
    ine = models.IntegerField()
    nome_area = models.CharField(max_length=100)
    territorio = models.ForeignKey(Territorio, on_delete=models.CASCADE, related_name='territorio')
    estrato = models.ForeignKey(Estrato, on_delete=models.CASCADE, related_name='estrato')
    geom = models.MultiPolygonField(srid=4326)

    def __unicode__(self):
        return self.nome_area

    class Meta:
        verbose_name_plural = 'Áreas'
        db_table = u'areas'


class MicroArea(FollowUserModel):
    nome_microarea = models.CharField(max_length=100)
    area = models.ForeignKey(Area, on_delete=models.CASCADE, related_name='area')
    geom = models.MultiPolygonField(srid=4326)

    def __unicode__(self):
        return self.nome_microarea

    class Meta:
        verbose_name_plural = 'Microareas'
        db_table = u'micro_areas'


class Quarteirao(FollowUserModel):
    id = models.CharField(max_length=50, primary_key=True)
    nome_quarteirao = models.CharField(max_length=100)
    microarea = models.ForeignKey(MicroArea, on_delete=models.CASCADE, related_name='microarea')
    geom = models.MultiPolygonField(srid=4326, blank=True, null=True)

    def __unicode__(self):
        return self.nome_quarteirao

    class Meta:
        verbose_name_plural = 'Quarteirões'
        db_table = u'quarteirao'


class Lote(FollowUserModel):
    inscricao = models.CharField(max_length=100)
    quarteirao = models.ForeignKey(Quarteirao, on_delete=models.CASCADE, related_name='quadra')
    geom = models.MultiPolygonField(srid=4326, blank=True, null=True)

    def __unicode__(self):
        return self.inscricao

    class Meta:
        verbose_name_plural = 'Lotes'
        db_table = u'lotes'


class Cep(FollowUserModel):
    numero = models.CharField(max_length=100)

    def __unicode__(self):
        return self.numero

    class Meta:
        verbose_name_plural = 'CEPs'
        db_table = u'cep'


class Logradouro(FollowUserModel):
    nome = models.CharField(max_length=200)

    def __unicode__(self):
        return self.nome

    class Meta:
        verbose_name_plural = 'Logradouros'
        db_table = u'logradouros'


class Imovel(FollowUserModel):
    numero = models.CharField(max_length=100)
    tipo_imovel = models.IntegerField(choices=TIPO_IMOVEL_CHOICES)
    logradouro = models.ForeignKey(Logradouro, on_delete=models.CASCADE, related_name='logradouro')
    cep = models.ForeignKey(Cep, on_delete=models.CASCADE, related_name='cep')
    quarteirao = models.ForeignKey(Quarteirao, on_delete=models.CASCADE, related_name='quarteirao')
    complemento = models.CharField(max_length=255, blank=True, null=True)
    ponto = models.PointField(srid=4326)

    def __unicode__(self):
        return str('%s %s %s' % (self.logradouro.nome, self.numero, self.complemento))

    class Meta:
        verbose_name_plural = 'Imóveis'
        db_table = u'imoveis'
