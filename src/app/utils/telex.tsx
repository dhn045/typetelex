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

export const TELEX_INTERMEDIATE_FORMS: Record<string, string[]> = {
  // Basic diacritics (single transformation)
  'â': ['a'],           // aa → â
  'ă': ['a'],           // aw → ă
  'ê': ['e'],           // ee → ê
  'ô': ['o'],           // oo → ô
  'ơ': ['o'],           // ow → ơ
  'ư': ['u'],           // uw → ư
  'đ': ['d'],           // dd → đ

  // Single tones on base vowels
  'á': ['a'],           // as → á
  'à': ['a'],           // af → à
  'ả': ['a'],           // ar → ả
  'ã': ['a'],           // ax → ã
  'ạ': ['a'],           // aj → ạ

  'é': ['e'],           // es → é
  'è': ['e'],           // ef → è
  'ẻ': ['e'],           // er → ẻ
  'ẽ': ['e'],           // ex → ẽ
  'ẹ': ['e'],           // ej → ẹ

  'í': ['i'],           // is → í
  'ì': ['i'],           // if → ì
  'ỉ': ['i'],           // ir → ỉ
  'ĩ': ['i'],           // ix → ĩ
  'ị': ['i'],           // ij → ị

  'ó': ['o'],           // os → ó
  'ò': ['o'],           // of → ò
  'ỏ': ['o'],           // or → ỏ
  'õ': ['o'],           // ox → õ
  'ọ': ['o'],           // oj → ọ

  'ú': ['u'],           // us → ú
  'ù': ['u'],           // uf → ù
  'ủ': ['u'],           // ur → ủ
  'ũ': ['u'],           // ux → ũ
  'ụ': ['u'],           // uj → ụ

  'ý': ['y'],           // ys → ý
  'ỳ': ['y'],           // yf → ỳ
  'ỷ': ['y'],           // yr → ỷ
  'ỹ': ['y'],           // yx → ỹ
  'ỵ': ['y'],           // yj → ỵ

  // Circumflex + tones (â, ê, ô with tones)
  'ầ': ['a', 'â'],      // aaf → ầ
  'ấ': ['a', 'â'],      // aas → ấ
  'ẩ': ['a', 'â'],      // aar → ẩ
  'ẫ': ['a', 'â'],      // aax → ẫ
  'ậ': ['a', 'â'],      // aaj → ậ

  'ế': ['e', 'ê'],      // ees → ế
  'ề': ['e', 'ê'],      // eef → ề
  'ể': ['e', 'ê'],      // eer → ể
  'ễ': ['e', 'ê'],      // eex → ễ
  'ệ': ['e', 'ê'],      // eej → ệ

  'ố': ['o', 'ô'],      // oos → ố
  'ồ': ['o', 'ô'],      // oof → ồ
  'ổ': ['o', 'ô'],      // oor → ổ
  'ỗ': ['o', 'ô'],      // oox → ỗ
  'ộ': ['o', 'ô'],      // ooj → ộ

  // Breve + tones (ă with tones)
  'ắ': ['a', 'ă'],      // aws → ắ
  'ằ': ['a', 'ă'],      // awf → ằ
  'ẳ': ['a', 'ă'],      // awr → ẳ
  'ẵ': ['a', 'ă'],      // awx → ẵ
  'ặ': ['a', 'ă'],      // awj → ặ

  // Horn + tones (ơ, ư with tones
  'ớ': ['o', 'ơ'],      // ows → ớ
  'ờ': ['o', 'ơ'],      // owf → ờ
  'ở': ['o', 'ơ'],      // owr → ở
  'ỡ': ['o', 'ơ'],      // owx → ỡ
  'ợ': ['o', 'ơ'],      // owj → ợ

  'ứ': ['u', 'ư'],      // uws → ứ
  'ừ': ['u', 'ư'],      // uwf → ừ
  'ử': ['u', 'ư'],      // uwr → ử
  'ữ': ['u', 'ư'],      // uwx → ữ
  'ự': ['u', 'ư'],      // uwj → ự
};

export const VIETNAMESE_PANGRAM = "Quý khách đã xem bộ phim về cuộc phiêu lưu của những người thổ dân ăn trái cây ngọt và uống nước mắm từ vùng đất xa xôi không";