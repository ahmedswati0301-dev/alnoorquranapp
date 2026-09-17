export type DuaItem = {
  id: string;
  title: string;
  category: string;
  arabic: string;
  urduTranslation: string;
  reference: string;
  sourceType: "Hadith" | "Quran" | "Hisn al-Muslim" | "Other";
  sourceUrl: string;
  tags: string[];
  isFavorite?: boolean;
};

export const DUA_CATEGORIES = [
  "Subah ki Duain",
  "Shaam ki Duain",
  "Sone aur Jaagne ki Duain",
  "Khane Peene ki Duain",
  "Ghar mein Dakhil Hone ki Dua",
  "Ghar se Nikalne ki Dua",
  "Safar ki Dua",
  "Masjid ki Duain",
  "Namaz se Mutalliq Duain",
  "Hifazat ki Duain",
  "Pareshani aur Mushkil Waqt ki Duain",
  "Maghfirat ki Duain",
  "Qurani Duain",
  "Rozmarrah ki Duain",
  "Favorite Duain",
] as const;

export const DUA_FALLBACK_DATA: DuaItem[] = [
  {
    id: "subah-01",
    title: "Subah ki Dua",
    category: "Subah ki Duain",
    arabic: "اَللّٰهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوْتُ وَاِلَيْكَ النُّشُوْرُ",
    urduTranslation:
      "اے اللہ! ہم تیرے ہی نام سے صبح کرتے ہیں اور تیرے ہی نام سے شام کرتے ہیں، تیرے ہی نام سے زندہ ہوتے ہیں اور تیرے ہی نام سے مر جاتے ہیں اور ہماری واپسی تیرے ہی پاس ہے۔",
    reference: "Sahih Muslim / Hisn al-Muslim",
    sourceType: "Hadith",
    sourceUrl: "https://sunnah.com",
    tags: ["subah", "morning", "daily"],
  },
  {
    id: "shaam-01",
    title: "Shaam ki Dua",
    category: "Shaam ki Duain",
    arabic: "اَللّٰهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوْتُ وَاِلَيْكَ الْمَصِيْرُ",
    urduTranslation:
      "اے اللہ! ہم تیرے ہی نام سے شام کرتے ہیں، تیرے ہی نام سے صبح کرتے ہیں، تیرے ہی نام سے زندہ ہوتے ہیں اور تیرے ہی نام سے مر جاتے ہیں اور ہماری واپس آنے والی جگہ تیرے پاس ہے۔",
    reference: "Sahih Muslim / Hisn al-Muslim",
    sourceType: "Hadith",
    sourceUrl: "https://sunnah.com",
    tags: ["shaam", "evening", "daily"],
  },
  {
    id: "sleep-01",
    title: "Sone ki Dua",
    category: "Sone aur Jaagne ki Duain",
    arabic: "بِاسْمِكَ اَللّٰهُمَّ اَحْيَا وَاَمُوْتُ",
    urduTranslation:
      "اے اللہ! تیرے نام کے ساتھ میں زندہ ہوتا ہوں اور تیرے نام کے ساتھ میں مر جاتا ہوں۔",
    reference: "Sahih al-Bukhari / Muslim",
    sourceType: "Hadith",
    sourceUrl: "https://sunnah.com",
    tags: ["sleep", "night"],
  },
  {
    id: "wake-01",
    title: "Jaagne ki Dua",
    category: "Sone aur Jaagne ki Duain",
    arabic: "اَلْحَمْدُ لِلّٰهِ الَّذِيْ أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَاِلَيْهِ النُّشُوْرُ",
    urduTranslation:
      "تمام تعریفی اللہ کے لیے ہیں جس نے ہمیں موت کے بعد زندہ کیا اور اسی کے پاس لوٹ کر جانا ہے۔",
    reference: "Sahih al-Bukhari 6312",
    sourceType: "Hadith",
    sourceUrl: "https://sunnah.com",
    tags: ["wake", "morning"],
  },
  {
    id: "food-01",
    title: "Khane se Pehle Dua",
    category: "Khane Peene ki Duain",
    arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    urduTranslation:
      "اللہ کے نام سے اور اللہ کی برکت پر۔",
    reference: "Sunan Abi Dawud / Hisn al-Muslim",
    sourceType: "Hadith",
    sourceUrl: "https://sunnah.com",
    tags: ["food", "eat", "meal"],
  },
  {
    id: "food-02",
    title: "Khane ke Baad Dua",
    category: "Khane Peene ki Duain",
    arabic: "اَلْحَمْدُ لِلّٰهِ الَّذِيْ اَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِيْنَ",
    urduTranslation:
      "اللہ کا شکر ہے جس نے ہمیں کھلایا، پلایا اور ہمیں مسلمان بنایا۔",
    reference: "Sahih Muslim / Hisn al-Muslim",
    sourceType: "Hadith",
    sourceUrl: "https://sunnah.com",
    tags: ["food", "meal", "thanksgiving"],
  },
  {
    id: "home-in-01",
    title: "Ghar mein Dakhil Hone ki Dua",
    category: "Ghar mein Dakhil Hone ki Dua",
    arabic: "اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ خَيْرَ الْمَوْلَجِ وَخَيْرَ الْمَخْرَجِ بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا",
    urduTranslation:
      "اے اللہ! میں تجھ سے داخل ہونے کی بھلائی اور باہر نکلنے کی بھلائی مانگتا ہوں، اللہ کے نام سے ہم داخل ہوئے اور اللہ کے نام سے باہر نکلے۔",
    reference: "Sahih Muslim / Hisn al-Muslim",
    sourceType: "Hadith",
    sourceUrl: "https://sunnah.com",
    tags: ["home", "entry"],
  },
  {
    id: "home-out-01",
    title: "Ghar se Nikalne ki Dua",
    category: "Ghar se Nikalne ki Dua",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ",
    urduTranslation:
      "اللہ کے نام سے، میں نے اللہ پر بھروسہ کیا، اللہ کے سوا کوئی طاقت اور توانائی نہیں۔",
    reference: "Sunan Abi Dawud / Hisn al-Muslim",
    sourceType: "Hadith",
    sourceUrl: "https://sunnah.com",
    tags: ["travel", "leaving"],
  },
  {
    id: "travel-01",
    title: "Safar ki Dua",
    category: "Safar ki Dua",
    arabic: "سُبْحَانَ الَّذِيْ سَخَّرَ لَنَا هٰذَا وَمَا كُنَّا لَهُ مُقْرِنِيْنَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُوْنَ",
    urduTranslation:
      "پاک ہے وہ اللہ جو نے اسے ہمارے لیے مسخر کیا، حالانکہ ہم اسے اپنے اختیار میں نہیں لا سکتے تھے، اور ہم یقیناً اپنے رب کی طرف لوٹ کر جانے والے ہیں۔",
    reference: "Sahih Muslim 1349",
    sourceType: "Hadith",
    sourceUrl: "https://sunnah.com",
    tags: ["travel", "journey"],
  },
  {
    id: "masjid-01",
    title: "Masjid mein Dakhil Hone ki Dua",
    category: "Masjid ki Duain",
    arabic: "اَللّٰهُمَّ افْتَحْ لِيْ أَبْوَابَ رَحْمَتِكَ",
    urduTranslation:
      "اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے۔",
    reference: "Sahih Muslim / Hisn al-Muslim",
    sourceType: "Hadith",
    sourceUrl: "https://sunnah.com",
    tags: ["masjid", "prayer", "entry"],
  },
  {
    id: "masjid-02",
    title: "Masjid se Nikalne ki Dua",
    category: "Masjid ki Duain",
    arabic: "اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ مِنْ فَضْلِكَ",
    urduTranslation:
      "اے اللہ! میں تیری مہربانی اور فضیلت مانگتا ہوں۔",
    reference: "Sahih Muslim / Hisn al-Muslim",
    sourceType: "Hadith",
    sourceUrl: "https://sunnah.com",
    tags: ["masjid", "exit"],
  },
  {
    id: "namaz-01",
    title: "Namaz ke Liye Dua",
    category: "Namaz se Mutalliq Duain",
    arabic: "اَللّٰهُمَّ رَبَّنَا آتِنَا فِيْ الدُّنْيَا حَسَنَةً وَفِيْ الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    urduTranslation:
      "اے اللہ! ہمارے لیے دنیا میں بھلائی اور آخرت میں بھلائی عطا فرما، اور ہمیں دوزخ کے عذاب سے بچا۔",
    reference: "Quran 2:201 / Sahih al-Bukhari",
    sourceType: "Quran",
    sourceUrl: "https://quran.com",
    tags: ["namaz", "prayer", "daily"],
  },
  {
    id: "protection-01",
    title: "Hifazat ki Dua",
    category: "Hifazat ki Duain",
    arabic: "اَعُوْذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ",
    urduTranslation:
      "میں اللہ کی پناہ چاہتا ہوں شرمناک شیطان سے۔",
    reference: "Quran 16:98 / Sahih Muslim",
    sourceType: "Quran",
    sourceUrl: "https://quran.com",
    tags: ["protection", "safety"],
  },
  {
    id: "difficulty-01",
    title: "Pareshani ke Waqt ki Dua",
    category: "Pareshani aur Mushkil Waqt ki Duain",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ الْحَلِيمُ الْكَرِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ",
    urduTranslation:
      "اللہ کے سوا کوئی عبادت کے لائق نہیں، وہ بہت نرم خو، بہت عزت والا، وہ عظیم عرش کا رب ہے۔",
    reference: "Sahih al-Bukhari / Muslim",
    sourceType: "Hadith",
    sourceUrl: "https://sunnah.com",
    tags: ["difficulty", "stress", "hardship"],
  },
  {
    id: "forgiveness-01",
    title: "Maghfirat ki Dua",
    category: "Maghfirat ki Duain",
    arabic: "اَللّٰهُمَّ اغْفِرْ لَنَا وَارْحَمْنَا وَتُبْ عَلَيْنَا إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
    urduTranslation:
      "اے اللہ! ہمیں بخش دے، ہم پر رحم فرما، ہم سے توبہ قبول فرما، بے شک تو بہت توبہ قبول کرنے والا اور مہربان ہے۔",
    reference: "Sahih Muslim / Hisn al-Muslim",
    sourceType: "Hadith",
    sourceUrl: "https://sunnah.com",
    tags: ["forgiveness", "repentance"],
  },
  {
    id: "quran-01",
    title: "Quran ki Dua",
    category: "Qurani Duain",
    arabic: "رَبَّنَا لَا تُزِغْ قُلُوْبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
    urduTranslation:
      "اے ہمارے رب! ہمیں ہدایت دے کر ہمارے دلوں کو گمراہی کی طرف نہ پلٹانا۔",
    reference: "Quran 3:8",
    sourceType: "Quran",
    sourceUrl: "https://quran.com",
    tags: ["quran", "guidance"],
  },
  {
    id: "daily-01",
    title: "Rozmarrah Dua",
    category: "Rozmarrah ki Duain",
    arabic: "اَللّٰهُمَّ اِنِّيْ اَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
    urduTranslation:
      "اے اللہ! میں تیری طرف سے ہدایت، تقویٰ، پاکیزگی اور بے نیازی مانگتا ہوں۔",
    reference: "Sahih Muslim / Hisn al-Muslim",
    sourceType: "Hadith",
    sourceUrl: "https://sunnah.com",
    tags: ["daily", "routine"],
  },
];
