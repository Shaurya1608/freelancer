export type Role = "client" | "freelancer" | "admin";

export type User = {
  id: string;
  role: Role;
  name: string;
  avatar: string;
  headline?: string;
  skills?: string[];
  rating?: number;
  bio?: string;
  hourlyRate?: number;
  availability?: "full-time" | "part-time" | "contract";
  company?: string;
  website?: string;
};

export type Project = {
  id: string;
  clientId: string;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  tags: string[];
  status: "open" | "in_progress" | "completed";
};

export type Proposal = {
  id: string;
  projectId: string;
  freelancerId: string;
  coverLetter: string;
  bid: number;
  timeline: string;
  status: "submitted" | "shortlisted" | "accepted" | "rejected";
  createdAt: string;
};

export type Conversation = {
  id: string;
  participants: string[]; // user ids
  lastMessageAt: string;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: string;
};

const users: User[] = [
  {
    id: "freelancer_alex",
    role: "freelancer",
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200&auto=format&fit=crop",
    headline: "Senior Frontend Engineer",
    skills: ["React", "Next.js", "TypeScript", "Tailwind"],
    rating: 4.9,
    bio: "Ex-Startup Lead. Specialized in Next.js, performance, and delightful UX.",
    hourlyRate: 90,
    availability: "contract",
  },
  {
    id: "freelancer_priya",
    role: "freelancer",
    name: "Priya Patel",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    headline: "Product Designer",
    skills: ["Figma", "UX", "Design Systems"],
    rating: 5.0,
    bio: "Creates elegant, accessible designs. Rapid prototyping with Figma.",
    hourlyRate: 75,
    availability: "part-time",
  },
  {
    id: "freelancer_diego",
    role: "freelancer",
    name: "Diego Ramos",
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop",
    headline: "Backend/Platform",
    skills: ["Node.js", "PostgreSQL", "AWS", "Docker"],
    rating: 4.8,
    bio: "Scalable APIs and cloud infrastructure. Loves observability and DX.",
    hourlyRate: 85,
    availability: "contract",
  },
  {
    id: "client_acme",
    role: "client",
    name: "Acme Inc.",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop",
    company: "Acme Inc.",
    website: "https://acme.example.com",
  },
  {
    id: "client_nova",
    role: "client",
    name: "Nova Labs",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=200&auto=format&fit=crop",
    company: "Nova Labs",
    website: "https://nova.example.com",
  },
  {
    id: "admin_amy",
    role: "admin",
    name: "Amy (Admin)",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9?q=80&w=200&auto=format&fit=crop",
  },
];

let projects: Project[] = [
  {
    id: "proj_saas_dashboard",
    clientId: "client_acme",
    title: "Build a SaaS dashboard",
    description:
      "Create a multi-tenant SaaS dashboard with authentication, billing, and charts. Focus on performance and DX.",
    budgetMin: 5000,
    budgetMax: 8000,
    tags: ["Next.js", "Stripe", "Charts"],
    status: "open",
  },
  {
    id: "proj_mobile_shop",
    clientId: "client_nova",
    title: "Mobile e-commerce app",
    description:
      "Cross-platform app with product catalog, cart, and checkout. Prefer Flutter or React Native.",
    budgetMin: 7000,
    budgetMax: 12000,
    tags: ["Flutter", "Firebase"],
    status: "open",
  },
  {
    id: "proj_marketing_site",
    clientId: "client_acme",
    title: "Marketing site revamp",
    description:
      "Refresh brand visuals, copy, and improve Core Web Vitals. Migrate to Next.js 15 and add CMS.",
    budgetMin: 2000,
    budgetMax: 4000,
    tags: ["Design", "SEO", "Web Performance"],
    status: "in_progress",
  },
];

let proposals: Proposal[] = [
  {
    id: "prop_1",
    projectId: "proj_saas_dashboard",
    freelancerId: "freelancer_alex",
    coverLetter:
      "I've led multiple SaaS builds with Next.js. I can deliver a clean, scalable codebase and high Lighthouse scores.",
    bid: 7600,
    timeline: "4-6 weeks",
    status: "shortlisted",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prop_2",
    projectId: "proj_marketing_site",
    freelancerId: "freelancer_priya",
    coverLetter:
      "I'll revamp visuals with strong accessibility and brand cohesion. I also optimize FCP/LCP for SEO.",
    bid: 3000,
    timeline: "2-3 weeks",
    status: "submitted",
    createdAt: new Date().toISOString(),
  },
];

