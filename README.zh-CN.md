<p align="center">
  <strong>中文</strong> | <a href="README.md">English</a>
</p>

<h1 align="center">DevBox Workers</h1>

<p align="center">
  一个可生产部署的开发者加速工具箱，覆盖 PyPI、PyTorch、Hugging Face、GitHub、Docker 镜像仓库、Linux 软件源和通用文件下载代理。
</p>

<p align="center">
  <a href="https://deploy.workers.cloudflare.com/?url=https://github.com/tianrking/box-tools">
    <img alt="Deploy to Cloudflare" src="https://img.shields.io/badge/Deploy%20to-Cloudflare-f38020?style=for-the-badge&logo=cloudflare&logoColor=white&labelColor=111827">
  </a>
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/tianrking/box-tools">
    <img alt="Deploy with Vercel" src="https://img.shields.io/badge/Deploy%20with-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white&labelColor=111827">
  </a>
</p>

<p align="center">
  <img alt="Verify" src="https://img.shields.io/github/actions/workflow/status/tianrking/box-tools/verify.yml?branch=main&style=for-the-badge&label=verify">
  <img alt="Runtime" src="https://img.shields.io/badge/runtime-Cloudflare%20Workers%20%7C%20Vercel%20Functions-0f172a?style=for-the-badge">
  <img alt="Language" src="https://img.shields.io/badge/language-JavaScript%20ESM-f7df1e?style=for-the-badge&labelColor=111827">
  <img alt="Package manager" src="https://img.shields.io/badge/package-npm-cb3837?style=for-the-badge">
  <img alt="Maintainer" src="https://img.shields.io/badge/maintainer-tianrking-2563eb?style=for-the-badge">
</p>

## 项目定位

DevBox Workers 是一个单域名边缘应用，用一个仓库提供一组常用开发加速服务。推荐的生产玩法是一个公开域名，例如 `box.w0x7ce.eu`，然后用路径区分服务：`/pypi`、`/hf`、`/github`、`/docker`、`/mirrors`、`/proxy`、`/help`。

