// Shared ABS Fitness data — clubs, trainers, helpers. Imported by every page.
export const PHONE = '+91 97632 15051';
export const PHONE_HREF = 'tel:+919763215051';
export const EMAIL = 'info@absfitnessclub.in';

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// name, city, zone, address, hours, tag, mapX, mapY
const ROWS = [
  ['Magarpatta City','Pune','East','3rd Floor, Destination Centre, Magarpatta City, Hadapsar','5:00 AM – 11:00 PM','Flagship',22,62],
  ['Hadapsar','Pune','East','Solapur Road, near Amanora','5:30 AM – 10:30 PM','',26,70],
  ['EON 2 Kharadi','Pune','East','EON Free Zone Phase 2, Kharadi','5:00 AM – 11:00 PM','24×7 access',34,44],
  ['Keshavnagar','Pune','East','Keshavnagar, Mundhwa','5:30 AM – 10:30 PM','',30,56],
  ['Manjri','Pune','East','Manjri Budruk, Solapur Road','6:00 AM – 10:30 PM','',38,70],
  ['Wagholi','Pune','East','Nagar Road, Wagholi','5:30 AM – 10:30 PM','',44,36],
  ['Viman Nagar','Pune','East','Nagar Road, Viman Nagar','5:30 AM – 11:00 PM','',32,32],
  ['Kalyani Nagar','Pune','East','Kalyani Nagar, near Joggers Park','5:30 AM – 11:00 PM','',23,39],
  ['Yerwada','Pune','East','Airport Road, Yerwada','6:00 AM – 10:30 PM','',16,31],
  ['Camp','Pune','Central','MG Road, Camp','6:00 AM – 10:30 PM','',20,53],
  ['Model Colony','Pune','Central','Model Colony, Shivajinagar','6:00 AM – 10:30 PM','',13,47],
  ['Bibwewadi','Pune','South','Bibwewadi Road, near Upper Depot','5:30 AM – 10:30 PM','',13,70],
  ['Kondhwa','Pune','South','NIBM Road, Kondhwa','5:30 AM – 10:30 PM','',24,80],
  ['Nanded City','Pune','South','Nanded City, Sinhagad Road','5:30 AM – 10:30 PM','',3,78],
  ['Baner','Pune','West','Baner Road, opposite Balewadi High Street','5:30 AM – 10:30 PM','Ladies-only hours',8,34],
  ['ICCSB Road','Pune','West','ICC Trade Tower Road, Senapati Bapat Road','6:00 AM – 10:00 PM','',4,41],
  ['Pimple Saudagar','Pune','West','Kunal Icon Road, Pimple Saudagar','5:30 AM – 10:30 PM','',9,26],
  ['Punawale','Pune','West','Punawale, Mumbai–Bengaluru Highway','6:00 AM – 10:30 PM','',2,21],
  ['Pimpri','Pune','West','Pimpri Camp, Mumbai–Pune Road','5:30 AM – 10:30 PM','',9,17],
  ['Chinchwad','Pune','West','Chinchwad Station Road','5:30 AM – 10:30 PM','',2,13],
  ['Moshi','Pune','West','Moshi, Alandi Road','6:00 AM – 10:00 PM','',12,8],
  ['BKC','Mumbai','','Bandra Kurla Complex, Bandra East','5:30 AM – 11:00 PM','Premium',72,30],
  ['Kandivali','Mumbai','','Mahavir Nagar, Kandivali West','5:30 AM – 11:00 PM','',68,20],
  ['College Road','Nashik','','College Road, Nashik','6:00 AM – 10:30 PM','',60,8],
  ['Indira Nagar','Nashik','','Indira Nagar, Nashik','6:00 AM – 10:30 PM','',66,11],
  ['Rajarampuri','Kolhapur','','Rajarampuri 6th Lane, Kolhapur','6:00 AM – 10:00 PM','',48,86],
  ['Tarabai Park','Kolhapur','','Tarabai Park, Kolhapur','6:00 AM – 10:00 PM','',60,80],
  ['Savedi','Ahilyanagar','','Savedi Road, Ahilyanagar','6:00 AM – 10:00 PM','',46,52],
  ['CIDCO','Chhatrapati Sambhaji Nagar','','CIDCO N-5, Chhatrapati Sambhaji Nagar','6:00 AM – 10:30 PM','',78,56],
  ['Jalna Road','Chhatrapati Sambhaji Nagar','','Jalna Road, Chhatrapati Sambhaji Nagar','6:00 AM – 10:30 PM','',80,63]
];

