from django.urls import path
from accounts import views as UserViews
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('register/', UserViews.RegisterView.as_view()),
    
    #JWT Tokens

    
    path('protected-view/', UserViews.ProtectedView.as_view()),
]