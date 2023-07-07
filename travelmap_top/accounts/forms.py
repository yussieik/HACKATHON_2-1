from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms

class SignupForm(UserCreationForm):
    email = forms.EmailField()
    username = forms.CharField(
        max_length=150)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']