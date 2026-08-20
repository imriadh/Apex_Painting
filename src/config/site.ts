/**
 * ------------------------------------------------------------------
 *  Apex Painting — single source of truth for all site content.
 *
 *  REBRANDING A FUTURE CLIENT:
 *  1. Edit this file (name, phone, copy, services, reviews…).
 *  2. Swap the image URLs below for the new client's photos.
 *  3. Adjust the default accent in src/index.css (`--accent`) —
 *     the navy scale lives there too if a different base is needed.
 * ------------------------------------------------------------------
 */

export type ProjectType = "interior" | "exterior" | "cabinets" | "unsure";

export interface AccentOption {
  name: string;
  hex: string;
}

export interface Benefit {
  id: string;
  icon: "shield" | "badge" | "clock";
  title: string;
  body: string;
  proof: string;
}

export interface Service {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  includes: string[];
  startingAt: string;
  projectType: ProjectType;
  featured?: boolean;
}

export interface GalleryProject {
  id: string;
  label: string;
  location: string;
  before: string;
  after: string;
  scope: string;
  duration: string;
  product: string;
}

export interface Review {
  quote: string;
  name: string;
  initials: string;
  neighborhood: string;
  project: string;
  date: string;
}

export interface Stat {
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export const site = {
  brand: {
    name: "Apex Painting",
    shortName: "Apex",
    tagline: "Residential Painting Co.",
    phone: "(512) 555-0147",
    phoneHref: "tel:+15125550147",
    email: "estimates@apexpaintingtx.com",
    address: "2410 E Cesar Chavez St, Austin, TX 78702",
    license: "TX Reg. #M-48213",
    hours: "Mon–Sat · 7:00a – 6:00p",
    founded: 2009,
  },

  /**
   * Lead delivery — how form submissions reach the business owner.
   *
   *   provider: "demo"     → simulates a send (what you're looking at now).
   *   provider: "endpoint" → POSTs JSON to `endpoint`. Paste a Formspree
   *                           (https://formspree.io/f/xxxx), Getform or any
   *                           webhook URL. Leads arrive by email instantly.
   *   provider: "mailto"   → opens the visitor's email app pre-filled to
   *                           `notifyEmail` (zero setup, but requires the
   *                           visitor to press Send).
   */
  form: {
    provider: "demo" as "demo" | "endpoint" | "mailto",
    endpoint: "https://formspree.io/f/YOUR_FORM_ID",
    notifyEmail: "estimates@apexpaintingtx.com",
  },

  /** Live swatch picker options — the site repaints itself with these. */
  accents: [
    { name: "Signal Orange", hex: "#FF6A2B" },
    { name: "Contractor Gold", hex: "#E8A33D" },
    { name: "Job-Site Teal", hex: "#12A5A0" },
    { name: "Blueprint Blue", hex: "#3D8BE0" },
    { name: "Barn Red", hex: "#D9482B" },
  ] as AccentOption[],

  hero: {
    eyebrow: "Licensed · Insured · Austin-born since 2009",
    headlineTop: "Professional Home Painting in",
    headlineAccent: "Austin, TX",
    sub: "Trusted by 2,400+ Austin homeowners for crisp lines, honest quotes, and job sites so clean you'd never know we were there — until you see the walls.",
    ctaPrimary: "Get a Free Estimate",
    ctaSecondary: "Call (512) 555-0147",
    image:
      "https://image.qwenlm.ai/generated-images/11a8af25-970b-4051-94f9-26720c4ecf23/_result.png",
    imageAlt: "Freshly painted Austin living room with a deep navy accent wall",
    badge: { title: "3 slots open this week", sub: "Free color consultation with every estimate" },
  },

  neighborhoods: [
    "Hyde Park",
    "Zilker",
    "Tarrytown",
    "Mueller",
    "Barton Hills",
    "Bouldin Creek",
    "Allandale",
    "Travis Heights",
    "Round Rock",
    "Cedar Park",
    "Pflugerville",
    "Georgetown",
  ],

  stats: [
    { value: 17, suffix: "", label: "Years painting Austin" },
    { value: 2400, suffix: "+", label: "Homes transformed" },
    { value: 4.9, decimals: 1, suffix: "★", label: "Average review score" },
    { value: 98, suffix: "%", label: "On-time start rate" },
  ] as Stat[],

  benefits: [
    {
      id: "licensed",
      icon: "shield",
      title: "Licensed & Insured",
      body: "Every crew is background-checked and every job is covered by $2M in liability plus full workers' comp — your home is protected before the first drop cloth goes down.",
      proof: "TX Reg. #M-48213 · COI on file",
    },
    {
      id: "rated",
      icon: "badge",
      title: "5-Star Rated",
      body: "380+ verified reviews from your neighbors across the metro, a 4.9 Google average, and an A+ BBB record we've held for eleven straight years.",
      proof: "4.9★ across 380+ reviews",
    },
    {
      id: "clean",
      icon: "clock",
      title: "Clean & On-Time",
      body: "We arrive inside a 30-minute window, mask every surface, and leave the site broom-clean daily. 98% of our jobs start exactly when promised.",
      proof: "Daily broom-clean guarantee",
    },
  ] as Benefit[],

  services: [
    {
      id: "interior",
      name: "Interior Painting",
      tagline: "Walls, ceilings, trim & doors",
      description:
        "From a single accent wall to whole-home repaints, with laser-straight cut lines and premium low-VOC paints your family can live with the same day.",
      image:
        "https://image.qwenlm.ai/generated-images/30688ab5-458e-49ba-b6d6-878ce58aafe6/_result.png",
      imageAlt: "Painter rolling a fresh white coat on an interior wall",
      includes: [
        "Full-room & whole-home repaints",
        "Low-VOC Sherwin-Williams & Benjamin Moore",
        "Color & sheen consultation included",
      ],
      startingAt: "$1,900",
      projectType: "interior",
    },
    {
      id: "exterior",
      name: "Exterior Painting",
      tagline: "Siding, trim, fascia & doors",
      description:
        "Texas sun is brutal on exteriors. We pressure-wash, scrape, spot-prime, and seal with elastomeric coatings built to shrug off a decade of heat.",
      image:
        "https://image.qwenlm.ai/generated-images/74ae9608-8549-4663-837d-0ea8dd613d1d/_result.png",
      imageAlt: "Freshly painted craftsman home exterior in white and navy",
      includes: [
        "Pressure wash, scrape & prime included",
        "Elastomeric & weather-shield coatings",
        "3-year workmanship warranty",
      ],
      startingAt: "$4,800",
      projectType: "exterior",
      featured: true,
    },
    {
      id: "cabinets",
      name: "Cabinet Refinishing",
      tagline: "Spray-shop smooth, on-site",
      description:
        "Factory-smooth factory finish at a third of replacement cost. Doors are sprayed in our dust-controlled booth, then re-hung numbered and aligned.",
      image:
        "https://image.qwenlm.ai/generated-images/9eb124be-82ff-444c-bc8a-2a895b9389d5/_result.png",
      imageAlt: "Kitchen with freshly spray-painted navy and white cabinets",
      includes: [
        "Dust-controlled spray booth finish",
        "Conversion varnish & 2K urethane",
        "New hardware install on request",
      ],
      startingAt: "$3,200",
      projectType: "cabinets",
    },
  ] as Service[],

  projectTypes: [
    { value: "interior", label: "Interior Painting" },
    { value: "exterior", label: "Exterior Painting" },
    { value: "cabinets", label: "Cabinet Refinishing" },
    { value: "unsure", label: "Not sure yet — let's talk" },
  ] as { value: ProjectType; label: string }[],

  gallery: [
    {
      id: "living-room",
      label: "Living Room",
      location: "Bouldin Creek",
      before:
        "https://image.qwenlm.ai/generated-images/f10f656e-3cec-4b7c-8e71-4c3aa7b4e3b2/_result.png",
      after:
        "https://image.qwenlm.ai/generated-images/5e69893b-65b2-4a92-b461-7b98d597618b/_result.png",
      scope: "3-bed interior repaint",
      duration: "4 days on site",
      product: "Emerald® Matte · SW 9165",
    },
    {
      id: "ranch-exterior",
      label: "Ranch Exterior",
      location: "Round Rock",
      before:
        "https://image.qwenlm.ai/generated-images/ed7bec10-24f2-463c-a004-4d08bd6d08c4/_result.png",
      after:
        "https://image.qwenlm.ai/generated-images/ebe6eb49-f1c2-421a-8ba1-9c17b1936894/_result.png",
      scope: "Full exterior + trim + door",
      duration: "6 days on site",
      product: "Duration® Exterior · Naval",
    },
  ] as GalleryProject[],

  rating: { average: "4.9", count: "380+", platforms: ["Google", "Nextdoor", "Houzz", "BBB A+"] },

  reviews: [
    {
      quote:
        "Apex repainted our 1920s bungalow top to bottom. The cut lines on the trim are so crisp our designer asked who did it — and they finished half a day early. Crew vacuumed before leaving. Every. Single. Day.",
      name: "Dana Whitfield",
      initials: "DW",
      neighborhood: "Hyde Park",
      project: "Interior repaint",
      date: "Jan 2026",
    },
    {
      quote:
        "Three companies quoted us; Apex was the only one that walked the whole property first. Line-item quote, started the Monday they promised, and the navy-and-white exterior stops traffic on our street. Worth every penny.",
      name: "Marcus & Elena Treviño",
      initials: "MT",
      neighborhood: "Mueller",
      project: "Exterior + front door",
      date: "Nov 2025",
    },
    {
      quote:
        "Our kitchen looks factory-new for a third of what replacement would've cost. Zero smell after day one, every door labeled, and the sprayed finish is glass-smooth. I've already sent two neighbors their way.",
      name: "Priya Shah",
      initials: "PS",
      neighborhood: "Zilker",
      project: "Cabinet refinishing",
      date: "Feb 2026",
    },
  ] as Review[],

  process: [
    {
      title: "Book a walkthrough",
      body: "15 minutes, on-site or over video. We measure, listen, and answer every question.",
    },
    {
      title: "Line-item quote in 24h",
      body: "No lump sums. Prep, paint, and labor spelled out so you know exactly what you're buying.",
    },
    {
      title: "We paint, you relax",
      body: "Daily photo updates, a tidy site, and a final walkthrough together before we call it done.",
    },
  ] as ProcessStep[],
};

export type SiteConfig = typeof site;
