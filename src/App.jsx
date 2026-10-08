import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import logoImg from "./assets/KSC logo.png";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Award,
  FileText,
  BarChart3,
  Bell,
  Calendar,
  Clock,
  BookOpen,
  Users,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Search,
  ArrowUp,
  Volume2,
  Download,
  Share2,
  Eye,
  MessageSquare,
  Compass,
  Star,
  Check,
  PhoneCall,
  UserCheck,
  BookCheck,
  Radio,
} from "lucide-react";

// --- Official Assets & Media from kuttystudycircle.in ---
const FALLBACK_LOGO = "https://www.kuttystudycircle.in/static/uploads/logo/KUTTY%20LOGO.png";
const LOGO_URL = logoImg || FALLBACK_LOGO;
const HERO_VIDEO_URL = "https://www.kuttystudycircle.in/static/uploads/Hero/KSC.mp4";
const RK_MASTER_IMG = "https://i.ibb.co/mV6pY161/RK-Master-copy.jpg";
const TEACHING_TRANSFORMS_IMG = "https://i.ibb.co/XfD1LZwK/KUTTY-Q3-copy-2-jpg.jpg";

// PDF Page 1: Exam Cards for "Choose your exam"
const EXAM_CARDS = [
  {
    id: "dsc-2026",
    title: "AP DSC 2026 (SGT / SA)",
    badge: "Notification expected 15 Oct",
    badgeColor: "bg-[#FFD700] text-[#003366] font-extrabold",
    desc: "For D.Ed and B.Ed holders and TET-qualified candidates. Maths, Psychology and Pedagogy, subject papers, with daily tests.",
    nextBatch: "Starts 15-Oct-2026",
    fee: "Affordable with Installments",
    cta: "Book DSC demo",
    tag: "High Selection Ratio",
  },
  {
    id: "tet-paper-1-2",
    title: "AP TET Paper 1 & 2",
    badge: "Official Syllabus Covered",
    badgeColor: "bg-blue-100 text-[#003366] font-bold",
    desc: "For D.Ed and B.Ed students and teachers who still need TET. Your TET score also counts towards DSC selection.",
    nextBatch: "Starts 12-Oct-2026",
    fee: "Flexible Installments",
    cta: "Book TET demo",
    tag: "Essential for DSC",
  },
  {
    id: "police-si-constable",
    title: "AP Police SI / Constable",
    badge: "Physical + Written Prep",
    badgeColor: "bg-purple-100 text-purple-900 font-bold",
    desc: "For Inter (Constable) and degree (SI) holders. Written exam coaching plus dedicated guidance for the physical tests.",
    nextBatch: "Batches Active Now",
    fee: "Includes Ground Training Guidance",
    cta: "Book Police demo",
    tag: "High Demand",
  },
  {
    id: "banking-ssc",
    title: "Banking & SSC",
    badge: "Speed Shortcut Modules",
    badgeColor: "bg-emerald-100 text-emerald-900 font-bold",
    desc: "For final-year degree students and graduates. Maths, reasoning and English from the basics, with daily practice tests.",
    nextBatch: "Morning & Evening Batches",
    fee: "Complete Study Material Included",
    cta: "Book Bank/SSC demo",
    tag: "Central & State",
  },
  {
    id: "railway-rrb",
    title: "Railway (RRB NTPC, Group D)",
    badge: "Technical & Non-Technical",
    badgeColor: "bg-amber-100 text-amber-900 font-bold",
    desc: "For 10th, ITI, Inter and degree holders. Maths, reasoning, general knowledge and quick tricks for speed.",
    nextBatch: "New Batch Starting Monday",
    fee: "OMR & Online Mock Tests",
    cta: "Book Railway demo",
    tag: "Comprehensive Prep",
  },
  {
    id: "online-recorded",
    title: "Can't come every day?",
    badge: "Flexible Study Option",
    badgeColor: "bg-slate-200 text-slate-800 font-bold",
    desc: "Recorded online courses and study material are also available on our website, so you can revise at home between classes.",
    nextBatch: "Instant Portal Access",
    fee: "Digital PDF Material",
    cta: "See online courses",
    tag: "Self-Paced Learning",
    isOnline: true,
  },
];

// Programs data matching original website structure - with real classroom photos
const PROGRAM_CARDS = [
  {
    id: "govt-exam",
    title: "Government Exam Coaching",
    description: "Comprehensive preparation for AP DSC, TET, SSC, Banking, and Railway examinations with proven syllabus coverage.",
    image: "https://www.kuttystudycircle.in/static/uploads/gallery/gallery_ca24f02ed2cbf8d5_IMG-20260707-WA0119.jpg.jpeg",
    badge: "Most Popular",
    link: "#choose-exam",
  },
  {
    id: "how-to-apply",
    title: "How to Apply",
    description: "Review admissions process, seat availability, scholarship criteria and application instructions.",
    image: "https://www.kuttystudycircle.in/static/uploads/gallery/gallery_9ae5e328e32d202d_IMG-20260707-WA0122.jpg.jpeg",
    badge: "Admissions Open",
    link: "#free-demo",
  },
  {
    id: "academic-excellence",
    title: "Academic Excellence",
    description: "Discover the impactful methodology behind our result-oriented approach and high selection ratio.",
    image: "https://www.kuttystudycircle.in/static/uploads/gallery/gallery_9ce4278ba1117288_IMG-20260707-WA0162.jpg.jpeg",
    badge: "Top Results",
    link: "#about",
  },
  {
    id: "personal-guidance",
    title: "Personal Guidance",
    description: "See how individual mentorship, doubt sessions, and career roadmap planning empower every student.",
    image: "https://www.kuttystudycircle.in/static/uploads/gallery/gallery_2f41ec2048b38af0_IMG-20260707-WA0146.jpg.jpeg",
    badge: "1-on-1 Mentorship",
    link: "#contact",
  },
];

// PDF Page 2: Why Students Choose Classroom Coaching at Kutty
const WHY_CHOOSE_KUTTY = [
  {
    icon: Users,
    title: "Teachers you can meet",
    desc: "80+ experienced faculty, including RK Master. Ask doubts in class, not in a comment box.",
    tag: "In-Person Mentorship",
  },
  {
    icon: FileText,
    title: "Weekly mock tests",
    desc: "Regular tests in a real test hall, with analysis so you know exactly what to improve.",
    tag: "Hall Simulation",
  },
  {
    icon: BookOpen,
    title: "Our own study material",
    desc: "New-edition book sets for DSC SGT and SI/Constable, in Telugu and English medium.",
    tag: "Bilingual Books",
  },
  {
    icon: MapPin,
    title: "A branch close to home",
    desc: "Chittoor, Tirupati and Palamaner, so you spend time studying, not travelling.",
    tag: "3 Rayalaseema Centers",
  },
  {
    icon: Clock,
    title: "Batches that fit your day",
    desc: "Morning, evening and weekend batches for students and working teachers.",
    tag: "Flexible Schedules",
  },
  {
    icon: Bell,
    title: "Exam updates first",
    desc: "Daily current affairs and notification updates on our WhatsApp channel, explained in Telugu.",
    tag: "Telugu Current Affairs",
  },
];

// PDF Page 2: Vertical Stepper "How Joining Works"
const HOW_JOINING_WORKS_STEPS = [
  {
    step: 1,
    title: "Book online",
    desc: "Fill the short form or message us on WhatsApp with your preferred subject.",
    badge: "Takes 30 seconds",
    icon: BookCheck,
    actionText: "Fill Free Demo Form",
  },
  {
    step: 2,
    title: "We call you",
    desc: "Within 15 minutes in working hours, our academic counsellor will fix your demo slot.",
    badge: "Fast callback (8 AM - 8 PM)",
    icon: PhoneCall,
    actionText: "Direct Phone Support",
  },
  {
    step: 3,
    title: "Attend a free class",
    desc: "Sit in a real class at Chittoor, Tirupati, or Palamaner, meet the faculty and inspect the material.",
    badge: "100% Free - No fee asked",
    icon: GraduationCap,
    actionText: "Experience Real Classroom",
  },
  {
    step: 4,
    title: "Join your batch",
    desc: "Enrol directly at the branch. Convenient installments available for all candidates.",
    badge: "Affordable installments",
    icon: UserCheck,
    actionText: "Reserve Your Official Seat",
  },
];

