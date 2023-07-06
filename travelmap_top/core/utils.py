from .models import Country

def bulk_insert_countries(country_names):
    countries_to_create = [
        Country(name=country['name'], flag=country['png'])
        for country in country_names
    ]
    Country.objects.bulk_create(countries_to_create)