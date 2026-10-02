import json
import random
import datetime
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from .models import (
    Department, Program, FacultyMember, AdmissionApplication,
    FeeChallan, Notice, Student, ExamResult, ContactInquiry
)

# Page Rendering Views
def home_view(request):
    return render(request, 'index.html')

def about_view(request):
    return render(request, 'about.html')

def academics_view(request):
    return render(request, 'academics.html')

def faculty_view(request):
    return render(request, 'faculty.html')

def admissions_view(request):
    return render(request, 'admissions.html')

def facilities_view(request):
    return render(request, 'facilities.html')

def notices_view(request):
    return render(request, 'notices.html')

def gallery_view(request):
    return render(request, 'gallery.html')

def student_portal_view(request):
    return render(request, 'student-portal.html')

def contact_view(request):
    return render(request, 'contact.html')


# ================= REST / JSON API ENDPOINTS =================

@csrf_exempt
def api_calculate_merit(request):
    """Calculates merit aggregate using 30% Matric + 70% Inter + 20 Hafiz formula."""
    try:
        if request.method == 'POST':
            data = json.loads(request.body) if request.body else request.POST
        else:
            data = request.GET

        m_obt = float(data.get('matric_obt', 0))
        m_tot = float(data.get('matric_total', 1100))
        i_obt = float(data.get('inter_obt', 0))
        i_tot = float(data.get('inter_total', 1100))
        is_hafiz = str(data.get('is_hafiz', '')).lower() in ['true', '1', 'yes']

        if m_tot <= 0 or i_tot <= 0 or m_obt <= 0 or i_obt <= 0:
            return JsonResponse({'success': False, 'error': 'Invalid marks entered.'}, status=400)

        m_weight = (m_obt / m_tot) * 30.0
        adjusted_inter = i_obt + (20.0 if is_hafiz else 0.0)
        i_weight = (min(adjusted_inter, i_tot) / i_tot) * 70.0
        total_aggregate = round(m_weight + i_weight, 2)

        # Recommendation
        recs = []
        if total_aggregate >= 78:
            recs = ["BS Computer Science", "BS Mathematics", "BS Physics", "BS English"]
        elif total_aggregate >= 65:
            recs = ["BS Chemistry", "BS Botany", "BS Zoology", "BS Economics"]
        elif total_aggregate >= 50:
            recs = ["BS Urdu", "Associate Degree in Science (ADS)", "Associate Degree in Arts (ADA)"]
        else:
            recs = ["Associate Degree in Arts (ADA)", "Evening Self-Finance"]

        return JsonResponse({
            'success': True,
            'matric_weight': round(m_weight, 2),
            'inter_weight': round(i_weight, 2),
            'is_hafiz_applied': is_hafiz,
            'aggregate_merit': total_aggregate,
            'recommended_programs': recs
        })
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)


@csrf_exempt
def api_apply_admission(request):
    """Processes online admission application, saves to DB, returns application ID."""
    if request.method != 'POST':
        return JsonResponse({'success': False, 'error': 'POST method required'}, status=405)

    try:
        data = json.loads(request.body) if request.body and request.content_type == 'application/json' else request.POST

        app_no = f"GGC-{random.randint(100000, 999999)}"
        dob_str = data.get('dob', '2006-01-01')
        try:
            dob_val = datetime.date.fromisoformat(dob_str)
        except Exception:
            dob_val = datetime.date(2006, 1, 1)

        app = AdmissionApplication.objects.create(
            application_no=app_no,
            full_name=data.get('fullName', 'Student Applicant'),
            father_name=data.get('fatherName', 'Father Name'),
            cnic=data.get('cnic', '34301-0000000-0'),
            dob=dob_val,
            phone=data.get('phone', ''),
            email=data.get('email', ''),
            address=data.get('address', 'Hafizabad'),
            matric_board=data.get('matricBoard', 'BISE Gujranwala'),
            matric_roll=data.get('matricRoll', '-'),
            matric_obtained=float(data.get('matricObt', 0)),
            matric_total=float(data.get('matricTotal', 1100)),
            inter_board=data.get('interBoard', 'BISE Gujranwala'),
            inter_roll=data.get('interRoll', '-'),
            inter_obtained=float(data.get('interObt', 0)),
            inter_total=float(data.get('interTotal', 1100)),
            applied_program=data.get('appliedProgram', 'BS Computer Science'),
            is_hafiz=str(data.get('isHafiz', '')).lower() in ['true', '1', 'yes'],
            status='submitted'
        )

        return JsonResponse({
            'success': True,
            'message': 'Application submitted successfully!',
            'application_no': app.application_no,
            'full_name': app.full_name,
            'program': app.applied_program,
            'aggregate_merit': app.aggregate_merit,
            'submission_date': app.created_at.strftime('%d-%m-%Y')
        })
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)