// Official Gallery Photos from kuttystudycircle.in
const GALLERY_PHOTOS = [
  {
    id: 1,
    url: "https://www.kuttystudycircle.in/static/uploads/gallery/gallery_9ce4278ba1117288_IMG-20260707-WA0162.jpg.jpeg",
    title: "Auditorium Induction & Grand Seminar",
    subtitle: "Inauguration Ceremony & Strategy Session",
  },
  {
    id: 2,
    url: "https://www.kuttystudycircle.in/static/uploads/gallery/gallery_ca24f02ed2cbf8d5_IMG-20260707-WA0119.jpg.jpeg",
    title: "Smart Classroom Lecture Series",
    subtitle: "Interactive conceptual teaching by RK Master",
  },
  {
    id: 3,
    url: "https://www.kuttystudycircle.in/static/uploads/gallery/gallery_9ae5e328e32d202d_IMG-20260707-WA0122.jpg.jpeg",
    title: "Aspirants Focus Hall",
    subtitle: "Intensive daily practice & mock assessments",
  },
  {
    id: 4,
    url: "https://www.kuttystudycircle.in/static/uploads/gallery/gallery_2f41ec2048b38af0_IMG-20260707-WA0146.jpg.jpeg",
    title: "Achievers Felicitation Meet",
    subtitle: "Celebrating our selected government officers",
  },
  {
    id: 5,
    url: "https://www.kuttystudycircle.in/static/uploads/gallery/gallery_5f130771007a0147_IMG-20260707-WA0150.jpg.jpeg",
    title: "Special Workshop & Mentoring",
    subtitle: "Exam strategy guidance by state rank holders",
  },
  {
    id: 6,
    url: "https://www.kuttystudycircle.in/static/uploads/gallery/gallery_08fcb85c0d1afbf6_IMG-20260707-WA0151.jpg.jpeg",
    title: "Study Material & Library Zone",
    subtitle: "Dedicated research & practice environment",
  },
];

// Announcements matching original website ticker
const TICKER_ANNOUNCEMENTS = [
  { text: "Exam Update: AP DSC 2026 notification expected on 15 October · Exam planned for December", date: "Latest", tag: "Urgent" },
  { text: "New Batch Available: TET 2 Maths – Statistics & Arithmetic", date: "01-09-2026", tag: "New" },
  { text: "New Course Available: KUTTY – RK MASTER'S Geometry Module", date: "01-09-2026", tag: "Featured" },
  { text: "New Batch Available: AP Police SI & Constable Special Written + Physical", date: "29-08-2026", tag: "New" },
  { text: "New Batch Available: REASONING & Banking Speed Mathematics", date: "29-08-2026", tag: "New" },
  { text: "New Course Available: TET 2 Social Studies – History & Pedagogy", date: "01-09-2026", tag: "New" },
];

const UPCOMING_EXAMS_LIST = [
  {
    name: "AP DSC 2026 (SGT & School Assistant)",
    status: "Notification Expected 15 Oct",
    date: "Dec 2026 Schedule",
    details: "District Selection Committee for School Assistants, SGTs and Language Pandits.",
    badgeColor: "bg-[#003366] text-[#FFD700]",
  },
  {
    name: "AP TET 2026 (Paper 1 & Paper 2)",
    status: "Upcoming Official Exam",
    date: "Registration Open",
    details: "Teacher Eligibility Test for Primary & Upper Primary school aspirants.",
    badgeColor: "bg-emerald-800 text-white",
  },
  {
    name: "AP Police SI & Constable 2026",
    status: "Physical & Written",
    date: "State Level Batch",
    details: "Written exam coaching plus specialized physical test training.",
    badgeColor: "bg-purple-900 text-white",
  },
  {
    name: "IBPS PO & Clerk Comprehensive Exam",
    status: "Prelims & Mains",
    date: "Banking Batch",
    details: "Banking Personnel Selection for Public Sector Banks nationwide.",
    badgeColor: "bg-blue-900 text-white",
  },
  {
    name: "Railway RRB NTPC & Group D Batch",
    status: "Mock Test Series",
    date: "Ongoing Enrolment",
    details: "Railway Recruitment Board technical & non-technical categories.",
    badgeColor: "bg-amber-900 text-white",
  },
];

const NOTIFICATIONS_LIST = [
  {
    title: "DSC 2026 Offline Batches Starting at All 3 Branches",
    category: "Chittoor · Tirupati · Palamaner",
    date: "05-10-2026",
    summary: "Attend one free demo class at your nearest branch before you decide.",
  },
  {
    title: "Admission Notice: TET 2 Maths – Statistics & Pedagogy",
    category: "Course Release",
    date: "01-09-2026",
    summary: "Detailed conceptual sessions and chapter-wise tests enrolled for students.",
  },
  {
    title: "Curriculum Update: RK MASTER'S Geometry Module Released",
    category: "Study Material",
    date: "01-09-2026",
    summary: "Available for offline & online students in the student material portal.",
  },
  {
    title: "Special Batch: Reasoning Masterclass Schedule Announced",
    category: "Batch Timing",
    date: "29-08-2026",
    summary: "Classes start this Monday at Chittoor and Tirupati branches simultaneously.",
  },
  {
    title: "Free Model Papers Distributed on WhatsApp Channel",
    category: "Study Kit",
    date: "20-08-2026",
    summary: "TET, DSC, RRB and SI model papers sent directly to registered mobiles.",
  },
];

// Study Materials Hub
const STUDY_MATERIALS_DATA = [
  {
    id: 1,
    title: "AP DSC SGT & SA Pedagogy Master Guide",
    category: "DSC",
    pages: "124 Pages",
    format: "PDF Document",
    size: "6.8 MB",
    downloads: "3,150+",
  },
  {
    id: 2,
    title: "AP TET Paper 2 Maths Formulae & Tricks - RK Master",
    category: "TET",
    pages: "86 Pages",
    format: "PDF Document",
    size: "4.2 MB",
    downloads: "2,420+",
  },
  {
    id: 3,
    title: "AP Police SI / Constable Previous Solved Papers",
    category: "Police",
    pages: "115 Pages",
    format: "PDF Document",
    size: "5.8 MB",
    downloads: "2,890+",
  },
  {
    id: 4,
    title: "Quantitative Aptitude Speed Shortcuts Booklet",
    category: "Banking",
    pages: "92 Pages",
    format: "PDF Document",
    size: "5.1 MB",
    downloads: "4,120+",
  },
  {
    id: 5,
    title: "Andhra Pradesh State & National Current Affairs 2026",
    category: "Current Affairs",
    pages: "110 Pages",
    format: "PDF Document",
    size: "7.5 MB",
    downloads: "5,300+",
  },
  {
    id: 6,
    title: "Railway General Science (Physics, Chem, Bio) Notes",
    category: "Railway",
    pages: "135 Pages",
    format: "PDF Document",
    size: "8.3 MB",
    downloads: "1,950+",
  },
];

// Success Stories from PDF & Academy
const SUCCESS_STORIES = [
  {
    name: "K. Venkatesh",
    post: "School Assistant (Maths) - AP DSC",
    rank: "District Rank 1 (Chittoor)",
    story: "Kutty Study Circle's daily rigorous test series and RK Master's conceptual clarity changed my entire preparation trajectory.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "S. Priya",
    post: "State Bank of India (Probationary Officer)",
    rank: "Cleared in First Attempt",
    story: "The personal mentorship and speed calculation shortcuts helped me clear quantitative aptitude with 99 percentile.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "M. Ramesh Babu",
    post: "Sub-Inspector of Police (AP Police)",
    rank: "Zone IV Top Performer",
    story: "The discipline, mock interviews and continuous encouragement from all faculty members made my dream come true.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
  },
];

