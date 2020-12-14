from django.contrib import admin

# Register your models here.
from apps.ead.models import *

admin.site.register(Curso)
admin.site.register(Pessoa)
admin.site.register(Setor)