@csrf_exempt
def api_generate_challan(request):
    """Generates official bank fee challan record and returns printable voucher data."""
    try:
        data = json.loads(request.body) if request.body else (request.POST if request.method == 'POST' else request.GET)

        student_name = data.get('student_name', 'Student Applicant')
        roll_or_app_no = data.get('roll_no', f"GGC-{random.randint(10000, 99999)}")
        program = data.get('program', 'BS Computer Science')

        challan_no = f"CH-{random.randint(100000, 999999)}"
        today = timezone.now().date()
        due_date = today + datetime.timedelta(days=10)

        challan = FeeChallan.objects.create(
            challan_no=challan_no,
            student_name=student_name,
            roll_or_app_no=roll_or_app_no,
            program=program,
            amount=14500.00,
            issue_date=today,
            due_date=due_date,
            is_paid=False
        )

        return JsonResponse({
            'success': True,
            'challan_no': challan.challan_no,
            'student_name': challan.student_name,
            'roll_or_app_no': challan.roll_or_app_no,
            'program': challan.program,
            'amount': float(challan.amount),
            'issue_date': challan.issue_date.strftime('%d-%b-%Y'),
            'due_date': challan.due_date.strftime('%d-%b-%Y'),
            'bank_name': 'National Bank of Pakistan (NBP) Main Br. Hafizabad',
            'account_no': '01420040582910'
        })
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)


def api_find_roll_slip(request):
    """Finds roll number slip for examination."""
    roll = request.GET.get('roll', '').strip()
    session = request.GET.get('session', 'BS Fall 2026 Final Exams')

    student = Student.objects.filter(roll_no__iexact=roll).first()
    student_name = student.full_name if student else "Usman Tariq"
    father_name = student.father_name if student else "Tariq Mehmood"
    reg_no = student.registration_no if student else "2022-GGC-5421"

    exam_schedule = [
        {'course': 'Design & Analysis of Algorithms', 'date': '20-Oct-2026', 'time': '09:00 AM', 'room': 'Hall-1'},
        {'course': 'Computer Networks & Data Com', 'date': '23-Oct-2026', 'time': '09:00 AM', 'room': 'Hall-1'},
        {'course': 'Software Engineering Principles', 'date': '26-Oct-2026', 'time': '09:00 AM', 'room': 'Hall-1'},
        {'course': 'Numerical Computing', 'date': '29-Oct-2026', 'time': '09:00 AM', 'room': 'Hall-1'},
    ]

    return JsonResponse({
        'success': True,
        'roll_no': roll or 'BSCS-22-45',
        'candidate_name': student_name,
        'father_name': father_name,
        'registration_no': reg_no,
        'session': session,
        'exam_center': 'Main Examination Hall, Block-A, Govt. Graduate College Hafizabad',
        'schedule': exam_schedule
    })


def api_result_inquiry(request):
    """Queries online semester results."""
    roll = request.GET.get('roll', '').strip()
    semester = request.GET.get('semester', '4th Semester (Spring 2026)')

    student = Student.objects.filter(roll_no__iexact=roll).first()
    results = ExamResult.objects.filter(student=student, semester=semester) if student else []

    if results.exists():
        courses = [{
            'title': r.course_title,
            'code': r.course_code,
            'credit': r.credit_hours,
            'marks': r.marks_obtained,
            'grade': r.grade,
            'gp': r.grade_point
        } for r in results]
        cgpa = float(student.cgpa)
    else:
        # Default mock courses if no database entry
        courses = [
            {'title': 'Operating Systems', 'code': 'CS-401', 'credit': '3+1', 'marks': 88, 'grade': 'A+', 'gp': 4.00},
            {'title': 'Database Management Systems', 'code': 'CS-402', 'credit': '3+1', 'marks': 82, 'grade': 'A', 'gp': 3.80},
            {'title': 'Linear Algebra', 'code': 'MATH-202', 'credit': '3', 'marks': 78, 'grade': 'B+', 'gp': 3.40},
            {'title': 'Web Application Development', 'code': 'CS-403', 'credit': '3+1', 'marks': 85, 'grade': 'A+', 'gp': 4.00},
        ]
        cgpa = 3.65

    return JsonResponse({
        'success': True,
        'roll_no': roll or 'BSCS-22-10',
        'student_name': student.full_name if student else 'Hamza Ali',
        'program': student.program if student else 'BS Computer Science',
        'semester': semester,
        'gpa': 3.78,
        'cgpa': cgpa,
        'courses': courses
    })


@csrf_exempt
def api_submit_contact(request):
    """Saves student inquiry to database."""
    if request.method != 'POST':
        return JsonResponse({'success': False, 'error': 'POST method required'}, status=405)

    try:
        data = json.loads(request.body) if request.body and request.content_type == 'application/json' else request.POST

        inquiry = ContactInquiry.objects.create(
            name=data.get('name', 'Anonymous'),
            phone=data.get('phone', ''),
            email=data.get('email', ''),
            subject=data.get('subject', 'General Inquiry'),
            message=data.get('message', '')
        )

        return JsonResponse({
            'success': True,
            'message': 'Inquiry received successfully! The college administration desk will respond shortly.',
            'inquiry_id': inquiry.id
        })
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)


def api_get_notices(request):
    """Returns official notices from database."""
    notices = Notice.objects.all()[:10]
    data = [{
        'id': n.id,
        'title': n.title,
        'category': n.category,
        'date': n.date.strftime('%b %d, %Y'),
        'urgent': n.is_urgent,
        'summary': n.summary,
        'details': n.details
    } for n in notices]

    return JsonResponse({'success': True, 'notices': data})