// SVGs for social media & branding
function FacebookIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginType, setLoginType] = useState("student");
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedDemoCourse, setSelectedDemoCourse] = useState("AP DSC 2026 (SGT / SA)");

  // Demo Form State
  const [demoForm, setDemoForm] = useState({
    name: "",
    mobile: "",
    course: "AP DSC 2026 (SGT / SA)",
    branch: "Tirupati",
    batchTime: "Morning",
    mode: "offline", // online or offline
  });

  useEffect(() => {
    AOS.init({
      duration: 750,
      once: true,
      easing: "ease-out-cubic",
      offset: 40,
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-cycle gallery accordion
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveGalleryIndex((prev) => (prev + 1) % GALLERY_PHOTOS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    const modeText = demoForm.mode === "online" ? "Online (Virtual)" : `${demoForm.branch} Branch (Offline)`;
    alert(`Thank you ${demoForm.name || "Student"}! Your Free Demo Class slot for ${demoForm.course} has been reserved — ${modeText}, ${demoForm.batchTime} batch. Our counsellor will call you at ${demoForm.mobile} within 15 minutes.`);
    setDemoForm({
      name: "",
      mobile: "",
      course: "AP DSC 2026 (SGT / SA)",
      branch: "Tirupati",
      batchTime: "Morning",
      mode: "offline",
    });
  };

  const triggerExamDemo = (courseTitle) => {
    setDemoForm((prev) => ({ ...prev, course: courseTitle }));
    scrollToSection("free-demo");
  };

  return (
    <div className="relative min-h-screen bg-white text-[#1a1a2e] antialiased selection:bg-[#FFD700] selection:text-[#003366] pb-16 md:pb-0">
      {/* =========================================================================
          TOP NOTIFICATION BAR (PDF Page 1 Style)
      ========================================================================= */}
      <div className="bg-[#002244] text-slate-100 text-xs py-2 px-4 border-b border-blue-950/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="bg-[#FFD700] text-[#003366] font-extrabold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider flex-shrink-0">
              Exam update
            </span>
            <span className="text-slate-200 font-medium truncate">
              AP DSC 2026 notification expected on 15 October · Exam planned for December · New offline batches starting at all 3 branches
            </span>
          </div>
          <div className="flex items-center gap-4 font-semibold flex-shrink-0">
            <a
              href="tel:9491844963"
              className="text-[#FFD700] hover:text-white transition flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" /> 94918 44963
            </a>
            <span className="text-blue-500">·</span>
            <span className="text-slate-300 hidden md:inline">Since 2012 · Chittoor · Tirupati · Palamaner</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: FREE DEMO CLASS HERO (FIRST & DIRECTLY VISIBLE - PDF Page 1)
      ========================================================================= */}
      <section
        id="free-demo"
        className="relative bg-gradient-to-b from-[#002244] via-[#003366] to-[#001730] text-white pt-10 pb-16 sm:pb-24 overflow-hidden"
      >
        {/* Subtle background glow & texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFD700_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Logo in the Hero Section */}
          <div data-aos="fade-down" className="flex justify-center mb-8">
            <a href="#" className="group flex flex-col items-center gap-2">
              <img
                src={LOGO_URL}
                alt="Kutty Study Circle Logo"
                className="h-16 sm:h-20 w-auto object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                onError={(e) => { e.currentTarget.src = FALLBACK_LOGO; }}
              />
              <div className="flex items-center gap-2 text-white/80 text-xs font-semibold tracking-widest uppercase">
                <span className="w-8 h-px bg-white/40"></span>
                <span>Since 2012 · Chittoor · Tirupati · Palamaner</span>
                <span className="w-8 h-px bg-white/40"></span>
              </div>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div data-aos="fade-right" data-aos-delay="100" className="lg:col-span-7 space-y-6">
              {/* Badge from PDF Page 1 */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/40 text-[#FFD700] text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ఉచిత డెమో క్లాస్ · Free demo class</span>
              </div>

              {/* Main Telugu Headline from PDF Page 1 */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.2] text-white font-sans">
                మీ ప్రభుత్వ ఉద్యోగ కలకు, మీ ఊరిలోనే{" "}
                <span className="text-[#FFD700] underline decoration-[#FFD700]/60 underline-offset-8">
                  క్లాస్‌రూమ్ కోచింగ్
                </span>
              </h1>

              {/* Subheading from PDF Page 1 */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Offline coaching for AP DSC, TET, Police SI/Constable, Banking, SSC and Railway exams, with teachers you can meet every day in Chittoor, Tirupati and Palamaner.
              </p>

              {/* 4 Stat Badges from PDF Page 1 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#FFD700] font-serif">
                    14
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5 leading-snug">
                    years of coaching
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#FFD700] font-serif">
                    2,000+
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5 leading-snug">
                    government job selections
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#FFD700] font-serif">
                    80+
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5 leading-snug">
                    experienced faculty
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#FFD700] font-serif">
                    3
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5 leading-snug">
                    branches near you
                  </div>
                </div>
              </div>

              {/* Action Buttons & Counsellor Reassurance */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#free-demo-form"
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-[#003366] bg-[#FFD700] hover:bg-[#ffcf00] rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
                  >
                    <span>Book a free demo class</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://whatsapp.com/channel/0029Vb7cuGkJpe8fmTHIMy2y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
                <p className="text-xs text-slate-300 font-medium">
                  Our counsellor calls you back within 15 minutes, Monday to Saturday, 8 AM to 8 PM.
                </p>
              </div>
            </div>

            {/* Right Column: "Book your free demo class" Form Card (PDF Page 1) */}
            <div
              id="free-demo-form"
              data-aos="fade-left"
              data-aos-delay="200"
              className="lg:col-span-5"
            >
              <div className="bg-white rounded-2xl p-6 sm:p-8 text-[#1a1a2e] shadow-2xl border border-slate-100 relative">
                <div className="mb-5">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#003366]">
                    Book your free demo class
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Takes 30 seconds. No payment needed.
                  </p>
                </div>

                {/* Online / Offline Toggle */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Demo Mode
                  </label>
                  <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                    <button
                      type="button"
                      onClick={() => setDemoForm({ ...demoForm, mode: "offline" })}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold rounded-lg transition-all duration-200 ${
                        demoForm.mode === "offline"
                          ? "bg-[#003366] text-white shadow-md"
                          : "text-slate-600 hover:text-[#003366]"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Offline (Classroom)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDemoForm({ ...demoForm, mode: "online" })}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold rounded-lg transition-all duration-200 ${
                        demoForm.mode === "online"
                          ? "bg-emerald-600 text-white shadow-md"
                          : "text-slate-600 hover:text-emerald-700"
                      }`}
                    >
                      <Radio className="w-3.5 h-3.5" />
                      <span>Online (Virtual)</span>
                    </button>
                  </div>
                  {demoForm.mode === "online" && (
                    <p className="text-[10px] text-emerald-700 mt-1.5 font-medium bg-emerald-50 px-2 py-1 rounded-md">
                      📡 Live virtual class link will be sent via WhatsApp after booking.
                    </p>
                  )}
                  {demoForm.mode === "offline" && (
                    <p className="text-[10px] text-blue-700 mt-1.5 font-medium bg-blue-50 px-2 py-1 rounded-md">
                      🏫 Walk into your nearest branch — Chittoor, Tirupati or Palamaner.
                    </p>
                  )}
                </div>

                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Your name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lakshmi / Ramesh"
                      value={demoForm.name}
                      onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003366] text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Mobile number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={demoForm.mobile}
                      onChange={(e) => setDemoForm({ ...demoForm, mobile: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003366] text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Course
                    </label>
                    <select
                      value={demoForm.course}
                      onChange={(e) => setDemoForm({ ...demoForm, course: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003366] text-slate-900 bg-white"
                    >
                      <option value="AP DSC 2026 (SGT / SA)">AP DSC 2026 (SGT / SA)</option>
                      <option value="AP TET Paper 1 & 2">AP TET Paper 1 & 2</option>
                      <option value="AP Police SI / Constable">AP Police SI / Constable</option>
                      <option value="Banking & SSC">Banking & SSC</option>
                      <option value="Railway (RRB NTPC, Group D)">Railway (RRB NTPC, Group D)</option>
                    </select>
                  </div>

                  {/* Show branch only for offline mode */}
                  {demoForm.mode === "offline" && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Nearest branch
                      </label>
                      <select
                        value={demoForm.branch}
                        onChange={(e) => setDemoForm({ ...demoForm, branch: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003366] text-slate-900 bg-white"
                      >
                        <option value="Tirupati">Tirupati (AIR Bypass Road)</option>
                        <option value="Chittoor">Chittoor (Head Office - Mittoor)</option>
                        <option value="Palamaner">Palamaner</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                      Preferred batch time
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Morning", "Evening", "Weekend"].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setDemoForm({ ...demoForm, batchTime: time })}
                          className={`py-2 px-2 text-xs font-bold rounded-lg border text-center transition ${
                            demoForm.batchTime === time
                              ? "bg-[#003366] text-white border-[#003366]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3.5 font-extrabold text-sm rounded-xl shadow-md transition transform hover:-translate-y-0.5 uppercase tracking-wide ${
                      demoForm.mode === "online"
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-[#FFD700] hover:bg-[#ffcf00] text-[#003366]"
                    }`}
                  >
                    {demoForm.mode === "online" ? "📡 Book Online Demo" : "🏫 Book Offline Demo"}
                  </button>

                  <p className="text-[11px] text-slate-500 text-center leading-tight">
                    By booking, you agree that Kutty Study Circle may call or WhatsApp you about courses. <a href="#privacy" className="underline hover:text-[#003366]">Privacy policy</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Angled Gold Ribbon Cut at Bottom: "Ignite your future" */}
        <div className="mt-12 sm:mt-16">
          <div className="hero-banner-ribbon bg-gradient-to-r from-[#FFD700] via-[#f7cb00] to-[#FFD700] pt-7 pb-4 sm:pt-9 sm:pb-6 px-4 shadow-xl">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1a1a2e]">
                Ignite your <span className="text-[#003366]">future</span>
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ANNOUNCEMENT TICKER SECTION (Continuous Marquee with Ringing Bell)
      ========================================================================= */}
      <section
        id="announcements"
        className="bg-[#002244] border-y border-blue-950 text-white relative z-20 shadow-inner overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center h-14">
          <div className="flex-shrink-0 flex items-center gap-2 bg-[#FFD700] text-[#003366] font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-md shadow-sm mr-3 sm:mr-5 z-10">
            <Bell className="w-4 h-4 animate-bell-ring text-[#003366]" />
            <span className="uppercase tracking-wider font-extrabold">Announcements</span>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <div className="animate-ticker flex items-center gap-8 py-1">
              {[...TICKER_ANNOUNCEMENTS, ...TICKER_ANNOUNCEMENTS].map((item, index) => (
                <a
                  key={index}
                  href="#choose-exam"
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-100 hover:text-[#FFD700] transition whitespace-nowrap group"
                >
                  <span className="bg-[#e74c3c] text-white text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded shadow animate-pulse-badge">
                    {item.tag}
                  </span>
                  <span className="font-medium group-hover:underline">
                    {item.text}
                  </span>
                  <span className="text-slate-400 text-xs">({item.date})</span>
                  <span className="text-[#FFD700] font-bold ml-2">•</span>
                </a>
              ))}
            </div>
          </div>

          <button
            onClick={() => scrollToSection("choose-exam")}
            className="flex-shrink-0 hidden md:flex items-center gap-1 text-xs font-bold text-[#FFD700] hover:text-white transition ml-4 border-l border-blue-900/60 pl-4"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CHOOSE YOUR EXAM / COMPREHENSIVE LEARNING PATHWAYS
      ========================================================================= */}
      <section id="choose-exam" className="py-16 md:py-24 bg-[#f8f9fa] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── PART A: Comprehensive Learning Pathways (shown first) ── */}
          <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-[#003366] bg-blue-100/70 px-3.5 py-1.5 rounded-full">
              Classroom &amp; Offline Coaching
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#003366] mt-3">
              Comprehensive Learning Pathways
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              Structured, result-oriented programs built for every government exam aspirant. Choose the path that fits your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {PROGRAM_CARDS.map((prog, idx) => (
              <div
                key={prog.id}
                data-aos="zoom-in"
                data-aos-delay={idx * 100}
                className="bg-white rounded-2xl overflow-hidden border-b-4 border-[#003366] shadow-md hover:shadow-2xl transition-all duration-400 flex flex-col justify-between group hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden bg-slate-100 relative">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop`; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-amber-800 bg-amber-50/95 px-2.5 py-1 rounded-full border border-amber-200 shadow-sm backdrop-blur-sm">
                    {prog.badge}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#003366] mt-1 group-hover:text-amber-700 transition-colors">
                      {prog.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-3 leading-relaxed">
                      {prog.description}
                    </p>
                  </div>
                  <button
                    onClick={() => triggerExamDemo(prog.title)}
                    className="mt-4 text-xs font-bold text-[#003366] flex items-center gap-1 hover:text-amber-700 transition-colors group/btn"
                  >
                    <span>Learn Curriculum</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── PART B: Exploring Our Signature Programs (shown below) ── */}
          <div className="pt-10 border-t-2 border-dashed border-slate-300">
            <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100/70 px-3.5 py-1.5 rounded-full">
                Exploring Our Signature Programs
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#003366] mt-3">
                Choose your exam
              </h2>
              <p className="mt-3 text-slate-600 text-base sm:text-lg">
                Every course is taught in the classroom at all three branches. Not sure which one fits you? Book a demo and our counsellor will guide you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EXAM_CARDS.map((exam, idx) => (
                <div
                  key={exam.id}
                  data-aos="fade-up"
                  data-aos-delay={idx * 80}
                  className={`bg-white rounded-2xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                    exam.id === "dsc-2026"
                      ? "border-[#003366] ring-2 ring-[#003366]/10"
                      : "border-slate-200/90"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[11px] px-2.5 py-1 rounded-md ${exam.badgeColor}`}>
                        {exam.badge}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {exam.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#003366]">
                      {exam.title}
                    </h3>

                    <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                      {exam.desc}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-500 font-medium">
                      <div>Next batch: <strong className="text-slate-800">{exam.nextBatch}</strong></div>
                      <div>Fee: <strong className="text-slate-800">{exam.fee}</strong></div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => triggerExamDemo(exam.title)}
                      className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition ${
                        exam.isOnline
                          ? "bg-slate-100 hover:bg-slate-200 text-[#003366]"
                          : "bg-[#003366] hover:bg-[#002244] text-white shadow-sm"
                      }`}
                    >
                      <span>{exam.cta}</span>
                      <ArrowRight className="w-4 h-4 text-[#FFD700]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WHY STUDENTS CHOOSE CLASSROOM COACHING (PDF Page 2)
      ========================================================================= */}
      <section id="why-classroom" className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-[#003366] bg-amber-100/70 px-3.5 py-1.5 rounded-full">
              The Kutty Advantage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#003366] mt-3">
              Why students choose classroom coaching at Kutty
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              Daily face-to-face discipline, RK Master mentorship, and proven competitive exam results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {WHY_CHOOSE_KUTTY.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 90}
                  className="bg-[#f8f9fa] rounded-2xl p-7 border border-slate-200/80 hover:border-[#003366] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#003366] text-[#FFD700] flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {item.tag}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#003366] mt-2 group-hover:text-amber-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-[#003366] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Included in every batch</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: HOW JOINING WORKS (VERTICAL TIMELINE - REQUESTED BY USER)
      ========================================================================= */}
      <section
        id="how-joining-works"
        className="py-16 md:py-24 bg-[#001f3f] text-white relative overflow-hidden"
      >
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
              Simple 4-Step Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
              How joining works
            </h2>
            <p className="mt-3 text-slate-300 text-base sm:text-lg">
              Four simple steps. You decide only after you&apos;ve sat in a real class.
            </p>
          </div>

          {/* VERTICAL TIMELINE LAYOUT */}
          <div className="relative">
            {/* Connected Vertical Timeline Line */}
            <div className="absolute left-6 sm:left-8 top-8 bottom-8 w-1 bg-gradient-to-b from-[#FFD700] via-blue-400 to-[#FFD700] rounded-full hidden sm:block" />

            <div className="space-y-6 sm:space-y-8">
              {HOW_JOINING_WORKS_STEPS.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={step.step}
                    data-aos="fade-up"
                    data-aos-delay={idx * 120}
                    className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-[#002850]/90 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/15 hover:border-[#FFD700]/70 transition-all shadow-lg hover:shadow-2xl"
                  >
                    {/* Glowing Step Number Badge Node */}
                    <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#FFD700] text-[#003366] flex flex-col items-center justify-center font-extrabold shadow-xl z-10">
                      <span className="text-xs uppercase font-sans tracking-tight">Step</span>
                      <span className="text-xl sm:text-2xl font-serif leading-none">{step.step}</span>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                          <StepIcon className="w-5 h-5 text-[#FFD700]" />
                          <span>{step.title}</span>
                        </h3>
                        <span className="text-xs font-bold text-[#FFD700] bg-white/10 px-3 py-1 rounded-full border border-white/10">
                          {step.badge}
                        </span>
                      </div>

                      <p className="text-sm sm:text-base text-slate-200 mt-1 leading-relaxed">
                        {step.desc}
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <button
                          onClick={() => scrollToSection("free-demo-form")}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD700] hover:text-white transition"
                        >
                          <span>{step.actionText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Step Call to Action */}
          <div className="mt-12 text-center">
            <button
              onClick={() => scrollToSection("free-demo-form")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFD700] hover:bg-[#ffcf00] text-[#003366] font-extrabold text-sm sm:text-base rounded-full shadow-2xl transition transform hover:scale-105"
            >
              <span>Start Step 1: Book Your Free Demo Class</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FREE MODEL PAPERS ON WHATSAPP (PDF Page 3 Banner)
      ========================================================================= */}
      <section className="py-10 bg-gradient-to-r from-amber-500 via-[#FFD700] to-amber-500 text-[#003366] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#003366] text-[#FFD700] flex items-center justify-center flex-shrink-0 shadow-md">
              <Download className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold leading-tight">
                Free model papers on WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-slate-900 font-medium mt-0.5">
                TET (SGT and SA), RRB, SI/Constable and Group 2 model papers prepared by our faculty. Message us and we&apos;ll send the one for your exam.
              </p>
            </div>
          </div>

          <a
            href="https://whatsapp.com/channel/0029Vb7cuGkJpe8fmTHIMy2y"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span>Get free papers on WhatsApp</span>
          </a>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: 14 YEARS LEGACY & TESTIMONIAL (With RK Master Polygon Photo)
      ========================================================================= */}
      <section id="about" className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content / Editorial Quote */}
            <div data-aos="fade-right" className="lg:col-span-7">
              <div className="font-serif text-8xl md:text-9xl text-[#003366] leading-none select-none opacity-70 -mb-10 -ml-2">
                “
              </div>

              <blockquote className="text-xl sm:text-2xl md:text-3xl text-[#1a1a2e] leading-relaxed font-serif font-normal">
                I chose Kutty Study Circle because of its{" "}
                <span className="font-bold text-[#003366] bg-amber-100/70 px-1.5 py-0.5 rounded">
                  structured curriculum that fosters academic growth
                </span>
                , making it easy to pursue different subjects. The institute&apos;s personalized attention and dedicated faculty also allowed me to prioritize strong personal connections and my career goals!
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="bg-[#FFD700] text-[#003366] font-bold px-6 py-2.5 rounded-lg text-lg shadow-sm flex items-center gap-2">
                  <span>RK</span>
                  <span className="text-xs uppercase bg-[#003366] text-white px-2 py-0.5 rounded font-mono font-semibold">
                    &apos;24
                  </span>
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  Verified Candidate Review & Selection Feedback
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed">
                  For the past <strong>14 years</strong>, our institute has been shaping futures and transforming ambitions into achievements. What began as a small vision to support dedicated learners has grown into a trusted educational institution in Chittoor, Tirupati and Palamaner.
                </p>
              </div>
            </div>

            {/* Right Photo with Signature Polygon Cut */}
            <div data-aos="fade-left" className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-amber-300/30 to-blue-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition duration-500" />
                <div className="relative">
                  <img
                    src={RK_MASTER_IMG}
                    alt="RK Master - Kutty Study Circle"
                    className="photo-polygon w-full h-[460px] md:h-[500px] object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute bottom-4 right-4 bg-[#003366] text-[#FFD700] p-3 rounded-xl shadow-lg border border-amber-300/40">
                    <Award className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: EXCELLENCE IN EDUCATION ("Teaching that transforms lives")
      ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#f8f9fa] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-100">
            <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-[480px] overflow-hidden">
              <img
                src={TEACHING_TRANSFORMS_IMG}
                alt="Smart Classroom Teaching at Kutty Study Circle"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-700"
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-[#003366] shadow">
                Smart Classroom Audio-Visual Instruction
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#FFD700] p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-[#1a1a2e]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#003366] bg-white/60 px-3 py-1 rounded-md inline-block w-fit mb-4">
                Excellence in Education
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#003366]">
                Teaching that transforms lives
              </h2>

              <p className="mt-5 text-base sm:text-lg text-[#1a1a2e] leading-relaxed font-normal">
                Our faculty don&apos;t settle for what is—they are driven by what could be. By exploring new teaching methods with dedication and passion, we drive student success that has a transformative and lifelong impact on careers and futures.
              </p>

              <div className="mt-8">
                <button
                  onClick={() => scrollToSection("free-demo-form")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-[#003366] hover:bg-[#003366] text-[#003366] hover:text-white text-sm font-bold transition-all duration-300"
                >
                  <span>Discover our teaching approach</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: EXAMS & NOTIFICATIONS (Two Contrasting Vertical Split Columns)
      ========================================================================= */}
      <section id="exams" className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a2e]">
              <span className="text-[#F5A623]">Exams</span> &{" "}
              <span className="text-[#003366] relative inline-block">
                Notifications
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#003366]" />
              </span>
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Real-time competitive exam updates, commission dates, and institute circulars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.12)]">
            {/* Left: Yellow Column (#FFD700) */}
            <div className="bg-[#FFD700] p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-black/15 pb-4 mb-6">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#003366]">
                    Upcoming Exams
                  </h3>
                  <Calendar className="w-6 h-6 text-[#003366]" />
                </div>

                <div className="h-[310px] overflow-hidden relative">
                  <div className="animate-vertical-carousel flex flex-col gap-3">
                    {[...UPCOMING_EXAMS_LIST, ...UPCOMING_EXAMS_LIST].map((exam, idx) => (
                      <div
                        key={idx}
                        className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-white/60 hover:bg-white transition-all transform hover:scale-[1.02] cursor-pointer"
                        onClick={() => triggerExamDemo(exam.name)}
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1">
                          <span>{exam.status}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${exam.badgeColor}`}>
                            {exam.date}
                          </span>
                        </div>
                        <strong className="block text-sm sm:text-base font-bold text-[#1a1a2e]">
                          {exam.name}
                        </strong>
                        <span className="text-xs text-slate-700 mt-1 block">
                          {exam.details}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => scrollToSection("choose-exam")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#003366] hover:bg-[#002244] text-white text-sm font-bold rounded-full shadow-md transition"
                >
                  <span>See all exams</span>
                  <ArrowRight className="w-4 h-4 text-[#FFD700]" />
                </button>
              </div>
            </div>

            {/* Right: Navy Column (#003366) */}
            <div className="bg-[#003366] p-8 sm:p-10 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-6">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFD700]">
                    Notifications
                  </h3>
                  <Bell className="w-6 h-6 text-[#FFD700] animate-bell-ring" />
                </div>

                <div className="h-[310px] overflow-hidden relative">
                  <div className="animate-vertical-carousel flex flex-col gap-3">
                    {[...NOTIFICATIONS_LIST, ...NOTIFICATIONS_LIST].map((notif, idx) => (
                      <div
                        key={idx}
                        className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/15 hover:bg-white/20 transition-all transform hover:scale-[1.02] cursor-pointer"
                        onClick={() => triggerExamDemo(notif.title)}
                      >
                        <div className="flex items-center justify-between text-xs text-[#FFD700] font-semibold mb-1">
                          <span>{notif.category}</span>
                          <span className="text-blue-200">{notif.date}</span>
                        </div>
                        <strong className="block text-sm sm:text-base font-bold text-white">
                          {notif.title}
                        </strong>
                        <span className="text-xs text-slate-300 mt-1 block">
                          {notif.summary}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => scrollToSection("announcements")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFD700] hover:bg-[#ffcf00] text-[#003366] text-sm font-bold rounded-full shadow-md transition"
                >
                  <span>See more announcements</span>
                  <ArrowRight className="w-4 h-4 text-[#003366]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: OUR GALLERY — Cinematic Full-Width Carousel
      ========================================================================= */}
      <section id="gallery" className="py-20 md:py-28 bg-gradient-to-b from-[#06060f] to-[#0d1117] text-white relative overflow-hidden">
        {/* Ambient glow orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FFD700]/4 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-blue-700/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ── Section Header ── */}
          <div className="text-center mb-12" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Moments &amp; Events</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Our <span className="text-[#FFD700]">Gallery</span>
            </h2>
            <p className="mt-3 text-slate-400 text-base max-w-xl mx-auto">
              Real moments from our classrooms, seminars &amp; student celebrations across all three branches.
            </p>
          </div>

          {/* ── Carousel ── */}
          <div className="gallery-carousel-wrap" data-aos="zoom-in" data-aos-duration="900">
            {/* Slide viewport */}
            <div className="gallery-carousel-track" style={{ transform: `translateX(-${activeGalleryIndex * 100}%)` }}>
              {GALLERY_PHOTOS.map((photo, idx) => (
                <div key={photo.id} className="gallery-carousel-slide">
                  {/* Photo fills slide */}
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className={`gallery-carousel-img ${activeGalleryIndex === idx ? "gallery-carousel-img--active" : ""}`}
                  />

                  {/* Dark gradient overlay always visible on active slide */}
                  <div className="gallery-carousel-overlay" />

                  {/* Content block — animates in/out */}
                  <div className={`gallery-carousel-content ${activeGalleryIndex === idx ? "gallery-carousel-content--visible" : ""}`}>
                    <span className="gallery-carousel-tag">Kutty Study Circle</span>
                    <h3 className="gallery-carousel-title">{photo.title}</h3>
                    <p className="gallery-carousel-subtitle">{photo.subtitle}</p>
                    <button
                      onClick={() => setLightboxImg(photo.url)}
                      className="gallery-carousel-enlarge-btn"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Full Photo</span>
                    </button>
                  </div>

                  {/* Slide counter badge */}
                  <div className="gallery-carousel-counter">
                    {idx + 1} / {GALLERY_PHOTOS.length}
                  </div>
                </div>
              ))}
            </div>

            {/* ← Prev arrow */}
            <button
              onClick={() => setActiveGalleryIndex((prev) => (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length)}
              className="gallery-carousel-arrow gallery-carousel-arrow--left"
              aria-label="Previous photo"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>

            {/* → Next arrow */}
            <button
              onClick={() => setActiveGalleryIndex((prev) => (prev + 1) % GALLERY_PHOTOS.length)}
              className="gallery-carousel-arrow gallery-carousel-arrow--right"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dot navigation */}
            <div className="gallery-carousel-dots">
              {GALLERY_PHOTOS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`gallery-carousel-dot ${activeGalleryIndex === idx ? "gallery-carousel-dot--active" : ""}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Auto-play progress bar */}
            <div className="gallery-carousel-progress">
              <div
                key={activeGalleryIndex}
                className="gallery-carousel-progress-bar"
              />
            </div>
          </div>

          {/* ── Thumbnail strip ── */}
          <div className="gallery-thumb-strip" data-aos="fade-up" data-aos-delay="200">
            {GALLERY_PHOTOS.map((photo, idx) => (
              <button
                key={photo.id}
                onClick={() => setActiveGalleryIndex(idx)}
                className={`gallery-thumb ${activeGalleryIndex === idx ? "gallery-thumb--active" : ""}`}
              >
                <img src={photo.url} alt={photo.title} className="gallery-thumb-img" />
                <div className="gallery-thumb-overlay" />
              </button>
            ))}
          </div>

          {/* ── Bottom CTA ── */}
          <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4" data-aos="fade-up">
            <p className="text-slate-400 text-sm">
              <span className="text-[#FFD700] font-bold">{GALLERY_PHOTOS.length} curated</span> academy moments from all 3 branches
            </p>
            <a
              href="https://www.kuttystudycircle.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FFD700] hover:bg-[#ffcf00] text-[#003366] font-bold px-6 py-2.5 rounded-full text-sm transition transform hover:-translate-y-0.5 shadow-lg"
            >
              <span>View All Photos &amp; Events</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: SUCCESS STORIES & GOVERNMENT SELECTIONS
      ========================================================================= */}
      <section id="success-stories" className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-[#003366] bg-amber-100/70 px-3.5 py-1.5 rounded-full">
              Hall of Fame
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#003366] mt-3">
              Our students, now in government jobs
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              2,000+ selections since 2012. A few of the faces behind that number.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SUCCESS_STORIES.map((story, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 150}
                className="bg-[#f8f9fa] rounded-2xl p-7 border border-slate-200/80 hover:border-[#FFD700] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={story.img}
                      alt={story.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#FFD700] shadow"
                    />
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#003366]">{story.name}</h4>
                      <div className="text-xs text-amber-700 font-bold">{story.rank}</div>
                    </div>
                  </div>
                  <div className="inline-block bg-[#003366] text-white text-[11px] font-bold px-2.5 py-1 rounded mb-3">
                    {story.post}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    &ldquo;{story.story}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" /> Verified Selection
                  </span>
                  <span>KSC Alumnus</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: STUDY MATERIALS HUB (Downloads & Notes)
      ========================================================================= */}
      <section id="materials" className="py-16 md:py-24 bg-[#f8f9fa] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-[#003366] bg-blue-100/60 px-3 py-1 rounded-full">
              Free & Premium Downloads
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#003366] mt-3">
              Study Materials & Test Series
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Verified chapter notes, previous question papers, and solved shortcut formula booklets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STUDY_MATERIALS_DATA.map((mat) => (
              <div
                key={mat.id}
                data-aos="fade-up"
                className="bg-white rounded-xl p-6 border border-slate-200/80 hover:border-[#003366] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#003366]">
                      {mat.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {mat.pages} • {mat.size}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#003366] group-hover:text-amber-700 transition">
                    {mat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2">
                    Official syllabus curriculum aligned with AP & Central exam patterns.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {mat.downloads} downloaded
                  </span>
                  <button
                    onClick={() => setSelectedMaterial(mat)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#003366] hover:bg-blue-50 rounded-md transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12: VISIT YOUR NEAREST BRANCH (Chittoor, Tirupati, Palamaner)
      ========================================================================= */}
      <section id="branches" className="py-16 md:py-24 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-[#003366] bg-amber-100/70 px-3.5 py-1.5 rounded-full">
              Rayalaseema Learning Centers
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#003366] mt-3 mb-2">
              Visit your nearest branch
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mb-10">
              Open Monday to Saturday, 8 AM to 8 PM · Walk in anytime for free counselling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* Tirupati */}
            <div className="bg-[#f8f9fa] rounded-2xl p-6 border border-slate-200 hover:border-[#003366] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-2xl font-bold text-[#003366] mb-1">Tirupati</h4>
                <div className="text-xs text-slate-600 leading-relaxed mt-2">
                  Plot No 1, Door No 23-8-160, AIR Bypass Road,<br />
                  New Balaji Colony, MR Palle Circle (upstairs),<br />
                  Tirupati 517502
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col gap-2">
                <a
                  href="https://maps.google.com/?q=Plot+No+1,+Door+No+23-8-160,+AIR+Bypass+Road,+New+Balaji+Colony,+MR+Palle+Circle,+Tirupati,+Andhra+Pradesh+517502"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 text-xs font-bold text-[#003366] border border-[#003366] rounded-lg hover:bg-blue-50 transition"
                >
                  Directions
                </a>
                <a
                  href="tel:9491844963"
                  className="py-2 px-3 text-xs font-bold text-white bg-[#003366] rounded-lg hover:bg-[#002244] transition flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> Call 94918 44963
                </a>
              </div>
            </div>

            {/* Chittoor (Head office) */}
            <div className="bg-[#f8f9fa] rounded-2xl p-6 border-2 border-[#FFD700] shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#003366] text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Head Office
              </span>
              <div>
                <h4 className="font-serif text-2xl font-bold text-[#003366] mb-1">Chittoor</h4>
                <div className="text-xs text-slate-600 leading-relaxed mt-2">
                  26-111, Mittoor,<br />
                  Chittoor, Andhra Pradesh 517001
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col gap-2">
                <a
                  href="https://maps.google.com/?q=26-111,+Mittoor,+Chittoor,+Andhra+Pradesh+517001,+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 text-xs font-bold text-[#003366] border border-[#003366] rounded-lg hover:bg-blue-50 transition"
                >
                  Directions
                </a>
                <a
                  href="tel:9491844963"
                  className="py-2 px-3 text-xs font-bold text-[#003366] bg-[#FFD700] rounded-lg hover:bg-[#ffcf00] transition flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> Call 94918 44963
                </a>
              </div>
            </div>

            {/* Palamaner */}
            <div className="bg-[#f8f9fa] rounded-2xl p-6 border border-slate-200 hover:border-[#003366] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-2xl font-bold text-[#003366] mb-1">Palamaner</h4>
                <div className="text-xs text-slate-600 leading-relaxed mt-2">
                  Palamaner Town Center,<br />
                  Chittoor District, Andhra Pradesh
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col gap-2">
                <a
                  href="#contact"
                  className="py-2 px-3 text-xs font-bold text-[#003366] border border-[#003366] rounded-lg hover:bg-blue-50 transition"
                >
                  Directions
                </a>
                <a
                  href="tel:9491844963"
                  className="py-2 px-3 text-xs font-bold text-white bg-[#003366] rounded-lg hover:bg-[#002244] transition flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> Call 94918 44963
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13: URGENT CALL SECTION (AT LAST - REQUESTED BY USER)
      ========================================================================= */}
      <section
        id="call-cta"
        className="py-16 md:py-20 bg-gradient-to-r from-[#002244] via-[#003366] to-[#001f3f] text-white text-center relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-[#FFD700] text-[#003366] flex items-center justify-center mx-auto mb-5 shadow-xl">
            <PhoneCall className="w-8 h-8 animate-bounce" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            DSC 2026 batches are filling now
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Attend one free class at your nearest branch before you decide. Seats in each batch are limited to ensure personalized faculty attention.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection("free-demo-form")}
              className="px-8 py-4 bg-[#FFD700] hover:bg-[#ffcf00] text-[#003366] font-extrabold text-sm sm:text-base rounded-xl shadow-xl transition transform hover:scale-105"
            >
              Book a free demo class
            </button>
            <a
              href="tel:9491844963"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white hover:bg-white hover:text-[#003366] text-white font-extrabold text-sm sm:text-base rounded-xl transition transform hover:scale-105"
            >
              <Phone className="w-5 h-5 text-[#FFD700]" />
              <span>Call 94918 44963</span>
            </a>
          </div>

          <div className="mt-8 text-xs text-slate-300 font-medium">
            Tirupati: <a href="tel:9491844963" className="underline hover:text-[#FFD700]">94918 44963</a> · Chittoor (HQ): <a href="tel:9491844963" className="underline hover:text-[#FFD700]">94918 44963</a> · Palamaner Desk Active
          </div>
        </div>
      </section>

      {/* =========================================================================
          SUPER FOOTER (With Google Map, Contact Info & Links)
      ========================================================================= */}
      <footer id="contact" className="bg-[#1a1a2e] text-white">
        {/* Top Section with Contact Actions & Interactive Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-white/10">
          <div className="p-8 sm:p-12 flex flex-col justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_URL}
                alt="Kutty Study Circle"
                className="h-12 w-auto bg-white p-1 rounded-md"
              />
              <div className="font-serif text-xl sm:text-2xl font-bold tracking-wider uppercase">
                <span className="text-[#FFD700]">KUTTY</span>{" "}
                <span className="text-white">STUDY CIRCLE</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:9491844963"
                className="flex items-center gap-3 bg-[#003366] hover:bg-transparent border-2 border-[#003366] hover:border-white p-4 transition text-white no-underline flex-1"
              >
                <Phone className="w-6 h-6 text-[#FFD700] flex-shrink-0" />
                <div>
                  <div className="text-xs text-slate-300">Contact us directly</div>
                  <div className="text-base font-bold">+91 94918 44963</div>
                </div>
              </a>

              <a
                href="https://maps.google.com/?q=26-111,+Mittoor,+Chittoor,+Andhra+Pradesh+517001,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#003366] hover:bg-transparent border-2 border-[#003366] hover:border-white p-4 transition text-white no-underline flex-1"
              >
                <MapPin className="w-6 h-6 text-[#FFD700] flex-shrink-0" />
                <div>
                  <div className="text-xs text-slate-300">See maps and directions</div>
                  <div className="text-sm font-bold">26-111, Mittoor, Chittoor</div>
                </div>
              </a>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-2">
              <a href="#free-demo" className="hover:text-[#FFD700] transition">Free Demo Class</a>
              <span>•</span>
              <a href="#about" className="hover:text-[#FFD700] transition">Privacy Policy</a>
              <span>•</span>
              <a href="#about" className="hover:text-[#FFD700] transition">Terms of Service</a>
              <span>•</span>
              <a href="#contact" className="hover:text-[#FFD700] transition">Emergency Information</a>
            </div>
          </div>

          <div className="min-h-[300px] lg:min-h-full bg-slate-900">
            <iframe
              title="Kutty Study Circle Chittoor Location Map"
              src="https://www.google.com/maps?q=26-111,+Mittoor,+Chittoor,+Andhra+Pradesh+517001,+India&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px", filter: "grayscale(25%)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <h4 className="font-serif text-lg font-bold text-white mb-4 gold-bar-accent">
              About
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mt-6">
              For 14 years, Kutty Study Circle has been the trusted choice for thousands of students preparing for government exams. Our commitment to quality education, experienced faculty, and result-oriented approach makes us the #1 coaching institute in Rayalaseema.
            </p>

            <div className="flex items-center gap-2.5 mt-5">
              <a
                href="https://www.facebook.com/people/Kutty-Study-Circle-Chittoor-Tirupati/100063825377434/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-[#003366] text-white flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/kuttystudycircle.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-[#003366] text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@kuttystudycircle"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-[#003366] text-white flex items-center justify-center transition-colors"
                title="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://whatsapp.com/channel/0029Vb7cuGkJpe8fmTHIMy2y"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-[#003366] text-white flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4 gold-bar-accent">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 mt-6">
              <li><button onClick={() => scrollToSection("free-demo")} className="hover:text-[#FFD700] transition">Free Demo Class</button></li>
              <li><button onClick={() => scrollToSection("choose-exam")} className="hover:text-[#FFD700] transition">Choose Your Exam</button></li>
              <li><button onClick={() => scrollToSection("how-joining-works")} className="hover:text-[#FFD700] transition">How Joining Works</button></li>
              <li><button onClick={() => scrollToSection("why-classroom")} className="hover:text-[#FFD700] transition">Why Classroom</button></li>
              <li><button onClick={() => scrollToSection("materials")} className="hover:text-[#FFD700] transition">Study Materials</button></li>
              <li><button onClick={() => scrollToSection("branches")} className="hover:text-[#FFD700] transition">Branch Locations</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4 gold-bar-accent">
              Programs
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 mt-6">
              <li><button onClick={() => triggerExamDemo("AP DSC 2026 (SGT / SA)")} className="hover:text-[#FFD700] transition">AP DSC 2026 (SGT/SA)</button></li>
              <li><button onClick={() => triggerExamDemo("AP TET Paper 1 & 2")} className="hover:text-[#FFD700] transition">AP TET Paper 1 & 2</button></li>
              <li><button onClick={() => triggerExamDemo("AP Police SI / Constable")} className="hover:text-[#FFD700] transition">Police SI / Constable</button></li>
              <li><button onClick={() => triggerExamDemo("Banking & SSC")} className="hover:text-[#FFD700] transition">Banking & SSC</button></li>
              <li><button onClick={() => triggerExamDemo("Railway (RRB NTPC, Group D)")} className="hover:text-[#FFD700] transition">Railway RRB NTPC</button></li>
              <li><button onClick={() => scrollToSection("choose-exam")} className="hover:text-[#FFD700] transition">All Courses</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4 gold-bar-accent">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 mt-6">
              <li><button onClick={() => scrollToSection("materials")} className="hover:text-[#FFD700] transition">Study Materials</button></li>
              <li><button onClick={() => scrollToSection("exams")} className="hover:text-[#FFD700] transition">Exam Schedules</button></li>
              <li><button onClick={() => scrollToSection("announcements")} className="hover:text-[#FFD700] transition">Latest Announcements</button></li>
              <li><button onClick={() => scrollToSection("materials")} className="hover:text-[#FFD700] transition">Model Papers</button></li>
              <li><button onClick={() => scrollToSection("gallery")} className="hover:text-[#FFD700] transition">Photo Gallery</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4 gold-bar-accent">
              Contact Info
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 mt-6">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFD700] flex-shrink-0 mt-0.5" />
                <span>26-111, Mittoor, Chittoor, Andhra Pradesh 517001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                <a href="tel:9491844963" className="hover:text-[#FFD700] text-slate-300 font-semibold">94918 44963</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                <a href="mailto:kuttystudycircle.in@gmail.com" className="hover:text-[#FFD700]">kuttystudycircle.in@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                <span>Mon-Sat: 8 AM - 8 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-black/30 py-5 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
            <p>
              © 2026 <strong>Kutty Study Circle</strong> · Chittoor · Tirupati · Palamaner. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition">Main website</a>
              <span>•</span>
              <a href="#about" className="hover:text-white transition">Privacy policy</a>
              <span>•</span>
              <a href="https://www.instagram.com/kuttystudycircle.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a>
              <span>•</span>
              <a href="https://youtube.com/@kuttystudycircle" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">YouTube</a>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          FIXED MOBILE BOTTOM ACTION BAR (From PDF Page 3 & 4)
      ========================================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-between gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] md:hidden">
        <a
          href="tel:9491844963"
          className="flex-1 py-2 px-2.5 rounded-lg border border-slate-300 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-50 transition"
        >
          <Phone className="w-3.5 h-3.5 text-[#003366]" />
          <span>Call</span>
        </a>

        <a
          href="https://whatsapp.com/channel/0029Vb7cuGkJpe8fmTHIMy2y"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-700 transition"
        >
          <WhatsAppIcon className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => scrollToSection("free-demo-form")}
          className="flex-1 py-2 px-2.5 rounded-lg bg-[#FFD700] text-[#003366] text-xs font-extrabold flex items-center justify-center gap-1 shadow-sm transition"
        >
          <span>Book demo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* =========================================================================
          LIGHTBOX MODAL FOR GALLERY
      ========================================================================= */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImg}
              alt="Enlarged View"
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain border border-white/20"
            />
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute -top-3 -right-3 bg-[#FFD700] text-[#003366] p-2 rounded-full font-bold shadow-xl hover:bg-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          LOGIN / REGISTER MODAL
      ========================================================================= */}
      {loginModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLoginModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-7 sm:p-8 shadow-2xl border border-slate-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLoginModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1.5 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <img
                src={LOGO_URL}
                alt="Kutty Study Circle"
                className="h-12 mx-auto mb-2 object-contain"
                onError={(e) => { e.currentTarget.src = FALLBACK_LOGO; }}
              />
              <h3 className="font-serif text-2xl font-bold text-[#003366]">
                Portal Login
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Access your test series, digital notes & live attendance
              </p>

              <div className="mt-4 flex bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setLoginType("student")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition ${
                    loginType === "student"
                      ? "bg-[#003366] text-white shadow"
                      : "text-slate-600 hover:text-[#003366]"
                  }`}
                >
                  Student Portal
                </button>
                <button
                  type="button"
                  onClick={() => setLoginType("faculty")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition ${
                    loginType === "faculty"
                      ? "bg-[#003366] text-white shadow"
                      : "text-slate-600 hover:text-[#003366]"
                  }`}
                >
                  Faculty & Staff
                </button>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Welcome! ${loginType === "student" ? "Student" : "Faculty"} demo authentication successful.`);
                setLoginModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Registered Mobile / Roll Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 9491844963"
                  className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003366] text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Password / PIN
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003366] text-slate-900"
                />
              </div>

              <div className="flex justify-between items-center text-xs">
                <label className="flex items-center gap-1.5 text-slate-600">
                  <input type="checkbox" className="rounded text-[#003366]" defaultChecked />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="text-[#003366] font-semibold hover:underline">
                  Forgot PIN?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#003366] hover:bg-[#002244] text-white font-bold text-sm rounded-lg shadow transition"
              >
                Sign In to Dashboard
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-slate-500 pt-4 border-t border-slate-100">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => {
                  setLoginModalOpen(false);
                  scrollToSection("free-demo-form");
                }}
                className="text-amber-700 font-bold hover:underline"
              >
                Book Free Demo Class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MATERIAL DOWNLOAD PREVIEW MODAL
      ========================================================================= */}
      {selectedMaterial && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedMaterial(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-7 shadow-2xl border border-slate-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMaterial(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1.5 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#003366] flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                {selectedMaterial.category} Document
              </span>
              <h3 className="font-serif text-xl font-bold text-[#003366] mt-2">
                {selectedMaterial.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {selectedMaterial.pages} • {selectedMaterial.size} • Ready for Download
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-600 mb-6 space-y-1.5">
              <p>✓ Complete syllabus coverage by Kutty faculty team</p>
              <p>✓ Solved previous year questions with detailed explanations</p>
              <p>✓ High-resolution printable PDF formatted for revision</p>
            </div>

            <button
              onClick={() => {
                alert(`Starting download: ${selectedMaterial.title}.pdf`);
                setSelectedMaterial(null);
              }}
              className="w-full py-3 bg-[#FFD700] hover:bg-[#ffcf00] text-[#003366] font-bold text-sm rounded-lg shadow transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Confirm Download File</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}