export const siteConfig = {
  name: "Harold Catipay",
  title: "Harold Catipay | Portfolio",
  description: "Graphic Designer, Event Production & Developer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "eych.xander@gmail.com",
  socials: {
    github: "https://github.com/Eychz",
    facebook: "https://www.facebook.com/letter.eych",
    instagram: "https://www.instagram.com/letter.eych",
    tiktok: "https://www.tiktok.com/@eych.tech",
  },
  student: {
    studentID: "2023-0350",
    program: "BS Info Tech",
    standing: "3rd Year",
  },
}

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
] as const
