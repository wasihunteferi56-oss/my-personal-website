from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Project, Skill, Experience, Certificate
from .serializers import (
    ProjectListSerializer,
    ProjectDetailSerializer,
    SkillSerializer,
    ExperienceSerializer,
    CertificateSerializer,
    ContactMessageSerializer,
)


class ProjectListView(generics.ListAPIView):
    """GET /api/projects/  — list all projects, optionally filtered by ?category="""

    serializer_class = ProjectListSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = Project.objects.all()
        category = self.request.query_params.get("category")
        if category and category != "all":
            queryset = queryset.filter(category=category)
        return queryset


class ProjectDetailView(generics.RetrieveAPIView):
    """GET /api/projects/<id>/ — full project details for the details modal."""

    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializer
    lookup_field = "pk"


class SkillListView(generics.ListAPIView):
    """GET /api/skills/ — all skills, grouped on the frontend by category."""

    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    pagination_class = None


class ExperienceListView(generics.ListAPIView):
    """GET /api/experience/"""

    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    pagination_class = None


class CertificateListView(generics.ListAPIView):
    """GET /api/certificates/"""

    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    pagination_class = None


class ContactMessageCreateView(APIView):
    """POST /api/contact/ — receive a message from the contact form."""

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"detail": "Thank you. Your message has been sent successfully."},
                status=status.HTTP_201_CREATED,
            )
        # Return field-level validation errors without leaking internals.
        return Response(
            {"detail": "Please check the form for errors.", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )
