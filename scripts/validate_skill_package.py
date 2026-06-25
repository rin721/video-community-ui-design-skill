#!/usr/bin/env python3
"""Validate the video-community-ui-design-skill package."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

import yaml


SKILL_NAME = "video-community-ui-design-skill"

REQUIRED_FILES = [
    "SKILL.md",
    "README.md",
    "agents/openai.yaml",
    "design-tokens.json",
    "style-profile.md",
    "layout-patterns.md",
    "component-recipes.md",
    "interaction-rules.md",
    "responsive-rules.md",
    "content-rules.md",
    "adaptation-rules.md",
    "frontend-project-rules.md",
    "prompt-templates.md",
    "runtime-decision-tree.md",
    "output-modes.md",
    "validation-checklist.md",
    "examples/landing-page.md",
    "examples/corporate-homepage.md",
    "examples/product-section.md",
    "examples/mobile-page.md",
    "examples/frontend-project.md",
    "examples/forward-tests/design-spec-prompt.md",
    "examples/forward-tests/react-project-prompt.md",
    "examples/forward-tests/static-html-prompt.md",
    "assets/frontend-template/package.json",
    "assets/frontend-template/index.html",
    "assets/frontend-template/src/main.tsx",
    "assets/frontend-template/src/App.tsx",
    "assets/frontend-template/src/pages/HomePage.tsx",
    "assets/frontend-template/src/components/AppShell.tsx",
    "assets/frontend-template/src/components/Navigation.tsx",
    "assets/frontend-template/src/components/Announcement.tsx",
    "assets/frontend-template/src/components/SearchFilter.tsx",
    "assets/frontend-template/src/components/CardGrid.tsx",
    "assets/frontend-template/src/components/MediaCard.tsx",
    "assets/frontend-template/src/components/Button.tsx",
    "assets/frontend-template/src/components/CTA.tsx",
    "assets/frontend-template/src/components/Footer.tsx",
    "assets/frontend-template/src/components/StateBlock.tsx",
    "assets/frontend-template/src/components/Toast.tsx",
    "assets/frontend-template/src/data/fixtures.ts",
    "assets/frontend-template/src/styles/tokens.css",
    "assets/frontend-template/src/styles/base.css",
    "assets/frontend-template/src/styles/app.css",
    "assets/frontend-template/README.md",
    "assets/static-template/index.html",
    "assets/static-template/styles/tokens.css",
    "assets/static-template/styles/base.css",
    "assets/static-template/styles/app.css",
    "assets/static-template/scripts/app.js",
    "assets/static-template/data/fixtures.json",
    "assets/static-template/README.md",
]

README_REQUIRED_TEXT = [
    "agents/openai.yaml",
    "scripts/validate_skill_package.py",
    "assets/frontend-template/",
    "assets/static-template/",
    "examples/frontend-project.md",
    "examples/forward-tests/",
]

HYGIENE_MARKERS = [
    "TODO",
    "FIXME",
    "TBD",
    "example.com",
    "localhost",
    "127.0.0.1",
    "aoi-admin",
    "rin721",
    "Character_Skill_Producer",
    "home-ui-design-skill",
    "jiejoe-ui-skill",
    "video-ui-design-skill",
]


def fail(message: str) -> None:
    print(f"[fail] {message}")
    raise SystemExit(1)


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def check_required_files(root: Path) -> None:
    missing = [name for name in REQUIRED_FILES if not (root / name).is_file()]
    if missing:
        fail("missing required file(s): " + ", ".join(missing))


def check_skill_frontmatter(root: Path) -> None:
    content = read_text(root / "SKILL.md")
    match = re.match(r"^---\n(.*?)\n---", content, re.DOTALL)
    if not match:
        fail("SKILL.md must start with YAML frontmatter")
    frontmatter = yaml.safe_load(match.group(1))
    if set(frontmatter) != {"name", "description"}:
        fail("SKILL.md frontmatter must contain only name and description")
    if frontmatter["name"] != SKILL_NAME:
        fail(f"SKILL.md name must be {SKILL_NAME}")
    description = frontmatter.get("description", "")
    if not isinstance(description, str) or "Use when" not in description:
        fail("SKILL.md description must include trigger guidance")


def check_openai_yaml(root: Path) -> None:
    data = yaml.safe_load(read_text(root / "agents/openai.yaml"))
    interface = data.get("interface", {})
    for key in ["display_name", "short_description", "default_prompt"]:
        if not interface.get(key):
            fail(f"agents/openai.yaml missing interface.{key}")
    if f"${SKILL_NAME}" not in interface["default_prompt"]:
        fail("agents/openai.yaml default_prompt must mention the skill with $skill-name")
    policy = data.get("policy", {})
    if policy.get("allow_implicit_invocation") is not True:
        fail("agents/openai.yaml must allow implicit invocation")


def check_design_tokens(root: Path) -> None:
    try:
        data = json.loads(read_text(root / "design-tokens.json"))
    except json.JSONDecodeError as exc:
        fail(f"design-tokens.json is invalid JSON: {exc}")
    meta = data.get("meta", {})
    if meta.get("skillName") != SKILL_NAME:
        fail("design-tokens.json meta.skillName must match SKILL.md name")
    for key in ["color", "typography", "spacing", "radius", "breakpoint", "size"]:
        if key not in data:
            fail(f"design-tokens.json missing top-level token group: {key}")


def check_templates(root: Path) -> None:
    frontend = root / "assets/frontend-template"
    static = root / "assets/static-template"
    frontend_text = "\n".join(
        read_text(path)
        for path in [
            frontend / "src/App.tsx",
            frontend / "src/pages/HomePage.tsx",
            frontend / "src/styles/tokens.css",
            frontend / "src/styles/app.css",
            frontend / "src/components/CTA.tsx",
            frontend / "src/components/Footer.tsx",
            frontend / "README.md",
        ]
    )
    for marker in ["loading", "empty", "error", "success", "focus-visible", "reduced-motion", "cta", "footer"]:
        if marker not in frontend_text:
            fail(f"frontend template missing marker: {marker}")
    static_text = "\n".join(
        read_text(path)
        for path in [
            static / "index.html",
            static / "scripts/app.js",
            static / "styles/app.css",
            static / "README.md",
        ]
    )
    for marker in ["loading", "empty", "error", "success", "focus-visible", "prefers-reduced-motion", "cta", "footer"]:
        if marker not in static_text:
            fail(f"static template missing marker: {marker}")


def check_readme(root: Path) -> None:
    readme = read_text(root / "README.md")
    for text in README_REQUIRED_TEXT:
        if text not in readme:
            fail(f"README.md must mention {text}")


def check_hygiene(root: Path) -> None:
    scanned_suffixes = {".md", ".json", ".yaml", ".yml", ".css", ".html", ".ts", ".tsx", ".js"}
    excluded = {
        root / "scripts/validate_skill_package.py",
    }
    for path in root.rglob("*"):
        if not path.is_file() or path in excluded:
            continue
        if ".git" in path.parts or path.suffix not in scanned_suffixes:
            continue
        text = read_text(path)
        for marker in HYGIENE_MARKERS:
            if marker in text:
                rel = path.relative_to(root).as_posix()
                fail(f"release hygiene marker {marker!r} found in {rel}")


def main() -> None:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    if not root.is_dir():
        fail(f"not a directory: {root}")
    check_required_files(root)
    check_skill_frontmatter(root)
    check_openai_yaml(root)
    check_design_tokens(root)
    check_templates(root)
    check_readme(root)
    check_hygiene(root)
    print("Skill package validation passed.")


if __name__ == "__main__":
    main()