const PRICE = { Pune: '₹3,499', Mumbai: '₹4,999', Nashik: '₹2,999', Kolhapur: '₹2,999', Ahilyanagar: '₹2,499', 'Chhatrapati Sambhaji Nagar': '₹2,999' };

export const CLUBS = ROWS.map(r => ({
  slug: slugify(r[0]), name: r[0], city: r[1], cityShort: r[1] === 'Chhatrapati Sambhaji Nagar' ? 'Ch. Sambhaji Nagar' : r[1],
  zone: r[2], addr: r[3], hours: r[4], tag: r[5], mx: r[6], my: r[7],
  price: r[5] === 'Flagship' ? '₹3,999' : PRICE[r[1]],
  sunday: '6:00 AM – 2:00 PM',
  maps: 'https://maps.google.com/?q=' + encodeURIComponent('ABS Fitness ' + r[0] + ', ' + r[3] + ', ' + r[1])
}));

export const CITIES = ['Pune', 'Mumbai', 'Nashik', 'Kolhapur', 'Ahilyanagar', 'Chhatrapati Sambhaji Nagar'];
export const ZONES = ['East', 'West', 'Central', 'South'];

const CLUB_PHOTOS = ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80","https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1600&q=80","https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&q=80","https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1600&q=80","https://images.unsplash.com/photo-1567598508481-65985588e295?auto=format&fit=crop&w=1600&q=80","https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80","https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1600&q=80","https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80","https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1600&q=80","https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1600&q=80"];
export const clubPhotos = (slug) => { let h = 7; for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return [0,1,2,3,4,5].map(i => CLUB_PHOTOS[(h + i * 3) % CLUB_PHOTOS.length]); };
export const clubBySlug = (slug) => CLUBS.find(c => c.slug === slug) || null;
export const clubsInCity = (city) => CLUBS.filter(c => c.city === city);

