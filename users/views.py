from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .token import account_activation_token
from django.utils.encoding import force_bytes
from django.contrib.sites.shortcuts import get_current_site
from decouple import config
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.forms import PasswordResetForm
from django.shortcuts import render, redirect
from django.core.mail import send_mail, BadHeaderError
from django.contrib.auth.tokens import default_token_generator
from django.db.models.query_utils import Q
from django import template
from django.core.mail import EmailMultiAlternatives

EMAIL_HOST_USER = config('EMAIL_HOST_USER')

User = get_user_model()


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)

        # for email account activation
        if serializer.is_valid():
            user = serializer.save(is_active=False)
            current_site = get_current_site(request)
            if user:
                mail_subject = 'Activate your blog account.'
                plaintext = template.loader.get_template(
                    'users/accounts/activate_account_email.txt')
                htmltemp = template.loader.get_template(
                    'users/accounts/activate_account_email.html')
                context = {
                    'user': user,
                    'domain': current_site.domain,
                    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                    'token': account_activation_token.make_token(user),
                    'protocol': 'http',
                }
                to_email = serializer.validated_data.get('email')
                text_content = plaintext.render(context)
                html_content = htmltemp.render(context)
                try:
                    msg = EmailMultiAlternatives(mail_subject, text_content, "Monthly Report", [
                        to_email], headers={'Reply-To': EMAIL_HOST_USER})
                    msg.attach_alternative(html_content, "text/html")
                    msg.send()
                except BadHeaderError:
                    return render(request=request, template_name="users/accounts/activate_account_invalid.html")
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserList(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CustomUserSerializer
    queryset = User.objects.all()


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# activation confirmation view
def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(id=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        return render(request=request, template_name="users/accounts/activate_account_done.html")
    else:
        return render(request=request, template_name="users/accounts/activate_account_invalid.html")


# password reset view
def password_reset_request(request):
    if request.method == "POST":
        password_reset_form = PasswordResetForm(request.POST)
        if password_reset_form.is_valid():
            data = password_reset_form.cleaned_data['email']
            associated_users = User.objects.filter(Q(email=data))
            if associated_users.exists():
                for user in associated_users:
                    current_site = get_current_site(request)
                    subject = "Password Reset Requested"
                    plaintext = template.loader.get_template(
                        'users/password/password_reset_email.txt')
                    htmltemp = template.loader.get_template(
                        'users/password/password_reset_email.html')
                    context = {
                        "email": user.email,
                        'domain': current_site.domain,
                        'site_name': 'Website',
                        "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                        "user": user,
                        'token': default_token_generator.make_token(user),
                        'protocol': 'http',
                    }
                    text_content = plaintext.render(context)
                    html_content = htmltemp.render(context)
                    try:
                        msg = EmailMultiAlternatives(subject, text_content, "Monthly Report", [
                            user.email], headers={'Reply-To': EMAIL_HOST_USER})
                        msg.attach_alternative(html_content, "text/html")
                        msg.send()
                    except BadHeaderError:
                        return render(request=request, template_name="users/password/password_reset_invalid.html")
                    return redirect("/accounts/password_reset/done/")
        # return Response(status=status.HTTP_400_BAD_REQUEST)
    password_reset_form = PasswordResetForm()
    return render(request=request, template_name="users/password/password_reset.html", context={"password_reset_form": password_reset_form})


# password reset using messages
# def password_reset_request(request):
# 	if request.method == "POST":
# 		password_reset_form = PasswordResetForm(request.POST)
# 		if password_reset_form.is_valid():
# 			data = password_reset_form.cleaned_data['email']
# 			associated_users = User.objects.filter(Q(email=data))
# 			if associated_users.exists():
# 				for user in associated_users:
# 					subject = "Password Reset Requested"
# 					email_template_name = "main/password/password_reset_email.txt"
# 					c = {
#                     "email": user.email,
#                     'domain': 'your-website-name.com',
#                     'site_name': 'Website Name',
#                     "uid": urlsafe_base64_encode(force_bytes(user.pk)),
#                     'token': default_token_generator.make_token(user),
#                     'protocol': 'https',
# 					}
# 					email = render_to_string(email_template_name, c)
# 					try:
# 						send_mail(subject, email, EMAIL_HOST_USER,
# 						          [user.email], fail_silently=False)
# 					except BadHeaderError:

# 						return HttpResponse('Invalid header found.')

# 					messages.success(
# 					    request, 'A message with reset password instructions has been sent to your inbox.')
# 					return redirect("main:homepage")
# 			messages.error(request, 'An invalid email has been entered.')
# 	password_reset_form = PasswordResetForm()
# 	return render(request=request, template_name="main/password/password_reset.html", context={"password_reset_form": password_reset_form})
