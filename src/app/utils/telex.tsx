export const TELEX_MAP: Record<string, string> = {
  // Circumflex (hat) - double vowels
  'aa': 'â',
  'ee': 'ê',
  'oo': 'ô',
  
  // Breve - w suffix
  'aw': 'ă',
  'ow': 'ơ',
  'uw': 'ư',
  
  // Stroke - double d
  'dd': 'đ',
  
  // Acute tone (rising) - s suffix
  'as': 'á',
  'es': 'é',
  'is': 'í',
  'os': 'ó',
  'us': 'ú',
  'ys': 'ý',
  
  // Grave tone (falling) - f suffix
  'af': 'à',
  'ef': 'è',
  'if': 'ì',
  'of': 'ò',
  'uf': 'ù',
  'yf': 'ỳ',
  
  // Hook tone (question) - r suffix
  'ar': 'ả',
  'er': 'ẻ',
  'ir': 'ỉ',
  'or': 'ỏ',
  'ur': 'ủ',
  'yr': 'ỷ',
  
  // Tilde tone (wavy) - x suffix
  'ax': 'ã',
  'ex': 'ẽ',
  'ix': 'ĩ',
  'ox': 'õ',
  'ux': 'ũ',
  'yx': 'ỹ',
  
  // Dot below tone (heavy) - j suffix
  'aj': 'ạ',
  'ej': 'ẹ',
  'ij': 'ị',
  'oj': 'ọ',
  'uj': 'ụ',
  'yj': 'ỵ',
  
  // Combined diacritics + tones
  // Circumflex + tones
  'aas': 'ấ', 'aaf': 'ầ', 'aar': 'ẩ', 'aax': 'ẫ', 'aaj': 'ậ',
  'ees': 'ế', 'eef': 'ề', 'eer': 'ể', 'eex': 'ễ', 'eej': 'ệ',
  'oos': 'ố', 'oof': 'ồ', 'oor': 'ổ', 'oox': 'ỗ', 'ooj': 'ộ',
  
  // Breve + tones
  'aws': 'ắ', 'awf': 'ằ', 'awr': 'ẳ', 'awx': 'ẵ', 'awj': 'ặ',
  
  // Horn + tones
  'ows': 'ớ', 'owf': 'ờ', 'owr': 'ở', 'owx': 'ỡ', 'owj': 'ợ',
  'uws': 'ứ', 'uwf': 'ừ', 'uwr': 'ử', 'uwx': 'ữ', 'uwj': 'ự',
};

export const VIETNAMESE_PANGRAM = "Quý khách đã xem bộ phim về cuộc phiêu lưu của những người thổ dân ăn trái cây ngọt và uống nước mắm từ vùng đất xa xôi không?";