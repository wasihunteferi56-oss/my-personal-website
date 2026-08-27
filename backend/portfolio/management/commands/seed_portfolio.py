from django.core.management.base import BaseCommand

from portfolio.models import Project, Skill, Experience, Certificate


class Command(BaseCommand):
    help = "Seed the database with Wasihun Teferi's real portfolio content."

    def handle(self, *args, **options):
        self.stdout.write("Seeding projects...")
        projects = [
            dict(
                title="Digital IT Ticketing System",
                description=(
                    "A digital IT support request system designed to replace "
                    "paper-based IT support request forms. Staff can submit "
                    "technical problems while IT technicians can view, claim, "
                    "manage, and track support tickets."
                ),
                detailed_description=(
                    "Built to solve a real, everyday problem: paper-based IT "
                    "request forms are slow to track and easy to lose. This "
                    "system gives staff a simple digital request form and gives "
                    "technicians a shared dashboard to see, claim, and resolve "
                    "tickets without duplicated effort."
                ),
                problem="IT support requests were handled on paper, making them slow to track, easy to lose, and hard to prioritize.",
                solution="A Django-powered web app where staff submit tickets digitally and technicians manage them from a shared dashboard with a claiming system.",
                role="Sole developer — designed the data model, built the Django backend, and implemented the technician dashboard.",
                lessons_learned="Learned how to design a claiming workflow that prevents duplicate work between equal-role technicians, and how to capture request metadata (like client IP) automatically.",
                category=Project.Category.SOFTWARE,
                technologies="Python, Django, HTML, CSS, JavaScript, SQLite",
                features=(
                    "Staff request form\n"
                    "Automatic client IP detection\n"
                    "Ticket management\n"
                    "Technician dashboard\n"
                    "Pending ticket queue\n"
                    "Ticket claiming system\n"
                    "Status tracking\n"
                    "Equal technician roles\n"
                    "Claimed tickets become unavailable to other technicians"
                ),
                featured=True,
                order=1,
            ),
            dict(
                title="Haramaya Delivery",
                description="A digital delivery service concept designed to connect students and businesses with delivery services.",
                detailed_description="A mobile-first concept exploring how a campus delivery network could connect students who need deliveries with local businesses and delivery partners.",
                problem="Students and small businesses near campus lack a simple, unified way to coordinate deliveries.",
                solution="A mobile app concept modeling delivery requests, order management, and coordination between customers and delivery partners.",
                role="Concept design and mobile app planning.",
                lessons_learned="Learned to think through a two-sided marketplace workflow (customers and delivery partners) before writing code.",
                category=Project.Category.MOBILE,
                technologies="Flutter, Firebase, Mobile Application Development",
                features=(
                    "Delivery request workflow\n"
                    "Customer and delivery partner concept\n"
                    "Order management\n"
                    "Delivery coordination"
                ),
                order=2,
            ),
            dict(
                title="Personal Portfolio Website",
                description="A responsive personal portfolio website designed to showcase my skills, education, projects, experience, and professional development.",
                detailed_description="This very site — built with a React frontend and a Django REST Framework backend to keep content easy to manage and update over time.",
                role="Designed and built the full frontend and backend.",
                category=Project.Category.WEB,
                technologies="HTML, CSS, JavaScript, React",
                order=3,
            ),
            dict(
                title="Gym Business Planning Project",
                description="A business planning project focused on developing a complete gym business concept including market analysis, equipment planning, financial considerations, layout planning, and business strategy.",
                detailed_description="An entrepreneurship exercise covering the full planning cycle of a small business: understanding the target market, planning equipment and layout, and thinking through financial viability.",
                role="Business planning and analysis.",
                category=Project.Category.BUSINESS,
                technologies="Market Analysis, Financial Planning, Business Strategy",
                order=4,
            ),
            dict(
                title="Fresh Harvest Website",
                description="A website concept for showcasing and promoting fresh vegetables and fruits through a modern digital interface.",
                detailed_description="A front-end concept exploring how a local produce business could present its products online with a clean, modern interface.",
                role="Frontend design and development.",
                category=Project.Category.WEB,
                technologies="HTML, CSS, JavaScript",
                order=5,
            ),
            dict(
                title="Haramaya Exchange Zone",
                description="A digital community marketplace concept for exchanging and discovering used materials and products within a student community.",
                detailed_description="A marketplace concept aimed at helping students exchange or find used items within their community, reducing waste and cost.",
                role="Concept design and database planning.",
                category=Project.Category.ENTREPRENEURSHIP,
                technologies="Web Development, Database Concepts, Digital Marketplace Concepts",
                order=6,
            ),
        ]
        for data in projects:
            Project.objects.update_or_create(title=data["title"], defaults=data)

        self.stdout.write("Seeding skills...")
        skills = [
            # Frontend
            ("HTML5", Skill.Category.FRONTEND, 80, "file-code"),
            ("CSS3", Skill.Category.FRONTEND, 75, "palette"),
            ("JavaScript", Skill.Category.FRONTEND, 65, "braces"),
            ("React", Skill.Category.FRONTEND, 55, "atom"),
            ("Responsive Web Design", Skill.Category.FRONTEND, 70, "smartphone"),
            # Backend
            ("Python", Skill.Category.BACKEND, 70, "terminal"),
            ("Django", Skill.Category.BACKEND, 60, "server"),
            ("Django REST Framework", Skill.Category.BACKEND, 55, "plug"),
            ("Node.js Fundamentals", Skill.Category.BACKEND, 35, "hexagon"),
            # Database
            ("SQLite", Skill.Category.DATABASE, 65, "database"),
            ("MySQL", Skill.Category.DATABASE, 55, "database-zap"),
            ("MongoDB Fundamentals", Skill.Category.DATABASE, 30, "leaf"),
            ("SQL", Skill.Category.DATABASE, 60, "table"),
            # IT Support
            ("Computer Troubleshooting", Skill.Category.IT_SUPPORT, 75, "wrench"),
            ("Printer Installation", Skill.Category.IT_SUPPORT, 70, "printer"),
            ("Network Configuration", Skill.Category.IT_SUPPORT, 55, "network"),
            ("TCP/IP", Skill.Category.IT_SUPPORT, 50, "waypoints"),
            ("Windows Administration", Skill.Category.IT_SUPPORT, 65, "monitor"),
            ("Hardware & Software Troubleshooting", Skill.Category.IT_SUPPORT, 70, "cpu"),
            # Tools
            ("Git", Skill.Category.TOOLS, 60, "git-branch"),
            ("GitHub", Skill.Category.TOOLS, 60, "github"),
            ("VS Code", Skill.Category.TOOLS, 80, "code"),
            ("XAMPP", Skill.Category.TOOLS, 55, "layers"),
            ("VirtualBox", Skill.Category.TOOLS, 50, "box"),
            ("VMware", Skill.Category.TOOLS, 45, "boxes"),
            # Learning
            ("Advanced React", Skill.Category.LEARNING, 30, "sparkles"),
            ("REST APIs", Skill.Category.LEARNING, 45, "webhook"),
            ("Linux", Skill.Category.LEARNING, 35, "square-terminal"),
            ("Software Architecture", Skill.Category.LEARNING, 25, "network"),
            ("Cloud Technologies", Skill.Category.LEARNING, 20, "cloud"),
            ("Artificial Intelligence", Skill.Category.LEARNING, 25, "brain-circuit"),
        ]
        for i, (name, category, proficiency, icon) in enumerate(skills):
            Skill.objects.update_or_create(
                name=name,
                category=category,
                defaults={"proficiency": proficiency, "icon": icon, "order": i},
            )

        self.stdout.write("Seeding experience...")
        Experience.objects.update_or_create(
            role="IT Intern",
            defaults=dict(
                company="",
                location="Ethiopia",
                start_date="2024",
                end_date="",
                description=(
                    "Developing practical experience in IT support, computer "
                    "troubleshooting, software installation, printer "
                    "configuration, network-related support, and assisting "
                    "users with technical problems."
                ),
                responsibilities=(
                    "Computer troubleshooting\n"
                    "Hardware and software support\n"
                    "Printer installation and configuration\n"
                    "Network troubleshooting\n"
                    "Windows configuration\n"
                    "User technical support\n"
                    "Software installation\n"
                    "Technical documentation"
                ),
                order=1,
            ),
        )

        self.stdout.write("Seeding certificates...")
        certificates_list = [
            dict(
                title="Web Development Certificate",
                organization="Udara Academy",
                issue_date="2024",
                credential_url="https://udara.academy",
                image="certificates/cert-udara.jpg",
                description="Certification in modern web development standards, responsive frontend design, and web architecture fundamentals.",
                order=1,
            ),
            dict(
                title="Full-Stack Python & Django Development",
                organization="Global Tech Academy",
                issue_date="2024",
                credential_url="",
                image="certificates/cert-python.jpg",
                description="Comprehensive software engineering program covering Django REST framework, database design, and web application deployment.",
                order=2,
            ),
            dict(
                title="IT Support & Networking Specialist",
                organization="IT Professional Institute",
                issue_date="2023",
                credential_url="",
                image="certificates/cert-it-support.jpg",
                description="Certification covering computer hardware troubleshooting, network infrastructure configuration, TCP/IP, and Windows Server administration.",
                order=3,
            ),
        ]
        for data in certificates_list:
            Certificate.objects.update_or_create(
                title=data["title"],
                defaults=data,
            )

        self.stdout.write(self.style.SUCCESS("Portfolio content seeded successfully."))

