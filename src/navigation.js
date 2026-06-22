import { HELP_DEFINITION, PROJECT, TOOL_DEFINITIONS } from "./config.js";
import { getLanguage, preserveLanguageUrl } from "./i18n.js";

const TOOL_BY_KEY = new Map(TOOL_DEFINITIONS.map((tool) => [tool.key, tool]));
const KNOWN_HOSTS = new Set(TOOL_DEFINITIONS.map((tool) => tool.host));
const NAV_ITEMS = [...TOOL_DEFINITIONS, HELP_DEFINITION];

const NAV_LABELS = {
  box: "Box",
  pypi: "PyPI",
  hf: "Hugging Face",
  github: "GitHub",
  docker: "Docker",
  mirrors: "Linux",
  proxy: "Proxy",
  npm: "npm",
  go: "Go",
  maven: "Maven",
  crates: "Crates",
  downloads: "Downloads",
  help: "Help",
};

export function getToolBaseUrl(request, key) {
  const url = new URL(request.url);
  const origin = getAppOrigin(url);
  const item = key === HELP_DEFINITION.key ? HELP_DEFINITION : TOOL_BY_KEY.get(key);

  if (!item) {
    return origin;
  }

  return `${origin}${item.path ?? `/${key}`}`;
}

export function getDockerRegistryHost(request) {
  const url = new URL(request.url);
  return new URL(getAppOrigin(url)).host;
}

export function renderToolNav(request, activeKey) {
  const lang = getLanguage(request);
  const links = NAV_ITEMS.map((item) => {
    const active = item.key === activeKey ? ' class="active"' : "";
    const href = preserveLanguageUrl(getToolBaseUrl(request, item.key), lang);
    return `<a href="${href}"${active}>${NAV_LABELS[item.key] ?? item.title}</a>`;
  });

  return `${renderSharedHeaderStyles()}<header class="devbox-header"><nav class="nav" aria-label="Tool navigation">${links.join("")}</nav></header>`;
}

function renderSharedHeaderStyles() {
  return `<style>
    :root { --devbox-header-height: 64px; }
    body { padding-top: var(--devbox-header-height) !important; }
    .devbox-header {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      z-index: 10000 !important;
      height: var(--devbox-header-height) !important;
      display: flex !important;
      align-items: center !important;
      background: rgba(255, 255, 255, 0.92) !important;
      border-bottom: 1px solid rgba(203, 213, 225, 0.88) !important;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
    }
    .devbox-header .nav {
      position: static !important;
      inset: auto !important;
      width: 100% !important;
      height: 100% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: flex-start !important;
      flex-wrap: nowrap !important;
      gap: 8px !important;
      overflow-x: auto !important;
      overflow-y: hidden !important;
      padding: 0 18px !important;
      margin: 0 !important;
      background: transparent !important;
      border: 0 !important;
      box-shadow: none !important;
      scrollbar-width: none !important;
    }
    .devbox-header .nav::-webkit-scrollbar { display: none !important; }
    .devbox-header .nav a {
      flex: 0 0 auto !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-height: 36px !important;
      padding: 0 13px !important;
      border-radius: 999px !important;
      border: 1px solid rgba(203, 213, 225, 0.95) !important;
      background: rgba(248, 250, 252, 0.82) !important;
      color: #475569 !important;
      text-decoration: none !important;
      font-size: 13px !important;
      font-weight: 800 !important;
      line-height: 1 !important;
      white-space: nowrap !important;
      transform: none !important;
      box-shadow: none !important;
      transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease !important;
    }
    .devbox-header .nav a:hover {
      background: #eef2ff !important;
      color: #0f172a !important;
      border-color: #c7d2fe !important;
    }
    .devbox-header .nav a.active {
      background: #0f172a !important;
      color: #ffffff !important;
      border-color: #0f172a !important;
    }
    @media (max-width: 640px) {
      :root { --devbox-header-height: 58px; }
      .devbox-header .nav { padding: 0 12px !important; gap: 6px !important; }
      .devbox-header .nav a { min-height: 34px !important; padding: 0 11px !important; font-size: 12px !important; }
    }
  </style>`;
}

export function getAppOrigin(url) {
  if (KNOWN_HOSTS.has(url.hostname.toLowerCase())) {
    return `https://${PROJECT.primaryHost}`;
  }

  return url.origin;
}