维护者：[tianrking](https://github.com/tianrking)

关键词：Cloudflare Workers 代理，Vercel Functions 代理，PyPI 加速，PyTorch wheel 代理，Hugging Face 镜像，Docker registry 代理，GitHub raw 代理，Linux 软件源代理，开发者工具箱。

## 技术栈标签卡片

<p align="center">
  <img alt="Cloudflare Workers" src="https://img.shields.io/badge/Cloudflare-Workers-f38020?style=for-the-badge">
  <img alt="Vercel Functions" src="https://img.shields.io/badge/Vercel-Functions-000?style=for-the-badge">
  <img alt="JavaScript ESM" src="https://img.shields.io/badge/JavaScript-ESM-f7df1e?style=for-the-badge&labelColor=111827">
  <img alt="Single domain" src="https://img.shields.io/badge/single--domain-paths-2563eb?style=for-the-badge">
  <img alt="Path routing" src="https://img.shields.io/badge/path-routing-16a34a?style=for-the-badge">
  <img alt="PyPI" src="https://img.shields.io/badge/PyPI-packages-3775a9?style=for-the-badge">
  <img alt="PyTorch" src="https://img.shields.io/badge/PyTorch-wheels-ee4c2c?style=for-the-badge">
  <img alt="Hugging Face" src="https://img.shields.io/badge/Hugging%20Face-models-ffd21e?style=for-the-badge&labelColor=111827">
  <img alt="GitHub" src="https://img.shields.io/badge/GitHub-proxy-2da44e?style=for-the-badge">
  <img alt="Docker" src="https://img.shields.io/badge/Docker-registry-0db7ed?style=for-the-badge">
  <img alt="Linux mirrors" src="https://img.shields.io/badge/Linux-mirrors-8b5cf6?style=for-the-badge">
  <img alt="Universal proxy" src="https://img.shields.io/badge/Universal-file%20proxy-d946ef?style=for-the-badge">
  <img alt="Syntax check" src="https://img.shields.io/badge/syntax-check-22c55e?style=for-the-badge">
  <img alt="Smoke test" src="https://img.shields.io/badge/smoke-tested-22c55e?style=for-the-badge">
  <img alt="npm audit" src="https://img.shields.io/badge/npm-audit-22c55e?style=for-the-badge">
  <img alt="One click deploy" src="https://img.shields.io/badge/one--click-deploy-7c3aed?style=for-the-badge">
  <img alt="Wrangler" src="https://img.shields.io/badge/Wrangler-4.x-f38020?style=for-the-badge">
</p>

## 服务清单

| 服务 | 单域名路径 | 功能 |
| --- | --- | --- |
| DevBox Portal | `/` 或 `/box` | 所有工具的可视化入口和使用示例 |
| Help | `/help` | 美观的路径地图、网页用法、命令行示例和配置说明 |
| PyPI / PyTorch | `/pypi` | PyPI simple index、Python 包文件、PyTorch wheel 代理 |
| Hugging Face | `/hf` | Hugging Face API 与 LFS 大文件下载代理 |
| GitHub | `/github` | Git clone、Raw 文件、Release 资源和页面代理 |
| Docker Registry | `/docker` UI，`/v2` API | Docker Hub 以及 `quay`、`gcr`、`k8s`、`ghcr`、`nvcr` 前缀 |
| Linux Mirrors | `/mirrors` | APT、YUM、DNF、Pacman、wget、curl 的透传软件源代理 |
| Universal Proxy | `/proxy` | 通用 URL 转发和下载文件名处理 |

## 一键部署

### 部署到 Cloudflare Workers

点击 README 顶部的 Cloudflare 按钮，或直接打开：

```text
https://deploy.workers.cloudflare.com/?url=https://github.com/tianrking/box-tools
```

Cloudflare 会读取 `wrangler.toml`，创建 Worker，并应用项目配置。默认配置只绑定一个自定义域名 `box.w0x7ce.eu`，所有工具都通过这个域名的不同路径访问。

### 部署到 Vercel

点击 README 顶部的 Vercel 按钮，或直接打开：

```text
https://vercel.com/new/clone?repository-url=https://github.com/tianrking/box-tools
```

Vercel 会使用 `api/index.js` 作为 Web Handler 函数入口，并根据 `vercel.json` 把所有路径转发到该函数。Vercel 部署使用同一套路由：`/pypi`、`/hf`、`/github`、`/docker`、`/mirrors`、`/proxy`、`/help`。Docker Registry API 流量会在 `/v2`、`/token`、`/_worker_blob_proxy` 自动识别，因此单个 Vercel 域名也可以直接用于 Docker pull，不需要把 `/docker` 写进镜像名。

## 本地开发

```bash
npm install
npm run verify
npm run dev
```

常用命令：

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动 Cloudflare Worker 本地开发服务器 |
| `npm run dev:cloudflare` | 与 `npm run dev` 相同 |
| `npm run dev:vercel` | 使用 `npx vercel@latest dev` 启动 Vercel 本地开发 |
| `npm run check` | 语法检查 `src` 和 `scripts` 下所有 JavaScript 文件 |
| `npm run smoke:vercel` | 导入 Vercel 函数入口并验证核心路由 |
| `npm run verify` | 运行语法检查、Vercel smoke test 和高危 npm audit |
| `npm run deploy:cloudflare` | 使用 Wrangler 部署到 Cloudflare |
| `npm run deploy:vercel` | 使用 `npx vercel@latest --prod` 部署到 Vercel 生产环境 |

## 路由模型

DevBox Workers 以单域名路径路由为主：

| 路由方式 | 示例 | 说明 |
| --- | --- | --- |
| 路径路由 | `https://box.w0x7ce.eu/pypi/simple/` | 推荐生产模式 |
| Vercel 路径路由 | `https://your-app.vercel.app/pypi/simple/` | Vercel 一键部署后使用同样路径 |

单域名部署下的 Docker 用法：

```bash
docker pull your-app.vercel.app/library/nginx:latest
```

路由器会自动把 Docker 的 `/v2`、`/token` 和 blob redirect 流量转交给 Docker 工具。

健康检查路径：

```text
/health
/healthz
/__health
```

健康检查会返回项目版本和已注册服务列表。

## 使用示例

安装 Python 包：

```bash
pip install numpy -i https://box.w0x7ce.eu/pypi/simple/
```

安装 PyTorch wheel：

```bash
pip install torch torchvision --index-url https://box.w0x7ce.eu/pypi/pytorch/cu118
```

下载 Hugging Face 模型：

```bash
export HF_ENDPOINT=https://box.w0x7ce.eu/hf
huggingface-cli download gpt2
```

通过 GitHub 代理克隆仓库：

```bash
git clone https://box.w0x7ce.eu/github/tianrking/box-tools.git
```

拉取 Docker 镜像：

```bash
docker pull box.w0x7ce.eu/library/nginx:latest
```

代理任意文件：

```bash
curl -L -O "https://box.w0x7ce.eu/proxy/https://example.com/file.zip"
```

## 项目结构

```text
api/index.js              Vercel Functions Web Handler 入口
scripts/check-syntax.mjs  跨平台 JavaScript 语法检查脚本
scripts/smoke-vercel.mjs  Vercel 运行时 smoke test
src/config.js             项目元数据、服务注册表、健康检查路径
src/html.js               非 Cloudflare 运行时的 HTML rewrite fallback
src/index.js              域名/路径路由和健康检查入口
src/tools/*.js            各工具实现
vercel.json               Vercel 路由与构建配置
wrangler.toml             Cloudflare Workers 配置
```

## 配置说明

新增、重命名或说明工具时，优先修改 `src/config.js`。修改 Cloudflare Worker 名称、兼容日期或主域名时，修改 `wrangler.toml`。

如果要在 Vercel 使用自定义域名，请在 Vercel 控制台添加一个主域名，并继续使用同样的路径路由。

## 生产注意事项

- 部署前保持 `npm run verify` 通过。
- 保持 `wrangler` 更新，它是本地 Cloudflare 开发和部署工具链。
- `wrangler.toml` 中的 Cloudflare 自定义域名与账户绑定。
- 公开产品体验推荐使用一个主域名；旧的多工具多域名不是推荐交互模型。
- 上游服务自己的限流、认证要求和服务条款仍然适用。

## 后续路线

- 支持通过环境变量配置服务域名。
- 增加结构化访问日志和可选请求追踪。
- 为每个工具补充 mock upstream 的 smoke test。
- 增加门户和工具页面的部署预览截图。
