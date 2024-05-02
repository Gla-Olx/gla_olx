from django.db import models

class ProductDetails(models.Model):
    product_title = models.CharField(max_length=250, blank=False, null=False)
    product_price = models.IntegerField()
    product_desc = models.TextField()
    product_category = models.CharField(max_length=100)
    product_subcategory = models.CharField(max_length=100)
    seller_id = models.CharField(max_length=100, blank=False, null=False, default='admin')
    seller_name = models.CharField(max_length=100)
    seller_picture = models.URLField()
    product_status = models.CharField(max_length=50)
    proimg1 = models.URLField()
    proimg2 = models.URLField()
    proimg3 = models.URLField()
    proimg4 = models.URLField()
    proimg5 = models.URLField()
    created_date= models.DateField(auto_now_add=True, null=True)