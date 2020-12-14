from django.contrib import admin

# Register your models here.
from apps.territorializacao.models import *

admin.site.register(Estado)
admin.site.register(Municipio)
