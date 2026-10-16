import asyncio
import logging

from aiogram import Bot, Dispatcher

from config import load_settings
from handlers import router


async def main() -> None:
    settings = load_settings()
    bot = Bot(token=settings.telegram_bot_token)
    dispatcher = Dispatcher()
    dispatcher.include_router(router)

    await bot.delete_webhook(drop_pending_updates=False)
    await dispatcher.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    asyncio.run(main())

