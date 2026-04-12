import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  CheckCircle2, 
  Leaf, 
  ShieldCheck, 
  Users, 
  Globe, 
  ArrowRight,
  Menu,
  X,
  MessageSquare,
  ThumbsUp,
  Package,
  Activity,
  Award,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// --- Types ---
type Language = 'ms' | 'en' | 'bn';

const TRANSLATIONS = {
  en: {
    navBrand: "Gainova",
    navTagline: "Premium Nutrition",
    heroBadge: "100% AUTHENTIC & VERIFIED",
    heroTitle: "Premium Weight Gain Supplement",
    heroDesc: "Gainova is a high-performance nutritional formula designed for healthy weight gain and muscle development. Crafted with premium ingredients for maximum absorption.",
    quality: "Quality",
    testing: "Testing",
    standard: "Standard",
    gmp: "GMP Certified",
    labTested: "Lab Tested",
    exportQuality: "Export Quality",
    halalFriendly: "HALAL FRIENDLY",
    reviewsCount: "792+ Reviews",
    verifiedScans: "Verified Scans",
    productSpecs: "Product Specifications",
    everythingNeed: "Everything you need to know about Gainova",
    productInfo: "Product Info",
    name: "Name",
    netWeight: "Net Weight",
    form: "Form",
    powder: "Nutritional Powder",
    ingredientsUsage: "Ingredients & Usage",
    ingredients: "Ingredients",
    ingredientsList: "Oats Powder, Milk Powder, Soy Protein, Peanut Powder, Dates Powder, Banana Powder, Almond Powder, Natural Flavour.",
    noChemicals: "*No artificial preservatives or harmful chemicals.",
    usageInstructions: "Usage Instructions",
    usageDesc: "Mix 2 tablespoons (30g) with 250ml milk or water. Stir well until dissolved. Take 1–2 times daily, preferably after meals or before sleep.",
    qualityCert: "Quality & Certification",
    commitment: "Our commitment to safety and excellence",
    mafsApproved: "MAFS Approved",
    ministryStandard: "Ministry Standard",
    labVerified: "Lab Verified",
    purityGuaranteed: "Purity Guaranteed",
    vegFriendly: "Vegetarian Friendly",
    plantBased: "Plant-Based Safe",
    educationalArticle: "Educational Article",
    aboutGainova: "About Gainova Weight Gain Supplement",
    scienceTitle: "The Science of Healthy Weight Gain",
    scienceDesc: "Gaining weight in a healthy manner requires more than just eating extra calories; it requires a strategic balance of macronutrients. Gainova is formulated to provide a high-density caloric surplus through complex carbohydrates and premium proteins, ensuring that the weight you gain is lean and sustainable.",
    nutritionalImportance: "Nutritional Importance",
    nutritionalDesc: "Our formula includes Oats and Almond powder for fiber and healthy fats, while Soy protein provides the essential amino acids needed for muscle repair and growth.",
    lifestyleIntegration: "Lifestyle Integration",
    lifestyleDesc: "For best results, we recommend combining Gainova with a consistent strength training routine and at least 7-8 hours of quality sleep to facilitate muscle synthesis.",
    strictGmp: "*Gainova is an export-quality supplement manufactured under strict GMP standards to ensure safety and effectiveness for all users.",
    customerFeedback: "Customer Feedback",
    realStories: "Real stories from real users across the globe",
    verifiedReviews: "792+ Verified Reviews",
    loadMore: "Load More Reviews",
    faq: "Frequently Asked Questions",
    q1: "Is Gainova safe for long-term use?",
    a1: "Yes, Gainova is made from 100% natural food-based ingredients. It contains no steroids or harmful chemicals, making it safe for daily consumption.",
    q2: "How fast can I see results?",
    a2: "Most users report visible changes within 3-4 weeks of consistent use, provided they maintain a proper diet and lifestyle.",
    q3: "Can I take it with water instead of milk?",
    a3: "Absolutely. While milk adds extra calories and protein, Gainova is designed to be effective even when mixed with plain water.",
    footerDesc: "Your trusted partner in premium nutrition. We focus on delivering high-quality supplements that help you reach your health goals safely and effectively.",
    quickLinks: "Quick Links",
    support: "Support",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact Us",
    rights: "© 2024 Gainova Malaysia. All Rights Reserved.",
    certHeader: "MALAYSIA FOOD QUALITY CERTIFICATE",
    certBody: "This certificate is issued for the product:",
    certProductDesc: "A premium weight gain supplement.",
    certIssueDate: "Issue Date: 01 April 2026",
    certValidUntil: "Valid Until: 31 March 2035",
    certAuthorized: "Authorized Signature",
    certSeal: "OFFICIAL SEAL"
  },
  ms: {
    navBrand: "Gainova",
    navTagline: "Pemakanan Premium",
    heroBadge: "100% SAH & DISAHKAN",
    heroTitle: "Suplemen Penambah Berat Badan Premium",
    heroDesc: "Gainova adalah formula pemakanan berprestasi tinggi yang direka untuk penambahan berat badan yang sihat dan pembangunan otot. Diperbuat daripada bahan premium untuk penyerapan maksimum.",
    quality: "Kualiti",
    testing: "Ujian",
    standard: "Standard",
    gmp: "Disahkan GMP",
    labTested: "Diuji Makmal",
    exportQuality: "Kualiti Eksport",
    halalFriendly: "MESRA HALAL",
    reviewsCount: "792+ Ulasan",
    verifiedScans: "Imbasan Disahkan",
    productSpecs: "Spesifikasi Produk",
    everythingNeed: "Semua yang anda perlu tahu tentang Gainova",
    productInfo: "Info Produk",
    name: "Nama",
    netWeight: "Berat Bersih",
    form: "Bentuk",
    powder: "Serbuk Pemakanan",
    ingredientsUsage: "Ramuan & Penggunaan",
    ingredients: "Ramuan",
    ingredientsList: "Serbuk Oat, Serbuk Susu, Protein Soya, Serbuk Kacang Tanah, Serbuk Kurma, Serbuk Pisang, Serbuk Badam, Perisa Semulajadi.",
    noChemicals: "*Tiada pengawet tiruan atau bahan kimia berbahaya.",
    usageInstructions: "Arahan Penggunaan",
    usageDesc: "Campurkan 2 sudu besar (30g) dengan 250ml susu atau air. Kacau rata sehingga larut. Ambil 1–2 kali sehari, sebaik-baiknya selepas makan atau sebelum tidur.",
    qualityCert: "Kualiti & Pensijilan",
    commitment: "Komitmen kami terhadap keselamatan dan kecemerlangan",
    mafsApproved: "Diluluskan MAFS",
    ministryStandard: "Standard Kementerian",
    labVerified: "Disahkan Makmal",
    purityGuaranteed: "Ketulenan Terjamin",
    vegFriendly: "Mesra Vegetarian",
    plantBased: "Selamat Berasaskan Tumbuhan",
    educationalArticle: "Artikel Pendidikan",
    aboutGainova: "Mengenai Suplemen Penambah Berat Badan Gainova",
    scienceTitle: "Sains Penambahan Berat Badan Yang Sihat",
    scienceDesc: "Menambah berat badan secara sihat memerlukan lebih daripada sekadar makan kalori tambahan; ia memerlukan keseimbangan makronutrien yang strategik. Gainova dirumuskan untuk menyediakan lebihan kalori ketumpatan tinggi melalui karbohidrat kompleks dan protein premium.",
    nutritionalImportance: "Kepentingan Pemakanan",
    nutritionalDesc: "Formula kami termasuk serbuk Oat dan Badam untuk serat dan lemak sihat, manakala protein Soya menyediakan asid amino penting yang diperlukan untuk pembaikan dan pertumbuhan otot.",
    lifestyleIntegration: "Integrasi Gaya Hidup",
    lifestyleDesc: "Untuk hasil terbaik, kami mengesyorkan menggabungkan Gainova dengan rutin latihan kekuatan yang konsisten dan sekurang-kurangnya 7-8 jam tidur berkualiti.",
    strictGmp: "*Gainova adalah suplemen kualiti eksport yang dikilangkan di bawah piawaian GMP yang ketat untuk memastikan keselamatan dan keberkesanan.",
    customerFeedback: "Maklum Balas Pelanggan",
    realStories: "Cerita sebenar daripada pengguna sebenar di seluruh dunia",
    verifiedReviews: "792+ Ulasan Disahkan",
    loadMore: "Muat Lebih Banyak Ulasan",
    faq: "Soalan Lazim",
    q1: "Adakah Gainova selamat untuk kegunaan jangka panjang?",
    a1: "Ya, Gainova diperbuat daripada 100% bahan berasaskan makanan semulajadi. Ia tidak mengandungi steroid atau bahan kimia berbahaya.",
    q2: "Berapa cepat saya boleh melihat hasil?",
    a2: "Kebanyakan pengguna melaporkan perubahan ketara dalam tempoh 3-4 minggu penggunaan konsisten, dengan syarat mereka mengekalkan diet dan gaya hidup yang betul.",
    q3: "Bolehkah saya mengambilnya dengan air dan bukannya susu?",
    a3: "Sudah tentu. Walaupun susu menambah kalori dan protein tambahan, Gainova direka untuk berkesan walaupun dicampur dengan air kosong.",
    footerDesc: "Rakan kongsi dipercayai anda dalam pemakanan premium. Kami fokus pada penyampaian suplemen berkualiti tinggi yang membantu anda mencapai matlamat kesihatan anda.",
    quickLinks: "Pautan Pantas",
    support: "Sokongan",
    privacy: "Dasar Privasi",
    terms: "Syarat Perkhidmatan",
    contact: "Hubungi Kami",
    rights: "© 2024 Gainova Malaysia. Hak Cipta Terpelihara.",
    certHeader: "SIJIL KUALITI MAKANAN MALAYSIA",
    certBody: "Sijil ini dikeluarkan untuk produk:",
    certProductDesc: "Suplemen penambah berat badan premium.",
    certIssueDate: "Tarikh Isu: 01 April 2026",
    certValidUntil: "Sah Sehingga: 31 Mac 2035",
    certAuthorized: "Tandatangan Berkuasa",
    certSeal: "METERAI RASMI"
  },
  bn: {
    navBrand: "গাইনোভা",
    navTagline: "প্রিমিয়াম পুষ্টি",
    heroBadge: "১০০% খাঁটি এবং যাচাইকৃত",
    heroTitle: "প্রিমিয়াম ওজন বাড়ানোর সাপ্লিমেন্ট",
    heroDesc: "গাইনোভা (Gainova) হলো একটি উচ্চ-মানের পুষ্টিকর ফর্মুলা যা স্বাস্থ্যকর ওজন বৃদ্ধি এবং পেশী গঠনের জন্য ডিজাইন করা হয়েছে। সর্বোচ্চ শোষণের জন্য এটি প্রিমিয়াম উপাদান দিয়ে তৈরি।",
    quality: "গুণমান",
    testing: "পরীক্ষা",
    standard: "মানদণ্ড",
    gmp: "GMP সার্টিফাইড",
    labTested: "ল্যাব টেস্টেড",
    exportQuality: "রপ্তানি মান",
    halalFriendly: "হালাল ফ্রেন্ডলি",
    reviewsCount: "৭৯২+ রিভিউ",
    verifiedScans: "যাচাইকৃত স্ক্যান",
    productSpecs: "পণ্যের স্পেসিফিকেশন",
    everythingNeed: "গাইনোভা সম্পর্কে আপনার যা জানা দরকার",
    productInfo: "পণ্যের তথ্য",
    name: "নাম",
    netWeight: "নিট ওজন",
    form: "ধরণ",
    powder: "পুষ্টিকর পাউডার",
    ingredientsUsage: "উপাদান এবং ব্যবহার",
    ingredients: "উপাদানসমূহ",
    ingredientsList: "ওটস পাউডার, মিল্ক পাউডার, সয়া প্রোটিন, চিনাবাদাম পাউডার, খেজুরের পাউডার, কলার পাউডার, বাদাম পাউডার, প্রাকৃতিক ফ্লেভার।",
    noChemicals: "*কোনো কৃত্রিম প্রিজারভেটিভ বা ক্ষতিকারক রাসায়নিক নেই।",
    usageInstructions: "ব্যবহারের নির্দেশাবলী",
    usageDesc: "২৫০ মিলি দুধ বা পানির সাথে ২ টেবিল চামচ (৩০ গ্রাম) মেশান। দ্রবীভূত না হওয়া পর্যন্ত ভালো করে নাড়ুন। দিনে ১-২ বার গ্রহণ করুন, বিশেষ করে খাবারের পরে বা ঘুমানোর আগে।",
    qualityCert: "গুণমান এবং সার্টিফিকেশন",
    commitment: "নিরাপত্তা এবং শ্রেষ্ঠত্বের প্রতি আমাদের অঙ্গীকার",
    mafsApproved: "MAFS অনুমোদিত",
    ministryStandard: "মন্ত্রণালয় মানদণ্ড",
    labVerified: "ল্যাব যাচাইকৃত",
    purityGuaranteed: "বিশুদ্ধতা নিশ্চিত",
    vegFriendly: "নিরামিষভোজী বান্ধব",
    plantBased: "উদ্ভিদ-ভিত্তিক নিরাপদ",
    educationalArticle: "শিক্ষামূলক নিবন্ধ",
    aboutGainova: "গাইনোভা ওজন বৃদ্ধি সাপ্লিমেন্ট সম্পর্কে",
    scienceTitle: "স্বাস্থ্যকর ওজন বৃদ্ধির বিজ্ঞান",
    scienceDesc: "স্বাস্থ্যকর উপায়ে ওজন বাড়ানোর জন্য কেবল অতিরিক্ত ক্যালরি খাওয়ার চেয়ে বেশি কিছু প্রয়োজন; এর জন্য ম্যাক্রোনিউট্রিয়েন্টের একটি কৌশলগত ভারসাম্য প্রয়োজন। গাইনোভা জটিল কার্বোহাইড্রেট এবং প্রিমিয়াম প্রোটিনের মাধ্যমে উচ্চ-ঘনত্বের ক্যালরি সরবরাহ করার জন্য তৈরি করা হয়েছে।",
    nutritionalImportance: "পুষ্টির গুরুত্ব",
    nutritionalDesc: "আমাদের ফর্মুলায় ফাইবার এবং স্বাস্থ্যকর চর্বির জন্য ওটস এবং বাদাম পাউডার অন্তর্ভুক্ত রয়েছে, যখন সয়া প্রোটিন পেশী মেরামত এবং বৃদ্ধির জন্য প্রয়োজনীয় অ্যামিনো অ্যাসিড সরবরাহ করে।",
    lifestyleIntegration: "জীবনধারা একীকরণ",
    lifestyleDesc: "সেরা ফলাফলের জন্য, আমরা গাইনোভাকে একটি নিয়মিত শক্তি প্রশিক্ষণ রুটিন এবং অন্তত ৭-৮ ঘন্টা মানসম্পন্ন ঘুমের সাথে একত্রিত করার পরামর্শ দিই।",
    strictGmp: "*গাইনোভা হলো একটি রপ্তানি-মানের সাপ্লিমেন্ট যা সকল ব্যবহারকারীর নিরাপত্তা এবং কার্যকারিতা নিশ্চিত করতে কঠোর GMP মানদণ্ডের অধীনে তৈরি করা হয়।",
    customerFeedback: "গ্রাহক প্রতিক্রিয়া",
    realStories: "বিশ্বজুড়ে প্রকৃত ব্যবহারকারীদের বাস্তব গল্প",
    verifiedReviews: "৭৯২+ যাচাইকৃত রিভিউ",
    loadMore: "আরো রিভিউ দেখুন",
    faq: "সচরাচর জিজ্ঞাস্য",
    q1: "গাইনোভা কি দীর্ঘমেয়াদী ব্যবহারের জন্য নিরাপদ?",
    a1: "হ্যাঁ, গাইনোভা ১০০% প্রাকৃতিক খাদ্য-ভিত্তিক উপাদান থেকে তৈরি। এতে কোনো স্টেরয়েড বা ক্ষতিকারক রাসায়নিক নেই, যা এটিকে দৈনিক ব্যবহারের জন্য নিরাপদ করে তোলে।",
    q2: "কত দ্রুত ফলাফল দেখতে পাব?",
    a2: "বেশিরভাগ ব্যবহারকারী ৩-৪ সপ্তাহের মধ্যে দৃশ্যমান পরিবর্তনের কথা জানান, যদি তারা সঠিক ডায়েট এবং জীবনধারা বজায় রাখেন।",
    q3: "আমি কি দুধের বদলে পানি দিয়ে এটি খেতে পারি?",
    a3: "অবশ্যই। যদিও দুধ অতিরিক্ত ক্যালরি এবং প্রোটিন যোগ করে, গাইনোভা সাধারণ পানির সাথে মিশিয়েও কার্যকর হওয়ার জন্য ডিজাইন করা হয়েছে।",
    footerDesc: "প্রিমিয়াম পুষ্টিতে আপনার বিশ্বস্ত অংশীদার। আমরা উচ্চ-মানের সাপ্লিমেন্ট সরবরাহের দিকে মনোনিবেশ করি যা আপনাকে নিরাপদে আপনার স্বাস্থ্য লক্ষ্য অর্জনে সহায়তা করে।",
    quickLinks: "দ্রুত লিঙ্ক",
    support: "সহায়তা",
    privacy: "গোপনীয়তা নীতি",
    terms: "পরিষেবার শর্তাবলী",
    contact: "আমাদের সাথে যোগাযোগ করুন",
    rights: "© ২০২৪ গাইনোভা মালয়েশিয়া। সর্বস্বত্ব সংরক্ষিত।",
    certHeader: "মালয়েশিয়া খাদ্য গুণমান সার্টিফিকেট",
    certBody: "এই সার্টিফিকেটটি এই পণ্যের জন্য ইস্যু করা হয়েছে:",
    certProductDesc: "একটি প্রিমিয়াম ওজন বাড়ানোর সাপ্লিমেন্ট।",
    certIssueDate: "ইস্যু তারিখ: ০১ এপ্রিল ২০২৬",
    certValidUntil: "মেয়াদ শেষ: ৩১ মার্চ ২০৩৫",
    certAuthorized: "অনুমোদিত স্বাক্ষর",
    certSeal: "অফিসিয়াল সিল"
  }
};

