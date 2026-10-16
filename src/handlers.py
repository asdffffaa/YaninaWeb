from aiogram import F, Router
from aiogram.exceptions import TelegramBadRequest
from aiogram.filters import Command, CommandStart
from aiogram.types import CallbackQuery, Message

from content import (
    CONSULTATION_TEXT,
    COURSE_TEXT,
    COURSES_INTRO,
    LESSONS,
    LESSONS_INTRO,
    MY_COURSES_TEXT,
    PRIVACY_TEXT,
    OPEN_TECHCARDS,
    CLOSE_TECHCARDS,
    TECHCARDS_INTRO,
    TECHCARDS_INTRO2,
    UNSUBSCRIBED_TEXT,
    WELCOME_TEXT,
)
from keyboards import (
    MAIN_MENU,
    consultation_menu,
    courses_menu,
    lessons_menu,
    links_and_back,
    materials_menu,
    techcards_menu,
    my_techcards_menu,
)

router = Router(name="main_handlers")

# ID лише робочого повідомлення. Вітальне повідомлення лишається,
# щоб нижнє MAIN_MENU не зникало.
active_message: dict[int, int] = {}
# Звідки користувач зайшов у список техкарт або уроків.
# Це потрібно, аби «Назад» справді означало один крок, а не завжди головне меню.
section_back_target: dict[int, str] = {}

COURSES = {
    "modern": "🍰 Сучасний Кондитер",
    "modern2": "🎂 Сучасний Кондитер 2.0",
    "start": "🧁 Кондитер START",
    "tastes": "🍓 Сучасні смаки",
}
TECHCARD_KEYS = {
    "pistachio": "🍰 Торт «Фісташка-малина»",
    "mango": "🥭 Мусовий торт «Манго-маракуя»",
    "macaron": "🍮 Макарон «Солона карамель»",
    "cheesecake": "🥂 Чизкейк «Полуничне шампанське»",
}

MY_TECHCARD_KEYS = {
    "pistachio": "🍰 Торт «Фісташка-малина»",
    "mango": "🥭 Мусовий торт «Манго-маракуя»",
    "macaron": "🍮 Макарон «Солона карамель»",
    "cheesecake": "🥂 Чизкейк «Полуничне шампанське»",
}

LESSON_KEYS = {
    "leveling": "🎂 Вирівнювання торта",
    "fillings": "🍓 Начинки та конфі",
    "layers": "🍰 Ідеальні коржі",
    "decor": "🎨 Складання і декор",
    "more": "📚 Більше уроків",
}


async def show_screen(message: Message, text: str, reply_markup=None) -> None:
    """Надсилає один новий робочий екран, прибираючи попередній."""
    chat_id = message.chat.id
    previous_id = active_message.get(chat_id)
    if previous_id is not None:
        try:
            await message.bot.delete_message(chat_id, previous_id)
        except TelegramBadRequest:
            pass

    sent = await message.answer(text, reply_markup=reply_markup)
    active_message[chat_id] = sent.message_id


async def edit_screen(callback: CallbackQuery, text: str, reply_markup=None) -> None:
    """Змінює те саме робоче повідомлення після inline-натискання."""
    await callback.answer()
    if callback.message is None:
        return
    try:
        await callback.message.edit_text(text, reply_markup=reply_markup)
    except TelegramBadRequest as error:
        if "message is not modified" not in str(error):
            raise


@router.message(CommandStart())
async def start(message: Message) -> None:
    # Це окреме повідомлення тримає постійне нижнє меню.
    # Воно не входить до active_message і тому не стирається навігацією.
    previous_id = active_message.pop(message.chat.id, None)
    if previous_id is not None:
        try:
            await message.bot.delete_message(message.chat.id, previous_id)
        except TelegramBadRequest:
            pass
    await message.answer(WELCOME_TEXT, reply_markup=MAIN_MENU)


@router.message(Command("stop", "unsubscribe"))
async def unsubscribe(message: Message) -> None:
    await show_screen(message, UNSUBSCRIBED_TEXT, MAIN_MENU)


@router.message(Command("privacy"))
async def privacy(message: Message) -> None:
    await show_screen(message, PRIVACY_TEXT, MAIN_MENU)


# П'ять обробників нижнього, постійного меню.
@router.message(F.text == "🎓 Переглянути курси")
async def courses(message: Message) -> None:
    await show_screen(message, COURSES_INTRO, courses_menu())


