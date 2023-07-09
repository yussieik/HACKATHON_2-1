from django.shortcuts import render
from django.views import View
from django.views.generic.edit import CreateView
from .forms import SignupForm
from django.contrib.auth.models import User
from django.contrib.auth.views import LoginView
from django.views.generic import ListView
from django.urls import reverse_lazy
from core.models import Country
from django.shortcuts import get_object_or_404

# Create your views here.
class SignupView(CreateView):
    form_class = SignupForm
    model = User
    template_name = 'signup.html'
    success_url = reverse_lazy('login')

class CustomLoginView(LoginView):
    template_name = 'login.html'

    def get_success_url(self):
        user = self.request.user
        if user.is_superuser:
            return reverse_lazy('home')
        return reverse_lazy('profile', kwargs={'pk': user.pk})

class ProfileView(ListView):
    template_name = 'profile.html'
    model = Country
    context_object_name = 'countries'

    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #     username = self.kwargs.get('username')
    #     user = get_object_or_404(User, username=username)
    #     selected_countries = user.user_profile.visited_countries.all()
    #     context['selected_countries'] = selected_countries
    #     return context
    
    def get_queryset(self):
        return Country.objects.order_by('name')
    
    # def get(self, request, pk):
    #     user = User.objects.get(id=pk)
    #     visited_countries = user.user_profile.visited_countries.all()
    #     available_countries = Country.objects.exclude(visits__user=user)
    #     context = {
    #         'user': user,
    #         'visited': visited_countries,
    #         'available': available_countries,
    #     }
    #     return render(request, 'profile.html', context)