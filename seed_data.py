import os
import django
import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ggc_hafizabad.settings')
django.setup()

from django.contrib.auth.models import User
from portal.models import (
    Department, Program, FacultyMember, AdmissionApplication,
    FeeChallan, Notice, Student, ExamResult
)

def run_seed():
    print("Seeding Govt. Graduate College Hafizabad database...")

    # 1. Superuser
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@ggchafizabad.edu.pk', 'adminpassword123')
        print("[OK] Created Superuser: admin / adminpassword123")
    else:
        print("[OK] Superuser 'admin' already exists")

    # 2. Departments
    dept_cs, _ = Department.objects.get_or_create(name="Computer Science & IT", code="CS", description="Department of Computer Science & Software Engineering")
    dept_math, _ = Department.objects.get_or_create(name="Mathematics", code="MATH", description="Department of Pure & Applied Mathematics")
    dept_eng, _ = Department.objects.get_or_create(name="English", code="ENG", description="Department of English Literature & Linguistics")
    dept_phys, _ = Department.objects.get_or_create(name="Physics", code="PHYS", description="Department of Physics & Electronics")
    dept_chem, _ = Department.objects.get_or_create(name="Chemistry", code="CHEM", description="Department of Chemical Sciences")
    dept_bio, _ = Department.objects.get_or_create(name="Biological Sciences", code="BIO", description="Department of Botany & Zoology")
    dept_urdu, _ = Department.objects.get_or_create(name="Urdu & Humanities", code="URDU", description="Department of Urdu, Islamic Studies & History")
    print("[OK] Created 7 Academic Departments")

    # 3. Programs
    programs_data = [
        {"title": "BS Computer Science (BS CS)", "level": "bs", "dept": dept_cs, "seats": 100, "duration": "4 Years (8 Semesters)", "eligibility": "ICS / F.Sc Pre-Eng (Min 50% Marks)", "desc": "Algorithms, Software Engineering, AI, Web Development and Cloud Computing."},
        {"title": "BS Mathematics", "level": "bs", "dept": dept_math, "seats": 75, "duration": "4 Years (8 Semesters)", "eligibility": "F.Sc Pre-Eng / ICS with Math (Min 50% Marks)", "desc": "Pure and applied mathematics, numerical analysis, calculus, and algebra."},
        {"title": "BS English (Literature & Linguistics)", "level": "bs", "dept": dept_eng, "seats": 80, "duration": "4 Years (8 Semesters)", "eligibility": "FA / F.Sc / ICS with Min 45% Marks", "desc": "Classical & modern English literature, phonetics, syntax and communication."},
        {"title": "BS Physics", "level": "bs", "dept": dept_phys, "seats": 60, "duration": "4 Years (8 Semesters)", "eligibility": "F.Sc Pre-Eng or ICS with Physics (Min 50% Marks)", "desc": "Quantum mechanics, electromagnetism, electronics and solid state physics."},
        {"title": "BS Chemistry", "level": "bs", "dept": dept_chem, "seats": 60, "duration": "4 Years (8 Semesters)", "eligibility": "F.Sc Pre-Medical / Pre-Engineering (Min 50% Marks)", "desc": "Organic, Inorganic, Physical, and Analytical Chemistry with wet labs."},
        {"title": "F.Sc Pre-Medical", "level": "intermediate", "dept": dept_bio, "seats": 300, "duration": "2 Years", "eligibility": "Matric (Science with Bio) Min 60% Marks", "desc": "Biology, Chemistry, and Physics preparing for MDCAT & MBBS."},
        {"title": "ICS (Computer Science)", "level": "intermediate", "dept": dept_cs, "seats": 350, "duration": "2 Years", "eligibility": "Matric with CS or Science Min 55% Marks", "desc": "C/C++ programming, database fundamentals and IT."},
        {"title": "Associate Degree in Science (ADS)", "level": "adp", "dept": dept_math, "seats": 100, "duration": "2 Years (4 Semesters)", "eligibility": "F.Sc / ICS with Min 45% Marks", "desc": "Two-year degree affiliated with University of the Punjab."},
    ]

    for p in programs_data:
        Program.objects.get_or_create(
            title=p['title'],
            level=p['level'],
            department=p['dept'],
            defaults={
                'seats': p['seats'],
                'duration': p['duration'],
                'eligibility': p['eligibility'],
                'description': p['desc']
            }
        )
    print("[OK] Created Academic Programs")

    # 4. Faculty Members
    faculty_data = [
        {"name": "Prof. Muhammad Inayat Bhatti", "role": "Principal & Professor", "dept": dept_math, "qualification": "M.Sc (PU), M.Phil (QAU)", "exp": "28+ Years", "spec": "Pure Mathematics & Fluid Dynamics", "email": "principal@ggchafizabad.edu.pk", "img": "assets/images/principal.svg"},
        {"name": "Prof. Tariq Mahmood Cheema", "role": "Vice Principal & Associate Professor", "dept": dept_phys, "qualification": "M.Sc (PU), M.Phil (UET)", "exp": "25+ Years", "spec": "Solid State Physics", "email": "tariq.cheema@ggchafizabad.edu.pk", "img": "assets/images/principal.svg"},
        {"name": "Dr. Zafar Iqbal Tarar", "role": "Head of Department & Associate Professor", "dept": dept_cs, "qualification": "Ph.D. in Computer Science (FAST-NUCES)", "exp": "18+ Years", "spec": "Artificial Intelligence & Algorithms", "email": "cs.hod@ggchafizabad.edu.pk", "img": "assets/images/principal.svg"},
        {"name": "Prof. Ghulam Mustafa Raza", "role": "Head of Department & Associate Professor", "dept": dept_eng, "qualification": "M.A English (PU), M.Phil (GCUL)", "exp": "22+ Years", "spec": "Modern English Poetry & Linguistics", "email": "english.hod@ggchafizabad.edu.pk", "img": "assets/images/principal.svg"},
        {"name": "Dr. Shahid Mehmood Warraich", "role": "Head of Department & Associate Professor", "dept": dept_chem, "qualification": "Ph.D. Chemistry (QAU Islamabad)", "exp": "20+ Years", "spec": "Organic Synthesis & Polymer Chemistry", "email": "chem.hod@ggchafizabad.edu.pk", "img": "assets/images/principal.svg"},
    ]

    for f in faculty_data:
        FacultyMember.objects.get_or_create(
            name=f['name'],
            defaults={
                'role': f['role'],
                'department': f['dept'],
                'qualification': f['qualification'],
                'experience': f['exp'],
                'specialization': f['spec'],
                'email': f['email'],
                'image': f['img']
            }
        )
    print("[OK] Created Faculty Members")

    # 5. Notices
    Notice.objects.get_or_create(
        title="Admissions Open: BS (4-Year) Programs - Fall 2026 Session",
        defaults={
            'category': 'admissions',
            'is_urgent': True,
            'summary': "Online applications are invited for admission to BS Computer Science, English, Mathematics, Physics, Chemistry, Botany, and Zoology. Last date is October 15, 2026.",
            'details': "Applications are open for BS Programs affiliated with the University of the Punjab. Candidates must submit their matric and intermediate credentials via our Online Admission Portal."
        }
    )
    Notice.objects.get_or_create(
        title="Display of 1st Merit List for Intermediate (F.Sc / ICS / I.Com / FA)",
        defaults={
            'category': 'merit',
            'is_urgent': True,
            'summary': "The 1st Merit List for all disciplines of 1st year (Session 2026-2028) has been displayed on the college notice board. Selected students must submit fees by Oct 05.",
            'details': "Selected candidates must bring original Matric Result Card, CNIC/B-Form, Character Certificate, and 4 passport size photographs for document verification."
        }
    )
    print("[OK] Created College Notices")

    # 6. Sample Student & Results
    std, _ = Student.objects.get_or_create(
        roll_no="BSCS-22-10",
        defaults={
            'registration_no': "2022-GGC-5421",
            'full_name': "Hamza Ali",
            'father_name': "Tariq Mehmood",
            'program': "BS Computer Science",
            'current_semester': 4,
            'cgpa': 3.65
        }
    )

    ExamResult.objects.get_or_create(student=std, semester="4th Semester (Spring 2026)", course_code="CS-401", defaults={'course_title': "Operating Systems", 'credit_hours': "3+1", 'marks_obtained': 88, 'grade': "A+", 'grade_point': 4.00})
    ExamResult.objects.get_or_create(student=std, semester="4th Semester (Spring 2026)", course_code="CS-402", defaults={'course_title': "Database Management Systems", 'credit_hours': "3+1", 'marks_obtained': 82, 'grade': "A", 'grade_point': 3.80})
    ExamResult.objects.get_or_create(student=std, semester="4th Semester (Spring 2026)", course_code="MATH-202", defaults={'course_title': "Linear Algebra", 'credit_hours': "3", 'marks_obtained': 78, 'grade': "B+", 'grade_point': 3.40})
    ExamResult.objects.get_or_create(student=std, semester="4th Semester (Spring 2026)", course_code="CS-403", defaults={'course_title': "Web Application Development", 'credit_hours': "3+1", 'marks_obtained': 85, 'grade': "A+", 'grade_point': 4.00})
    print("[OK] Created Sample Student & Exam Results")

    # 7. Sample Admission Application
    AdmissionApplication.objects.get_or_create(
        application_no="GGC-2026-786110",
        defaults={
            'full_name': "Ahmad Raza Tarar",
            'father_name': "Muhammad Afzal Tarar",
            'cnic': "34301-1234567-1",
            'phone': "0300-7861122",
            'email': "ahmad.raza@example.com",
            'address': "Mohallah Kassoki Road, Hafizabad",
            'matric_board': "BISE Gujranwala",
            'matric_roll': "512400",
            'matric_obtained': 995,
            'matric_total': 1100,
            'inter_board': "BISE Gujranwala",
            'inter_roll': "812400",
            'inter_obtained': 940,
            'inter_total': 1100,
            'applied_program': "BS Computer Science",
            'is_hafiz': True,
            'status': 'shortlisted'
        }
    )
    print("[OK] Created Sample Admission Application")
    print("\nDatabase seeded successfully!")

if __name__ == '__main__':
    run_seed()
