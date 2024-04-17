# Generated by Django 5.0.3 on 2024-04-17 11:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProductDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_title', models.CharField(max_length=250)),
                ('product_price', models.IntegerField()),
                ('product_desc', models.TextField()),
                ('product_image', models.URLField()),
                ('product_category', models.CharField(max_length=100)),
                ('product_subcategory', models.CharField(max_length=100)),
                ('seller_name', models.CharField(max_length=100)),
                ('seller_picture', models.URLField()),
                ('product_status', models.CharField(max_length=50)),
                ('proimg1', models.URLField()),
                ('proimg2', models.URLField()),
                ('proimg3', models.URLField()),
                ('proimg4', models.URLField()),
            ],
        ),
    ]