from django.contrib import admin
from .models import (
    Department, Program, FacultyMember, AdmissionApplication,
    FeeChallan, Notice, Student, ExamResult, ContactInquiry
)

# Custom Admin Branding
admin.site.site_header = "Govt. Graduate College Hafizabad - Portal Admin"
admin.site.site_title = "GGC Hafizabad Admin"
admin.site.index_title = "College Administration & Academic Management Dashboard"


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'code')
    search_fields = ('name', 'code')


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ('title', 'level', 'department', 'seats', 'duration', 'affiliation')
    list_filter = ('level', 'department')
    search_fields = ('title', 'description')


@admin.register(FacultyMember)
class FacultyMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'department', 'qualification', 'experience', 'email', 'is_active')
    list_filter = ('department', 'is_active')
    search_fields = ('name', 'specialization', 'qualification')


@admin.action(description="Mark selected applications as Merit Shortlisted")
def make_shortlisted(modeladmin, request, queryset):
    queryset.update(status='shortlisted')


@admin.action(description="Mark selected applications as Admitted (Fee Verified)")
def make_admitted(modeladmin, request, queryset):
    queryset.update(status='admitted')


@admin.register(AdmissionApplication)
class AdmissionApplicationAdmin(admin.ModelAdmin):
    list_display = ('application_no', 'full_name', 'cnic', 'applied_program', 'aggregate_merit', 'status', 'created_at')
    list_filter = ('status', 'applied_program', 'matric_board', 'is_hafiz')
    search_fields = ('application_no', 'full_name', 'cnic', 'phone')
    ordering = ('-aggregate_merit', '-created_at')
    actions = [make_shortlisted, make_admitted]
    readonly_fields = ('application_no', 'aggregate_merit', 'created_at')


@admin.action(description="Mark selected Challans as Paid")
def mark_challan_paid(modeladmin, request, queryset):
    queryset.update(is_paid=True)


@admin.register(FeeChallan)
class FeeChallanAdmin(admin.ModelAdmin):
    list_display = ('challan_no', 'student_name', 'roll_or_app_no', 'program', 'amount', 'due_date', 'is_paid')
    list_filter = ('is_paid', 'program', 'due_date')
    search_fields = ('challan_no', 'student_name', 'roll_or_app_no')
    actions = [mark_challan_paid]


@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date', 'is_urgent')
    list_filter = ('category', 'is_urgent', 'date')
    search_fields = ('title', 'summary', 'details')


class ExamResultInline(admin.TabularInline):
    model = ExamResult
    extra = 1


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('roll_no', 'registration_no', 'full_name', 'program', 'current_semester', 'cgpa')
    list_filter = ('program', 'current_semester')
    search_fields = ('roll_no', 'registration_no', 'full_name')
    inlines = [ExamResultInline]


@admin.register(ExamResult)
class ExamResultAdmin(admin.ModelAdmin):
    list_display = ('student', 'semester', 'course_code', 'course_title', 'marks_obtained', 'grade', 'grade_point')
    list_filter = ('semester', 'grade')
    search_fields = ('student__roll_no', 'course_title', 'course_code')


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'subject', 'phone', 'email', 'is_addressed', 'created_at')
    list_filter = ('is_addressed', 'created_at')
    search_fields = ('name', 'phone', 'email', 'subject', 'message')
