// Shared ABS Fitness data — clubs, trainers, helpers. Ported from design/abs-data.js.
export const PHONE = '+91 97632 15051';
export const PHONE_HREF = 'tel:+919763215051';
export const EMAIL = 'info@absfitnessclub.in';

export interface Club {
  slug: string;
  name: string;
  city: string;
  cityShort: string;
  zone: string;
  addr: string;
  hours: string;
  sunday: string;
  tag: string;
  mx: number;
  my: number;
  maps: string;
  /** Hours are confirmed from absfitnessclub.in — unverified clubs keep a placeholder and render <SampleTag />. */
  verified: boolean;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  spec: string;
  bio: string;
  tags: string[];
  club: string;
  slot: string;
  photo: string;
  /** Everyone except the founder is a placeholder profile — render <SampleTag /> wherever this is true. */
  sample: boolean;
}

export interface ClubDetails {
  amenities: string[];
  trainers: Trainer[];
  timetable: { time: string; cls: string; coach: string; days: string }[];
  reviews: { quote: string; name: string; meta: string }[];
  rating?: string;
  reviewCount?: number;
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// The 28 clubs ABS lists in its own club-finder, as of 2026 — Pune (22), Mumbai (2), and one each in
// Kolhapur, Chhatrapati Sambhaji Nagar, Nashik and Ahilyanagar. Removed: Manjri, Model Colony, Hadapsar
// as a standalone club, and the second Nashik/Kolhapur/Sambhaji Nagar locations.
// name, city, zone, address, hours, tag, mapX, mapY, verified
const ROWS: [string, string, string, string, string, string, number, number, boolean][] = [
  ['Camp', 'Pune', 'Central', 'Atur Foundation House, 4 Dr Babasaheb Ambedkar Rd, above Jawaharlal Nehru Memorial Hall, Agarkar Nagar, Pune 411001', '6:00 AM – 10:30 PM', '', 20, 53, false],
  ['ICC', 'Pune', 'West', '9th Floor, ICC Trade Tower, A Wing, Senapati Bapat Rd, Shivajinagar, Pune 411016', '6:00 AM – 1:00 PM, 5:00 PM – 10:00 PM', 'Head office', 4, 41, true],
  ['Magarpatta', 'Pune', 'East', 'Magarpatta City, Pune', '6:00 AM – 10:00 PM', 'Flagship', 22, 62, true],
  ['Nanded City', 'Pune', 'South', 'Nanded City, Pune', '5:30 AM – 10:30 PM', '', 3, 78, false],
  ['EON 2 Kharadi', 'Pune', 'East', 'EON Free Zone, Cluster D, Kharadi, Pune', '5:00 AM – 11:00 PM', '24×7 access', 34, 44, false],
  ['Business Bay', 'Pune', 'East', 'Poonawalla Business Bay, Yerwada, Pune', '6:00 AM – 10:30 PM', '', 16, 31, false],
  ['Viman Nagar', 'Pune', 'East', 'Viman Nagar, Pune', '5:30 AM – 11:00 PM', '', 32, 32, false],
  ['Serum Institute', 'Pune', 'East', 'Serum Institute Road, Pune', '5:30 AM – 10:30 PM', '', 28, 58, false],
  ['Bibwewadi', 'Pune', 'South', 'Pushp Mangal Karyalay, near City Pride, Bibwewadi, Pune', '5:30 AM – 10:30 PM', '', 13, 70, false],
  ['Baner', 'Pune', 'West', 'Baner, Pune', '5:30 AM – 10:30 PM', 'Ladies-only hours', 8, 34, false],
  ['Pimpri', 'Pune', 'West', 'Pimpri, Pune', '5:30 AM – 10:30 PM', '', 9, 17, false],
  ['Chinchwad', 'Pune', 'West', 'Swiss Plaza, Thergaon, Pune', '5:30 AM – 10:30 PM', '', 2, 13, false],
  ['Amanora', 'Pune', 'East', 'Amanora, Pune', '5:30 AM – 10:30 PM', '', 26, 70, false],
  ['Pimple Saudagar', 'Pune', 'West', 'Pimple Saudagar, Pune', '5:30 AM – 10:30 PM', '', 9, 26, false],
  ['Punawale', 'Pune', 'West', 'Punawale, Pune', '6:00 AM – 10:30 PM', '', 2, 21, false],
  ['Keshav Nagar', 'Pune', 'East', 'SR Oriana, Keshav Nagar, Mundhwa, Pune', '5:30 AM – 10:30 PM', '', 30, 56, false],
  ['Wagholi', 'Pune', 'East', 'Menlo Business Hub, Wagholi, Pune', '5:30 AM – 10:30 PM', '', 44, 36, false],
  ['Kondhwa', 'Pune', 'South', 'Onyx Business, Tilekar Nagar, Kondhwa, Pune', '5:30 AM – 10:30 PM', '', 24, 80, false],
  ['DPU Pimpri', 'Pune', 'West', 'Pimpri, Pune', '5:30 AM – 10:30 PM', '', 11, 15, false],
  ['Kalyani Nagar', 'Pune', 'East', 'Blue Grass, Kalyani Nagar, Pune', '5:30 AM – 11:00 PM', '', 23, 39, false],
  ['Charoli', 'Pune', 'East', 'Charoli, Pune', '5:30 AM – 10:30 PM', '', 40, 30, false],
  ['Moshi', 'Pune', 'West', 'Moshi, Pune', '6:00 AM – 10:00 PM', '', 12, 8, false],
  ['BKC', 'Mumbai', '', 'BKC, Mumbai', '5:30 AM – 11:00 PM', 'Premium', 72, 30, false],
  ['Kandivali', 'Mumbai', '', 'Kandivali, Mumbai', '5:30 AM – 11:00 PM', '', 68, 20, false],
  ['Kolhapur', 'Kolhapur', '', 'Kolhapur', '6:00 AM – 10:00 PM', '', 54, 83, false],
  ['Chhatrapati Sambhaji Nagar', 'Chhatrapati Sambhaji Nagar', '', 'Chhatrapati Sambhaji Nagar', '6:00 AM – 10:30 PM', '', 79, 60, false],
  ['Nashik', 'Nashik', '', 'Nashik', '6:00 AM – 10:30 PM', '', 63, 10, false],
  ['Ahilyanagar', 'Ahilyanagar', '', 'Ahilyanagar', '6:00 AM – 10:00 PM', '', 46, 52, false],
];

export const CLUBS: Club[] = ROWS.map((r) => ({
  slug: slugify(r[0]),
  name: r[0],
  city: r[1],
  cityShort: r[1] === 'Chhatrapati Sambhaji Nagar' ? 'Ch. Sambhaji Nagar' : r[1],
  zone: r[2],
  addr: r[3],
  hours: r[4],
  // Both clubs with confirmed hours are Mon–Sat only; Sunday isn't published for the rest, so it keeps a sample placeholder.
  sunday: r[8] ? 'Closed' : '6:00 AM – 2:00 PM',
  tag: r[5],
  mx: r[6],
  my: r[7],
  maps: 'https://maps.google.com/?q=' + encodeURIComponent('ABS Fitness ' + r[0] + ', ' + r[3] + ', ' + r[1]),
  verified: r[8],
}));

export const CITIES = ['Pune', 'Mumbai', 'Kolhapur', 'Chhatrapati Sambhaji Nagar', 'Nashik', 'Ahilyanagar'];
export const ZONES = ['East', 'West', 'Central', 'South'];

const CLUB_PHOTOS = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1567598508481-65985588e295?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1600&q=80',
];
const hash = (s: string) => { let h = 7; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };
export const clubPhotos = (slug: string) => { const h = hash(slug); return [0, 1, 2, 3, 4, 5].map((i) => CLUB_PHOTOS[(h + i * 3) % CLUB_PHOTOS.length]); };
export const clubBySlug = (slug: string) => CLUBS.find((c) => c.slug === slug) || null;
export const clubsInCity = (city: string) => CLUBS.filter((c) => c.city === city);

