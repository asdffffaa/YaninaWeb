import { designAssets as assets } from '../design/assets';
export type Product = {
  id: string;
  name: string;
  kind: 'course' | 'lesson' | 'recipe';
  image: string;
  description: string;
  audience: string;
  program: string[];
  outcomes: string[];
  price: number | null;
  lessons: number;
  level?: string;
  category?: string[];
  crop?: 'modern' | 'leveling';
  popular?: boolean;
};
const courseDescription =
  'Системний курс для початківців, який допоможе розібратися в основах, уникати типових помилок і впевнено працювати з рецептами та техніками.';
export const courses: Product[] = [
  {
    id: 'kondyter-start',
    name: 'Кондитер START',
    kind: 'course',
    image: assets.CoursesDesign.imgCourseCoverPhoto,
    level: 'КУРС ДЛЯ ТИХ У КОГО НЕМА ДОСВІДУ',
    description: courseDescription,
    price: 1490,
    lessons: 8,
    popular: true,
    audience:
      'Для початківців, які хочуть зрозуміти базові кондитерські процеси та приготувати свій перший стабільний торт.',
    program: [
      'Інвентар та підготовка до роботи',
      'Базові бісквіти та їх випікання',
      'Креми та стабільні начинки',
      'Просочення й баланс смаку',
      'Збірка та стабілізація торта',
      'Базове вирівнювання',
      'Простий декор та оформлення',
      'Зберігання і типові помилки',
    ],
    outcomes: [
      'Випікати бісквіти',
      'Готувати стабільні начинки',
      'Збирати й вирівнювати торти',
      'Правильно зберігати вироби',
    ],
  },
  {
    id: 'suchasnyi-kondyter',
    name: 'Сучасний кондитер',
    kind: 'course',
    image: assets.CoursesDesign.imgCourseCoverPhoto1,
    level: 'КУРС ДЛЯ ТИХ ХТО ПРОФІ',
    description: courseDescription,
    price: 2490,
    lessons: 8,
    crop: 'modern',
    popular: true,
    audience:
      'Для кондитерів із базовим досвідом, які прагнуть удосконалити технологію, розширити асортимент і впевнено працювати із замовленнями.',
    program: [
      'Сучасні поєднання смаків',
      'Текстури бісквітів і кремів',
      'Фруктові та ягідні прошарки',
      'Стабільність складних начинок',
      'Збірка високих тортів',
      'Чіткі краї та фінішне покриття',
      'Сучасний декор',
      'Зберігання та транспортування',
    ],
    outcomes: [
      'Поєднувати сучасні смаки',
      'Готувати складні начинки',
      'Збирати високі торти',
      'Працювати із замовленнями',
    ],
  },
];
const lessonDetails = {
  audience:
    'Для тих, хто хоче опанувати окрему кондитерську техніку та впевнено повторити результат на власній кухні.',
  outcomes: [
    'Розуміти технологію',
    'Уникати типових помилок',
    'Повторювати результат',
    'Правильно зберігати вироби',
  ],
};
export const lessons: Product[] = [
  {
    id: 'vyrivniuvannia',
    name: 'Вирівнювання торта',
    image: assets.MiniCoursesDesign.imgCourseImage,
    description: 'Рівні боки, чіткий край і стабільне покриття кремом.',
    crop: 'leveling' as const,
    program: [
      'Підготовка торта',
      'Вибір крему та інструментів',
      'Чорнове покриття',
      'Фінішне вирівнювання',
      'Чіткий верхній край',
      'Виправлення нерівностей',
      'Стабілізація покриття',
      'Зберігання готового торта',
    ],
  },
  {
    id: 'musovi-deserty',
    name: 'Мусові десерти',
    image: assets.MiniCoursesDesign.imgCourseImage1,
    description: 'Стабільна текстура, глазур і сучасна подача.',
    program: [
      'Підготовка форм',
      'Базовий мус',
      'Начинки та вставки',
      'Бісквітна основа',
      'Збірка десерту',
      'Заморожування',
      'Глазурування',
      'Декор і подача',
    ],
  },
  {
    id: 'eskimo',
    name: 'Ескімо',
    image: assets.MiniCoursesDesign.imgCourseImage2,
    description: 'Начинки, глазурування та акуратний декор.',
    program: [
      'Інгредієнти та інвентар',
      'Підготовка основи',
      'Стабільні начинки',
      'Формування ескімо',
      'Охолодження',
      'Глазурування',
      'Декор',
      'Зберігання',
    ],
  },
  {
    id: 'cake-pops',
    name: 'Кейк-попси',
    image: assets.MiniCoursesDesign.imgCourseImage3,
    description: 'Ідеальна форма, покриття й оформлення.',
    program: [
      'Бісквітна основа',
      'Крем і консистенція',
      'Формування',
      'Кріплення палички',
      'Охолодження',
      'Шоколадне покриття',
      'Декор',
      'Пакування та зберігання',
    ],
  },
].map((p, index) => ({
  ...lessonDetails,
  ...p,
  kind: 'lesson' as const,
  price: [490, 690, 390, 450][index],
  lessons: 1,
}));
const recipeProgram = [
  'Інгредієнти та точні пропорції',
  'Підготовка бісквіта',
  'Приготування крему',
  'Начинки та прошарки',
  'Послідовність збірки',
  'Стабілізація',
  'Оформлення',
  'Зберігання готового виробу',
];
export const recipes: Product[] = [
  {
    id: 'tropichna-malyna',
    name: 'Тропічна Малина',
    image: assets.TechCardsDesign.imgTechCardImage,
    description: 'Рецептура, технологія, складання та зберігання.',
    category: ['Ягідні', 'Цитрусові'],
    popular: true,
  },
  {
    id: 'polunychnyi-plombir',
    name: 'Полуничний пломбір',
    image: assets.TechCardsDesign.imgTechCardImage1,
    description: 'Точні пропорції, етапи приготування та збірки.',
    category: ['Ягідні'],
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet · Бісквіт',
    image: assets.TechCardsDesign.imgTechCardImage2,
    description: 'Перевірена рецептура й поради щодо стабільності.',
    category: ['Шоколадні'],
  },
  {
    id: 'chocolate-biscuit',
    name: 'Шоколадний бісквіт',
    image: assets.TechCardsDesign.imgTechCardImage3,
    description: 'Технологія коржів, крему та правильного зберігання.',
    category: ['Шоколадні'],
  },
].map((p, index) => ({
  ...p,
  kind: 'recipe' as const,
  price: [290, 250, 190, 220, 220][index],
  lessons: 0,
  audience:
    'Для кондитерів, які хочуть працювати з точною рецептурою та зрозумілою послідовністю приготування.',
  program: recipeProgram,
  outcomes: [
    'Працювати з рецептурою',
    'Готувати стабільні начинки',
    'Збирати десерт',
    'Правильно зберігати вироби',
  ],
}));
// Demo catalogue expansion requested by the owner. Reuses the available photography.
const extraCourses = ['Бісквітні торти', 'Мусові торти', 'Декор тортів', 'Авторські смаки'];
extraCourses.forEach((name, i) =>
  courses.push({
    ...courses[i % 2],
    id: `course-extra-${i + 1}`,
    name,
    crop: undefined,
    level: 'ПОВНА ПРОГРАМА НАВЧАННЯ',
    price: 1990 + i * 300,
    description: `Практичний курс «${name}»: рецептури, покрокові техніки, збірка та оформлення.`,
    image: [
      assets.LearningPathsDesign.imgCardImage,
      assets.MiniCoursesDesign.imgCourseImage1,
      assets.LearningPathsDesign.imgCardImage2,
      assets.TechCardsDesign.imgTechCardImage,
    ][i],
  }),
);
const extraLessons = [
  'Бенто-торти',
  'Капкейки',
  'Макаронс',
  'Еклери',
  'Профітролі',
  'Меренговий рулет',
  'Чізкейк',
  'Тарталетки',
  'Дзеркальна глазур',
  'Шоколадний декор',
  'Кремові квіти',
  'Вафельний декор',
  'Карамель',
  'Конфі та кулі',
  'Ганаш',
  'Бісквіт без помилок',
  'Збірка торта',
  'Велюр',
  'Порційні десерти',
  'Пакування десертів',
];
extraLessons.forEach((name, i) =>
  lessons.push({
    ...lessons[i % 4],
    id: `lesson-extra-${i + 1}`,
    name,
    crop: undefined,
    price: 350 + (i % 7) * 50,
    description: 'Техніка приготування, пропорції та практичні поради.',
    program: [
      'Інгредієнти та інструменти',
      'Підготовка до роботи',
      'Основна технологія',
      'Текстура та консистенція',
      'Типові помилки',
      'Оформлення',
      'Подача',
      'Зберігання',
    ],
  }),
);
const recipeGroups = [
  {
    category: 'Шоколадні',
    names: [
      'Три шоколади',
      'Шоколад-вишня',
      'Трюфель',
      'Брауні',
      'Шоколад-апельсин',
      'Шоколад-банан',
      'Шоколад-кава',
      'Шоколад-кокос',
      'Шоколад-малина',
      'Шоколадна карамель',
    ],
    image: 3,
  },
  {
    category: 'Ягідні',
    names: [
      'Малина-ваніль',
      'Чорниця-йогурт',
      'Вишня-мигдаль',
      'Полуниця-вершки',
      'Смородина',
      'Лісові ягоди',
      'Ожина-ваніль',
      'Журавлина',
      'Малина-кокос',
      'Чорничний пломбір',
    ],
    image: 1,
  },
  {
    category: 'Карамельні',
    names: [
      'Солона карамель',
      'Карамель-груша',
      'Карамель-банан',
      'Медовик',
      'Карамель-кава',
      'Карамель-яблуко',
      'Іриска',
      'Карамель-пекан',
      'Карамель-ваніль',
      'Карамельний мус',
    ],
    image: 3,
  },
  {
    category: 'Горіхові',
    names: [
      'Фісташка-малина',
      'Фундук-шоколад',
      'Мигдаль-вишня',
      'Волоський горіх',
      'Пекан-клен',
      'Фісташка-полуниця',
      'Праліне',
      'Мигдаль-кокос',
      'Фундук-карамель',
      'Горіховий медовик',
    ],
    image: 0,
  },
  {
    category: "М'ятні",
    names: [
      'М’ята-шоколад',
      'М’ята-лайм',
      'М’ята-полуниця',
      'М’ятний пломбір',
      'М’ята-малина',
      'М’ята-лимон',
      'М’ята-кокос',
      'М’ята-ваніль',
      'М’ята-ожина',
      'М’ятний мус',
    ],
    image: 2,
  },
  {
    category: 'Цитрусові',
    names: [
      'Лимонний тарт',
      'Апельсин-ваніль',
      'Лайм-кокос',
      'Мандарин',
      'Лимон-малина',
      'Грейпфрут',
      'Юзу-ваніль',
      'Апельсин-шоколад',
      'Лимонний пломбір',
      'Цитрус-манго',
    ],
    image: 0,
  },
];
recipeGroups.forEach((group, g) =>
  group.names.forEach((name, i) =>
    recipes.push({
      ...recipes[group.image],
      id: `recipe-${g + 1}-${i + 1}`,
      name,
      popular: false,
      category: [group.category],
      price: 190 + (i % 5) * 30,
      description: 'Точна рецептура, послідовність приготування та умови зберігання.',
    }),
  ),
);
export const sampleCart: Product[] = [
  {
    id: 'suchasni-smaky',
    name: 'Курс «Сучасні смаки»',
    kind: 'course',
    image: assets.CheckoutDesign.imgProductImage,
    price: 1490,
    lessons: 6,
    description: 'Онлайн-курс · 6 смаків',
    audience: 'Для початківців і практикуючих кондитерів, які хочуть урізноманітнити асортимент.',
    program: recipeProgram,
    outcomes: lessonDetails.outcomes,
  },
  {
    id: 'pistachio-raspberry',
    name: 'Техкарта «Фісташка-малина»',
    kind: 'recipe',
    image: assets.CheckoutDesign.imgProductImage1,
    price: 290,
    lessons: 0,
    description: 'PDF файл',
    audience: 'Для кондитерів, які працюють із бісквітними тортами.',
    program: recipeProgram,
    outcomes: lessonDetails.outcomes,
  },
  {
    id: 'ideal-leveling',
    name: 'Урок «Ідеальне вирівнювання»',
    kind: 'lesson',
    image: assets.CheckoutDesign.imgProductImage2,
    price: 490,
    lessons: 1,
    description: 'Відеоурок',
    audience: lessonDetails.audience,
    program: lessons[0].program,
    outcomes: lessonDetails.outcomes,
  },
];
export const catalog = [...courses, ...lessons, ...recipes, ...sampleCart];
export const telegram = 'https://t.me/yaninakorinenko';
const priceFormatter = new Intl.NumberFormat('uk-UA');
export const formatPrice = (value: number) => priceFormatter.format(value) + ' грн';
