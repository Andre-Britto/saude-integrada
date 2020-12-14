from django.urls import path
from apps.disc.views.ocupacao import *


urlpatterns = [
    path('', disc, name='disc'),
    path('ocupacao/', ocupacao_list, name='ocupacao'),
    path('ocupacao/create/', ocupacao_create, name='ocupacao_create'),
    path('ocupacao/<slug>/update/', ocupacao_update, name='ocupacao_update'),
    path('ocupacao/desativar/(<slug>)/', ocupacao_desativar, name='ocupacao_desativar'),

]
