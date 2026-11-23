# token-saving · DSH 版

省 Token 工作法插件。向 Agent 注入上下文/输出精简规则，并提供 token 估算与文本压缩建议工具。零依赖、无网络、无子进程。

> 与 npm 包 `token-saving` 同源，本版按 DSH `dsh-plugin 0.15` manifest 打包，供 DSH 插件市场安装。

## 安装

在 DSH 插件市场搜索 `token-saving`，或把本目录放到 DSH 插件目录。

## 提供的工具

| 工具 | 说明 |
|------|------|
| `token_saving_rules` | 获取完整省 Token 规则 |
| `token_saving_estimate` | 估算文本 token 数 |
| `token_saving_suggest` | 给出文本压缩建议 |

## 核心规则摘要

- 工具：bash 优先；读文件用 offset/limit；搜索限定 glob；输出先 head/tail 截断
- 节奏：独立调用并发；一轮一任务；先想后调；阶段结论落盘
- 输出：结论先行；证据折叠；代码给 diff；不复述工具输出
- 卫生：任务切换清上下文；大产物落盘给路径；重插件按需启停

完整规则见 `rules.md`。

## License

MIT
