from django.urls import path

from . import views

urlpatterns = [
    path("projects/", views.ProjectListView.as_view(), name="project-list"),
    path("projects/<int:pk>/", views.ProjectDetailView.as_view(), name="project-detail"),
    path("skills/", views.SkillListView.as_view(), name="skill-list"),
    path("experience/", views.ExperienceListView.as_view(), name="experience-list"),
    path("certificates/", views.CertificateListView.as_view(), name="certificate-list"),
    path("contact/", views.ContactMessageCreateView.as_view(), name="contact-create"),
]
