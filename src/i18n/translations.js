export const ru = {
  nav: {
    home: 'Главная', services: 'Услуги', projects: 'Объекты',
    about: 'О компании', contact: 'Контакты',
  },
  hero: {
    label: 'Профессиональная инжиниринговая компания',
    title: 'Надёжность\nна каждом\nуровне',
    subtitle: 'SafeTech Engineering — монтаж, технадзор и обслуживание лифтового оборудования полного цикла.',
    cta: 'Наши услуги',
    ctaSecondary: 'Связаться',
  },
  stats: {
    label: 'Нас выбирают профессионалы',
    items: [
      { value: '150+', label: 'Объектов сдано' },
      { value: '12', label: 'Лет на рынке' },
      { value: '98%', label: 'Клиентов довольны' },
      { value: '3', label: 'Направления' },
    ],
  },
  services: {
    label: 'Что мы делаем',
    title: 'Наши услуги',
    subtitle: 'Полный цикл работ с лифтовым и эскалаторным оборудованием',
    all: 'Все услуги',
    items: [
      {
        slug: 'montazh-liftov',
        title: 'Монтаж лифтов',
        desc: 'Поставка, монтаж и пуско-наладка пассажирских и грузовых лифтов в жилых и коммерческих зданиях.',
      },
      {
        slug: 'spetsialnye-lifty',
        title: 'Специальные лифты',
        desc: 'Больничные, панорамные, малые грузовые и промышленные подъёмники под любые условия эксплуатации.',
      },
      {
        slug: 'eskalatoru',
        title: 'Эскалаторы и траволаторы',
        desc: 'Профессиональный монтаж эскалаторов и движущихся дорожек для ТРЦ, аэропортов и метро.',
      },
      {
        slug: 'tekhnadzor',
        title: 'Технический надзор',
        desc: 'Независимый контроль монтажа, техническое освидетельствование и сертификация оборудования.',
      },
    ],
  },
  whyUs: {
    label: 'Наши преимущества',
    title: 'Почему выбирают нас',
    items: [
      { title: 'Лицензии и допуски', desc: 'Все необходимые разрешительные документы для работы с лифтовым оборудованием.' },
      { title: 'Гарантия 2 года', desc: 'Гарантийное обслуживание на все выполненные монтажные работы.' },
      { title: '12 лет опыта', desc: 'Более десяти лет реализации проектов различной сложности.' },
      { title: 'Опытная команда', desc: 'Сертифицированные инженеры с опытом работы на объектах СНГ.' },
      { title: 'Соблюдение сроков', desc: 'Чёткое планирование и контроль каждого этапа монтажа.' },
      { title: 'Поддержка 24/7', desc: 'Круглосуточная техподдержка и экстренный выезд на объект.' },
    ],
  },
  cta: {
    title: 'Готовы обсудить ваш проект?',
    subtitle: 'Оставьте заявку — мы свяжемся в течение рабочего дня.',
    btn: 'Оставить заявку',
  },
  about: {
    label: 'О нас',
    title: 'SafeTech Engineering',
    subtitle: 'Профессиональная инжиниринговая компания',
    story: 'С 2012 года SafeTech Engineering реализует проекты по монтажу, техническому надзору и обслуживанию лифтового и эскалаторного оборудования. За это время мы выполнили более 150 объектов — от жилых комплексов до крупных промышленных предприятий.',
    mission: 'Наша миссия — обеспечивать безопасное и надёжное вертикальное перемещение людей и грузов на объектах любой сложности.',
    values: {
      label: 'Наши ценности',
      items: [
        { title: 'Безопасность', desc: 'Строжайший контроль качества и соответствие всем нормативным требованиям.' },
        { title: 'Надёжность', desc: 'Гарантируем работу оборудования в заявленных технических характеристиках.' },
        { title: 'Профессионализм', desc: 'Команда сертифицированных инженеров с непрерывным обучением.' },
      ],
    },
    team: {
      label: 'Наша команда',
      title: 'Специалисты',
      items: [
        { name: 'Алексей Петров', role: 'Главный инженер', exp: '15 лет опыта' },
        { name: 'Дмитрий Сидоров', role: 'Инспектор промышленной безопасности', exp: '10 лет опыта' },
        { name: 'Игорь Волков', role: 'Проектировщик СВТ', exp: '8 лет опыта' },
        { name: 'Сергей Козлов', role: 'Монтажник-наладчик', exp: '12 лет опыта' },
      ],
    },
    certs: { label: 'Лицензии и сертификаты', title: 'Документы' },
  },
  projects: {
    label: 'Наши объекты',
    title: 'Реализованные проекты',
    all: 'Все проекты',
    filters: ['Все', 'Лифты', 'Спецлифты', 'Эскалаторы'],
    detail: 'Подробнее',
    specs: 'Технические характеристики',
    services_used: 'Оказанные услуги',
  },
  contact: {
    label: 'Связаться с нами',
    title: 'Оставить заявку',
    subtitle: 'Заполните форму — мы перезвоним в течение рабочего дня.',
    form: {
      name: 'Ваше имя *',
      phone: 'Телефон *',
      email: 'Email',
      service: 'Услуга',
      message: 'Сообщение',
      btn: 'Отправить заявку',
      success: 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.',
      error: 'Ошибка отправки. Попробуйте позже.',
      servicePlaceholder: 'Выберите услугу',
    },
    info: {
      phone: 'Телефон',
      email: 'Email',
      address: 'Адрес',
      hours: 'Режим работы',
    },
  },
  footer: {
    desc: 'Профессиональный монтаж и технический надзор лифтового оборудования.',
    links: 'Навигация',
    contacts: 'Контакты',
    legal: 'Документы',
    privacy: 'Конфиденциальность',
    copy: '© 2024 SafeTech Engineering',
  },
  notFound: {
    title: '404',
    subtitle: 'Страница не найдена',
    btn: 'На главную',
  },
};

