from django.urls import path
from django.contrib.auth import views
from .views import SignupView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
]