let conversations: Conversation[] = [
  {
    id: "c_acme_alex",
    participants: ["client_acme", "freelancer_alex"],
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "c_nova_priya",
    participants: ["client_nova", "freelancer_priya"],
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
];

let messages: Message[] = [
  {
    id: "m1",
    conversationId: "c_acme_alex",
    senderId: "client_acme",
    body: "Hi Alex, could you share examples of your dashboard work?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "m2",
    conversationId: "c_acme_alex",
    senderId: "freelancer_alex",
    body: "Absolutely! I'll send a few links shortly.",
    createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
  },
  {
    id: "m3",
    conversationId: "c_nova_priya",
    senderId: "client_nova",
    body: "Priya, we loved your portfolio. Are you available next month?",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
];

const id = (() => {
  let n = 1000;
  return () => `id_${++n}`;
})();

export function getUsers() {
  return users;
}

export function getFreelancers(): User[] {
  return users.filter((u) => u.role === "freelancer");
}

export function getClients(): User[] {
  return users.filter((u) => u.role === "client");
}

export function getUserById(userId: string) {
  return users.find((u) => u.id === userId);
}

export function getProjects() {
  return projects;
}

export function getProjectById(projectId: string) {
  return projects.find((p) => p.id === projectId);
}

export function getProjectsByClient(clientId: string) {
  return projects.filter((p) => p.clientId === clientId);
}

export function getProposalsByProject(projectId: string) {
  return proposals.filter((p) => p.projectId === projectId);
}

export function getProposalsByFreelancer(freelancerId: string) {
  return proposals.filter((p) => p.freelancerId === freelancerId);
}

export function submitProposal(input: {
  projectId: string;
  freelancerId: string;
  coverLetter: string;
  bid: number;
  timeline: string;
}) {
  const p: Proposal = {
    id: id(),
    projectId: input.projectId,
    freelancerId: input.freelancerId,
    coverLetter: input.coverLetter,
    bid: input.bid,
    timeline: input.timeline,
    status: "submitted",
    createdAt: new Date().toISOString(),
  };
  proposals = [p, ...proposals];
  return p;
}

export function updateProposalStatus(proposalId: string, status: Proposal["status"]) {
  proposals = proposals.map((p) => (p.id === proposalId ? { ...p, status } : p));
}

export function createProject(input: {
  clientId: string;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  tags: string[];
}) {
  const proj: Project = {
    id: id(),
    clientId: input.clientId,
    title: input.title,
    description: input.description,
    budgetMin: input.budgetMin,
    budgetMax: input.budgetMax,
    tags: input.tags,
    status: "open",
  };
  projects = [proj, ...projects];
  return proj;
}

export function getConversationsForUser(userId: string) {
  return conversations.filter((c) => c.participants.includes(userId));
}

export function getMessages(conversationId: string) {
  return messages
    .filter((m) => m.conversationId === conversationId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function sendMessage(conversationId: string, senderId: string, body: string) {
  const m: Message = {
    id: id(),
    conversationId,
    senderId,
    body,
    createdAt: new Date().toISOString(),
  };
  messages = [...messages, m];
  conversations = conversations.map((c) =>
    c.id === conversationId ? { ...c, lastMessageAt: m.createdAt } : c
  );
  return m;
}

export function findOrCreateConversation(userA: string, userB: string) {
  const existing = conversations.find(
    (c) => c.participants.includes(userA) && c.participants.includes(userB)
  );
  if (existing) return existing;
  const conv: Conversation = {
    id: id(),
    participants: [userA, userB],
    lastMessageAt: new Date().toISOString(),
  };
  conversations = [conv, ...conversations];
  return conv;
}

export function getCurrentUser(role: Role): User {
  const found = users.find((u) => u.role === role);
  // Fallback to first user in list
  return found ?? users[0];
}

export function searchFreelancers(params: {
  q?: string;
  minRating?: number;
  skill?: string;
}) {
  const q = (params.q ?? "").toLowerCase();
  return getFreelancers().filter((f) => {
    const text = `${f.name} ${f.headline ?? ""} ${(f.skills ?? []).join(" ")}`.toLowerCase();
    const matchQ = q ? text.includes(q) : true;
    const matchRating = params.minRating ? (f.rating ?? 0) >= params.minRating : true;
    const matchSkill = params.skill ? (f.skills ?? []).includes(params.skill) : true;
    return matchQ && matchRating && matchSkill;
  });
}

export function searchProjects(params: {
  q?: string;
  minBudget?: number;
  maxBudget?: number;
  tag?: string;
  status?: Project["status"] | "any";
}) {
  const q = (params.q ?? "").toLowerCase();
  return getProjects().filter((p) => {
    const text = `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase();
    const matchQ = q ? text.includes(q) : true;
    const matchMin = params.minBudget ? p.budgetMax >= params.minBudget : true;
    const matchMax = params.maxBudget ? p.budgetMin <= params.maxBudget : true;
    const matchTag = params.tag ? p.tags.includes(params.tag) : true;
    const matchStatus = params.status && params.status !== "any" ? p.status === params.status : true;
    return matchQ && matchMin && matchMax && matchTag && matchStatus;
  });
}

// --- Admin Content & Settings (add missing exports) ---
export type SiteCategory = { title: string; text: string; icon?: string };
export type SiteTier = {
  name: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
  highlight?: boolean;
};
export type SiteContent = {
  heroTitle: string;
  heroSubtitle: string;
  categories: SiteCategory[];
  faqs: Array<{ q: string; a: string }>;
  pricing: SiteTier[];
};
export type SiteSettings = {
  siteName: string;
  darkModeDefault: boolean;
  enableAnimations: boolean;
};

let siteSettings: SiteSettings = {
  siteName: "FreelanceHub",
  darkModeDefault: false,
  enableAnimations: true,
};

let siteContent: SiteContent = {
  heroTitle: "Hire top talent. Build faster. Launch with confidence.",
  heroSubtitle:
    "Discover vetted developers, designers, and marketers. Post a project or start hiring today.",
  categories: [
    { title: "Web Development", text: "React, Next.js, Node, APIs", icon: "💻" },
    { title: "Design & UI/UX", text: "Figma, Product, Branding", icon: "🎨" },
    { title: "Mobile Apps", text: "iOS, Android, Flutter", icon: "📱" },
    { title: "Data & AI", text: "ML, Analytics, LLMs", icon: "🧠" },
    { title: "Marketing", text: "SEO, Growth, Content", icon: "🚀" },
    { title: "DevOps", text: "Cloud, CI/CD, SRE", icon: "☁️" },
  ],
  faqs: [
    { q: "How do I hire a freelancer?", a: "Browse or post a project, review proposals, and invite freelancers to interview." },
    { q: "Is there a fee to join?", a: "Browsing is free. Optional paid plans add visibility and advanced tools." },
    { q: "How are freelancers vetted?", a: "We combine profile signals, reviews, and community reporting for quality." },
    { q: "Do you support escrow?", a: "Payments and escrow will be available in a later step." },
  ],
  pricing: [
    { name: "Starter", price: "Free", desc: "Post a project and receive proposals.", features: ["Unlimited browsing", "Basic posting", "Standard Support"], cta: "Get Started" },
    { name: "Pro", price: "$29/mo", desc: "Enhanced visibility and faster hiring.", features: ["Featured listings", "Priority Support", "Advanced search filters"], cta: "Upgrade to Pro", highlight: true },
    { name: "Business", price: "$99/mo", desc: "For teams hiring at scale.", features: ["Team management", "Bulk invites", "Dedicated success manager"], cta: "Contact Sales" },
  ],
};

export function getSiteSettings(): SiteSettings {
  return siteSettings;
}

export function updateSiteSettings(patch: Partial<SiteSettings>) {
  siteSettings = { ...siteSettings, ...patch };
  return siteSettings;
}

export function getSiteContent(): SiteContent {
  return siteContent;
}

export function updateSiteContent(patch: Partial<SiteContent>) {
  siteContent = { ...siteContent, ...patch };
  return siteContent;
}
