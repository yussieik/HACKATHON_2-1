from django.db import models
from django.contrib.auth.models import User
from core.models import Country

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE, related_name='user_profile')
    visited_countries = models.ManyToManyField(Country, related_name='visits', blank=True)

    def __str__(self):
        return f'Profile: {self.user.username}'
    
