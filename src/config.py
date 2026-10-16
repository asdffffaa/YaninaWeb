from dataclasses import dataclass
import os

from dotenv import load_dotenv


@dataclass(frozen=True)
class Settings:
    telegram_bot_token: str


def load_settings() -> Settings:
    """Loads local settings without ever hard-coding a token in the source."""
    load_dotenv()
    token = os.getenv("TELEGRAM_BOT_TOKEN", "").strip()

    if not token or token == "встав_сюди_новий_токен":
        raise RuntimeError(
            "Не задано TELEGRAM_BOT_TOKEN. Створи .env на основі .env.example "
            "та встав токен нового бота."
        )

    return Settings(telegram_bot_token=token)

