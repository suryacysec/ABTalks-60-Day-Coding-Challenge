export const student = {
  name: "Suryansh",
  college: "AKTU – CSE",
  track: "Cybersecurity",
  day: 12,
  totalDays: 60,
  streak: 12,
  rank: 47,
  totalParticipants: 210,
  percentile: "Top 23%",
  personality: { label: "Night Owl", emoji: "🦉", color: "indigo" },
  avgSubmissionHour: 23,
  achievements: [
    { id: 1, label: "First Week Done", emoji: "✅", unlocked: true },
    { id: 2, label: "GitHub Warrior", emoji: "🔗", unlocked: true },
    { id: 3, label: "LinkedIn Visible", emoji: "👁️", unlocked: true },
    { id: 4, label: "Halfway There", emoji: "🏃", unlocked: false },
    { id: 5, label: "Full Stack", emoji: "🧱", unlocked: false },
    { id: 6, label: "60 Day Legend", emoji: "🏆", unlocked: false }
  ]
};

// Days 1–11: submitted, day 8: missed, day 12: pending, rest: future
export const submissionHistory = Array.from({ length: 14 }, (_, i) => {
  const day = i + 1;
  let status = "future";
  if (day < 12) {
    status = day === 8 ? "missed" : "submitted";
  } else if (day === 12) {
    status = "pending";
  }
  return { day, status };
});

export const todayTask = {
  day: 12,
  title: "Port Scanner",
  track: "Cybersecurity",
  difficulty: "Intermediate",
  description: "Build a port scanner using Python's socket library that scans ports 1–1024 on localhost and logs open ports to a file. Understand how network services expose themselves.",
  whatYouLearn: [
    "How TCP/UDP ports work",
    "Socket programming in Python",
    "Network enumeration fundamentals"
  ],
  resources: [
    { label: "Python socket docs", url: "https://docs.python.org/3/library/socket.html" },
    { label: "Port scanning basics", url: "https://nmap.org/book/man-port-scanning-basics.html" }
  ]
};

// Generate 60 days
const cybersecurityTasks = [
  "Caesar Cipher", "Keylogger", "SQL Injection Demo", "Firewall Rules",
  "Metasploit Basics", "Burp Suite Intro", "Buffer Overflow", "Reverse Shell",
  "CTF Challenge", "Malware Analysis", "Network Sniffer", "Password Cracker",
  "XSS Payload", "ARP Spoofing", "DNS Tunneling", "Steganography",
  "Wireless Hacking", "Ransomware Concept", "Zero-day Exploit", "Rootkit"
];

export const allDays = Array.from({ length: 60 }, (_, i) => {
  const day = i + 1;
  // Difficulty rises gradually from 2 to 9 with peaks around 20, 35, 50
  let baseDifficulty = 2 + (day / 60) * 7;
  let peakOffset = 0;
  if (Math.abs(day - 20) < 5) peakOffset = 1.5;
  if (Math.abs(day - 35) < 5) peakOffset = 2;
  if (Math.abs(day - 50) < 5) peakOffset = 1.5;
  
  let difficulty = Math.max(1, Math.min(10, Math.round(baseDifficulty + peakOffset)));
  
  // Real names
  let title = cybersecurityTasks[i % cybersecurityTasks.length];
  if (day === 12) title = "Port Scanner";
  
  return { day, title, difficulty };
});

export const leaderboard = [
  { name: "Rahul S.", college: "IIT Delhi", streak: 45, track: "DSA & CP", rank: 1 },
  { name: "Priya M.", college: "NIT Trichy", streak: 42, track: "Web Dev", rank: 2 },
  { name: "Suryansh", college: "AKTU – CSE", streak: 12, track: "Cybersecurity", rank: 3 },
  { name: "Arjun K.", college: "VIT", streak: 40, track: "AI/ML", rank: 4 },
  { name: "Neha R.", college: "BITS Pilani", streak: 38, track: "Web Dev", rank: 5 },
  { name: "Aditya V.", college: "IIIT Hyderabad", streak: 36, track: "Cybersecurity", rank: 6 },
  { name: "Ananya G.", college: "SRM", streak: 35, track: "DSA & CP", rank: 7 },
  { name: "Karthik P.", college: "DTU", streak: 30, track: "AI/ML", rank: 8 }
];

export const peerActivity = [
  { name: "Vivek", college: "KIIT", day: 15, track: "Web Dev", timeAgo: "2 min ago" },
  { name: "Sneha", college: "Thapar", day: 8, track: "DSA & CP", timeAgo: "5 min ago" },
  { name: "Rohan", college: "Jadavpur", day: 22, track: "AI/ML", timeAgo: "12 min ago" },
  { name: "Meera", college: "Manipal", day: 11, track: "Cybersecurity", timeAgo: "15 min ago" },
  { name: "Aryan", college: "PES", day: 5, track: "Web Dev", timeAgo: "28 min ago" },
  { name: "Ishaan", college: "NSUT", day: 19, track: "DSA & CP", timeAgo: "45 min ago" },
  { name: "Kavya", college: "BMSCE", day: 12, track: "AI/ML", timeAgo: "1 hr ago" },
  { name: "Pranav", college: "RVCE", day: 9, track: "Cybersecurity", timeAgo: "2 hrs ago" },
  { name: "Tanvi", college: "LNMIIT", day: 25, track: "Web Dev", timeAgo: "3 hrs ago" },
  { name: "Omkar", college: "VJTI", day: 14, track: "DSA & CP", timeAgo: "4 hrs ago" },
  { name: "Riya", college: "COEP", day: 7, track: "AI/ML", timeAgo: "5 hrs ago" },
  { name: "Yash", college: "Nirma", day: 16, track: "Cybersecurity", timeAgo: "6 hrs ago" }
];
