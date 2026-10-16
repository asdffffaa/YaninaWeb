from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    KeyboardButton,
    ReplyKeyboardMarkup,
)

INSTAGRAM_URL = "https://www.instagram.com/yanina_korinenko"
FACEBOOK_URL = "https://www.facebook.com/share/1BdANfcwCB/?mibextid=wwXIfr"
CONSULTATION_URL = "https://t.me/lil_denusko"


# Це єдине постійне нижнє меню — воно повторює меню зі скрінів.
MAIN_MENU = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="🎓 Переглянути курси")],
        [KeyboardButton(text="📄 Переглянути техкарти")],
        [KeyboardButton(text="🎥 Переглянути уроки")],
        [KeyboardButton(text="💬 Консультації")],
        [KeyboardButton(text="📚 Мої матеріали")],
    ],
    resize_keyboard=True,
)


def inline_menu(*rows: list[tuple[str, str]]) -> InlineKeyboardMarkup:
    """Створює кнопки під повідомленням: (напис на кнопці, callback_data)."""
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text=text, callback_data=data) for text, data in row]
            for row in rows
        ]
    )


def courses_menu() -> InlineKeyboardMarkup:
    return inline_menu(
        [("🍰 Сучасний Кондитер", "course:modern")],
        [("🎂 Сучасний Кондитер 2.0", "course:modern2")],
        [("🧁 Кондитер START", "course:start")],
        [("🍓 Сучасні смаки", "course:tastes")],
        [("⬅️ Назад", "main")],
    )


def techcards_menu(back_to: str = "main") -> InlineKeyboardMarkup:
    return inline_menu(
        [("🍰 Торт «Фісташка-малина»", "techcard:pistachio")],
        [("🥭 Мусовий торт «Манго-маракуя»", "techcard:mango")],
        [("🍮 Макарон «Солона карамель»", "techcard:macaron")],
        [("🥂 Чизкейк «Полуничне шампанське»", "techcard:cheesecake")],
        [("⬅️ Назад", back_to)],
    )

def my_techcards_menu(back_to: str = "main") -> InlineKeyboardMarkup:
    return inline_menu(
        [("🍰 Торт «Фісташка-малина»", "materials:techcards:techcard:pistachio")],
        [("🥭 Мусовий торт «Манго-маракуя»", "materials:techcards:techcard:mango")],
        [("🍮 Макарон «Солона карамель»", "materials:techcards:techcard:macaron")],
        [("⬅️ Назад", back_to)],
    )

def lessons_menu(back_to: str = "main") -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🎂 Вирівнювання торта", callback_data="lesson:leveling")],
        [InlineKeyboardButton(text="🍓 Начинки та конфі", callback_data="lesson:fillings")],
        [InlineKeyboardButton(text="🍰 Ідеальні коржі", callback_data="lesson:layers")],
        [InlineKeyboardButton(text="🎨 Складання і декор", callback_data="lesson:decor")],
        [InlineKeyboardButton(text="📚 Більше уроків", url=FACEBOOK_URL)],
        [InlineKeyboardButton(text="⬅️ Назад", callback_data=back_to)],
    ])

def materials_menu() -> InlineKeyboardMarkup:
    return inline_menu(
        [("📚 Мої курси", "materials:courses")],
        [("🗂️ Мої технологічні карти", "materials:techcards")],
        [("▶️ Мої уроки", "materials:lessons")],
        [("⬅️ Назад", "main")],
    )



def links_and_back(back_to: str) -> InlineKeyboardMarkup:
    """Кнопки посилань та повернення на екран, з якого відкрили деталі."""
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="Перейти в Instagram", url=INSTAGRAM_URL)],
            [InlineKeyboardButton(text="Перейти у Facebook", url=FACEBOOK_URL)],
            [InlineKeyboardButton(text="⬅️ Назад", callback_data=back_to)],
        ]
    )


def consultation_menu() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="✈️ Записатися на консультацію", url=CONSULTATION_URL)],
            [InlineKeyboardButton(text="⬅️ Назад", callback_data="main")],
        ]
    )


def detail_back_menu(back_to: str) -> InlineKeyboardMarkup:
    """Одна кнопка для повернення зі сторінки уроку або техкарти."""
    return inline_menu([("⬅️ Назад", back_to)])
