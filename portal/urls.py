from django.urls import path
from . import views

urlpatterns = [
    # Frontend Pages
    path('', views.home_view, name='home'),
    path('index.html', views.home_view, name='index'),
    path('about.html', views.about_view, name='about'),
    path('academics.html', views.academics_view, name='academics'),
    path('faculty.html', views.faculty_view, name='faculty'),
    path('admissions.html', views.admissions_view, name='admissions'),
    path('facilities.html', views.facilities_view, name='facilities'),
    path('notices.html', views.notices_view, name='notices'),
    path('gallery.html', views.gallery_view, name='gallery'),
    path('student-portal.html', views.student_portal_view, name='student_portal'),
    path('contact.html', views.contact_view, name='contact'),

    # Backend REST APIs
    path('api/calculate-merit/', views.api_calculate_merit, name='api_calculate_merit'),
    path('api/apply-admission/', views.api_apply_admission, name='api_apply_admission'),
    path('api/generate-challan/', views.api_generate_challan, name='api_generate_challan'),
    path('api/roll-slip/', views.api_find_roll_slip, name='api_find_roll_slip'),
    path('api/result-inquiry/', views.api_result_inquiry, name='api_result_inquiry'),
    path('api/contact/', views.api_submit_contact, name='api_submit_contact'),
    path('api/notices/', views.api_get_notices, name='api_get_notices'),
]
