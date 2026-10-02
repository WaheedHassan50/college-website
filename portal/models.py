from django.db import models
from django.utils import timezone
import datetime

class Department(models.Model):
    name = models.CharField(max_length=150, unique=True)
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} ({self.code})"

    class Meta:
        ordering = ['name']


class Program(models.Model):
    LEVEL_CHOICES = [
        ('bs', 'BS (4-Year) Honors'),
        ('intermediate', 'Intermediate (HSSC)'),
        ('adp', 'Associate Degree (ADP)'),
    ]

    title = models.CharField(max_length=200)
    level = models.CharField(max_length=30, choices=LEVEL_CHOICES, default='bs')
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='programs')
    duration = models.CharField(max_length=100, default='4 Years (8 Semesters)')
    affiliation = models.CharField(max_length=150, default='University of the Punjab')
    eligibility = models.CharField(max_length=255)
    seats = models.PositiveIntegerField(default=50)
    description = models.TextField()

    def __str__(self):
        return f"{self.title} - {self.get_level_display()}"


class FacultyMember(models.Model):
    name = models.CharField(max_length=150)
    role = models.CharField(max_length=150, help_text="e.g. Principal, Head of Department, Associate Professor")
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name='faculty')
    qualification = models.CharField(max_length=255)
    experience = models.CharField(max_length=100)
    specialization = models.CharField(max_length=255)
    email = models.EmailField()
    image = models.CharField(max_length=255, default='assets/images/principal.svg')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.role})"

    class Meta:
        verbose_name_plural = "Faculty Members"


class AdmissionApplication(models.Model):
    STATUS_CHOICES = [
        ('submitted', 'Submitted'),
        ('shortlisted', 'Merit Shortlisted'),
        ('admitted', 'Admitted / Fee Paid'),
        ('rejected', 'Disqualified / Rejected'),
    ]

    application_no = models.CharField(max_length=50, unique=True)
    full_name = models.CharField(max_length=150)
    father_name = models.CharField(max_length=150)
    cnic = models.CharField(max_length=50)
    dob = models.DateField(default=datetime.date(2006, 1, 1))
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    address = models.TextField()
    
    # Matric Record
    matric_board = models.CharField(max_length=100, default='BISE Gujranwala')
    matric_roll = models.CharField(max_length=50)
    matric_obtained = models.FloatField()
    matric_total = models.FloatField(default=1100.0)

    # Inter Record
    inter_board = models.CharField(max_length=100, default='BISE Gujranwala', blank=True)
    inter_roll = models.CharField(max_length=50, blank=True)
    inter_obtained = models.FloatField(default=0.0)
    inter_total = models.FloatField(default=1100.0)

    applied_program = models.CharField(max_length=150)
    is_hafiz = models.BooleanField(default=False)
    aggregate_merit = models.FloatField(default=0.0)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='submitted')
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Calculate aggregate merit
        if self.matric_total > 0 and self.inter_total > 0:
            m_pct = (self.matric_obtained / self.matric_total) * 30.0
            adjusted_inter = self.inter_obtained + (20.0 if self.is_hafiz else 0.0)
            i_pct = (min(adjusted_inter, self.inter_total) / self.inter_total) * 70.0
            self.aggregate_merit = round(m_pct + i_pct, 2)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.application_no} - {self.full_name} ({self.applied_program}) - {self.aggregate_merit}%"


class FeeChallan(models.Model):
    challan_no = models.CharField(max_length=50, unique=True)
    student_name = models.CharField(max_length=150)
    roll_or_app_no = models.CharField(max_length=50)
    program = models.CharField(max_length=150)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=14500.00)
    issue_date = models.DateField(default=timezone.now)
    due_date = models.DateField()
    is_paid = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.challan_no} - {self.student_name} - PKR {self.amount}"


class Notice(models.Model):
    CATEGORY_CHOICES = [
        ('admissions', 'Admissions'),
        ('merit', 'Merit Lists'),
        ('examinations', 'Examinations'),
        ('scholarships', 'Scholarships'),
        ('sports', 'Sports & Co-curricular'),
        ('general', 'General Notification'),
    ]

    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='general')
    date = models.DateField(default=timezone.now)
    is_urgent = models.BooleanField(default=False)
    summary = models.TextField()
    details = models.TextField()
    attachment = models.FileField(upload_to='notices/', blank=True, null=True)

    def __str__(self):
        return f"[{self.category.upper()}] {self.title}"

    class Meta:
        ordering = ['-date', '-id']


class Student(models.Model):
    roll_no = models.CharField(max_length=50, unique=True, help_text="e.g. BSCS-22-10")
    registration_no = models.CharField(max_length=100, unique=True)
    full_name = models.CharField(max_length=150)
    father_name = models.CharField(max_length=150)
    program = models.CharField(max_length=150)
    current_semester = models.PositiveIntegerField(default=1)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.roll_no} - {self.full_name}"


class ExamResult(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='results')
    semester = models.CharField(max_length=50, help_text="e.g. 4th Semester (Spring 2026)")
    course_code = models.CharField(max_length=50)
    course_title = models.CharField(max_length=150)
    credit_hours = models.CharField(max_length=20, default='3+1')
    marks_obtained = models.FloatField()
    total_marks = models.FloatField(default=100.0)
    grade = models.CharField(max_length=5)
    grade_point = models.FloatField()

    def __str__(self):
        return f"{self.student.roll_no} - {self.course_title} ({self.grade})"


class ContactInquiry(models.Model):
    name = models.CharField(max_length=150)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    subject = models.CharField(max_length=150)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_addressed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.subject} ({'Solved' if self.is_addressed else 'Pending'})"

    class Meta:
        verbose_name_plural = "Contact Inquiries"
