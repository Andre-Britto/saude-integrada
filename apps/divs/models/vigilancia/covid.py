from django.db import models
from apps.account.models import FollowUserModel


class NotificaVS(FollowUserModel):
    load_id = models.IntegerField()
    idgeo = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.load_id

    class Meta:
        verbose_name_plural = 'Notifica VS'
        db_table = 'notifica_vs'
