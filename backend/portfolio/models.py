from django.db import models
from django.utils.text import slugify


class Project(models.Model):
    class Category(models.TextChoices):
        WEB = "web", "Web Development"
        SOFTWARE = "software", "Software Systems"
        MOBILE = "mobile", "Mobile"
        BUSINESS = "business", "Business"
        ENTREPRENEURSHIP = "entrepreneurship", "Entrepreneurship"

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField(help_text="Short summary shown on the project card.")
    detailed_description = models.TextField(
        blank=True, help_text="Longer write-up shown in the project details modal/page."
    )
    problem = models.TextField(blank=True, help_text="What problem the project addresses.")
    solution = models.TextField(blank=True, help_text="How the project solves that problem.")
    role = models.CharField(max_length=200, blank=True, help_text="My role on the project.")
    lessons_learned = models.TextField(blank=True)
    category = models.CharField(max_length=20, choices=Category.choices, default=Category.WEB)
    technologies = models.CharField(
        max_length=300, help_text="Comma-separated list, e.g. 'Python, Django, SQLite'"
    )
    features = models.TextField(
        blank=True, help_text="One feature per line."
    )
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    @property
    def technologies_list(self):
        return [t.strip() for t in self.technologies.split(",") if t.strip()]

    @property
    def features_list(self):
        return [f.strip() for f in self.features.splitlines() if f.strip()]


class Skill(models.Model):
    class Category(models.TextChoices):
        FRONTEND = "frontend", "Frontend Development"
        BACKEND = "backend", "Backend Development"
        DATABASE = "database", "Database"
        IT_SUPPORT = "it_support", "IT Support & Networking"
        TOOLS = "tools", "Tools"
        LEARNING = "learning", "Currently Learning"

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=Category.choices)
    proficiency = models.PositiveIntegerField(
        default=50, help_text="Honest skill level from 0-100."
    )
    icon = models.CharField(
        max_length=50, blank=True, help_text="Lucide icon name, e.g. 'code', 'database'."
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["category", "order", "name"]

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class Experience(models.Model):
    role = models.CharField(max_length=150)
    company = models.CharField(max_length=150, blank=True)
    location = models.CharField(max_length=150, blank=True)
    start_date = models.CharField(max_length=50, help_text="e.g. '2024' or 'Jan 2024'")
    end_date = models.CharField(
        max_length=50, blank=True, help_text="Leave blank if this is ongoing."
    )
    description = models.TextField(blank=True)
    responsibilities = models.TextField(
        blank=True, help_text="One responsibility per line."
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-id"]

    def __str__(self):
        return f"{self.role} @ {self.company or 'N/A'}"

    @property
    def responsibilities_list(self):
        return [r.strip() for r in self.responsibilities.splitlines() if r.strip()]


class Certificate(models.Model):
    title = models.CharField(max_length=200)
    organization = models.CharField(max_length=200)
    issue_date = models.CharField(max_length=50, help_text="e.g. '2024' or 'March 2024'")
    credential_url = models.URLField(blank=True)
    image = models.ImageField(upload_to="certificates/", blank=True, null=True)
    description = models.TextField(blank=True, help_text="Short description of the certificate.")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-id"]

    def __str__(self):
        return f"{self.title} — {self.organization}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.subject} — {self.name}"