export const TRAINERS = [
  { id: 'abhimanyu', name: 'Abhimanyu Sable', role: 'Founder & Head Coach', spec: 'Strength & transformation', bio: 'Opened the first ABS club in Pune and still coaches the transformation blocks himself. Specialises in taking people from zero to a sustainable strength base.', tags: ['Strength', 'Transformation'], club: 'magarpatta-city', slot: 'tp-abhimanyu', photo: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?auto=format&fit=crop&w=900&q=80' },
  { id: 'govind', name: 'Govind Koli', role: 'Senior Trainer', spec: 'Functional training & fat loss', bio: 'Twelve years on the floor. Builds fat-loss programmes around real schedules — shift workers, new parents, people who travel for work.', tags: ['Fat loss', 'Functional'], club: 'magarpatta-city', slot: 'tp-govind', photo: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80' },
  { id: 'roma', name: 'Roma Vidhate', role: 'Sales Manager', spec: 'Memberships & onboarding', bio: 'Runs membership and onboarding across the Pune clubs, and coaches the ladies-only circuit at Magarpatta. Your first conversation with ABS is usually with Roma.', tags: ['Onboarding', 'Ladies circuit'], club: 'magarpatta-city', slot: 'tp-roma', photo: 'https://images.unsplash.com/photo-1559595500-e15296bdbb48?auto=format&fit=crop&w=900&q=80' },
  { id: 'kiran', name: 'Kiran Jadhav', role: 'Strength Coach', spec: 'Powerlifting & Olympic lifting', bio: 'Competitive powerlifter turned coach. Handles the platforms, technique work and anyone chasing a specific number on the bar.', tags: ['Powerlifting', 'Olympic lifting', 'Strength'], club: 'eon-2-kharadi', slot: 'tp-kiran', photo: 'https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?auto=format&fit=crop&w=900&q=80' },
  { id: 'sana', name: 'Sana Merchant', role: 'Yoga & Wellness Lead', spec: 'Hatha, vinyasa, mobility', bio: 'Designs the yoga and mobility syllabus used across all 30+ clubs. Works closely with members returning from injury.', tags: ['Hatha', 'Mobility', 'Yoga'], club: 'baner', slot: 'tp-sana', photo: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80' },
  { id: 'nikhil', name: 'Nikhil Pawar', role: 'Group Fitness Trainer', spec: 'Spin, HIIT & Zumba', bio: 'Runs the evening spin and Zumba floors. The reason the 6:30 PM class at Magarpatta fills up before 6.', tags: ['Spin', 'HIIT', 'Zumba'], club: 'magarpatta-city', slot: 'tp-nikhil', photo: 'https://images.unsplash.com/photo-1550259979-ed79b48d2a30?auto=format&fit=crop&w=900&q=80' }
];

const AMENITIES = ['Fully air-conditioned floor', 'Hot & cold showers', 'Personal lockers', 'Free-weight floor', 'Functional training rig', 'Cardio deck', 'Group class studio', 'Dedicated ladies section', 'Olympic lifting platforms', 'Steam room', 'Basement parking', 'Nutrition counselling desk', 'Protein bar & supplements'];

const REVIEWS = [
  ['Cleanest gym floor in the area. Equipment is maintained and there is never a queue for the racks, even at 7 PM.', 'Rahul Deshpande', 'Member 3 years'],
  ['I moved here from another ABS club and the transfer took one conversation. Same card, same plan, new club.', 'Pooja Nikam', 'Member 2 years'],
  ['Kiran fixed my deadlift setup in the first week. Coaching here is actual coaching, not just counting reps.', 'Sameer Kulkarni', 'Member 18 months'],
  ['The 6 AM functional class is the reason I get out of bed. Small group, coach knows everyone by name.', 'Aditi Rane', 'Member 1 year'],
  ['Joined for the 90-day challenge, stayed for the people. Lost 11 kg and kept it off.', 'Imran Shaikh', 'Member 2 years'],
  ['Ladies section is properly separate and properly equipped — not two treadmills in a corner.', 'Sneha Kulkarni', 'Member 14 months'],
  ['Parking, showers, lockers, and a floor that is never crowded. Everything a working person needs.', 'Prasad Bhosale', 'Member 4 years'],
  ['Trainers actually walk the floor and correct form. That alone is worth the membership.', 'Neha Joshi', 'Member 9 months'],
  ['Passport means I train here on weekdays and near home on weekends. No second membership.', 'Vikram Patil', 'Member 2 years']
];

const hash = (s) => { let h = 7; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };

export function clubDetails(c) {
  const h = hash(c.slug), big = c.tag === 'Flagship' || c.tag === 'Premium';
  const amenities = big ? AMENITIES : AMENITIES.slice(0, 8 + (h % 4));
  let trainers = TRAINERS.filter(t => t.club === c.slug);
  const rest = TRAINERS.filter(t => t.club !== c.slug);
  let i = h % rest.length;
  while (trainers.length < 4) { trainers.push(rest[i % rest.length]); i++; }
  trainers = trainers.filter((t, idx, a) => a.indexOf(t) === idx).slice(0, 4);
  const tn = (k) => trainers[k % trainers.length].name;
  const timetable = [
    { time: '6:00 AM', cls: 'Functional HIIT', coach: tn(0), days: 'Mon · Wed · Fri' },
    { time: '7:00 AM', cls: 'Hatha Yoga', coach: tn(1), days: 'Tue · Thu · Sat' },
    { time: '8:00 AM', cls: 'Strength Basics', coach: tn(2), days: 'Mon – Fri' },
    { time: '10:30 AM', cls: 'Ladies-only Circuit', coach: tn(3), days: 'Mon · Wed · Fri' },
    { time: '6:30 PM', cls: 'Spin', coach: tn(1), days: 'Mon – Sat' },
    { time: '7:30 PM', cls: 'Zumba', coach: tn(3), days: 'Tue · Thu' },
    { time: '8:30 PM', cls: '90-Day Challenge Block', coach: tn(0), days: 'Mon · Thu' }
  ];
  const reviews = [0, 1, 2].map(k => { const r = REVIEWS[(h + k * 4) % REVIEWS.length]; return { quote: r[0], name: r[1], meta: r[2] + ' · ABS ' + c.name }; });
  return { amenities, trainers, timetable, reviews, rating: (4.6 + (h % 4) / 10).toFixed(1), reviewCount: 120 + (h % 340) + (big ? 180 : 0) };
}

// Live open/closed status in IST
const parseT = (s) => { const m = s.trim().match(/(\d+):(\d+)\s*(AM|PM)/i); let hh = +m[1] % 12; if (/pm/i.test(m[3])) hh += 12; return hh * 60 + (+m[2]); };
export function istMinutes(now = Date.now()) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date(now));
  const hh = +parts.find(p => p.type === 'hour').value % 24, mm = +parts.find(p => p.type === 'minute').value;
  return hh * 60 + mm;
}
export function status(hours, now = Date.now()) {
  const [o, c] = hours.split(/\s[–-]\s/), m = istMinutes(now), open = m >= parseT(o) && m < parseT(c);
  return { open, label: open ? 'Open now · closes ' + c : 'Closed · opens ' + o, short: open ? 'Open now' : 'Closed', dot: open ? '#b8e600' : 'rgba(242,242,243,.45)' };
}

export const validPhone = (s) => /^(\+91[\s-]?)?[6-9]\d{9}$/.test(String(s).replace(/[\s-]/g, ''));
