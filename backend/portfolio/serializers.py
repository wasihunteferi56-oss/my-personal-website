from rest_framework import serializers

from .models import Project, Skill, Experience, Certificate, ContactMessage


class ProjectListSerializer(serializers.ModelSerializer):
    """Lightweight serializer used for the project grid / list view."""

    technologies_list = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "category",
            "technologies_list",
            "image",
            "github_url",
            "live_url",
            "featured",
        ]


class ProjectDetailSerializer(serializers.ModelSerializer):
    """Full serializer used for the project details modal/page."""

    technologies_list = serializers.ReadOnlyField()
    features_list = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "detailed_description",
            "problem",
            "solution",
            "role",
            "lessons_learned",
            "category",
            "technologies_list",
            "features_list",
            "image",
            "github_url",
            "live_url",
            "featured",
            "created_at",
        ]


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name", "category", "proficiency", "icon", "order"]


class ExperienceSerializer(serializers.ModelSerializer):
    responsibilities_list = serializers.ReadOnlyField()

    class Meta:
        model = Experience
        fields = [
            "id",
            "role",
            "company",
            "location",
            "start_date",
            "end_date",
            "description",
            "responsibilities_list",
        ]


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ["id", "title", "organization", "issue_date", "credential_url", "image"]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "subject", "message", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError(
                "Message must be at least 10 characters long."
            )
        return value

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Name is required.")
        return value
