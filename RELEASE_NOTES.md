# v1.0.0 · token-saving

## 中文

首个正式版本。把一套经过实测的「省 Token 工作法」做成两种形态：

- **npm 包 `token-saving`**：零依赖 ESM 库 + CLI，可注入任意 Agent 的 system prompt。
  - `token-saving rules` / `prompt` / `estimate` / `suggest` 四个命令
  - API：`getRules()` `systemPrompt()` `estimateTokens()` `suggest()`
- **DSH 插件 `dsh-token-saving`**：按 `dsh-plugin 0.15` manifest 打包，向 DSH Agent 注入规则并注册三个工具：
  - `token_saving_rules` / `token_saving_estimate` / `token_saving_suggest`

实测：同类任务输出从 17,419 字节压缩到 39 字节（约 446×），并减少 2 轮工具调用。

两种注入模式（`ctx.tools` / `ctx.inject`）均已实测通过。

## English

First stable release. A battle-tested "token frugality" playbook in two flavors:

- **npm package `token-saving`** — zero-dependency ESM library + CLI, injectable into any agent's system prompt.
  - CLI: `rules` / `prompt` / `estimate` / `suggest`
  - API: `getRules()` `systemPrompt()` `estimateTokens()` `suggest()`
- **DSH plugin `dsh-token-saving`** — packaged against `dsh-plugin 0.15`, injects rules into DSH agents and registers three tools:
  - `token_saving_rules` / `token_saving_estimate` / `token_saving_suggest`

Benchmark: output shrank from 17,419 bytes to 39 bytes (~446×), with two fewer tool round-trips.

Both injection modes (`ctx.tools` / `ctx.inject`) verified.
