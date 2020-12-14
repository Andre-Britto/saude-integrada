from django.conf.urls import url

from apps.ead.views import ead

urlpatterns = [
    url(r'^$', ead, name='ead'),

]
