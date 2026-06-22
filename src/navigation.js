import { TOOL_DEFINITIONS } from "./config.js";

const TOOL_BY_KEY = new Map(TOOL_DEFINITIONS.map((tool) => [tool.key, tool]));
const KNOWN_HOSTS = new Set(TOOL_DEFINITIONS.map((tool) => tool.host));

const NAV_LABELS = {
  box: "Box",
  pypi: "PyPI",
  hf: "Hugging Face",
  github: "GitHub",
  docker: "Docker",
  mirrors: "Linux",
  proxy: "Proxy",
};

export function getToolBaseUrl(request, key) {
  const url = new URL(request.url);
  const origin = url.origin;
  const tool = TOOL_BY_KEY.get(key);

  if (!tool) {
    return origin;
  }

  if (KNOWN_HOSTS.has(url.hostname.toLowerCase())) {
    return `https://${tool.host}`;
  }

  if (key === "box") {
    return origin;
  }

  return `${origin}/${key}`;
}

export function getDockerRegistryHost(request) {
  const url = new URL(request.url);
  if (KNOWN_HOSTS.has(url.hostname.toLowerCase())) {
    return TOOL_BY_KEY.get("docker").host;
  }
  return url.host;
}

export function renderToolNav(request, activeKey) {
  const links = TOOL_DEFINITIONS.map((tool) => {
    const active = tool.key === activeKey ? ' class="active"' : "";
    return `<a href="${getToolBaseUrl(request, tool.key)}"${active}>${NAV_LABELS[tool.key] ?? tool.title}</a>`;
  });

  return `<nav class="nav" aria-label="Tool navigation">${links.join("")}</nav>`;
}