export const uz = {
  nav: {
    home: 'Bosh sahifa', services: 'Xizmatlar', projects: 'Loyihalar',
    about: 'Biz haqimizda', contact: 'Aloqa',
  },
  hero: {
    label: 'Professional muhandislik kompaniyasi',
    title: 'Har bir\nqavatta\nishonchlilik',
    subtitle: 'SafeTech Engineering — lift uskunalarini montaj qilish, texnik nazorat va to\'liq tsikl xizmat ko\'rsatish.',
    cta: 'Xizmatlarimiz',
    ctaSecondary: 'Bog\'lanish',
  },
  stats: {
    label: 'Professionallar bizni tanlaydi',
    items: [
      { value: '150+', label: 'Topshirilgan ob\'yekt' },
      { value: '12', label: 'Yil tajriba' },
      { value: '98%', label: 'Mijozlar mamnun' },
      { value: '3', label: 'Yo\'nalish' },
    ],
  },
  services: {
    label: 'Biz nima qilamiz',
    title: 'Bizning xizmatlar',
    subtitle: 'Lift va eskalator uskunalari bilan to\'liq tsikl ishlash',
    all: 'Barcha xizmatlar',
    items: [
      { slug: 'montazh-liftov', title: 'Liftlarni montaj qilish', desc: 'Yo\'lovchi va yuk liftlarini yetkazib berish, montaj va ishga tushirish.' },
      { slug: 'spetsialnye-lifty', title: 'Maxsus liftlar', desc: 'Tibbiy, panoramik, kichik yuk va sanoat ko\'taruvchilari.' },
      { slug: 'eskalatoru', title: 'Eskalatorlar va trotuarlar', desc: 'TRM, aeroportlar va metro uchun eskalator va harakatlanuvchi yo\'laklar.' },
      { slug: 'tekhnadzor', title: 'Texnik nazorat', desc: 'Mustaqil montaj nazorati, texnik tekshiruv va sertifikatlash.' },
    ],
  },
  whyUs: {
    label: 'Bizning afzalliklarimiz',
    title: 'Nima uchun bizni tanlashadi',
    items: [
      { title: 'Litsenziya va ruxsatnomalar', desc: 'Lift uskunalari bilan ishlash uchun barcha ruxsat hujjatlari.' },
      { title: '2 yil kafolat', desc: 'Barcha montaj ishlari uchun kafolat xizmati.' },
      { title: '12 yil tajriba', desc: 'Har xil murakkablikdagi loyihalarni amalga oshirishda o\'n yildan ortiq tajriba.' },
      { title: 'Tajribali jamoa', desc: 'MDH ob\'yektlarida ishlagan sertifikatlangan muhandislar.' },
      { title: 'Muddatlarga rioya', desc: 'Montajning har bosqichini aniq rejalashtirish va nazorat qilish.' },
      { title: '24/7 qo\'llab-quvvatlash', desc: 'Kunlik texnik yordam va ob\'yektga shoshilinch chiqish.' },
    ],
  },
  cta: { title: 'Loyihangizni muhokama qilishga tayyormisiz?', subtitle: 'Ariza qoldiring — ish kuni davomida bog\'lanamiz.', btn: 'Ariza qoldirish' },
  about: {
    label: 'Biz haqimizda', title: 'SafeTech Engineering', subtitle: 'Professional muhandislik kompaniyasi',
    story: '2012 yildan beri SafeTech Engineering liftlar, eskalatorlar va maxsus ko\'tarish uskunalarini montaj qilish, texnik nazorat va texnik xizmat ko\'rsatish bo\'yicha loyihalarni amalga oshiradi.',
    mission: 'Bizning vazifamiz — har qanday murakkablikdagi ob\'yektlarda odamlar va yuklarni xavfsiz va ishonchli tarzda vertikal ko\'chirishni ta\'minlash.',
    values: {
      label: 'Bizning qadriyatlarimiz',
      items: [
        { title: 'Xavfsizlik', desc: 'Qattiq sifat nazorati va barcha me\'yoriy talablarga muvofiqlik.' },
        { title: 'Ishonchlilik', desc: 'Uskunaning belgilangan texnik xususiyatlarda ishlashini kafolatlaymiz.' },
        { title: 'Professionallik', desc: 'Uzluksiz o\'qitish bilan sertifikatlangan muhandislar jamoasi.' },
      ],
    },
    team: {
      label: 'Bizning jamoa', title: 'Mutaxassislar',
      items: [
        { name: 'Aleksey Petrov', role: 'Bosh muhandis', exp: '15 yil tajriba' },
        { name: 'Dmitriy Sidorov', role: 'Sanoat xavfsizlik inspektori', exp: '10 yil tajriba' },
        { name: 'Igor Volkov', role: 'SVT loyihachisi', exp: '8 yil tajriba' },
        { name: 'Sergey Kozlov', role: 'Montaj-sozlovchi', exp: '12 yil tajriba' },
      ],
    },
    certs: { label: 'Litsenziya va sertifikatlar', title: 'Hujjatlar' },
  },
  projects: {
    label: 'Bizning ob\'yektlar', title: 'Amalga oshirilgan loyihalar', all: 'Barcha loyihalar',
    filters: ['Barchasi', 'Liftlar', 'Maxsus liftlar', 'Eskalatorlar'],
    detail: 'Batafsil', specs: 'Texnik xususiyatlar', services_used: 'Ko\'rsatilgan xizmatlar',
  },
  contact: {
    label: 'Biz bilan bog\'lanish', title: 'Ariza qoldirish',
    subtitle: 'Shaklni to\'ldiring — ish kuni davomida qayta qo\'ng\'iroq qilamiz.',
    form: {
      name: 'Ismingiz *', phone: 'Telefon *', email: 'Email', service: 'Xizmat',
      message: 'Xabar', btn: 'Ariza yuborish',
      success: 'Ariza yuborildi! Tez orada siz bilan bog\'lanamiz.',
      error: 'Yuborish xatosi. Keyinroq urinib ko\'ring.',
      servicePlaceholder: 'Xizmatni tanlang',
    },
    info: { phone: 'Telefon', email: 'Email', address: 'Manzil', hours: 'Ish tartibi' },
  },
  footer: {
    desc: 'Lift uskunalarini professional montaj qilish va texnik nazorat.',
    links: 'Navigatsiya', contacts: 'Aloqa', legal: 'Hujjatlar', privacy: 'Maxfiylik',
    copy: '© 2024 SafeTech Engineering',
  },
  notFound: { title: '404', subtitle: 'Sahifa topilmadi', btn: 'Bosh sahifaga' },
};
