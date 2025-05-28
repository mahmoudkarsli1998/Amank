
export interface CarMake {
  name: string;
  value: string;
}

export interface CarModelsCollection {
  [makeValue: string]: {
    models: string[];
  };
}

export const CAR_MAKES: CarMake[] = [
  { name: "مرسيدس بنز", value: "mercedes" },
  { name: "بي إم دبليو", value: "bmw" },
  { name: "أودي", value: "audi" },
  { name: "تويوتا", value: "toyota" },
  { name: "هوندا", value: "honda" },
  { name: "نيسان", value: "nissan" },
  { name: "هيونداي", value: "hyundai" },
  { name: "كيا", value: "kia" },
  { name: "فولكس فاجن", value: "volkswagen" },
  { name: "شيفروليه", value: "chevrolet" },
  { name: "فورد", value: "ford" },
  { name: "مازدا", value: "mazda" },
  { name: "سوزوكي", value: "suzuki" },
  { name: "ميتسوبيشي", value: "mitsubishi" },
  { name: "لكزس", value: "lexus" },
  { name: "بيجو", value: "peugeot" },
  { name: "رينو", value: "renault" },
  { name: "سكودا", value: "skoda" },
  { name: "سيات", value: "seat" },
  { name: "فيات", value: "fiat" },
  { name: "جيلي", value: "geely" },
  { name: "بي واي دي", value: "byd" },
  { name: "شيري", value: "chery" },
  { name: "إم جي", value: "mg" },
  { name: "جاك", value: "jac" },
  { name: "بروتون", value: "proton" },
  { name: "لادا", value: "lada" },
  { name: "سوبارو", value: "subaru" },
  { name: "جاكوار", value: "jaguar" },
  { name: "لاند روفر", value: "land_rover" },
  { name: "بورش", value: "porsche" },
  { name: "فولفو", value: "volvo" },
  { name: "أخرى", value: "other" }
];

export const CAR_MODELS_DATA: CarModelsCollection = {
  "mercedes": { "models": ["الفئة A", "الفئة B", "الفئة C", "الفئة E", "الفئة S", "GLA", "GLC", "GLE", "GLS", "CLA", "CLS", "AMG GT", "أخرى"] },
  "bmw": { "models": ["الفئة 1", "الفئة 2", "الفئة 3", "الفئة 4", "الفئة 5", "الفئة 6", "الفئة 7", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "i3", "i8", "أخرى"] },
  "audi": { "models": ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "TT", "R8", "أخرى"] },
  "toyota": { "models": ["كورولا", "كامري", "يارس", "راف 4", "لاند كروزر", "فورتشنر", "برادو", "هايلاندر", "أفالون", "سيكويا", "هايلوكس", "أخرى"] },
  "honda": { "models": ["سيفيك", "أكورد", "سيتي", "CR-V", "HR-V", "بايلوت", "جاز", "أخرى"] },
  "nissan": { "models": ["صني", "سنترا", "التيما", "ماكسيما", "قشقاي", "باثفايندر", "إكس-تريل", "باترول", "أخرى"] },
  "hyundai": { "models": ["أكسنت", "إلنترا", "سوناتا", "توسان", "سانتافي", "كريتا", "i10", "i20", "i30", "أخرى"] },
  "kia": { "models": ["بيكانتو", "ريو", "سيراتو", "أوبتيما", "سبورتاج", "سورينتو", "سيلتوس", "أخرى"] },
  "volkswagen": { "models": ["بولو", "جولف", "جيتا", "باسات", "تيجوان", "طوارق", "أرتيون", "أخرى"] },
  "chevrolet": { "models": ["سبارك", "أفيو", "كروز", "ماليبو", "كابتيفا", "تريل بليزر", "تاهو", "سوبربان", "أخرى"] },
  "ford": { "models": ["فييستا", "فوكس", "فيوجن", "إيكوسبورت", "إسكيب", "إكسبلورر", "إدج", "إكسبيديشن", "أخرى"] },
  "mazda": { "models": ["مازدا 2", "مازدا 3", "مازدا 6", "CX-3", "CX-5", "CX-9", "أخرى"] },
  "suzuki": { "models": ["ألتو", "سويفت", "دزاير", "سياز", "إرتيجا", "جيمني", "فيتارا", "أخرى"] },
  "mitsubishi": { "models": ["لانسر", "أتراج", "ASX", "إكليبس كروس", "أوتلاندر", "باجيرو", "L200", "أخرى"] },
  "lexus": { "models": ["IS", "ES", "GS", "LS", "UX", "NX", "RX", "LX", "أخرى"] },
  "peugeot": { "models": ["208", "301", "308", "508", "2008", "3008", "5008", "أخرى"] },
  "renault": { "models": ["لوجان", "سانديرو", "ميجان", "فلوينس", "داستر", "كابتشر", "كوليوس", "أخرى"] },
  "skoda": { "models": ["فابيا", "رابيد", "أوكتافيا", "سوبيرب", "كاميك", "كاروك", "كودياك", "أخرى"] },
  "seat": { "models": ["إيبيزا", "ليون", "توليدو", "أرونا", "أتيكا", "تاراكو", "أخرى"] },
  "fiat": { "models": ["500", "تيبو", "دوبلو", "أخرى"] },
  "geely": { "models": ["إمجراند", "كولراي", "أزكارا", "توجيلا", "أخرى"] },
  "byd": { "models": ["F3", "L3", "S6", "أخرى"] },
  "chery": { "models": ["أريزو", "تيجو", "إنفي", "أخرى"] },
  "mg": { "models": ["MG3", "MG5", "MG6", "ZS", "HS", "RX5", "أخرى"] },
  "jac": { "models": ["J3", "J4", "J5", "S2", "S3", "S5", "أخرى"] },
  "proton": { "models": ["ساجا", "برسونا", "إكسورا", "أخرى"] },
  "lada": { "models": ["جرانتا", "كالينا", "لارجوس", "نيفا", "أخرى"] },
  "subaru": { "models": ["إمبريزا", "ليجاسي", "فورستر", "أوتباك", "XV", "أخرى"] },
  "jaguar": { "models": ["XE", "XF", "XJ", "E-PACE", "F-PACE", "F-TYPE", "أخرى"] },
  "land_rover": { "models": ["رينج روفر", "رينج روفر سبورت", "رينج روفر إيفوك", "رينج روفر فيلار", "ديسكفري", "ديسكفري سبورت", "ديفندر", "أخرى"] },
  "porsche": { "models": ["911", "718", "باناميرا", "كايين", "ماكان", "تايكان", "أخرى"] },
  "volvo": { "models": ["S60", "S90", "V40", "V60", "V90", "XC40", "XC60", "XC90", "أخرى"] },
  "other": { "models": ["أخرى"] }
};

    