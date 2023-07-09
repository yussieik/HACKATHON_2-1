from rest_framework import serializers
from .models import Country
from accounts.models import UserProfile

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id','name','flag']

# added with Lise
class AddCountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'visited_countries']