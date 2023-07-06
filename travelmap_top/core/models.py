from django.db import models
from django.contrib.auth.models import User

class Country(models.Model):
    name = models.CharField(max_length=100)
    flag = models.URLField()
    is_visited = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Countries"
        ordering = ["name"]

    def __str__(self) -> str:
        return f"{self.name}"
    

