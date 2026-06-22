import box from "./tools/box.js";
import { HEALTH_PATHS, PROJECT, TOOL_DEFINITIONS } from "./config.js";
import docker from "./tools/docker.js";
import github from "./tools/github.js";
import hf from "./tools/hf.js";
import mirrors from "./tools/mirrors.js";
import proxy from "./tools/proxy.js";
import pypi from "./tools/pypi.js";

const HANDLERS = new Map([
  ["box", box],
  ["pypi", pypi],
  ["hf", hf],
  ["github", github],
  ["docker", docker],
  ["mirrors", mirrors],
  ["proxy", proxy],
]);

const TOOLS = TOOL_DEFINITIONS.map((tool) => ({
  ...tool,
  handler: HANDLERS.get(tool.key),
}));

const HOST_ROUTES = new Map(TOOLS.map((tool) => [tool.host, tool]));
const PATH_ROUTES = new Map(TOOLS.map((tool) => [tool.key, tool]));

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (HEALTH_PATHS.has(url.pathname)) {
      return jsonResponse({
        status: "ok",
        service: PROJECT.name,
        version: PROJECT.version,
        hostname: url.hostname,
        tools: TOOL_DEFINITIONS.map(({ key, title, host, description }) => ({
          key,
          title,
          host,
          description,
        })),
      });
    }

    const hostTool = HOST_ROUTES.get(url.hostname.toLowerCase());
    if (hostTool) {
      return hostTool.handler.fetch(request, env, ctx);
    }

    const firstSegment = url.pathname.split("/").filter(Boolean)[0];
    const pathTool = PATH_ROUTES.get(firstSegment);
    if (pathTool) {
      const routedRequest = pathTool.keepPathPrefix ? request : stripToolPrefix(request, firstSegment);
      return pathTool.handler.fetch(routedRequest, env, ctx);
    }

    return box.fetch(request, env, ctx);
  },
};

function jsonResponse(body, init = {}) {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Cache-Control", "no-store");
  return new Response(JSON.stringify(body, null, 2), {
    ...init,
    headers,
  });
}

function stripToolPrefix(request, segment) {
  const url = new URL(request.url);
  const prefix = `/${segment}`;
  if (url.pathname === prefix) {
    url.pathname = "/";
  } else if (url.pathname.startsWith(`${prefix}/`)) {
    url.pathname = url.pathname.slice(prefix.length);
  }
  return new Request(url.toString(), request);
}
