from django.db import models
import uuid

class ProductDetails(models.Model):
    product_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
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
<<<<<<< HEAD
    created_date= models.DateField(auto_now_add=True, null=True)
    
    
class WishListItem(models.Model):
    userid = models.CharField(max_length=120)
    product_id = models.ForeignKey(ProductDetails, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.product_id
    
    
=======
    created_date= models.DateTimeField(auto_now_add=True, null=True)
>>>>>>> d09e347b2c2380f506fe38538b25d2b2387ba39b
