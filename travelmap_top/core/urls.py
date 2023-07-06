from django.contrib import admin
from django.urls import path
from .views import add_country, bulk_insert_countries, countries, bulk_insert, CountryAPIList

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/countries/', CountryAPIList.as_view()),
    # path('api/country/<int:pk>', CountryAPIUpdate.as_view()),
    # path('api/country/add', add_country, name='add-country'),
    path('bulk-insert/', bulk_insert, name='bulk-insert'),
    # path('api/countries/', countries, name='countries')
]
