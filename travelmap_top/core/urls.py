from django.contrib import admin
from django.urls import path, include
from .views import CountryAPIList, CountryAPIUpdate, CountryAPIDestroy

urlpatterns = [
    path("admin/", admin.site.urls),
    path('site-auth', include('rest_framework.urls')),
    path('api/countries/', CountryAPIList.as_view()),
    path('api/countries/<int:pk>', CountryAPIUpdate.as_view()),
    path('api/countries/delete/<int:pk>', CountryAPIDestroy.as_view())
    # path('api/country/add', add_country, name='add-country'),
    # path('api/countries/', countries, name='countries'),
    # path('bulk-insert/', bulk_insert, name='bulk-insert'),
]
