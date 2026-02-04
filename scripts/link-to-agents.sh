#!/bin/bash

#
#   .opencode/skills/  ← ~/.agents/skills
#   .opencode/commands/ ← ~/.agents/commands
#   .claude/skills/    ← ~/.agents/skills
#   .claude/commands/  ← ~/.agents/commands
#
#   ./scripts/link-to-agents.sh                    - link all
#   ./scripts/link-to-agents.sh opencode           - only .opencode/
#   ./scripts/link-to-agents.sh claude             - only .claude/
#   ./scripts/link-to-agents.sh unlink             - unlink all
#   ./scripts/link-to-agents.sh unlink opencode    - unlink from .opencode/

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

PROJECT_DIR="$(pwd)"
AGENTS_DIR="$HOME/.agents"

MODE="link"
TARGET="all"

if [ "$1" = "unlink" ]; then
    MODE="unlink"
    TARGET="${2:-all}"
elif [ -n "$1" ]; then
    TARGET="$1"
fi

echo -e "${BLUE}🔗 Linkowanie z ~/.agents/ do narzędzi AI${NC}"
echo -e "${BLUE}   Projekt: $PROJECT_DIR${NC}"
echo -e "${BLUE}   Tryb: $MODE${NC}"
echo -e "${BLUE}   Cel: $TARGET${NC}"
echo ""

if [ ! -d "$AGENTS_DIR" ]; then
    echo -e "${RED}❌ Katalog ~/.agents nie istnieje!${NC}"
    exit 1
fi

count=0

create_link() {
    local src="$1"
    local dest="$2"
    local name="$3"

    if [ ! -e "$src" ]; then
        return 1
    fi

    if [ "$MODE" = "unlink" ]; then
        if [ -L "$dest" ]; then
            rm "$dest"
            echo -e "${GREEN}✅ Usunięto: $name${NC}"
            return 0
        fi
    else
        mkdir -p "$(dirname "$dest")"

        [ -L "$dest" ] && rm "$dest"

        if [ -e "$dest" ] && [ ! -L "$dest" ]; then
            echo -e "${YELLOW}⚠️  Pominięto $name: istnieje (nie symlink)${NC}"
            return 1
        fi

        ln -s "$src" "$dest"
        echo -e "${GREEN}✅ $name${NC}"
        return 0
    fi
    return 1
}

link_opencode() {
    echo -e "${CYAN}🔷 OpenCode...${NC}"

    if [ -d "$AGENTS_DIR/skills" ]; then
        echo -e "${BLUE}   Skills → .opencode/skills/${NC}"
        for src in "$AGENTS_DIR/skills"/*/; do
            [ -d "$src" ] || continue
            local name=$(basename "$src")
            create_link "$src" "$PROJECT_DIR/.opencode/skills/$name" "$name" && ((count++))
        done
    fi

    if [ -d "$AGENTS_DIR/commands" ]; then
        echo -e "${BLUE}   Commands → .opencode/commands/${NC}"
        for src in "$AGENTS_DIR/commands"/*/; do
            [ -d "$src" ] || continue
            local name=$(basename "$src")
            create_link "$src" "$PROJECT_DIR/.opencode/commands/$name" "$name" && ((count++))
        done
    fi

    if [ -d "$AGENTS_DIR/agents" ]; then
        echo -e "${BLUE}   Agents → .opencode/agents/${NC}"
        for src in "$AGENTS_DIR/agents"/*/; do
            [ -d "$src" ] || continue
            local name=$(basename "$src")
            create_link "$src" "$PROJECT_DIR/.opencode/agents/$name" "$name" && ((count++))
        done
    fi

    echo ""
}

link_claude() {
    echo -e "${CYAN}🟣 Claude...${NC}"

    # Skills -> .claude/skills/
    if [ -d "$AGENTS_DIR/skills" ]; then
        echo -e "${BLUE}   Skills → .claude/skills/${NC}"
        for src in "$AGENTS_DIR/skills"/*/; do
            [ -d "$src" ] || continue
            local name=$(basename "$src")
            create_link "$src" "$PROJECT_DIR/.claude/skills/$name" "$name" && ((count++))
        done
    fi

    if [ -d "$AGENTS_DIR/commands" ]; then
        echo -e "${BLUE}   Commands → .claude/commands/${NC}"
        for src in "$AGENTS_DIR/commands"/*/; do
            [ -d "$src" ] || continue
            local name=$(basename "$src")
            create_link "$src" "$PROJECT_DIR/.claude/commands/$name" "$name" && ((count++))
        done
    fi

    if [ -d "$AGENTS_DIR/agents" ]; then
        echo -e "${BLUE}   Agents → .claude/agents/${NC}"
        for src in "$AGENTS_DIR/agents"/*/; do
            [ -d "$src" ] || continue
            local name=$(basename "$src")
            create_link "$src" "$PROJECT_DIR/.claude/agents/$name" "$name" && ((count++))
        done
    fi

    echo ""
}

link_cursor() {
    echo -e "${CYAN}🖱️  Cursor...${NC}"

    if [ -d "$AGENTS_DIR/skills" ]; then
        echo -e "${BLUE}   Skills → .cursor/skills/${NC}"
        for src in "$AGENTS_DIR/skills"/*/; do
            [ -d "$src" ] || continue
            local name=$(basename "$src")
            create_link "$src" "$PROJECT_DIR/.cursor/skills/$name" "$name" && ((count++))
        done
    fi

    echo ""
}

case "$TARGET" in
    all)
        link_opencode
        link_claude
        ;;
    opencode)
        link_opencode
        ;;
    claude)
        link_claude
        ;;
    cursor)
        link_cursor
        ;;
    *)
        echo -e "${RED}❌ Nieznany cel: $TARGET${NC}"
        echo "Użycie: $0 [opencode|claude|unlink]"
        exit 1
        ;;
esac

echo -e "${GREEN}🎉 Gotowe!${NC}"
echo ""
echo -e "${BLUE}Struktura projektu:${NC}"
ls -la "$PROJECT_DIR/.opencode" 2>/dev/null || true
ls -la "$PROJECT_DIR/.claude" 2>/dev/null || true
