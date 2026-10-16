"""Offline bot checks; never import aiogram, load credentials or contact Telegram."""
import ast
from pathlib import Path
import unittest

SOURCE = Path(__file__).resolve().parents[1] / "src"


def parse(name):
    return ast.parse((SOURCE / name).read_text(encoding="utf-8-sig"))


def literals(name):
    values = {}
    for node in parse(name).body:
        if isinstance(node, ast.Assign) and isinstance(node.targets[0], ast.Name):
            try:
                values[node.targets[0].id] = ast.literal_eval(node.value)
            except (ValueError, TypeError):
                pass
    return values


class BotSourceTests(unittest.TestCase):
    def test_all_modules_compile_without_execution(self):
        for path in SOURCE.glob("*.py"):
            with self.subTest(module=path.name):
                compile(parse(path.name), str(path), "exec")

    def test_handler_names_are_unique(self):
        names = [node.name for node in parse("handlers.py").body
                 if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef))]
        self.assertEqual(len(names), len(set(names)))

    def test_catalog_routes_have_content(self):
        routes, content = literals("handlers.py"), literals("content.py")
        callbacks = {node.value for node in ast.walk(parse("keyboards.py"))
                     if isinstance(node, ast.Constant) and isinstance(node.value, str)}
        for title in routes["COURSES"].values():
            self.assertIn(title, content["COURSE_TEXT"].format(title=title))
        for route, target, prefix in [("TECHCARD_KEYS", "CLOSE_TECHCARDS", "techcard:"),
                                     ("MY_TECHCARD_KEYS", "OPEN_TECHCARDS", "materials:techcards:techcard:"),
                                     ("LESSON_KEYS", "LESSONS", "lesson:")]:
            for key, label in routes[route].items():
                if prefix + key not in callbacks:
                    continue  # Only published menu entries need content.
                with self.subTest(route=route, key=key):
                    self.assertIn(label, content[target])
                    self.assertTrue(content[target][label].strip())


if __name__ == "__main__":
    unittest.main()
