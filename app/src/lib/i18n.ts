export type Lang = "ru" | "kz" | "en";

const translations = {
  // Navbar
  "nav.home": { ru: "Главная", kz: "Басты", en: "Home" },
  "nav.properties": { ru: "Квартиры", kz: "Пәтерлер", en: "Properties" },
  "nav.create": { ru: "Создать", kz: "Жасау", en: "Create" },
  "nav.portfolio": { ru: "Портфолио", kz: "Портфолио", en: "Portfolio" },

  // Hero
  "hero.badge.kase": { ru: "KASE × Solana Foundation", kz: "KASE × Solana Foundation", en: "KASE × Solana Foundation" },
  "hero.badge.tenge": { ru: "Digital Tenge", kz: "Digital Tenge", en: "Digital Tenge" },
  "hero.title1": { ru: "Своя квартира", kz: "Өз пәтерің", en: "Own your home" },
  "hero.title2": { ru: "без ипотеки", kz: "ипотекасыз", en: "without a mortgage" },
  "hero.subtitle": {
    ru: "Краудфандинг недвижимости на Solana. Инвесторы покупают токены, вы заселяетесь и выкупаете долю за 5-7 лет.",
    kz: "Solana-дағы жылжымайтын мүлік краудфандингі. Инвесторлар токен сатып алады, сіз көшесіз және 5-7 жылда үлесіңізді сатып аласыз.",
    en: "Real estate crowdfunding on Solana. Investors buy tokens, you move in and buy back your share in 5-7 years.",
  },
  "hero.savings": { ru: "экономия", kz: "үнемдеу", en: "savings" },
  "hero.vs_mortgage": { ru: "vs ипотека", kz: "vs ипотека", en: "vs mortgage" },
  "hero.years_to": { ru: "лет до", kz: "жыл", en: "years to" },
  "hero.full_ownership": { ru: "100% владения", kz: "100% меншік", en: "100% ownership" },
  "hero.browse": { ru: "Смотреть квартиры", kz: "Пәтерлерді қарау", en: "Browse properties" },
  "hero.list": { ru: "Разместить квартиру", kz: "Пәтер орналастыру", en: "List property" },

  // Stats
  "stats.mortgage_label": { ru: "Ипотека в КЗ за $80K квартиру", kz: "80K$ пәтер үшін КЗ ипотекасы", en: "KZ mortgage for $80K apartment" },
  "stats.mortgage_sub": { ru: "20 лет, 18% годовых", kz: "20 жыл, жылдық 18%", en: "20 years, 18% annual" },
  "stats.hc_label": { ru: "HomeCrowd: аренда + выкуп", kz: "HomeCrowd: жалға беру + сатып алу", en: "HomeCrowd: rent + buyback" },
  "stats.hc_sub": { ru: "5-7 лет, без банка", kz: "5-7 жыл, банксыз", en: "5-7 years, no bank" },
  "stats.save_label": { ru: "Вы экономите", kz: "Сіз үнемдейсіз", en: "You save" },
  "stats.save_sub": { ru: "без переплаты банку", kz: "банкке артық төлемсіз", en: "no bank overpayment" },

  // Calculator
  "calc.title": { ru: "Ипотека vs HomeCrowd", kz: "Ипотека vs HomeCrowd", en: "Mortgage vs HomeCrowd" },
  "calc.subtitle": { ru: "Введите свои цифры и увидите разницу", kz: "Өз сандарыңызды енгізіп, айырмашылықты көріңіз", en: "Enter your numbers and see the difference" },
  "calc.price": { ru: "Стоимость квартиры ($)", kz: "Пәтер құны ($)", en: "Property price ($)" },
  "calc.savings": { ru: "Ваши накопления ($)", kz: "Сіздің жинақтарыңыз ($)", en: "Your savings ($)" },
  "calc.mortgage": { ru: "Ипотека (18%, 20 лет)", kz: "Ипотека (18%, 20 жыл)", en: "Mortgage (18%, 20 yrs)" },
  "calc.you_save": { ru: "Вы экономите", kz: "Сіз үнемдейсіз", en: "You save" },
  "calc.monthly": { ru: "Платёж/мес", kz: "Ай сайын төлем", en: "Monthly payment" },
  "calc.overpay": { ru: "Переплата", kz: "Артық төлем", en: "Overpayment" },
  "calc.term": { ru: "Срок", kz: "Мерзім", en: "Term" },
  "calc.years": { ru: "лет", kz: "жыл", en: "years" },
  "calc.rent_mo": { ru: "Аренда/мес", kz: "Жалдау/ай", en: "Rent/mo" },

  // How it works
  "how.title": { ru: "Три шага к своей квартире", kz: "Өз пәтеріңізге үш қадам", en: "Three steps to your home" },
  "how.step1.title": { ru: "Разместите квартиру", kz: "Пәтерді орналастырыңыз", en: "List your property" },
  "how.step1.desc": { ru: "Создайте кампанию с данными о квартире. Платформа токенизирует её в доли по $8 на Solana.", kz: "Пәтер деректерімен науқан жасаңыз. Платформа оны Solana-да $8 үлестерге токенизациялайды.", en: "Create a campaign with property data. The platform tokenizes it into $8 shares on Solana." },
  "how.step2.title": { ru: "Инвесторы финансируют", kz: "Инвесторлар қаржыландырады", en: "Investors fund it" },
  "how.step2.desc": { ru: "Инвесторы покупают токены за USDC. Когда цель достигнута — квартира приобретается через ТОО.", kz: "Инвесторлар USDC-мен токен сатып алады. Мақсатқа жеткенде — пәтер ЖШС арқылы сатып алынады.", en: "Investors buy tokens with USDC. When the goal is reached — the property is purchased via LLC." },
  "how.step3.title": { ru: "Заселяйтесь и выкупайте", kz: "Көшіңіз және сатып алыңыз", en: "Move in & buy back" },
  "how.step3.desc": { ru: "Вы заселяетесь, платите аренду токенхолдерам. Постепенно выкупаете до 100% владения.", kz: "Сіз көшесіз, токен иелеріне жалдау ақы төлейсіз. Біртіндеп 100% меншікке дейін сатып аласыз.", en: "You move in, pay rent to token holders. Gradually buy back to 100% ownership." },

  // Why Solana
  "why.badge": { ru: "Убери Solana — продукт ломается", kz: "Solana-ны алып тастаңыз — өнім бұзылады", en: "Remove Solana — product breaks" },
  "why.title": { ru: "Почему только Solana", kz: "Неге тек Solana", en: "Why only Solana" },

  // CTA
  "cta.title": { ru: "Готовы владеть своим будущим?", kz: "Болашағыңызды иеленуге дайынсыз ба?", en: "Ready to own your future?" },
  "cta.subtitle": { ru: "70% населения Казахстана моложе 35 лет. Без банков, без 20 лет долга.", kz: "Қазақстан халқының 70%-ы 35 жасқа толмаған. Банксыз, 20 жылдық қарызсыз.", en: "70% of Kazakhstan's population is under 35. No banks, no 20-year debt." },
  "cta.button": { ru: "Начать инвестировать", kz: "Инвестициялауды бастау", en: "Start investing" },

  // Properties page
  "props.title": { ru: "Квартиры", kz: "Пәтерлер", en: "Properties" },
  "props.subtitle": { ru: "Инвестируйте в токенизированную недвижимость от $8 за токен", kz: "Токенделген жылжымайтын мүлікке $8-ден инвестиция салыңыз", en: "Invest in tokenized real estate from $8 per token" },
  "props.search": { ru: "Поиск по названию или адресу...", kz: "Атауы немесе мекенжайы бойынша іздеу...", en: "Search by name or address..." },
  "props.all": { ru: "Все", kz: "Барлығы", en: "All" },
  "props.funding": { ru: "Сбор средств", kz: "Қаржы жинау", en: "Funding" },
  "props.active": { ru: "Активные", kz: "Белсенді", en: "Active" },
  "props.not_found": { ru: "Квартиры не найдены по вашим критериям.", kz: "Сіздің критерийлеріңіз бойынша пәтерлер табылмады.", en: "No properties found matching your criteria." },
  "props.collected": { ru: "Собрано", kz: "Жиналды", en: "Funded" },
  "props.days": { ru: "дн.", kz: "күн", en: "days" },
  "props.expired": { ru: "Истёк", kz: "Мерзімі өтті", en: "Expired" },
  "props.per_token": { ru: "за токен", kz: "токен үшін", en: "per token" },
  "props.collected_pct": { ru: "собрано", kz: "жиналды", en: "funded" },

  // Property detail
  "detail.back": { ru: "Назад к квартирам", kz: "Пәтерлерге оралу", en: "Back to properties" },
  "detail.not_found": { ru: "Квартира не найдена", kz: "Пәтер табылмады", en: "Property not found" },
  "detail.buy_tokens": { ru: "Купить токены", kz: "Токен сатып алу", en: "Buy tokens" },
  "detail.investment": { ru: "Детали инвестиции", kz: "Инвестиция мәліметтері", en: "Investment details" },
  "detail.amount": { ru: "Количество токенов", kz: "Токен саны", en: "Token amount" },
  "detail.price": { ru: "Цена токена", kz: "Токен бағасы", en: "Token price" },
  "detail.quantity": { ru: "Количество", kz: "Саны", en: "Quantity" },
  "detail.total": { ru: "Итого", kz: "Барлығы", en: "Total" },
  "detail.buy_btn": { ru: "Купить", kz: "Сатып алу", en: "Buy" },
  "detail.tokens": { ru: "токенов", kz: "токен", en: "tokens" },
  "detail.connect": { ru: "Подключите кошелёк", kz: "Әмиянды қосыңыз", en: "Connect wallet" },
  "detail.processing": { ru: "Обработка...", kz: "Өңдеу...", en: "Processing..." },
  "detail.fully_funded": { ru: "Полностью собрано", kz: "Толық жиналды", en: "Fully funded" },
  "detail.rent_monthly": { ru: "Аренда распределяется ежемесячно", kz: "Жалдау ай сайын бөлінеді", en: "Rent distributed monthly" },
  "detail.area": { ru: "Площадь", kz: "Аудан", en: "Area" },
  "detail.floor": { ru: "Этаж", kz: "Қабат", en: "Floor" },
  "detail.year": { ru: "Год постройки", kz: "Салынған жылы", en: "Year built" },
  "detail.type": { ru: "Тип дома", kz: "Үй түрі", en: "House type" },
  "detail.cost": { ru: "Стоимость", kz: "Құны", en: "Price" },
  "detail.yield": { ru: "Доходность", kz: "Кірістілік", en: "Yield" },
  "detail.annual": { ru: "годовая", kz: "жылдық", en: "annual" },
  "detail.remaining": { ru: "Осталось", kz: "Қалды", en: "Remaining" },
  "detail.rent": { ru: "Аренда", kz: "Жалдау", en: "Rent" },
  "detail.krisha": { ru: "Объявление на Krisha.kz", kz: "Krisha.kz-дағы хабарландыру", en: "Listing on Krisha.kz" },
  "detail.krisha_sub": { ru: "Проверьте реальный объект на крупнейшей площадке КЗ", kz: "ҚЗ-дың ең ірі алаңында нақты нысанды тексеріңіз", en: "Check the real property on KZ's largest platform" },
  "detail.docs": { ru: "Документы", kz: "Құжаттар", en: "Documents" },
  "detail.holders": { ru: "Держатели токенов", kz: "Токен иелері", en: "Token holders" },
  "detail.rent_history": { ru: "История выплат аренды", kz: "Жалдау төлемдерінің тарихы", en: "Rent payment history" },
  "detail.paid": { ru: "Выплачено", kz: "Төленді", en: "Paid" },
  "detail.yearly": { ru: "годовых", kz: "жылдық", en: "annual" },
  "detail.rent_per_token": { ru: "На токен/мес", kz: "Токенге/ай", en: "Per token/mo" },
  "detail.rent_mo": { ru: "Аренда/мес", kz: "Жалдау/ай", en: "Rent/mo" },

  // Create page
  "create.title": { ru: "Создать кампанию", kz: "Науқан жасау", en: "Create campaign" },
  "create.subtitle": { ru: "Токенизируйте квартиру для краудфандинга на Solana", kz: "Solana-дағы краудфандинг үшін пәтерді токенизациялаңыз", en: "Tokenize a property for crowdfunding on Solana" },
  "create.how": { ru: "Как это работает:", kz: "Бұл қалай жұмыс істейді:", en: "How it works:" },
  "create.how_desc": { ru: "Укажите стоимость и взнос. Платформа создаст SPL токены по $8. Инвесторы покупают токены. Квартира оформляется на ТОО в AIFC.", kz: "Құнын және жарнаны көрсетіңіз. Платформа $8 SPL токендерін жасайды. Инвесторлар токен сатып алады. Пәтер AIFC-дегі ЖШС-ге ресімделеді.", en: "Enter price and contribution. Platform creates $8 SPL tokens. Investors buy tokens. Property registered to LLC in AIFC." },
  "create.property_data": { ru: "Данные о квартире", kz: "Пәтер деректері", en: "Property data" },
  "create.name": { ru: "Название", kz: "Атауы", en: "Name" },
  "create.address": { ru: "Адрес", kz: "Мекенжай", en: "Address" },
  "create.description": { ru: "Описание", kz: "Сипаттамасы", en: "Description" },
  "create.photos": { ru: "Фото", kz: "Фото", en: "Photos" },
  "create.upload": { ru: "Загрузите фото (IPFS / Pinata)", kz: "Фото жүктеңіз (IPFS / Pinata)", en: "Upload photos (IPFS / Pinata)" },
  "create.finance": { ru: "Финансы", kz: "Қаржы", en: "Finance" },
  "create.price": { ru: "Стоимость квартиры ($)", kz: "Пәтер құны ($)", en: "Property price ($)" },
  "create.contribution": { ru: "Ваш первоначальный взнос ($)", kz: "Сіздің алғашқы жарнаңыз ($)", en: "Your down payment ($)" },
  "create.deadline": { ru: "Дедлайн сбора", kz: "Жинау мерзімі", en: "Funding deadline" },
  "create.preview": { ru: "Превью токенизации", kz: "Токенизация алдын ала қарауы", en: "Tokenization preview" },
  "create.tokens": { ru: "Токенов", kz: "Токендер", en: "Tokens" },
  "create.yours": { ru: "Ваши", kz: "Сіздікі", en: "Yours" },
  "create.investors": { ru: "Инвесторы", kz: "Инвесторлар", en: "Investors" },
  "create.submit": { ru: "Создать кампанию", kz: "Науқан жасау", en: "Create campaign" },
  "create.submitting": { ru: "Создание на Solana...", kz: "Solana-да жасалуда...", en: "Creating on Solana..." },
  "create.connect": { ru: "Подключите кошелёк для создания кампании", kz: "Науқан жасау үшін әмиянды қосыңыз", en: "Connect wallet to create campaign" },
  "create.success": { ru: "Кампания создана!", kz: "Науқан жасалды!", en: "Campaign created!" },
  "create.success_sub": { ru: "В полной версии будет создан SPL токен и PDA аккаунт на Solana.", kz: "Толық нұсқада Solana-да SPL токен мен PDA аккаунты жасалады.", en: "In production, an SPL token and PDA account will be created on Solana." },
  "create.property": { ru: "Квартира", kz: "Пәтер", en: "Property" },
  "create.your_share": { ru: "Ваша доля", kz: "Сіздің үлесіңіз", en: "Your share" },
  "create.for_investors": { ru: "Для инвесторов", kz: "Инвесторлар үшін", en: "For investors" },

  // Dashboard
  "dash.title": { ru: "Портфолио", kz: "Портфолио", en: "Portfolio" },
  "dash.connect": { ru: "Подключите кошелёк", kz: "Әмиянды қосыңыз", en: "Connect wallet" },
  "dash.connect_sub": { ru: "Подключите Phantom для просмотра портфолио, доходов от аренды и кампаний.", kz: "Портфолио, жалдау кірісі мен науқандарды көру үшін Phantom қосыңыз.", en: "Connect Phantom to view portfolio, rent income and campaigns." },
  "dash.investor": { ru: "Инвестор", kz: "Инвестор", en: "Investor" },
  "dash.buyer": { ru: "Покупатель", kz: "Сатып алушы", en: "Buyer" },
  "dash.value": { ru: "Стоимость портфолио", kz: "Портфолио құны", en: "Portfolio value" },
  "dash.rent_income": { ru: "Доход от аренды", kz: "Жалдау кірісі", en: "Rent income" },
  "dash.usdc_received": { ru: "USDC получено", kz: "USDC алынды", en: "USDC received" },
  "dash.total_tokens": { ru: "Всего токенов", kz: "Барлық токендер", en: "Total tokens" },
  "dash.across_all": { ru: "во всех квартирах", kz: "барлық пәтерлерде", en: "across all properties" },
  "dash.holdings": { ru: "Мои вложения", kz: "Менің салымдарым", en: "My holdings" },
  "dash.history": { ru: "История выплат", kz: "Төлем тарихы", en: "Payment history" },
  "dash.apartments": { ru: "квартиры", kz: "пәтер", en: "properties" },
  "dash.campaigns": { ru: "Мои кампании", kz: "Менің науқандарым", en: "My campaigns" },
  "dash.rent_paid": { ru: "Аренда выплачено", kz: "Жалдау төленді", en: "Rent paid" },
  "dash.buyback": { ru: "Прогресс выкупа", kz: "Сатып алу барысы", en: "Buyback progress" },
  "dash.fund_progress": { ru: "Сбор средств", kz: "Қаржы жинау", en: "Fundraising" },
  "dash.buyback_progress": { ru: "Выкуп токенов", kz: "Токен сатып алу", en: "Token buyback" },
  "dash.new_campaign": { ru: "+ Создать новую кампанию", kz: "+ Жаңа науқан жасау", en: "+ Create new campaign" },

  // Footer
  "footer.platform": { ru: "Платформа", kz: "Платформа", en: "Platform" },
  "footer.ecosystem": { ru: "Экосистема", kz: "Экожүйе", en: "Ecosystem" },
  "footer.create_campaign": { ru: "Создать кампанию", kz: "Науқан жасау", en: "Create campaign" },

  // Common
  "common.funding": { ru: "Сбор средств", kz: "Қаржы жинау", en: "Funding" },
  "common.active_status": { ru: "Активно", kz: "Белсенді", en: "Active" },
  "common.open": { ru: "Открыть →", kz: "Ашу →", en: "Open →" },
} as const;

type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): string {
  return translations[key]?.[lang] || translations[key]?.["ru"] || key;
}

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "ru", label: "RU", flag: "🇷🇺" },
  { code: "kz", label: "KZ", flag: "🇰🇿" },
  { code: "en", label: "EN", flag: "🇺🇸" },
];
