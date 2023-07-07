from django.shortcuts import render
from django.views import View
from django.views.generic.edit import CreateView
from .forms import SignupForm
from django.contrib.auth.models import User
from django.urls import reverse_lazy

# Create your views here.
class SignupView(CreateView):
    form_class = SignupForm
    model = User
    template_name = 'signup.html'
    success_url = reverse_lazy('login')