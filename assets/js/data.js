// College Data Store for Govt. Graduate College Hafizabad
const COLLEGE_DATA = {
  info: {
    name: "Government Graduate College Hafizabad",
    shortName: "GGC Hafizabad",
    urduName: "حکومتی گریجویٹ کالج حافظ آباد",
    motto: "Knowledge is Light • رَبِّ زِدْنِي عِلْمًا",
    established: "1958",
    affiliations: [
      { name: "University of the Punjab (PU)", role: "Affiliated for BS & Associate Degrees" },
      { name: "BISE Gujranwala", role: "Affiliated for Intermediate (F.Sc / ICS / FA)" },
      { name: "Higher Education Department (HED)", role: "Govt. of the Punjab" }
    ],
    address: "College Road / Madhrianwala Road, Hafizabad, Punjab, Pakistan",
    phone: "0547-521400 / 0547-522100",
    email: "info@ggchafizabad.edu.pk",
    officeHours: "Monday - Saturday: 08:00 AM - 02:00 PM (Friday till 12:30 PM)",
    principal: {
      name: "Prof. Muhammad Inayat Bhatti",
      title: "Principal & Professor of Mathematics",
      qualifications: "M.Sc. (PU), M.Phil (QAU), PGD (Edu)",
      image: "assets/images/principal.svg",
      message: `Welcome to Government Graduate College Hafizabad, the premier seat of higher learning in the historic district of Hafizabad. Since its inception, this institution has stood as a beacon of academic brilliance, character building, and social enlightenment. 

Our mission is to equip our youth with rigorous academic knowledge, critical analytical thinking, and ethical leadership required to excel in this modern era of science and technology. With our dedicated faculty, state-of-the-art laboratories, expansive sports grounds, and vibrant student societies, we nurture our students to become confident nation-builders. 

I warmly welcome all prospective students to embark upon an empowering educational journey with us and uphold our proud tradition of honor and academic excellence.`
    }
  },

  stats: [
    { value: "50+", label: "Years of Academic Excellence", icon: "fa-award" },
    { value: "3,800+", label: "Enrolled Students", icon: "fa-user-graduate" },
    { value: "65+", label: "Distinguished Faculty Members", icon: "fa-chalkboard-teacher" },
    { value: "14+", label: "BS 4-Year & Degree Programs", icon: "fa-book-open" },
    { value: "98.4%", label: "Board & University Pass Rate", icon: "fa-chart-line" },
    { value: "25k+", label: "Library Books & Journals", icon: "fa-book-reader" }
  ],

  programs: [
    {
      id: "bs-cs",
      level: "bs",
      title: "BS Computer Science (BS CS)",
      department: "Computer Science & IT",
      duration: "4 Years (8 Semesters)",
      affiliation: "University of the Punjab",
      eligibility: "ICS / F.Sc Pre-Eng or F.Sc Pre-Med with Additional Math (Min 50% Marks)",
      seats: 100,
      description: "A comprehensive program designed to build strong foundations in algorithms, software engineering, AI, web development, and cloud computing.",
      highlights: ["AI & Data Science Labs", "Hands-on Software Development", "Industry Capstone Projects", "Final Year Thesis"]
    },
    {
      id: "bs-eng",
      level: "bs",
      title: "BS English (Literature & Linguistics)",
      department: "English",
      duration: "4 Years (8 Semesters)",
      affiliation: "University of the Punjab",
      eligibility: "FA / F.Sc / ICS / I.Com with Min 45% Marks",
      seats: 80,
      description: "Explores classical and modern English literature, phonetics, syntax, semantics, and professional communication skills.",
      highlights: ["Language Research Lab", "Literary & Debating Society", "Creative Writing Workshops", "Critical Theory Analysis"]
    },
    {
      id: "bs-math",
      level: "bs",
      title: "BS Mathematics",
      department: "Mathematics",
      duration: "4 Years (8 Semesters)",
      affiliation: "University of the Punjab",
      eligibility: "F.Sc Pre-Eng / ICS with Mathematics (Min 50% Marks)",
      seats: 75,
      description: "Covers pure and applied mathematics, numerical analysis, mathematical modeling, calculus, and computational algebra.",
      highlights: ["Computational Labs", "Research Seminars", "Applied Problem Solving", "Preparation for CSS / Higher Studies"]
    },
    {
      id: "bs-phys",
      level: "bs",
      title: "BS Physics",
      department: "Physics",
      duration: "4 Years (8 Semesters)",
      affiliation: "University of the Punjab",
      eligibility: "F.Sc Pre-Eng or ICS with Physics & Math (Min 50% Marks)",
      seats: 60,
      description: "In-depth study of quantum mechanics, electromagnetism, solid state physics, electronics, and thermodynamics with practical laboratory training.",
      highlights: ["Equipped Physics Labs", "Optical & Electronics Experimentation", "Field Visits to Research Centers"]
    },
    {
      id: "bs-chem",
      level: "bs",
      title: "BS Chemistry",
      department: "Chemistry",
      duration: "4 Years (8 Semesters)",
      affiliation: "University of the Punjab",
      eligibility: "F.Sc Pre-Medical or F.Sc Pre-Engineering (Min 50% Marks)",
      seats: 60,
      description: "Covers Organic, Inorganic, Physical, and Analytical Chemistry, emphasizing experimental methodology and industrial applications.",
      highlights: ["Modern Wet Labs", "Spectroscopy Apparatus", "Industrial Chemistry Exposure"]
    },
    {
      id: "bs-zoo",
      level: "bs",
      title: "BS Zoology",
      department: "Biological Sciences",
      duration: "4 Years (8 Semesters)",
      affiliation: "University of the Punjab",
      eligibility: "F.Sc Pre-Medical (Min 50% Marks)",
      seats: 50,
      description: "Study of animal biology, genetics, ecology, wildlife conservation, developmental biology, and biotechnology.",
      highlights: ["Zoological Museum & Specimen Collection", "Dissection & Microscope Labs", "Ecological Field Trips"]
    },
    {
      id: "bs-bot",
      level: "bs",
      title: "BS Botany",
      department: "Biological Sciences",
      duration: "4 Years (8 Semesters)",
      affiliation: "University of the Punjab",
      eligibility: "F.Sc Pre-Medical (Min 50% Marks)",
      seats: 50,
      description: "Explores plant physiology, plant taxonomy, genetics, environmental botany, and agricultural microbiology.",
      highlights: ["Botanical Garden & Herbarium", "Physiology & Tissue Culture Lab", "Agronomy Research"]
    },
    {
      id: "bs-urdu",
      level: "bs",
      title: "BS Urdu (شعبہ اردو)",
      department: "Urdu",
      duration: "4 Years (8 Semesters)",
      affiliation: "University of the Punjab",
      eligibility: "FA / F.Sc with Min 45% Marks",
      seats: 60,
      description: "Comprehensive study of classical and modern Urdu poetry, prose, criticism, Urdu linguistics, and journalism.",
      highlights: ["Urdu Adabi Majlis", "Poetry Recitations (Mushaira)", "Manuscript Studies"]
    },
    {
      id: "bs-eco",
      level: "bs",
      title: "BS Economics",
      department: "Economics",
      duration: "4 Years (8 Semesters)",
      affiliation: "University of the Punjab",
      eligibility: "FA / F.Sc / ICS / I.Com with Min 45% Marks",
      seats: 60,
      description: "Microeconomics, Macroeconomics, Econometrics, Public Finance, and Development Economics tailored for civil services and banking sectors.",
      highlights: ["Financial Data Analysis", "Econometric Software Tools", "Banking & Finance Case Studies"]
    },
    // Intermediate Programs
    {
      id: "fsc-pre-med",
      level: "intermediate",
      title: "F.Sc Pre-Medical",
      department: "Intermediate Directorate",
      duration: "2 Years (Part-I & Part-II)",
      affiliation: "BISE Gujranwala",
      eligibility: "Matric (Science with Biology) with Min 60% Marks",
      seats: 300,
      description: "The ideal launchpad for aspiring doctors, dentists, pharmacists, and allied health professionals with rigorous training in Biology, Chemistry, and Physics.",
      highlights: ["MDCAT Preparatory Guidance", "Daily Practical Sessions", "Monthly Conceptual Evaluations"]
    },
    {
      id: "fsc-pre-eng",
      level: "intermediate",
      title: "F.Sc Pre-Engineering",
      department: "Intermediate Directorate",
      duration: "2 Years (Part-I & Part-II)",
      affiliation: "BISE Gujranwala",
      eligibility: "Matric (Science with Math) with Min 60% Marks",
      seats: 250,
      description: "Rigorous curriculum covering Mathematics, Physics, and Chemistry, preparing students for engineering universities (UET, NUST, GIKI, PIEAS).",
      highlights: ["ECAT Preparation Seminars", "Applied Lab Practical Work", "Strong Analytical Drilling"]
    },
    {
      id: "ics",
      level: "intermediate",
      title: "ICS (Intermediate in Computer Science)",
      department: "Intermediate Directorate",
      duration: "2 Years (Part-I & Part-II)",
      affiliation: "BISE Gujranwala",
      eligibility: "Matric with Computer Science or Science with Min 55% Marks",
      seats: 350,
      description: "Combines Computer Science with Physics or Statistics, laying the groundwork for BS Computer Science, Software Engineering, and IT careers.",
      highlights: ["Hands-on C/C++ Programming", "Database Fundamentals", "Fully Air-Conditioned Computer Labs"]
    },
    {
      id: "icom",
      level: "intermediate",
      title: "I.Com (Intermediate in Commerce)",
      department: "Intermediate Directorate",
      duration: "2 Years (Part-I & Part-II)",
      affiliation: "BISE Gujranwala",
      eligibility: "Matric in any discipline with Min 45% Marks",
      seats: 150,
      description: "Focuses on Accounting, Commerce, Banking, and Business Math, ideal for careers in CA, ACCA, BBA, and Commerce.",
      highlights: ["Financial Accounting Basics", "Commercial Geography", "Banking & Business Law"]
    },
    {
      id: "fa",
      level: "intermediate",
      title: "F.A. (Faculty of Arts / Humanities)",
      department: "Intermediate Directorate",
      duration: "2 Years (Part-I & Part-II)",
      affiliation: "BISE Gujranwala",
      eligibility: "Matric with Min 45% Marks",
      seats: 200,
      description: "Broad selection of Humanities subjects including Civics, History, Islamic Studies, Physical Education, Economics, and Literature.",
      highlights: ["Diverse Electives", "Civil Services Foundation", "Personality Development"]
    },
    // Associate Degree
    {
      id: "adp-sci",
      level: "adp",
      title: "Associate Degree in Science (ADS)",
      department: "Science Faculty",
      duration: "2 Years (4 Semesters)",
      affiliation: "University of the Punjab",
      eligibility: "F.Sc / ICS with Min 45% Marks",
      seats: 100,
      description: "A two-year degree providing sound conceptual knowledge in double mathematics, physics, chemistry, or statistics.",
      highlights: ["University of the Punjab Degree", "Lateral Entry into 5th Semester of BS Programs"]
    },
    {
      id: "adp-arts",
      level: "adp",
      title: "Associate Degree in Arts (ADA)",
      department: "Arts Faculty",
      duration: "2 Years (4 Semesters)",
      affiliation: "University of the Punjab",
      eligibility: "FA / F.Sc / I.Com with Min 45% Marks",
      seats: 120,
      description: "General arts degree with flexible subject groupings designed for higher education and government job eligibility.",
      highlights: ["University of the Punjab Affiliation", "Direct Pathway to BS 5th Semester"]
    }
  ],

  faculty: [
    {
      id: 1,
      name: "Prof. Muhammad Inayat Bhatti",
      role: "Principal & Professor",
      department: "Mathematics",
      qualification: "M.Sc (PU), M.Phil (QAU)",
      experience: "28+ Years",
      specialization: "Pure Mathematics & Fluid Dynamics",
      email: "principal@ggchafizabad.edu.pk",
      image: "assets/images/principal.svg"
    },
    {
      id: 2,
      name: "Prof. Tariq Mahmood Cheema",
      role: "Vice Principal & Associate Professor",
      department: "Physics",
      qualification: "M.Sc (PU), M.Phil (UET)",
      experience: "25+ Years",
      specialization: "Solid State Physics & Quantum Mechanics",
      email: "tariq.cheema@ggchafizabad.edu.pk",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Dr. Zafar Iqbal Tarar",
      role: "Head of Department & Associate Professor",
      department: "Computer Science",
      qualification: "Ph.D. in Computer Science (FAST-NUCES), MS (PU)",
      experience: "18+ Years",
      specialization: "Artificial Intelligence, Algorithms & Machine Learning",
      email: "cs.hod@ggchafizabad.edu.pk",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "Prof. Ghulam Mustafa Raza",
      role: "Head of Department & Associate Professor",
      department: "English",
      qualification: "M.A English (PU), M.Phil (GCUL)",
      experience: "22+ Years",
      specialization: "Modern English Poetry & Postcolonial Literature",
      email: "english.hod@ggchafizabad.edu.pk",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      name: "Dr. Shahid Mehmood Warraich",
      role: "Head of Department & Associate Professor",
      department: "Chemistry",
      qualification: "Ph.D. Chemistry (QAU Islamabad)",
      experience: "20+ Years",
      specialization: "Organic Synthesis & Polymer Chemistry",
      email: "chem.hod@ggchafizabad.edu.pk",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 6,
      name: "Prof. Asif Ali Bhatti",
      role: "Head of Department & Associate Professor",
      department: "Botany",
      qualification: "M.Sc, M.Phil Botany (PU)",
      experience: "19+ Years",
      specialization: "Plant Taxonomy & Ecology",
      email: "botany.hod@ggchafizabad.edu.pk",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 7,
      name: "Dr. Muhammad Akhtar",
      role: "Associate Professor",
      department: "Zoology",
      qualification: "Ph.D. Zoology (PU)",
      experience: "17+ Years",
      specialization: "Entomology & Wildlife Biology",
      email: "zoology@ggchafizabad.edu.pk",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 8,
      name: "Engr. Hamza Nawaz",
      role: "Assistant Professor",
      department: "Computer Science",
      qualification: "MS Software Engineering (NUST), BS CS (PU)",
      experience: "8+ Years",
      specialization: "Web Technologies, Cloud Architecture & Cyber Security",
      email: "hamza.cs@ggchafizabad.edu.pk",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 9,
      name: "Prof. Khalid Mehmood",
      role: "Head of Department & Associate Professor",
      department: "Urdu",
      qualification: "M.A. Urdu, M.Phil (PU)",
      experience: "24+ Years",
      specialization: "Iqbaliat & Modern Urdu Prose",
      email: "urdu.hod@ggchafizabad.edu.pk",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 10,
      name: "Prof. Sajid Hussain Shah",
      role: "Director Physical Education & Sports",
      department: "Sports & Physical Education",
      qualification: "M.Sc Physical Education (PU)",
      experience: "16+ Years",
      specialization: "Athletic Conditioning, Cricket & Football Coaching",
      email: "sports@ggchafizabad.edu.pk",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 11,
      name: "Prof. Naveed Ahmad",
      role: "Assistant Professor",
      department: "Mathematics",
      qualification: "M.Sc, M.Phil Mathematics (GCUL)",
      experience: "12+ Years",
      specialization: "Differential Equations & Numerical Analysis",
      email: "naveed.math@ggchafizabad.edu.pk",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 12,
      name: "Prof. Abdul Rehman",
      role: "Assistant Professor",
      department: "Islamic Studies",
      qualification: "M.A Islamic Studies, M.Phil (IIUI)",
      experience: "15+ Years",
      specialization: "Quranic Exegesis & Islamic Jurisprudence",
      email: "islamic@ggchafizabad.edu.pk",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80"
    }
  ],

  facilities: [
    {
      id: "library",
      title: "Allama Iqbal Central Library",
      category: "Academic",
      icon: "fa-book-reader",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
      description: "An air-conditioned repository housing over 25,000 academic books, research journals, periodicals, and an automated digital library section connected with HEC National Digital Library.",
      features: ["25,000+ Physical Books", "HEC Digital Journal Access", "Spacious Reading Hall", "Automated RFID Cataloging"]
    },
    {
      id: "cs-labs",
      title: "Hi-Tech Computer & IT Labs",
      category: "Technology",
      icon: "fa-desktop",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
      description: "Three fully equipped computer laboratories featuring high-speed Core i7 systems, gigabit networking, dedicated server infrastructure, and uninterruptible solar power backup.",
      features: ["150+ Modern Desktop PCs", "High-Speed Fiber Internet", "24/7 Solar Power Backup", "Software Dev & AI Tools"]
    },
    {
      id: "science-labs",
      title: "Advanced Science Laboratories",
      category: "Academic",
      icon: "fa-flask",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
      description: "Spacious, well-ventilated Physics, Chemistry, Biology, and Zoology laboratories meeting the highest international safety standards for BS and Intermediate experiments.",
      features: ["Modern Spectrophotometers", "Digital Microscopes & Sensors", "Fume Hoods & Safety Showers", "Dedicated Lab Technicians"]
    },
    {
      id: "sports-ground",
      title: "Sports Stadium & Gymnasium",
      category: "Sports",
      icon: "fa-volleyball-ball",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
      description: "Expansive green grounds equipped for Cricket, Football, Hockey, Volleyball, and Badminton. The college regularly bags trophies at Inter-collegiate and BISE championships.",
      features: ["Full-Size Cricket Turf Pitch", "Floodlit Badminton Courts", "Indoor Table Tennis & Gym", "Annual Sports Olympiad"]
    },
    {
      id: "auditorium",
      title: "Quaid-e-Azam Grand Auditorium",
      category: "Campus",
      icon: "fa-microphone-alt",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      description: "A centralized, acoustic-treated auditorium with seating capacity for over 800 guests, equipped with multimedia projection and surround audio for seminars and convocation.",
      features: ["800+ Seating Capacity", "Digital Multimedia Projection", "Central Air Conditioning", "Stage for Dramas & Declamations"]
    },
    {
      id: "transport",
      title: "Student Transport Fleet",
      category: "Services",
      icon: "fa-bus",
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
      description: "Dedicated college bus fleet operating across all major arterial routes connecting Hafizabad city with rural peripheries including Kassoki, Pindi Bhattian, and Sukheke.",
      features: ["Subsidized Bus Passes", "Safe & Monitored Commute", "Multiple Designated Stops", "Experienced Professional Drivers"]
    }
  ],

  notices: [
    {
      id: 101,
      title: "Admissions Open: BS (4-Year) Programs - Fall 2026 Session",
      category: "admissions",
      date: "October 01, 2026",
      urgent: true,
      summary: "Online applications are invited for admission to BS Computer Science, English, Mathematics, Physics, Chemistry, Botany, and Zoology. Last date to apply is October 15, 2026.",
      fileUrl: "#",
      details: "Applications are open for BS Programs affiliated with the University of the Punjab. Candidates must submit their matric and intermediate credentials via our Online Admission Portal or visit the admission desk on campus from 8:30 AM to 1:30 PM."
    },
    {
      id: 102,
      title: "Display of 1st Merit List for Intermediate (F.Sc / ICS / I.Com / FA)",
      category: "merit",
      date: "September 28, 2026",
      urgent: true,
      summary: "The 1st Merit List for all disciplines of 1st year (Session 2026-2028) has been displayed on the college notice board and portal. Selected students must submit fees by Oct 05.",
      fileUrl: "#",
      details: "Selected candidates must bring original Matric Result Card, CNIC/B-Form, Character Certificate, and 4 passport size photographs for document verification before fee deposit."
    },
    {
      id: 103,
      title: "Date Sheet for BS 2nd, 4th, 6th & 8th Semester Final Examinations",
      category: "examinations",
      date: "September 24, 2026",
      urgent: false,
      summary: "University of the Punjab has announced the official date sheet for Spring Semester examinations starting from October 20, 2026. Roll number slips are now available.",
      fileUrl: "#",
      details: "Students can download roll number slips from the Student Portal or collect printed copies from their respective department clerk."
    },
    {
      id: 104,
      title: "Punjab Educational Endowment Fund (PEEF) Scholarships 2026",
      category: "scholarships",
      date: "September 20, 2026",
      urgent: false,
      summary: "Needy and meritorious students of 1st Year Intermediate and 1st Semester BS are advised to submit PEEF scholarship application forms to the Student Affairs Office.",
      fileUrl: "#",
      details: "Students having parental income less than Rs. 50,000/month and at least 60% marks in previous examinations are eligible to apply."
    },
    {
      id: 105,
      title: "Annual Inter-Collegiate Cricket & Badminton Trials 2026",
      category: "sports",
      date: "September 15, 2026",
      urgent: false,
      summary: "Trials for selection in the College Cricket and Badminton teams for BISE Gujranwala tournament will be conducted on October 08 at the main sports complex.",
      fileUrl: "#",
      details: "All interested regular students must report in proper sports kit to Prof. Sajid Hussain Shah (Director Sports) at 09:00 AM sharp."
    }
  ],

  gallery: [
    {
      id: 1,
      title: "Grand Campus Main Block & Clock Tower",
      category: "campus",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
      caption: "The majestic academic block of Govt Graduate College Hafizabad amidst lush greenery."
    },
    {
      id: 2,
      title: "Computer Science Coding Hackathon",
      category: "events",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      caption: "BS CS students participating in the annual inter-departmental programming contest."
    },
    {
      id: 3,
      title: "Chemistry & Physics Laboratory Experiments",
      category: "labs",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
      caption: "Students performing analytical chemistry experiments under faculty supervision."
    },
    {
      id: 4,
      title: "Annual Degree Convocation Ceremony",
      category: "events",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      caption: "Graduates celebrating their academic degrees with faculty and dignitaries."
    },
    {
      id: 5,
      title: "Annual Sports Gala & Cricket Tournament",
      category: "sports",
      image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80",
      caption: "Vibrant moments from the college cricket championship held at the main ground."
    },
    {
      id: 6,
      title: "Allama Iqbal Central Reading Hall",
      category: "campus",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
      caption: "Quiet and well-lit study environment for research scholars and students."
    },
    {
      id: 7,
      title: "Independence Day & Cultural Declamation",
      category: "events",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
      caption: "National pride celebrations and inter-college bilingual declamation contest."
    },
    {
      id: 8,
      title: "Botanical Research & Greenhouse Tour",
      category: "labs",
      image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
      caption: "Botany students examining indigenous flora and crop genetics in the college nursery."
    }
  ],

  faqs: [
    {
      q: "What is the procedure to apply for BS 4-Year Admissions?",
      a: "Students can apply online using our Online Admission Portal or obtain the official prospectus with admission form from the college admission desk. Fill in your details, attach attested copies of Matric and Intermediate mark sheets, and submit before the deadline."
    },
    {
      q: "Is Govt. Graduate College Hafizabad recognized by HEC and affiliated with PU?",
      a: "Yes! All BS 4-Year degree programs and Associate Degree programs are officially affiliated with the University of the Punjab (PU), Lahore, and recognized by the Higher Education Commission (HEC) of Pakistan. Intermediate programs are affiliated with BISE Gujranwala."
    },
    {
      q: "Are merit and need-based scholarships available for needy students?",
      a: "Yes! The college facilitates multiple scholarship programs including the Punjab Educational Endowment Fund (PEEF), Mora Scholarships, HED Need-Based Scholarships, and the College Benevolent Relief Fund for deserving students."
    },
    {
      q: "What are the college timings?",
      a: "Regular academic timings are 08:00 AM to 02:00 PM from Monday to Thursday and Saturday. On Fridays, the college operates from 08:00 AM to 12:30 PM."
    },
    {
      q: "How can I calculate my merit percentage for BS Computer Science?",
      a: "You can use our interactive Merit Calculator tool on the Admissions page! Merit is calculated as: 30% Matric Marks + 70% Intermediate Marks (plus 20 marks for Hafiz-e-Quran if applicable)."
    }
  ]
};
