# Generated by Django 3.1.4 on 2020-12-14 13:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ead', '0003_auto_20201214_0847'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pessoa',
            name='data_nascimento',
            field=models.DateField(verbose_name='Data de Nascimento'),
        ),
    ]
