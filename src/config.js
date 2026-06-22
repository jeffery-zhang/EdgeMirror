export const PROJECT = {
  name: "DevBox Workers",
  version: "1.0.0",
  description: "A developer accelerator toolbox for package mirrors, model downloads, registry proxies, and universal file forwarding.",
};

export const HEALTH_PATHS = new Set(["/health", "/healthz", "/__health"]);

export const TOOL_DEFINITIONS = [
  {
    key: "box",
    title: "DevBox Portal",
    host: "box.w0x7ce.eu",
    description: "Landing portal for all toolbox services.",
  },
  {
    key: "pypi",
    title: "PyPI / PyTorch Proxy",
    host: "pypi.w0x7ce.eu",
    description: "PyPI package index, Python wheel, and PyTorch wheel accelerator.",
  },
  {
    key: "hf",
    title: "Hugging Face Proxy",
    host: "hf.w0x7ce.eu",
    description: "Hugging Face API and LFS download accelerator.",
  },
  {
    key: "github",
    title: "GitHub Proxy",
    host: "github.w0x7ce.eu",
    description: "Git clone, release asset, raw file, and GitHub page proxy.",
  },
  {
    key: "docker",
    title: "Docker Registry Proxy",
    host: "docker.w0x7ce.eu",
    description: "Docker Hub and multi-registry image pull accelerator.",
  },
  {
    key: "mirrors",
    title: "Linux Mirrors Proxy",
    host: "mirrors.w0x7ce.eu",
    description: "Pass-through proxy for Linux distribution mirrors.",
  },
  {
    key: "proxy",
    title: "Universal File Proxy",
    host: "proxy.w0x7ce.eu",
    description: "Universal URL-to-download forwarding service.",
    keepPathPrefix: true,
  },
];