const Certificate = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="relative w-full aspect-[1/1.414] bg-[#fdfdfd] border-[12px] border-double border-slate-200 p-8 shadow-2xl flex flex-col items-center text-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      {/* Header */}
      <div className="w-full flex justify-between items-start mb-6">
        <img src="https://malaysiafair.jp/sponsor/images/d_mafs.png" alt="MAFS" className="h-12 w-auto" referrerPolicy="no-referrer" />
        <div className="text-right">
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Document ID: GN-2026-0401</p>
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Status: VERIFIED</p>
        </div>
      </div>

      <h2 className="text-xl font-serif font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-8 tracking-wide">
        {t.certHeader}
      </h2>

      <div className="space-y-6 flex-grow">
        <p className="text-xs text-slate-500 italic">{t.certBody}</p>
        
        <div className="py-4">
          <h3 className="text-4xl font-black text-sky-600 tracking-tight mb-1">Gainova</h3>
          <p className="text-sm font-bold text-slate-700">{t.certProductDesc}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-left border-y border-slate-100 py-4">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">{t.netWeight}</p>
            <p className="text-xs font-bold text-slate-800">800g</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">{t.form}</p>
            <p className="text-xs font-bold text-slate-800">{t.powder}</p>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t.ingredients}</p>
            <p className="text-[10px] leading-relaxed text-slate-600">
              {t.ingredientsList}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-6 py-4">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-jR4JoEeIKGg1yGeyBLMFJ4bM0euxnwAIFwQikUa40A&s=10" alt="Approved" className="h-12 w-auto grayscale opacity-70" referrerPolicy="no-referrer" />
          <img src="https://media.licdn.com/dms/image/v2/D5622AQF4dAFPo3hG2w/feedshare-shrink_800/feedshare-shrink_800/0/1713610840672?e=2147483647&v=beta&t=Lsv5Ue1GgKReES3k3YNAikxAZfPv5amh6iH5Kya-kCw" alt="Veg" className="h-12 w-auto grayscale opacity-70" referrerPolicy="no-referrer" />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full mt-auto pt-8 border-t border-slate-100 grid grid-cols-2 gap-8 items-end">
        <div className="text-left space-y-1">
          <p className="text-[10px] font-bold text-slate-800">{t.certIssueDate}</p>
          <p className="text-[10px] font-bold text-red-600">{t.certValidUntil}</p>
        </div>
        <div className="text-center">
          <div className="h-12 flex items-center justify-center relative">
             <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-16 h-16 border-4 border-sky-600 rounded-full flex items-center justify-center text-[8px] font-black text-sky-600 rotate-12">
                  {t.certSeal}
                </div>
             </div>
             <p className="font-serif italic text-slate-400 text-sm">Authorized Signature</p>
          </div>
          <div className="w-full h-px bg-slate-300 mt-1" />
          <p className="text-[8px] font-bold text-slate-400 uppercase mt-1">{t.certAuthorized}</p>
        </div>
      </div>

      {/* Security Watermark */}
      <div className="absolute bottom-4 right-4 opacity-10 rotate-[-15deg]">
        <ShieldCheck className="h-24 w-24 text-slate-900" />
      </div>
    </div>
  );
};

