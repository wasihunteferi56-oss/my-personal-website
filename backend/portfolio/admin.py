from django.contrib import admin
from django.utils.html import format_html
from django.contrib.auth.models import User, Group
from django.contrib.auth.admin import UserAdmin, GroupAdmin

from .models import Project, Skill, Experience, Certificate, ContactMessage


class PortfolioAdminSite(admin.AdminSite):
    site_header = "Wasihun Teferi Portfolio Admin"
    site_title = "Portfolio Management"
    index_title = "Portfolio Dashboard"

    def index(self, request, extra_context=None):
        extra_context = extra_context or {}
        
        # Calculate statistics for the dashboard cards
        projects_count = Project.objects.count()
        featured_projects = Project.objects.filter(featured=True).count()
        skills_count = Skill.objects.count()
        experience_count = Experience.objects.count()
        certificates_count = Certificate.objects.count()
        messages_count = ContactMessage.objects.count()
        unread_messages_count = ContactMessage.objects.filter(is_read=False).count()

        extra_context["stats"] = {
            "projects_count": projects_count,
            "featured_projects": featured_projects,
            "skills_count": skills_count,
            "experience_count": experience_count,
            "certificates_count": certificates_count,
            "messages_count": messages_count,
            "unread_messages_count": unread_messages_count,
        }

        # Fetch recent contact messages for the dashboard feed
        extra_context["recent_messages"] = ContactMessage.objects.order_by("-created_at")[:5]

        return super().index(request, extra_context=extra_context)


# Create singleton instance of custom admin site
admin_site = PortfolioAdminSite(name="portfolio_admin")

# Replace default admin site
admin.site = admin_site
admin.sites.site = admin_site


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category_badge", "featured_badge", "order", "created_at")
    list_filter = ("category", "featured")
    search_fields = ("title", "description", "technologies")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("order", "-created_at")

    @admin.display(description="Category")
    def category_badge(self, obj):
        return format_html('<span class="badge badge-category">{}</span>', obj.get_category_display())

    @admin.display(description="Featured")
    def featured_badge(self, obj):
        if obj.featured:
            return format_html('<span class="badge badge-featured">★ Featured</span>')
        return format_html('<span style="color: var(--text-muted);">Standard</span>')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category_badge", "proficiency_bar", "order")
    list_filter = ("category",)
    search_fields = ("name",)
    ordering = ("category", "order")

    @admin.display(description="Category")
    def category_badge(self, obj):
        return format_html('<span class="badge badge-category">{}</span>', obj.get_category_display())

    @admin.display(description="Proficiency Level")
    def proficiency_bar(self, obj):
        pct = min(max(obj.proficiency, 0), 100)
        return format_html(
            '<div style="display: flex; align-items: center; gap: 8px;">'
            '<div style="width: 100px; background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; overflow: hidden;">'
            '<div style="width: {}%; background: var(--accent-gradient); height: 100%;"></div>'
            '</div>'
            '<span style="font-weight: 600; font-size: 0.85rem;">{}%</span>'
            '</div>',
            pct, pct
        )


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("role", "company", "location", "start_date", "end_date", "order")
    search_fields = ("role", "company", "location")
    ordering = ("order",)


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ("title", "organization", "issue_date", "order")
    search_fields = ("title", "organization")
    ordering = ("order",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "read_status", "created_at")
    list_filter = ("is_read", "created_at")
    search_fields = ("name", "email", "subject", "message")
    ordering = ("-created_at",)
    readonly_fields = ("name", "email", "subject", "message", "created_at")

    @admin.display(description="Status")
    def read_status(self, obj):
        if not obj.is_read:
            return format_html('<span class="badge badge-unread">Unread</span>')
        return format_html('<span class="badge badge-read">Read</span>')


# Register default Django auth models into the custom admin site as well
admin_site.register(User, UserAdmin)
admin_site.register(Group, GroupAdmin)
