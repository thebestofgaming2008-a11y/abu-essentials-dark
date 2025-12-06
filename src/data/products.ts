export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  images: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  badge?: string;
  sizes?: string[];
  colors?: string[];
}

export const products: Product[] = [
  // BOOKS
  {
    id: "1",
    name: "Usool as-Sunnah (Arabic)",
    description: "Imam Ahmad's foundational text on the principles of the Sunnah in Arabic.",
    price: 29.99,
    category: "books",
    images: [
      "/images/books/Usuul as sunnah by imam ahmad in arabic/photo_50_2025-11-30_15-32-54.jpg",
      "/images/books/Usuul as sunnah by imam ahmad in arabic/photo_59_2025-11-30_15-31-15.jpg"
    ],
    inStock: true,
    rating: 4.8,
    reviews: 42
  },
  {
    id: "2",
    name: "Foundations of the Sunnah (English)",
    description: "Imam Ahmad's essential reading for understanding the foundations of Islamic belief in English.",
    price: 24.99,
    category: "books",
    images: [
      "/images/books/Imam Ahmed foundations of the sunnah english/photo_1_2025-11-30_15-32-54.jpg",
      "/images/books/Imam Ahmed foundations of the sunnah english/photo_65_2025-11-30_15-32-54.jpg",
      "/images/books/Imam Ahmed foundations of the sunnah english/photo_8_2025-11-30_15-31-15.jpg"
    ],
    inStock: true,
    rating: 4.9,
    reviews: 67,
    badge: "Restocked"
  },
  {
    id: "3",
    name: "Kitab at-Tawhid",
    description: "Book of Monotheism. The most important subject and the foundation of Islamic belief.",
    price: 34.99,
    category: "books",
    images: [
      "/images/books/kitab at-tawheed/photo_22_2025-11-30_15-31-15.jpg",
      "/images/books/kitab at-tawheed/photo_48_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 5.0,
    reviews: 156
  },
  {
    id: "4",
    name: "Sharh al-Aqeedah al-Wasitiyyah",
    description: "Detailed explanation of the creed of Ahl as-Sunnah by Sheikh al-Uthaymeen.",
    price: 39.99,
    category: "books",
    images: [
      "/images/books/sharh-al-aqeedah-al-wasitiyyah english/photo_3_2025-11-30_15-31-15.jpg",
      "/images/books/sharh-al-aqeedah-al-wasitiyyah english/photo_51_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.7,
    reviews: 34
  },
  {
    id: "5",
    name: "The Integrity & Uprightness of the Companions (Urdu)",
    description: "Affirming the justice of the Companions of the Prophet (PBUH) in Urdu.",
    price: 19.99,
    category: "books",
    images: ["/images/books/The Integrity  Uprightness of the Companions in urdu.jpg"],
    inStock: true,
    rating: 4.6,
    reviews: 28
  },
  {
    id: "6",
    name: "Manhaj as-Salaf",
    description: "Guide to following the way of the Salaf as-Salih - the righteous predecessors.",
    price: 16.99,
    category: "books",
    images: [
      "/images/books/manhaj as-salaf/photo_12_2025-11-30_15-32-54.jpg",
      "/images/books/manhaj as-salaf/photo_30_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.8,
    reviews: 51
  },
  {
    id: "7",
    name: "Sifat Salat an-Nabi (Urdu)",
    description: "Description of the Prophet's Prayer. Detailed guide from beginning to end.",
    price: 27.99,
    category: "books",
    images: [
      "/images/books/Sifto-Sala-tin-nabi urdu romanized i think/photo_57_2025-11-30_15-31-15.jpg",
      "/images/books/Sifto-Sala-tin-nabi urdu romanized i think/photo_58_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.9,
    reviews: 89,
    badge: "Popular"
  },
  {
    id: "8",
    name: "Tafsir As-Sa'di (10 Volumes)",
    description: "Beginner-friendly Quran commentary. Clear and accessible explanations.",
    price: 149.99,
    category: "books",
    images: [
      "/images/books/tafsir Sa'di/tafsirSadi.jpg",
      "/images/books/tafsir Sa'di/tafsirsadi2.jpg",
      "/images/books/tafsir Sa'di/tafsirSadi3.jpg",
      "/images/books/tafsir Sa'di/TafsirSadi4.jpg"
    ],
    inStock: true,
    rating: 5.0,
    reviews: 234,
    badge: "Bestseller"
  },
  {
    id: "9",
    name: "Tafseer Ahsan ul Bayan (Urdu)",
    description: "Comprehensive Urdu Quran commentary. Premium quality edition.",
    price: 129.99,
    salePrice: 99.99,
    category: "books",
    images: [
      "/images/books/tafsir ahanul bayan urdu/photo_29_2025-11-30_15-31-15.jpg",
      "/images/books/tafsir ahanul bayan urdu/photo_44_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.9,
    reviews: 67,
    badge: "Sale"
  },
  {
    id: "10",
    name: "Tafsir Ibn Kathir (10 Volumes)",
    description: "The most famous comprehensive Quran commentary in English.",
    price: 179.99,
    category: "books",
    images: [
      "/images/books/Tafsir ibn kathir/photo_72_2025-11-30_15-32-54.jpg",
      "/images/books/Tafsir ibn kathir/photo_73_2025-11-30_15-32-54.jpg",
      "/images/books/Tafsir ibn kathir/photo_74_2025-11-30_15-32-54.jpg",
      "/images/books/Tafsir ibn kathir/photo_75_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 5.0,
    reviews: 312
  },
  {
    id: "11",
    name: "Sahih al-Bukhari (9 Volumes)",
    description: "The most authentic hadith collection after the Quran. Top quality print.",
    price: 199.99,
    category: "books",
    images: [
      "/images/books/Sahih Bukhari english/photo_41_2025-11-30_15-31-15.jpg",
      "/images/books/Sahih Bukhari english/photo_68_2025-11-30_15-32-54.jpg",
      "/images/books/Sahih Bukhari english/photo_71_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 5.0,
    reviews: 445,
    badge: "Premium"
  },
  {
    id: "12",
    name: "Summarised Sahih al-Bukhari",
    description: "Condensed edition perfect for students beginning their hadith studies.",
    price: 49.99,
    category: "books",
    images: ["/images/books/summarized sahih al bukhari.jpg"],
    inStock: true,
    rating: 4.8,
    reviews: 156
  },
  {
    id: "13",
    name: "Sahih Muslim (7 Volumes)",
    description: "The second most authentic hadith collection. Premium English translation.",
    price: 169.99,
    category: "books",
    images: [
      "/images/books/Sahih muslim english/photo_37_2025-11-30_15-32-54.jpg",
      "/images/books/Sahih muslim english/photo_40_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 5.0,
    reviews: 389
  },
  {
    id: "14",
    name: "Summarised Sahih Muslim",
    description: "Easy-to-read condensed version. Arabic-English edition.",
    price: 44.99,
    category: "books",
    images: ["/images/books/summarized sahih muslim arabic-english.jpg"],
    inStock: true,
    rating: 4.7,
    reviews: 123
  },
  {
    id: "15",
    name: "Riyad as-Saliheen (Urdu - 2 Volumes)",
    description: "Collection of hadith on virtues and good manners in Urdu.",
    price: 39.99,
    category: "books",
    images: [
      "/images/books/riyad us saliheen in urdu/photo_18_2025-11-30_15-31-15.jpg",
      "/images/books/riyad us saliheen in urdu/photo_46_2025-11-30_15-31-15.jpg"
    ],
    inStock: true,
    rating: 4.9,
    reviews: 201
  },
  {
    id: "16",
    name: "Riyad as-Saliheen (English)",
    description: "Gardens of the Righteous. Collection of hadith in English.",
    price: 39.99,
    category: "books",
    images: [
      "/images/books/Ryad-us-Saliheen english/photo_58_2025-11-30_15-31-15.jpg",
      "/images/books/Ryad-us-Saliheen english/photo_79_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.9,
    reviews: 178
  },
  {
    id: "17",
    name: "When the Moon Split",
    description: "Complete and authentic biography of Prophet Muhammad (PBUH).",
    price: 34.99,
    category: "books",
    images: [
      "/images/books/When the moon split/photo_20_2025-11-30_15-32-54.jpg",
      "/images/books/When the moon split/photo_55_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.9,
    reviews: 178,
    badge: "Bestseller"
  },
  {
    id: "18",
    name: "The Diseases of the Hearts and Their Cures",
    description: "By Ibn Taymiyyah. Essential work on purifying the heart.",
    price: 27.99,
    category: "books",
    images: [
      "/images/books/the diseases of the hearts and their cures/photo_5_2025-11-30_15-31-15.jpg",
      "/images/books/the diseases of the hearts and their cures/photo_8_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.8,
    reviews: 145
  },
  {
    id: "19",
    name: "Sincere Counsel to the Seekers of Sacred Knowledge",
    description: "Advice for students of knowledge on their journey.",
    price: 24.99,
    category: "books",
    images: [
      "/images/books/Sincere counsel to the seekers of sacred knowledge/photo_10_2025-11-30_15-31-15.jpg",
      "/images/books/Sincere counsel to the seekers of sacred knowledge/photo_14_2025-11-30_15-32-54.jpg",
      "/images/books/Sincere counsel to the seekers of sacred knowledge/photo_34_2025-11-30_15-31-15.jpg"
    ],
    inStock: true,
    rating: 4.7,
    reviews: 92
  },
  {
    id: "20",
    name: "Disciplining the Soul",
    description: "By Ibn al-Jawzi. Guide to spiritual purification and self-development.",
    price: 24.99,
    category: "books",
    images: [
      "/images/books/disciplining the soul/photo_11_2025-11-30_15-31-15.jpg",
      "/images/books/disciplining the soul/photo_80_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.8,
    reviews: 87
  },
  {
    id: "21",
    name: "The Disease and the Cure",
    description: "Ibn Qayyim's masterpiece on spiritual diseases and their remedies.",
    price: 19.99,
    category: "books",
    images: [
      "/images/books/the disease and the cure/photo_47_2025-11-30_15-32-54.jpg",
      "/images/books/the disease and the cure/photo_9_2025-11-30_15-31-15.jpg"
    ],
    inStock: true,
    rating: 4.9,
    reviews: 134
  },
  {
    id: "22",
    name: "Mas'ala Takfeer (Urdu)",
    description: "Theological discussion on the conditions and dangers of declaring someone a disbeliever.",
    price: 39.99,
    category: "books",
    images: [
      "/images/books/Mas'ala Takfeer urdu/photo_13_2025-11-30_15-32-54.jpg",
      "/images/books/Mas'ala Takfeer urdu/photo_25_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.6,
    reviews: 45
  },
  {
    id: "23",
    name: "They Are The Enemy, So Beware of Them",
    description: "Scholarly response to deviant beliefs and practices.",
    price: 15.99,
    category: "books",
    images: ["/images/books/They Are The Enemy so beware of them.jpg"],
    inStock: true,
    rating: 4.5,
    reviews: 67
  },
  {
    id: "24",
    name: "Great Women of Islam",
    description: "Inspiring biographies of righteous Muslim women from Islamic history.",
    price: 29.99,
    category: "books",
    images: ["/images/books/Great women of al Islam.jpg"],
    inStock: true,
    rating: 4.8,
    reviews: 189
  },
  {
    id: "25",
    name: "Commentary on Kitab at-Tawhid (Ibn al-Uthaymeen)",
    description: "2 volumes detailed explanation of the Book of Monotheism.",
    price: 69.99,
    category: "books",
    images: [
      "/images/books/Commentary on kitab at tawhid by ibn al uthaymeen/photo_15_2025-11-30_15-32-54.jpg",
      "/images/books/Commentary on kitab at tawhid by ibn al uthaymeen/photo_6_2025-11-30_15-31-15.jpg"
    ],
    inStock: true,
    rating: 5.0,
    reviews: 223
  },
  {
    id: "26",
    name: "Explanation of Kitab at-Tawhid (As-Sa'di)",
    description: "Imam As-Sa'di's explanation of the Book of Monotheism.",
    price: 49.99,
    category: "books",
    images: [
      "/images/books/explination of kitab at tawhid by imam As Sa'di/photo_26_2025-11-30_15-32-54.jpg",
      "/images/books/explination of kitab at tawhid by imam As Sa'di/photo_56_2025-11-30_15-31-15.jpg"
    ],
    inStock: true,
    rating: 4.9,
    reviews: 145
  },
  {
    id: "27",
    name: "Commentary on Three Fundamental Principles",
    description: "Sheikh al-Uthaymeen's explanation of the three foundations of Islam.",
    price: 34.99,
    category: "books",
    images: [
      "/images/books/commentary on the three fundamental principles by ibn al uthaymeen/photo_24_2025-11-30_15-32-54.jpg",
      "/images/books/commentary on the three fundamental principles by ibn al uthaymeen/photo_43_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.8,
    reviews: 167
  },
  {
    id: "28",
    name: "Guide to Sound Creed",
    description: "Essential guide to correct Islamic belief and understanding.",
    price: 29.99,
    category: "books",
    images: [
      "/images/books/Guide to sound creed/photo_12_2025-11-30_15-31-15.jpg",
      "/images/books/Guide to sound creed/photo_67_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.7,
    reviews: 98
  },
  {
    id: "29",
    name: "Al-Haiyah with Explanation by Sheikh al-Fawzan",
    description: "Famous poem on Aqeedah explained by Sheikh Saleh al-Fawzan.",
    price: 24.99,
    category: "books",
    images: [
      "/images/books/Al haiyah with explination from sheikh saleh al fawzan/photo_13_2025-11-30_15-31-15.jpg",
      "/images/books/Al haiyah with explination from sheikh saleh al fawzan/photo_6_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.8,
    reviews: 76
  },
  {
    id: "30",
    name: "Explanation of Important Lessons for Every Muslim",
    description: "Detailed explanation of Sheikh Ibn Baz's essential book.",
    price: 27.99,
    category: "books",
    images: [
      "/images/books/explanation of important lessons for every muslim/photo_10_2025-11-30_15-32-54.jpg",
      "/images/books/explanation of important lessons for every muslim/photo_54_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.8,
    reviews: 134
  },
  {
    id: "31",
    name: "Important Lessons for Muslim Women",
    description: "Essential guidance for Muslim women on matters of faith and practice.",
    price: 22.99,
    category: "books",
    images: [
      "/images/books/Important lessons for muslim women/Important lessons for muslim women.jpg",
      "/images/books/Important lessons for muslim women/photo_24_2025-11-30_15-31-15.jpg"
    ],
    inStock: true,
    rating: 4.9,
    reviews: 189,
    badge: "Popular"
  },
  {
    id: "32",
    name: "My Advice to the Women",
    description: "Scholarly advice for Muslim women on various aspects of life.",
    price: 19.99,
    category: "books",
    images: [
      "/images/books/My advice to the women/photo_65_2025-11-30_15-31-15.jpg",
      "/images/books/My advice to the women/photo_9_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.7,
    reviews: 156
  },
  {
    id: "33",
    name: "Supporting the Rights of the Believing Women",
    description: "Important book on women's rights in Islam.",
    price: 24.99,
    category: "books",
    images: ["/images/books/Supporting the rights of the believing women.jpg"],
    inStock: true,
    rating: 4.8,
    reviews: 112
  },
  {
    id: "34",
    name: "The Marriage Guide According to the Sunnah",
    description: "Comprehensive guide to marriage following the Prophet's way.",
    price: 29.99,
    category: "books",
    images: [
      "/images/books/The marriage guide according to the sunnah of the prophet/The marriage guide according to the sunnah of the prophet.jpg",
      "/images/books/The marriage guide according to the sunnah of the prophet/photo_1_2025-11-30_15-31-15.jpg"
    ],
    inStock: true,
    rating: 4.9,
    reviews: 234
  },
  {
    id: "35",
    name: "Rights of the Spouses",
    description: "Book on marital rights and responsibilities in Islam.",
    price: 24.99,
    category: "books",
    images: [
      "/images/books/Rights of the spouses/photo_4_2025-11-30_15-31-15.jpg",
      "/images/books/Rights of the spouses/photo_52_2025-11-30_15-32-54.jpg",
      "/images/books/Rights of the spouses/photo_78_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.7,
    reviews: 145
  },
  {
    id: "36",
    name: "Guidelines for Raising Children",
    description: "Islamic guidance on parenting and child upbringing.",
    price: 22.99,
    category: "books",
    images: ["/images/books/Guidelines for raising children.jpg"],
    inStock: true,
    rating: 4.8,
    reviews: 178
  },
  {
    id: "37",
    name: "The Dress Code for Muslim Women",
    description: "Comprehensive guide on hijab based on Quran and Sunnah.",
    price: 19.99,
    category: "books",
    images: [
      "/images/books/the dress code for the muslim women in the quran and sunnah/photo_60_2025-11-30_15-32-54.jpg",
      "/images/books/the dress code for the muslim women in the quran and sunnah/photo_76_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.6,
    reviews: 98
  },
  {
    id: "38",
    name: "Khawateen ke Masail (Urdu)",
    description: "Women's issues and questions answered in Urdu.",
    price: 24.99,
    category: "books",
    images: ["/images/books/Khawateen ke Masail urdu.jpg"],
    inStock: true,
    rating: 4.7,
    reviews: 87
  },
  {
    id: "39",
    name: "Life After Death (Majmoo Fatawa)",
    description: "Compilation on afterlife matters from Majmoo Fatawa.",
    price: 34.99,
    category: "books",
    images: [
      "/images/books/Life after death majmoo fatawa/photo_44_2025-11-30_15-31-15.jpg",
      "/images/books/Life after death majmoo fatawa/photo_59_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.9,
    reviews: 167
  },
  {
    id: "40",
    name: "Driving the Souls to the Abodes of Happiness",
    description: "Ibn Qayyim's guide to achieving happiness in this life and the hereafter.",
    price: 29.99,
    category: "books",
    images: [
      "/images/books/Driving the souls to the abodes of happiness/photo_15_2025-11-30_15-31-15.jpg",
      "/images/books/Driving the souls to the abodes of happiness/photo_62_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.8,
    reviews: 134
  },
  {
    id: "41",
    name: "Captured Thoughts",
    description: "Collection of beneficial thoughts and reflections.",
    price: 19.99,
    category: "books",
    images: [
      "/images/books/Captured Thougts/photo_26_2025-11-30_15-31-15.jpg",
      "/images/books/Captured Thougts/photo_62_2025-11-30_15-31-15.jpg"
    ],
    inStock: true,
    rating: 4.6,
    reviews: 78
  },
  {
    id: "42",
    name: "Stories of the Prophets (Arabic)",
    description: "Ibn Kathir's famous stories of the prophets in Arabic.",
    price: 39.99,
    category: "books",
    images: [
      "/images/books/imam ibn kathir stories of the prophets in arabic/photo_50_2025-11-30_15-31-15.jpg",
      "/images/books/imam ibn kathir stories of the prophets in arabic/photo_77_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.9,
    reviews: 198
  },
  {
    id: "43",
    name: "Tafsir Ibn Kathir (Urdu)",
    description: "Complete Tafsir Ibn Kathir in Urdu language.",
    price: 149.99,
    category: "books",
    images: ["/images/books/tafsir ibn kathir urdu.jpg"],
    inStock: true,
    rating: 5.0,
    reviews: 234
  },
  {
    id: "44",
    name: "Tafseer Ahsan-ul-Kalam (Urdu)",
    description: "Beautiful Quran commentary in Urdu.",
    price: 89.99,
    category: "books",
    images: [
      "/images/books/Tafseer Ahsan-ul-Kalam in urdu/photo_17_2025-11-30_15-31-15.jpg",
      "/images/books/Tafseer Ahsan-ul-Kalam in urdu/photo_61_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.8,
    reviews: 156
  },
  {
    id: "45",
    name: "English Quran with Transliteration",
    description: "Arabic text with romanized transliteration and English meanings.",
    price: 34.99,
    category: "books",
    images: [
      "/images/books/translated english quran with romanized transliteration and arabic text with the meanings in english/photo_23_2025-11-30_15-31-15.jpg",
      "/images/books/translated english quran with romanized transliteration and arabic text with the meanings in english/photo_34_2025-11-30_15-32-54.jpg"
    ],
    inStock: true,
    rating: 4.9,
    reviews: 312,
    badge: "Bestseller"
  },
  {
    id: "46",
    name: "Al-Qa'idatu an-Nuraniyyah",
    description: "Famous method for learning Quran recitation.",
    price: 14.99,
    category: "books",
    images: ["/images/books/Al Qa'aidatu an-Nuraniyyah.jpg"],
    inStock: true,
    rating: 4.9,
    reviews: 456,
    badge: "Popular"
  },
  {
    id: "47",
    name: "Al-Adab al-Mufrad",
    description: "Imam Bukhari's collection on Islamic manners and etiquette.",
    price: 29.99,
    category: "books",
    images: ["/images/books/al adab al mufrad.jpg"],
    inStock: true,
    rating: 4.8,
    reviews: 178
  },
  {
    id: "48",
    name: "The Book of Tawheed",
    description: "Fundamental text on Islamic monotheism.",
    price: 24.99,
    category: "books",
    images: ["/images/books/the book of tawheed.jpg"],
    inStock: true,
    rating: 4.9,
    reviews: 234
  },
  {
    id: "49",
    name: "Book of Faith",
    description: "Comprehensive book on matters of faith and belief.",
    price: 22.99,
    category: "books",
    images: ["/images/books/book of faith.jpg"],
    inStock: true,
    rating: 4.7,
    reviews: 145
  },
  {
    id: "50",
    name: "The Concise Collection on Creed and Tawheed",
    description: "Concise compilation on Islamic creed and monotheism.",
    price: 19.99,
    category: "books",
    images: ["/images/books/the concise collection on creed and tawheed.jpg"],
    inStock: true,
    rating: 4.8,
    reviews: 112
  },
  {
    id: "51",
    name: "The Book of Major Sins",
    description: "Important book listing and explaining major sins in Islam.",
    price: 24.99,
    category: "books",
    images: ["/images/books/the book of major sins.jpg"],
    inStock: true,
    rating: 4.6,
    reviews: 98
  },
  {
    id: "52",
    name: "The Devil's Deceptions",
    description: "Ibn al-Jawzi's famous work on Satan's tricks and how to avoid them.",
    price: 27.99,
    category: "books",
    images: ["/images/books/the devils deceptions.jpg"],
    inStock: true,
    rating: 4.8,
    reviews: 167
  },
  {
    id: "53",
    name: "The Evils of Music",
    description: "Scholarly discussion on music in Islamic perspective.",
    price: 14.99,
    category: "books",
    images: ["/images/books/the evils of music.jpg"],
    inStock: true,
    rating: 4.5,
    reviews: 78
  },
  {
    id: "54",
    name: "The Islamic Awakening",
    description: "Guide to the Islamic revival and its proper methodology.",
    price: 19.99,
    category: "books",
    images: ["/images/books/the islamic awakening.jpg"],
    inStock: true,
    rating: 4.7,
    reviews: 134
  },
  {
    id: "55",
    name: "The Journey of the Strangers",
    description: "On being a stranger in a time far from the Sunnah.",
    price: 22.99,
    category: "books",
    images: ["/images/books/the journey of the strangers.jpg"],
    inStock: true,
    rating: 4.8,
    reviews: 145
  },
  {
    id: "56",
    name: "The Principle of Love and Desire",
    description: "Ibn Taymiyyah's work on the concept of love in Islam.",
    price: 24.99,
    category: "books",
    images: ["/images/books/the principle of love and desire.jpg"],
    inStock: true,
    rating: 4.7,
    reviews: 112
  },
  {
    id: "57",
    name: "The Sealed Nectar",
    description: "Award-winning biography of Prophet Muhammad (PBUH).",
    price: 29.99,
    category: "books",
    images: ["/images/books/the sealed nectar.jpg"],
    inStock: true,
    rating: 5.0,
    reviews: 567,
    badge: "Bestseller"
  },
  {
    id: "58",
    name: "The Sublime Beauty of the Prophet",
    description: "Description of the Prophet's appearance and character.",
    price: 19.99,
    category: "books",
    images: ["/images/books/the sublime beauty of the prophet.jpg"],
    inStock: true,
    rating: 4.8,
    reviews: 189
  },
  {
    id: "59",
    name: "The Honorable Wives of the Prophet",
    description: "Biographies of the Mothers of the Believers.",
    price: 27.99,
    category: "books",
    images: ["/images/books/the honorable wives of the prophet.jpg"],
    inStock: true,
    rating: 4.9,
    reviews: 234
  },
  {
    id: "60",
    name: "Questions Relating to the Jinn",
    description: "Scholarly answers to questions about the jinn.",
    price: 14.99,
    category: "books",
    images: ["/images/books/questions relating to the jinn.jpg"],
    inStock: true,
    rating: 4.6,
    reviews: 98
  },
  {
    id: "61",
    name: "Rizq: Lawful Earnings",
    description: "Book on halal earnings and sustenance in Islam.",
    price: 19.99,
    category: "books",
    images: ["/images/books/rizq lawful earnings.jpg"],
    inStock: true,
    rating: 4.7,
    reviews: 87
  },
  {
    id: "62",
    name: "More Than 1000 Sunan",
    description: "Daily Sunnah practices of the Prophet collected.",
    price: 17.99,
    category: "books",
    images: ["/images/books/more than 1000 sunan.jpg"],
    inStock: true,
    rating: 4.9,
    reviews: 345,
    badge: "Popular"
  },
  {
    id: "63",
    name: "Golden Supplications for Children",
    description: "Beautiful collection of duas for children to learn.",
    price: 12.99,
    category: "books",
    images: ["/images/books/golden supplications for children.jpg"],
    inStock: true,
    rating: 4.8,
    reviews: 234
  },
  {
    id: "64",
    name: "Historical Marvels in the Quran",
    description: "Exploring the historical miracles mentioned in the Quran.",
    price: 24.99,
    category: "books",
    images: ["/images/books/historical marvels in the quran.jpg"],
    inStock: true,
    rating: 4.7,
    reviews: 123
  },
  {
    id: "65",
    name: "Explanation of Beautiful Names of Allah",
    description: "Detailed explanation of Allah's 99 Names.",
    price: 29.99,
    category: "books",
    images: ["/images/books/Explination to the beautiful and perfect names of Allah.jpg"],
    inStock: true,
    rating: 4.9,
    reviews: 267
  },
  {
    id: "66",
    name: "The Answer to the Jahmiyyah",
    description: "Imam Ahmad's refutation of the Jahmiyyah sect.",
    price: 22.99,
    category: "books",
    images: ["/images/books/the answer to the zanadiqah and the jahmiyyah... By imam ahmed in english.jpg"],
    inStock: true,
    rating: 4.6,
    reviews: 67
  },
  {
    id: "67",
    name: "Attainment of the Objectives (Urdu)",
    description: "Book on rulings with their evidences in Urdu.",
    price: 34.99,
    category: "books",
    images: ["/images/books/Attainment of the Objectives (From the Evidences of the Rulings) in urdu.jpg"],
    inStock: true,
    rating: 4.7,
    reviews: 89
  },
  {
    id: "68",
    name: "Madinah Arabic Course Series",
    description: "Famous Arabic learning course from Madinah University.",
    price: 49.99,
    category: "books",
    images: ["/images/books/Madinah universaty arabic course series.jpg"],
    inStock: true,
    rating: 4.9,
    reviews: 456,
    badge: "Bestseller"
  }
];

export const categories = [
  { id: "all", name: "All Products", icon: "grid" },
  { id: "books", name: "Islamic Books", icon: "book" },
  { id: "clothing", name: "Clothing", icon: "shirt" },
  { id: "luxury", name: "Luxury Items", icon: "gem" }
];