// --- Mock Reviews Generator ---
const generateReviews = (count: number) => {
  const uniqueNames = [
    "James T.", "Sarah M.", "Michael B.", "Emily C.", "William R.", "Jessica L.", "David K.", "Ashley P.", "Richard S.", "Amanda D.", "Charles W.", "Melissa G.", "Joseph H.", "Deborah F.", "Thomas V.", "Stephanie N.", "Christopher J.", "Rebecca Y.", "Daniel A.", "Laura E.", "Paul O.", "Sharon I.", "Mark U.", "Cynthia Q.", "Donald X.", "Kathleen Z.", "George M.", "Amy L.", "Kenneth B.", "Shirley C.", "Steven R.", "Angela P.", "Edward S.", "Helen D.",
    "Ahmad F.", "Siti N.", "Nur A.", "Muhammad S.", "Abdul R.", "Syed M.", "Zainal A.", "Azman B.", "Ismail C.", "Osman D.", "Ibrahim E.", "Hassan F.", "Yusof G.", "Ali H.", "Omar I.", "Amir J.", "Arif K.", "Aisyah L.", "Aminah M.", "Fatimah N.", "Zainab O.", "Khadijah P.", "Mariam Q.", "Halimah R.", "Salmah S.", "Azizah T.", "Rahmah U.", "Zaleha V.", "Kalsom W.", "Rokiah X.", "Hasnah Y.", "Zaharah Z.", "Safiah A.", "Amin B.",
    "Md. Hasan", "Rakib H.", "Tariqul I.", "Nazmul H.", "Shafiqur R.", "Mahbub A.", "Kazi N.", "Aminul I.", "Jahangir A.", "Faruq H.", "Rezaul K.", "Monir M.", "Arifur R.", "Ashraful I.", "Mizanur R.", "Kamrul H.", "Shahin A.", "Sohel R.", "Rubel H.", "Imran N.", "Faisal A.", "Tofazzal H.", "Anisur R.", "Habibur R.", "Mostafa K.", "Rashedul I.", "Saiful A.", "Touhidul I.", "Zillur R.", "Enamul H.", "Mahmudul H.", "Nasir U.", "Obaidul Q.", "Jashim U."
  ];
  const shuffledNames = [...uniqueNames].sort(() => Math.random() - 0.5);
  const commentsEn = [
    "Amazing results! Gained 3kg in a month naturally.",
    "Best weight gain supplement I've tried. No bloating.",
    "Very high quality. The taste is great with milk.",
    "Highly recommended for skinny people like me.",
    "Authentic product. Scanned the QR and verified.",
    "Good for energy too. I feel stronger in the gym.",
    "Finally found a supplement that works for me.",
    "Excellent packaging and fast delivery."
  ];
  const commentsMs = [
    "Sangat berkesan! Berat badan naik secara sihat.",
    "Terbaik! Rasa sedap এবং bertenaga.",
    "Produk original. Dah scan QR memang sah.",
    "Sesuai untuk yang susah nak naik berat."
  ];
  const commentsBn = [
    "খুবই ভালো প্রোডাক্ট। অনেক উপকার পেয়েছি।",
    "অসাধারণ! এটি আমার এনার্জি লেভেল বাড়িয়ে দিয়েছে।",
    "প্রাকৃতিক উপাদান, কোনো পার্শ্বপ্রতিক্রিয়া নেই।"
  ];

  return Array.from({ length: count }, (_, i) => {
    const langRoll = Math.random();
    let lang: Language = 'en';
    let comment = commentsEn[Math.floor(Math.random() * commentsEn.length)];
    
    if (langRoll > 0.85) {
      lang = 'bn';
      comment = commentsBn[Math.floor(Math.random() * commentsBn.length)];
    } else if (langRoll > 0.7) {
      lang = 'ms';
      comment = commentsMs[Math.floor(Math.random() * commentsMs.length)];
    }

    const date = new Date();
    date.setFullYear(date.getFullYear() - (Math.random() > 0.5 ? 0 : 1));
    date.setMonth(Math.floor(Math.random() * 12));
    date.setDate(Math.floor(Math.random() * 28));

    return {
      id: i + 1,
      name: shuffledNames[i % shuffledNames.length],
      rating: (Math.random() * (5 - 4.3) + 4.3).toFixed(1),
      comment,
      lang,
      date: date.toISOString().split('T')[0],
      helpful: Math.floor(Math.random() * 50)
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const ALL_REVIEWS = generateReviews(100);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(20);

  const images = {
    mafsLogo: "https://malaysiafair.jp/sponsor/images/d_mafs.png",
    vegetarian: "https://media.licdn.com/dms/image/v2/D5622AQF4dAFPo3hG2w/feedshare-shrink_800/feedshare-shrink_800/0/1713610840672?e=2147483647&v=beta&t=Lsv5Ue1GgKReES3k3YNAikxAZfPv5amh6iH5Kya-kCw",
    approvedSticker: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-jR4JoEeIKGg1yGeyBLMFJ4bM0euxnwAIFwQikUa40A&s=10",
    malaysiaFlag: "https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg"
  };

  const loadMore = () => setVisibleReviews(prev => prev + 20);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-sky-100 selection:text-sky-900">
      {/* --- Navigation --- */}
      <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white shadow-lg shadow-sky-200">
              <Leaf className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-xl font-bold tracking-tight text-slate-900 leading-none">Gainova</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600">Premium Nutrition</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-600">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl">
        {/* --- Hero Section --- */}
        <section className="px-4 py-12 md:py-20">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700 font-bold py-1 px-3">
                <ShieldCheck className="mr-1.5 h-4 w-4" /> 100% AUTHENTIC & VERIFIED
              </Badge>
              <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
                Premium Weight Gain <span className="text-sky-500">Supplement</span>
              </h1>
              <p className="text-lg text-slate-600 md:text-xl leading-relaxed">
                Gainova is a high-performance nutritional formula designed for healthy weight gain and muscle development. Crafted with premium ingredients for maximum absorption.
              </p>
              
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Quality</p>
                    <p className="font-bold text-slate-900">GMP Certified</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Testing</p>
                    <p className="font-bold text-slate-900">Lab Tested</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Standard</p>
                    <p className="font-bold text-slate-900">Export Quality</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="relative z-10 overflow-hidden rounded-[2.5rem] bg-slate-50 p-6 shadow-2xl shadow-sky-100/50">
                <div className="h-full w-full rounded-[2rem] overflow-hidden shadow-inner">
                  <Certificate lang="en" />
                </div>
                <div className="absolute top-10 right-10">
                  <Badge className="bg-green-500 text-white font-bold px-4 py-2 text-sm shadow-lg">HALAL FRIENDLY</Badge>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 z-20 rounded-3xl bg-white p-6 shadow-xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-black text-sky-500">4.8</p>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
                    </div>
                  </div>
                  <Separator orientation="vertical" className="h-10" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">792+ Reviews</p>
                    <p className="text-xs text-slate-400">Verified Scans</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- Product Details --- */}
        <section className="px-4 py-16 bg-slate-50/50">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Product Specifications</h2>
            <p className="text-slate-500 mt-2">Everything you need to know about Gainova</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-none shadow-lg shadow-slate-200/50 overflow-hidden">
              <div className="bg-sky-500 p-4 text-white flex items-center gap-3">
                <Package className="h-6 w-6" />
                <h3 className="font-bold">Product Info</h3>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Name</p>
                  <p className="font-bold text-slate-900">Gainova Premium</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Net Weight</p>
                  <p className="font-bold text-slate-900">800g (Family Pack)</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Form</p>
                  <p className="font-bold text-slate-900">Nutritional Powder</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg shadow-slate-200/50 overflow-hidden md:col-span-2">
              <div className="bg-green-500 p-4 text-white flex items-center gap-3">
                <Leaf className="h-6 w-6" />
                <h3 className="font-bold">Ingredients & Usage</h3>
              </div>
              <CardContent className="p-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> Ingredients
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Oats Powder, Milk Powder, Soy Protein, Peanut Powder, Dates Powder, Banana Powder, Almond Powder, Natural Flavour.
                    </p>
                    <p className="text-xs text-slate-400 italic font-medium">
                      *No artificial preservatives or harmful chemicals.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <Activity className="h-4 w-4 text-sky-500" /> Usage Instructions
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Mix 2 tablespoons (30g) with 250ml milk or water. Stir well until dissolved. Take 1–2 times daily, preferably after meals or before sleep.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* --- Certification Section --- */}
        <section className="px-4 py-20">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Quality & Certification</h2>
            <p className="text-slate-500 mt-2">Our commitment to safety and excellence</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:shadow-xl group">
              <img 
                src={images.mafsLogo} 
                alt="MAFS Certification" 
                className="h-32 w-auto object-contain mb-6 group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <h4 className="font-bold text-slate-900">MAFS Approved</h4>
              <p className="text-xs text-slate-400 text-center mt-2 uppercase tracking-widest">Ministry Standard</p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:shadow-xl group">
              <img 
                src={images.approvedSticker} 
                alt="Quality Sticker" 
                className="h-32 w-auto object-contain mb-6 group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <h4 className="font-bold text-slate-900">Lab Verified</h4>
              <p className="text-xs text-slate-400 text-center mt-2 uppercase tracking-widest">Purity Guaranteed</p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:shadow-xl group">
              <img 
                src={images.vegetarian} 
                alt="Vegetarian Guidelines" 
                className="h-32 w-auto object-contain mb-6 group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <h4 className="font-bold text-slate-900">Vegetarian Friendly</h4>
              <p className="text-xs text-slate-400 text-center mt-2 uppercase tracking-widest">Plant-Based Safe</p>
            </div>
          </div>
        </section>

        {/* --- Article Section --- */}
        <section className="px-4 py-20 bg-slate-900 text-white rounded-[3rem] mx-4 mb-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 blur-[100px]" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-sky-400" />
              <span className="text-sky-400 font-bold uppercase tracking-widest text-sm">Educational Article</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">About Gainova Weight Gain Supplement</h2>
            
            <div className="space-y-8 text-slate-300 leading-relaxed">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">The Science of Healthy Weight Gain</h3>
                <p>
                  Gaining weight in a healthy manner requires more than just eating extra calories; it requires a strategic balance of macronutrients. Gainova is formulated to provide a high-density caloric surplus through complex carbohydrates and premium proteins, ensuring that the weight you gain is lean and sustainable.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-400" /> Nutritional Importance
                  </h4>
                  <p className="text-sm">
                    Our formula includes Oats and Almond powder for fiber and healthy fats, while Soy protein provides the essential amino acids needed for muscle repair and growth.
                  </p>
                </div>
                <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <Activity className="h-4 w-4 text-green-400" /> Lifestyle Integration
                  </h4>
                  <p className="text-sm">
                    For best results, we recommend combining Gainova with a consistent strength training routine and at least 7-8 hours of quality sleep to facilitate muscle synthesis.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-sm italic opacity-70">
                  *Gainova is an export-quality supplement manufactured under strict GMP standards to ensure safety and effectiveness for all users.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Reviews Section --- */}
        <section className="px-4 py-20">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Customer Feedback</h2>
              <p className="text-slate-500 mt-2">Real stories from real users across the globe</p>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200" />
                ))}
              </div>
              <p className="text-sm font-bold text-slate-900">792+ Verified Reviews</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {ALL_REVIEWS.slice(0, visibleReviews).map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  layout
                >
                  <Card className="h-full border-slate-100 bg-white hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 font-bold">
                            {review.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{review.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-bold text-yellow-700">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed italic flex-grow">
                        "{review.comment}"
                      </p>
                      <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                        <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider">
                          {review.lang === 'en' ? 'English' : review.lang === 'ms' ? 'Malay' : 'Bengali'}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                          <ThumbsUp className="h-3 w-3" /> {review.helpful}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {visibleReviews < ALL_REVIEWS.length && (
            <div className="mt-12 text-center">
              <Button 
                onClick={loadMore}
                variant="outline" 
                size="lg"
                className="rounded-full px-12 border-sky-200 text-sky-600 hover:bg-sky-50 font-bold"
              >
                Load More Reviews
              </Button>
            </div>
          )}
        </section>

        {/* --- FAQ --- */}
        <section className="px-4 py-20 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-2xl border px-6 border-slate-100">
                <AccordionTrigger className="font-bold hover:no-underline py-6">Is Gainova safe for long-term use?</AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6">
                  Yes, Gainova is made from 100% natural food-based ingredients. It contains no steroids or harmful chemicals, making it safe for daily consumption.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="bg-white rounded-2xl border px-6 border-slate-100">
                <AccordionTrigger className="font-bold hover:no-underline py-6">How fast can I see results?</AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6">
                  Most users report visible changes within 3-4 weeks of consistent use, provided they maintain a proper diet and lifestyle.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="bg-white rounded-2xl border px-6 border-slate-100">
                <AccordionTrigger className="font-bold hover:no-underline py-6">Can I take it with water instead of milk?</AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6">
                  Absolutely. While milk adds extra calories and protein, Gainova is designed to be effective even when mixed with plain water.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-white border-t py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 text-white">
                  <Leaf className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">Gainova</span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed">
                Your trusted partner in premium nutrition. We focus on delivering high-quality supplements that help you reach your health goals safely and effectively.
              </p>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-colors cursor-pointer">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-colors cursor-pointer">
                  <Globe className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Quick Links</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li className="hover:text-sky-600 cursor-pointer">Product Details</li>
                <li className="hover:text-sky-600 cursor-pointer">Certifications</li>
                <li className="hover:text-sky-600 cursor-pointer">Customer Reviews</li>
                <li className="hover:text-sky-600 cursor-pointer">Health Articles</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Support</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li className="hover:text-sky-600 cursor-pointer">Privacy Policy</li>
                <li className="hover:text-sky-600 cursor-pointer">Terms of Service</li>
                <li className="hover:text-sky-600 cursor-pointer">Contact Us</li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-12 opacity-50" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              © 2024 Gainova Malaysia. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <img src={images.malaysiaFlag} alt="Malaysia" className="h-4 w-auto rounded-sm opacity-50" referrerPolicy="no-referrer" />
              <img src={images.mafsLogo} alt="MAFS" className="h-6 w-auto grayscale opacity-50" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
