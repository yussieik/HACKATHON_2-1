from django.contrib import admin
from django.urls import path, include
from .views import CountryAPIList, CountryAPIUpdate, CountryAPIDestroy, HomePageView, addCountries

urlpatterns = [
    path("admin/", admin.site.urls),
    path('site-auth/', include('rest_framework.urls')),
    path('home/', HomePageView.as_view(), name='home'),
    path('api/countries/', CountryAPIList.as_view()),
    path('api/countries/<int:pk>', CountryAPIUpdate.as_view()),
    path('api/countries/delete/<int:pk>', CountryAPIDestroy.as_view()),
    # path('api/add-countries/', addCountries.as_view()),
    path('api/add-countries/', addCountries.as_view()),
]