@router.message(F.text == "📄 Переглянути техкарти")
async def techcards(message: Message) -> None:
    section_back_target[message.chat.id] = "main"
    await show_screen(message, TECHCARDS_INTRO, techcards_menu())


@router.message(F.text == "🎥 Переглянути уроки")
async def lessons(message: Message) -> None:
    section_back_target[message.chat.id] = "main"
    await show_screen(message, LESSONS_INTRO, lessons_menu())


@router.message(F.text == "💬 Консультації")
async def consultation(message: Message) -> None:
    await show_screen(message, CONSULTATION_TEXT, consultation_menu())


@router.message(F.text == "📚 Мої матеріали")
async def materials(message: Message) -> None:
    await show_screen(message, "Перегляньте матеріали які ви придбали", materials_menu())


# Усі наступні переходи працюють inline-кнопками під робочим повідомленням.
@router.callback_query(F.data == "main")
async def back_to_main(callback: CallbackQuery) -> None:
    await callback.answer()

    if callback.message is not None:
        chat_id = callback.message.chat.id
        await callback.message.delete()
        active_message.pop(chat_id, None)


@router.callback_query(F.data == "courses")
async def back_to_courses(callback: CallbackQuery) -> None:
    await edit_screen(callback, COURSES_INTRO, courses_menu())


@router.callback_query(F.data == "techcards")
async def back_to_techcards(callback: CallbackQuery) -> None:
    chat_id = callback.message.chat.id if callback.message is not None else 0
    await edit_screen(
        callback,
        TECHCARDS_INTRO,
        techcards_menu(section_back_target.get(chat_id, "main")),
    )


@router.callback_query(F.data == "lessons")
async def back_to_lessons(callback: CallbackQuery) -> None:
    chat_id = callback.message.chat.id if callback.message is not None else 0
    await edit_screen(
        callback,
        LESSONS_INTRO,
        lessons_menu(section_back_target.get(chat_id, "main")),
    )


@router.callback_query(F.data == "materials")
async def back_to_materials(callback: CallbackQuery) -> None:
    await edit_screen(callback, "Перегляньте матеріали які ви придбали", materials_menu())


@router.callback_query(F.data.startswith("course:"))
async def course_details(callback: CallbackQuery) -> None:
    course_key = callback.data.removeprefix("course:")
    title = COURSES.get(course_key)
    if title is not None:
        await edit_screen(callback, COURSE_TEXT.format(title=title), links_and_back("courses"))


@router.callback_query(F.data.startswith("techcard:"))
async def techcard_details(callback: CallbackQuery) -> None:
    techcard_key = callback.data.removeprefix("techcard:")
    title = TECHCARD_KEYS.get(techcard_key)
    if title is not None:
        await edit_screen(callback, CLOSE_TECHCARDS[title], links_and_back("techcards"))


@router.callback_query(F.data.startswith("lesson:"))
async def lesson_details(callback: CallbackQuery) -> None:
    lesson_key = callback.data.removeprefix("lesson:")
    title = LESSON_KEYS.get(lesson_key)
    if title is not None:
        await edit_screen(callback, LESSONS[title], links_and_back("lessons"))


@router.callback_query(F.data == "materials:courses")
async def my_courses(callback: CallbackQuery) -> None:
    await edit_screen(callback, MY_COURSES_TEXT, links_and_back("materials"))


@router.callback_query(F.data == "materials:techcards")
async def my_techcards(callback: CallbackQuery) -> None:
    if callback.message is not None:
        section_back_target[callback.message.chat.id] = "materials"
    await edit_screen(callback, TECHCARDS_INTRO2, my_techcards_menu("materials"))

@router.callback_query(F.data.startswith("materials:techcards:techcard:"))
async def owned_techcard_details(callback: CallbackQuery) -> None:
    techcard_key = callback.data.removeprefix("materials:techcards:techcard:")
    title = TECHCARD_KEYS.get(techcard_key)
    if title is not None:
        await edit_screen(callback, OPEN_TECHCARDS[title], my_techcards_menu())


@router.callback_query(F.data == "materials:lessons")
async def my_lessons(callback: CallbackQuery) -> None:
    if callback.message is not None:
        section_back_target[callback.message.chat.id] = "materials"
    await edit_screen(callback, LESSONS_INTRO, lessons_menu("materials"))


@router.message()
async def fallback(message: Message) -> None:
    await show_screen(message, "Будь ласка, оберіть потрібний розділ у меню нижче.")
