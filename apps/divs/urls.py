from django.conf.urls import url
from apps.divs.views.divs import divs
from apps.divs.views.epidemiologia.covid import *


urlpatterns = [
    url(r'^$', divs, name='divs'),
    url(r'^covid/$', covid, name='covid'),
    url(r'^semidgeo/$', semIdgeo, name='semidgeo'),
    url(r'^alterar-idgeo/(?P<pk>\d+)/$', altera_idgeo, name='altera_idgeo'),

]
