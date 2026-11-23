/**
 * token-saving — DSH plugin entry (Host half)
 *
 * 把「省 Token 工作法」注入 Agent：提供规则文本、token 估算、文本压缩建议。
 * 纯本地字符串处理，无网络、无子进程、无端口。
 *
 * @module index.js
 */
import { getRules, systemPrompt, estimateTokens, suggest } from './src/core.js'

export const name = 'token-saving'
export const inject = ['tools']

/** 工具定义（DSH tools.register 约定） */
function buildTools() {
  const rulesTool = {
    name: 'token_saving_rules',
    description: '获取省 Token 工作法完整规则（工具选择/调用节奏/输出精简/上下文卫生）。当要控制 token 消耗或上下文体积时调用。',
    parameters: { type: 'object', properties: {}, required: [] },
    async execute() {
      return { ok: true, text: getRules() }
    },
  }

  const estimateTool = {
    name: 'token_saving_estimate',
    description: '估算一段文本的 token 数（中英文混合经验值）。参数 text 为待估算文本。',
    parameters: {
      type: 'object',
      properties: { text: { type: 'string', description: '待估算文本' } },
      required: ['text'],
    },
    async execute({ text } = {}) {
      const s = String(text ?? '')
      return { ok: true, text: `字符: ${s.length} | 估算 token: ${estimateTokens(s)}` }
    },
  }

  const suggestTool = {
    name: 'token_saving_suggest',
    description: '分析一段文本，给出压缩 token 的建议（调试残留/过长/大 JSON/日志）。参数 text 为待分析文本。',
    parameters: {
      type: 'object',
      properties: { text: { type: 'string', description: '待分析文本' } },
      required: ['text'],
    },
    async execute({ text } = {}) {
      const list = suggest(String(text ?? ''))
      if (!list.length) return { ok: true, text: '无明显可压缩项。' }
      return { ok: true, text: list.map(s => `- [${s.issue}] ${s.suggestion}`).join('\n') }
    },
  }

  return [rulesTool, estimateTool, suggestTool]
}

/** DSH 插件入口 */
export function apply(ctx) {
  const logger = ctx.logger ?? console
  const registerAll = (tools) => {
    for (const tool of buildTools()) tools.register(tool)
    logger.info?.('token-saving: 3 tools registered')
  }
  if (ctx.tools && typeof ctx.tools.register === 'function') {
    // 直接提供了 tools 服务
    registerAll(ctx.tools)
  } else if (ctx.inject && typeof ctx.inject === 'function') {
    // 依赖注入模式
    ctx.inject(['tools'], scoped => registerAll(scoped.tools))
  }
  return {
    name,
    rules: getRules,
    systemPrompt,
    estimateTokens,
    suggest,
  }
}

export default apply
