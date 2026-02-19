import trustworthyImg from '../assets/aboutus/trustworthy.png';
import messagingImg from '../assets/aboutus/messaging.png';
import resultsImg from '../assets/aboutus/results.png';

export const caseStudiesData = [
    {
        title: "Professional & Trustworthy",
        description: "Making your business look as good as the big competitors ÔÇö so customers trust you instantly.",
        image: trustworthyImg,
        iconText: 'shield',
        accentColor: 'cyan',
        glowColor: 'rgba(6, 208, 249, 0.4)',
        borderColor: 'rgba(6, 208, 249, 0.3)',
        iconBgFrom: 'from-cyan-500/20',
        iconBgTo: 'to-blue-600/20',
        iconBorder: 'border-cyan-500/30',
        iconShadow: '0 0 20px rgba(6,208,249,0.4)',
        iconTextColor: 'text-cyan-300',
        strokeColor: 'stroke-cyan-400',
        overlayText: 'Verified',
        overlayTextGlow: 'drop-shadow-[0_0_10px_rgba(6,208,249,0.8)]',
    },
    {
        title: "Clear Messaging",
        description: "Helping customers understand your offer quickly ÔÇö no confusion, just action.",
        image: messagingImg,
        iconText: 'chat_bubble',
        accentColor: 'purple',
        glowColor: 'rgba(168, 85, 247, 0.4)',
        borderColor: 'rgba(168, 85, 247, 0.3)',
        iconBgFrom: 'from-purple-500/20',
        iconBgTo: 'to-pink-600/20',
        iconBorder: 'border-purple-500/30',
        iconShadow: '0 0 20px rgba(168,85,247,0.4)',
        iconTextColor: 'text-purple-300',
        strokeColor: 'stroke-purple-500',
        overlayText: null,
        overlayTextGlow: '',
    },
    {
        title: "Real Results",
        description: "Turning website visits into real inquiries ÔÇö calls, messages, and bookings.",
        image: resultsImg,
        iconText: 'trending_up',
        accentColor: 'pink',
        glowColor: 'rgba(236, 72, 153, 0.4)',
        borderColor: 'rgba(236, 72, 153, 0.3)',
        iconBgFrom: 'from-pink-500/20',
        iconBgTo: 'to-rose-600/20',
        iconBorder: 'border-pink-500/30',
        iconShadow: '0 0 20px rgba(236,72,153,0.4)',
        iconTextColor: 'text-pink-300',
        strokeColor: 'stroke-pink-500',
        overlayText: null,
        overlayTextGlow: '',
    },
];

export const industriesData = [
    {
        icon: 'medical_services',
        title: 'Dentists & Clinics',
        description: 'Streamlined patient intake forms and professional aesthetic portfolios to build instant clinical trust.'
    },
    {
        icon: 'restaurant',
        title: 'Restaurants & Caf├®s',
        description: 'Dynamic digital menus and high-conversion reservation integrations that capture the essence of your space.'
    },
    {
        icon: 'fitness_center',
        title: 'Gyms & Studios',
        description: 'Interactive class schedules and member portals designed to reduce friction and increase sign-ups.'
    },
    {
        icon: 'content_cut',
        title: 'Salons & Spas',
        description: 'Visual-heavy layouts showcasing your best work with direct booking system synchronization.'
    },
    {
        icon: 'home',
        title: 'Real Estate',
        description: 'High-speed property listings with immersive galleries and lead capture engines built for agents.'
    },
    {
        icon: 'build',
        title: 'Auto & Repair',
        description: 'Localized SEO landing pages and service estimate tools that turn searches into workshop bookings.'
    }
];
