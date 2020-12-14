from apps.account.views import home, log_out
from django.urls import path

urlpatterns = [
    path('', home, name="home"),
    path('logout/', log_out, name='logout'),
]