// Ratings pulled from a public Google listing — verify on Google Maps before sharing.
const REAL_RATINGS: Record<string, { rating: number; reviews: number }> = {
  'icc': { rating: 4.7, reviews: 1265 },
  'magarpatta': { rating: 4.4, reviews: 1221 },
  'bibwewadi': { rating: 4.7, reviews: 586 },
  'camp': { rating: 4.6, reviews: 400 },
  'eon-2-kharadi': { rating: 4.2, reviews: 312 },
  'kondhwa': { rating: 4.8, reviews: 216 },
  'wagholi': { rating: 4.2, reviews: 113 },
  'chinchwad': { rating: 4.3, reviews: 69 },
  'business-bay': { rating: 4.7, reviews: 54 },
  'keshav-nagar': { rating: 4.8, reviews: 12 },
};

export const TRAINERS: Trainer[] = [
  { id: 'abhimanyu', name: 'Abhimanyu Sable', role: 'Founder, MD & CEO', spec: 'Strength & transformation', bio: 'Opened the first ABS club in Pune and still coaches the transformation blocks himself. Specialises in taking people from zero to a sustainable strength base.', tags: ['Strength', 'Transformation'], club: 'magarpatta', slot: 'tp-abhimanyu', photo: '/assets/abhimanyu-sable.jpg', sample: false },
  { id: 'govind', name: 'Govind Koli', role: 'Senior Trainer', spec: 'Functional training & fat loss', bio: 'Twelve years on the floor. Builds fat-loss programmes around real schedules — shift workers, new parents, people who travel for work.', tags: ['Fat loss', 'Functional'], club: 'magarpatta', slot: 'tp-govind', photo: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80', sample: true },
  { id: 'roma', name: 'Roma Vidhate', role: 'Sales Manager', spec: 'Memberships & onboarding', bio: 'Runs membership and onboarding across the Pune clubs, and coaches the ladies-only circuit at Magarpatta. Your first conversation with ABS is usually with Roma.', tags: ['Onboarding', 'Ladies circuit'], club: 'magarpatta', slot: 'tp-roma', photo: 'https://images.unsplash.com/photo-1559595500-e15296bdbb48?auto=format&fit=crop&w=900&q=80', sample: true },
  { id: 'kiran', name: 'Kiran Jadhav', role: 'Strength Coach', spec: 'Powerlifting & Olympic lifting', bio: 'Competitive powerlifter turned coach. Handles the platforms, technique work and anyone chasing a specific number on the bar.', tags: ['Powerlifting', 'Olympic lifting', 'Strength'], club: 'eon-2-kharadi', slot: 'tp-kiran', photo: 'https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?auto=format&fit=crop&w=900&q=80', sample: true },
  { id: 'sana', name: 'Sana Merchant', role: 'Yoga & Wellness Lead', spec: 'Hatha, vinyasa, mobility', bio: 'Designs the yoga and mobility syllabus used across all 28 clubs. Works closely with members returning from injury.', tags: ['Hatha', 'Mobility', 'Yoga'], club: 'baner', slot: 'tp-sana', photo: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80', sample: true },
  { id: 'nikhil', name: 'Nikhil Pawar', role: 'Group Fitness Trainer', spec: 'Spin, HIIT & Zumba', bio: 'Runs the evening spin and Zumba floors. The reason the 6:30 PM class at Magarpatta fills up before 6.', tags: ['Spin', 'HIIT', 'Zumba'], club: 'magarpatta', slot: 'tp-nikhil', photo: 'https://images.unsplash.com/photo-1550259979-ed79b48d2a30?auto=format&fit=crop&w=900&q=80', sample: true },
];

const AMENITIES = ['Fully air-conditioned floor', 'Hot & cold showers', 'Personal lockers', 'Free-weight floor', 'Functional training rig', 'Cardio deck', 'Group class studio', 'Dedicated ladies section', 'Olympic lifting platforms', 'Steam room', 'Basement parking', 'Nutrition counselling desk', 'Protein bar & supplements'];

const REVIEWS: [string, string, string][] = [
  ['Cleanest gym floor in the area. Equipment is maintained and there is never a queue for the racks, even at 7 PM.', 'Rahul Deshpande', 'Member 3 years'],
  ['The 6 AM functional class runs like clockwork and the coaches remember your name from day one.', 'Pooja Nikam', 'Member 2 years'],
  ['Kiran fixed my deadlift setup in the first week. Coaching here is actual coaching, not just counting reps.', 'Sameer Kulkarni', 'Member 18 months'],
  ['The 6 AM functional class is the reason I get out of bed. Small group, coach knows everyone by name.', 'Aditi Rane', 'Member 1 year'],
  ['Joined for the 90-day challenge, stayed for the people. Lost 11 kg and kept it off.', 'Imran Shaikh', 'Member 2 years'],
  ['Ladies section is properly separate and properly equipped — not two treadmills in a corner.', 'Sneha Kulkarni', 'Member 14 months'],
  ['Parking, showers, lockers, and a floor that is never crowded. Everything a working person needs.', 'Prasad Bhosale', 'Member 4 years'],
  ['Trainers actually walk the floor and correct form. That alone is worth the membership.', 'Neha Joshi', 'Member 9 months'],
  ['Used the Passport programme to train at another ABS club while travelling — my home club booked the visit in advance and it was seamless.', 'Vikram Patil', 'Member 2 years'],
];

export function clubDetails(c: Club): ClubDetails {
  const h = hash(c.slug), big = c.tag === 'Flagship' || c.tag === 'Premium';
  const amenities = big ? AMENITIES : AMENITIES.slice(0, 8 + (h % 4));
  let trainers = TRAINERS.filter((t) => t.club === c.slug);
  const rest = TRAINERS.filter((t) => t.club !== c.slug);
  let i = h % rest.length;
  while (trainers.length < 4) { trainers.push(rest[i % rest.length]); i++; }
  trainers = trainers.filter((t, idx, a) => a.indexOf(t) === idx).slice(0, 4);
  const tn = (k: number) => trainers[k % trainers.length].name;
  const timetable = [
    { time: '6:00 AM', cls: 'Functional HIIT', coach: tn(0), days: 'Mon · Wed · Fri' },
    { time: '7:00 AM', cls: 'Hatha Yoga', coach: tn(1), days: 'Tue · Thu · Sat' },
    { time: '8:00 AM', cls: 'Strength Basics', coach: tn(2), days: 'Mon – Fri' },
    { time: '10:30 AM', cls: 'Ladies-only Circuit', coach: tn(3), days: 'Mon · Wed · Fri' },
    { time: '6:30 PM', cls: 'Spin', coach: tn(1), days: 'Mon – Sat' },
    { time: '7:30 PM', cls: 'Zumba', coach: tn(3), days: 'Tue · Thu' },
    { time: '8:30 PM', cls: '90-Day Challenge Block', coach: tn(0), days: 'Mon · Thu' },
  ];
  const reviews = [0, 1, 2].map((k) => { const r = REVIEWS[(h + k * 4) % REVIEWS.length]; return { quote: r[0], name: r[1], meta: r[2] + ' · ABS ' + c.name }; });
  const real = REAL_RATINGS[c.slug];
  return { amenities, trainers, timetable, reviews, rating: real ? real.rating.toFixed(1) : undefined, reviewCount: real?.reviews };
}

export const validPhone = (s: string) => /^(\+91[\s-]?)?[6-9]\d{9}$/.test(String(s).replace(/[\s-]/g, ''));

export interface Service {
  slug: string;
  name: string;
  short: string;
  src: string;
  lede: string;
  facts: [string, string][];
  for: string[];
  inc: string[];
  week: [string, string][];
}

export const SERVICES: Service[] = [
  { slug: 'strength', name: 'Strength & Conditioning', short: 'strength training', src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2200&q=80',
    lede: 'Programs designed to build strength, stamina, and athletic performance through structured techniques.',
    facts: [['Level', 'All levels'], ['Format', 'Coached floor'], ['Frequency', '3–5× a week']],
    for: ['Beginners learning the basic lifts safely', 'Members who want to get stronger, not just sweat', 'Lifters preparing for powerlifting or Olympic lifting'],
    inc: ['Strength assessment', 'Progressive program', 'Form coaching', 'Monthly re-test'],
    week: [['Mon', 'Lower body — squat focus'], ['Tue', 'Upper body — press and pull'], ['Thu', 'Hinge — deadlift and accessories'], ['Fri', 'Full body conditioning'], ['Sat', 'Optional mobility and recovery']] },
  { slug: 'weight-loss', name: 'Weight Loss', short: 'weight loss', src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2200&q=80',
    lede: 'Safe, sustainable, and result-oriented programs backed by nutrition and progress tracking.',
    facts: [['Level', 'All levels'], ['Format', 'Coach + diet plan'], ['Tracking', 'Fortnightly']],
    for: ['Anyone starting a fat-loss journey', 'Members who have tried crash diets before', 'People who want accountability every week'],
    inc: ['Body composition analysis', 'Nutrition guidance', 'Training plan', 'Progress tracking'],
    week: [['Mon', 'Full body strength'], ['Tue', 'HIIT class'], ['Wed', 'Low-intensity cardio + core'], ['Fri', 'Full body strength'], ['Sat', 'Group class of your choice']] },
  { slug: 'mobility', name: 'Mobility & Flexibility', short: 'mobility work', src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=2200&q=80',
    lede: 'Improving movement, flexibility, posture, and overall body balance for long-term health.',
    facts: [['Level', 'All levels'], ['Format', 'Studio + floor'], ['Session', '45–60 min']],
    for: ['Desk workers with stiff hips, back or neck', 'Lifters who want better range of motion', 'Older members focused on balance'],
    inc: ['Movement screen', 'Posture work', 'Yoga & stretching', 'Injury prevention'],
    week: [['Mon', 'Hip and spine mobility'], ['Wed', 'Hatha yoga'], ['Fri', 'Shoulder and thoracic mobility'], ['Sun', 'Guided stretch and breathwork']] },
  { slug: 'personal-training', name: 'Personal Training', short: 'personal training', src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=2200&q=80',
    lede: 'One-on-one individualized coaching tailored to unique body types, goals, and timelines.',
    facts: [['Level', 'All levels'], ['Format', '1-on-1'], ['Review', 'Every fortnight']],
    for: ['Members with a specific goal and deadline', 'Anyone returning from injury or a long break', 'People who want full attention every session'],
    inc: ['Goal consultation', 'Custom program', 'Diet guidance', 'Dedicated coach'],
    week: [['Mon', 'PT session — strength'], ['Wed', 'PT session — conditioning'], ['Fri', 'PT session — strength'], ['Daily', 'Check-ins on diet and steps']] },
  { slug: 'sports', name: 'Sports-Specific Training', short: 'sports training', src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2200&q=80',
    lede: 'Custom sessions for athletes focused on speed, agility, endurance, and injury prevention.',
    facts: [['Level', 'Athletes'], ['Format', 'Small group / 1-on-1'], ['Season', 'In & off-season']],
    for: ['School and college athletes', 'Runners, cricketers, footballers and more', 'Anyone training for a competition'],
    inc: ['Performance testing', 'Speed & agility', 'Power development', 'Injury prevention'],
    week: [['Mon', 'Speed and acceleration'], ['Tue', 'Strength — lower body'], ['Thu', 'Agility and change of direction'], ['Fri', 'Strength — upper body and power'], ['Sat', 'Conditioning for your sport']] },
  { slug: 'group-classes', name: 'Group Classes', short: 'group classes', src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=2200&q=80',
    lede: 'HIIT, spin, Zumba, yoga and functional circuits running morning and evening at every club.',
    facts: [['Level', 'All levels'], ['Format', 'Instructor-led'], ['Session', '45–60 min']],
    for: ['Members who train better with a crowd', 'Anyone who wants variety every day', 'Beginners who want guidance without PT'],
    inc: ['HIIT', 'Spin', 'Zumba', 'Yoga'],
    week: [['Mon', 'Functional HIIT'], ['Tue', 'Hatha yoga'], ['Wed', 'Spin'], ['Thu', 'Zumba'], ['Sat', 'Functional circuit']] },
  { slug: '90-day', name: '90-Day Challenge', short: 'the 90-day challenge', src: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=2200&q=80',
    lede: '90 Days. One Goal. Real Results. Lose weight. Gain strength. Stay consistent.',
    facts: [['Length', '90 days'], ['Format', 'Coached batch'], ['Includes', 'Nutrition']],
    for: ['Anyone who wants a clear start and finish', 'Members who need accountability', 'People who want measurable results'],
    inc: ['Body composition start & end', 'Diet plan', 'Coached sessions', 'Batch community'],
    week: [['Mon', 'Strength'], ['Tue', 'HIIT'], ['Wed', 'Mobility + core'], ['Thu', 'Strength'], ['Sat', 'Batch workout and weekly check-in']] },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug) || null;
