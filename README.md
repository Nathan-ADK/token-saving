# token-saving · DSH Edition

> 省 Token 工作法插件 —— 向 Agent 注入上下文 / 输出精简规则，并提供 token 估算与文本压缩建议工具。零依赖、无网络、无子进程。
>
> A context/output frugality plugin for DSH agents — injects compaction rules and exposes token-estimation & text-compression tools. Zero dependencies, no network, no subprocesses.

**中文** · [English](#english)

---

> 与 npm 包 [`token-saving`](https://www.npmjs.com/package/token-saving) 同源。本版按 DSH `dsh-plugin 0.15` manifest 打包，供 DSH 插件市场安装。
> Same source as the npm package; this build targets the DSH `dsh-plugin 0.15` manifest for the DSH plugin marketplace.

## 安装 / Install

在 DSH 插件市场搜索 `token-saving`，或把本目录放到 DSH 插件目录。
Search `token-saving` in the DSH marketplace, or place this directory into the DSH plugins folder.

## 提供的工具 / Tools

| 工具 / Tool | 说明 / Description |
|------|------|
| `token_saving_rules` | 获取完整省 Token 规则 / Get the full frugality rule set |
| `token_saving_estimate` | 估算文本 token 数 / Estimate token count of a text |
| `token_saving_suggest` | 给出文本压缩建议 / Suggest ways to compress a text |

## 核心规则 / Core rules

- **工具**：bash 优先；读文件用 `offset/limit`；搜索限定 `glob`；输出先 `head/tail` 截断
- **节奏**：独立调用并发；一轮一任务；先想后调；阶段结论落盘
- **输出**：结论先行；证据折叠；代码给 diff；不复述工具输出
- **卫生**：任务切换清上下文；大产物落盘给路径；重插件按需启停

完整规则见 `rules.md`。/ See `rules.md` for the full rules.

## License

MIT

---

<a id="english"></a>

## English

**token-saving for DSH** injects a proven context/output frugality playbook into the agent and exposes three tools: full rules, token estimation, and compression suggestions. Zero dependencies, no network access, no subprocesses.

Same codebase as the npm `token-saving` package, packaged against the DSH `dsh-plugin 0.15` manifest for the DSH marketplace.

**Install** — search `token-saving` in the DSH marketplace, or drop this directory into the DSH plugins folder.

**Tools** — `token_saving_rules` (full rules), `token_saving_estimate` (token count), `token_saving_suggest` (compression tips).

**Core rules** — prefer bash; read with `offset/limit`; scope searches with `glob`; truncate with `head/tail`; parallelize independent calls; one task per turn; lead with conclusions; fold evidence; keep heavy plugins on demand.

MIT licensed.
