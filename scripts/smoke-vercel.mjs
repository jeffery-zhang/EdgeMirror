const api = await import("../api/index.js");

const checks = [
  {
    name: "health",
    request: new Request("https://box-tools.vercel.app/healthz"),
    assert: async (response) => {
      const payload = await response.json();
      return response.status === 200 && payload.status === "ok" && Array.isArray(payload.tools);
    },
  },
  {
    name: "portal path route",
    request: new Request("https://box-tools.vercel.app/box"),
    assert: async (response) =>
      response.status === 200 && response.headers.get("content-type")?.includes("text/html"),
  },
  {
    name: "github path route",
    request: new Request("https://box-tools.vercel.app/github"),
    assert: async (response) =>
      response.status === 200 && response.headers.get("content-type")?.includes("text/html"),
  },
];

for (const check of checks) {
  const response = await api.default.fetch(check.request);
  if (!(await check.assert(response))) {
    throw new Error(`${check.name} failed with status ${response.status}`);
  }
  console.log(`ok ${check.name}`);
}
