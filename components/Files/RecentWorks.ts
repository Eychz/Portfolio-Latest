export interface RecentWork {
    id: number;
    slug: string;
    image: string;
    title: string;
    description: string;
    tags: string[];
    link?: string;
}

const recentWorks: RecentWork[] = [
    { id: 1, slug: "municipality-of-cordova-portal", image: "/ProjectThumbnail/Cordova-Portal.png", title: "Municipality of Cordova - Portal", description: "A comprehensive web portal for the Municipality of Cordova, designed to provide seamless access to government services, information, and community resources.", tags: ["Web Development", "School Projects"], link: "https://municipality-cordova-portal.vercel.app/home" },
    { id: 2, slug: "event-production", image: "/ProjectThumbnail/Gabi-MLBB.jpg", title: "Event Production", description: "Technical Audio Visual service during the Gabi Cordova MLBB Tournament Fiesta Leauge 2025.", tags: ["Event Production", "Audio Visual"], link: "https://www.facebook.com/share/v/18bpKNMvt2/" },
    { id: 3, slug: "cordova-public-college-jersey-for-alcu-2026", image: "/Mockups/ALCU-CPC-RED-2.png", title: "Cordova Public College Jersey for ALCU 2026", description: "A jersey design for the Cordova Public College for ALCU 2026.", tags: ["Graphic Designs", "Jersey Mockup"] },
];

export default recentWorks;