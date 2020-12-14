from django.db import models
from django_tenants.models import TenantMixin, DomainMixin


class Projeto(TenantMixin):
    nome = models.CharField(max_length=100)
    on_trial = models.BooleanField(default=True)
    created_on = models.DateField(auto_now_add=True)
    auto_create_schema = True

    def __str__(self):
        return self.nome


class Domain(DomainMixin):
    def __str__(self):
        return self.domain
