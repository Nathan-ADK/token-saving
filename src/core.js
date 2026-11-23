/**
 * token-saving core — 纯函数，零依赖，不接触 DSH 运行时。
 * 与 npm 包 token-saving 的 index.js 同源。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RULES_PATH = path.join(__dirname, '..', 'rules.md');

export function getRules() {
  try {
    return fs.readFileSync(RULES_PATH, 'utf8').trim();
  } catch {
    return FALLBACK_RULES;
  }
}

export const FALLBACK_RULES = [
  '# Token 节省准则',
  '工具：bash 优先；读文件用 offset/limit；搜索限定 glob；输出先 head/tail 截断。',
  '节奏：独立调用并发；一轮一任务；先想后调；阶段结论及时落盘。',
  '输出：结论先行；证据折叠；代码给 diff；不复述工具输出。',
  '卫生：任务切换清上下文；大产物落盘给路径；重插件按需启停。',
  '禁止：重跑已成功命令；同回合混装插件+重构+写文档；错误与正文混流。',
].join('\n');

export function systemPrompt() {
  return FALLBACK_RULES;
}

export function estimateTokens(text = '') {
  if (typeof text !== 'string') text = String(text ?? '');
  const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const other = text.length - cjk;
  return Math.ceil(cjk / 1.5 + other / 4);
}

export function suggest(text = '') {
  const out = [];
  if (/\bTODO|FIXME|console\.log|debugger\b/.test(text)) {
    out.push({ issue: '含调试残留', suggestion: '发布前移除 console.log / debugger / TODO' });
  }
  if (text.split('\n').length > 200) {
    out.push({ issue: '文本过长', suggestion: '落盘为文件，正文只给路径 + 摘要（结论先行）' });
  }
  if (/\{[\s\S]{500,}\}/.test(text)) {
    out.push({ issue: '含大段 JSON/对象', suggestion: '只保留关键字段后再读' });
  }
  if ((text.match(/\n/g) || []).length > 30 && /^(INFO|DEBUG|WARN|ERROR)/m.test(text)) {
    out.push({ issue: '含日志', suggestion: '只保留 ERROR/WARN 与关键行，其余折叠' });
  }
  return out;
}

export default { getRules, systemPrompt, estimateTokens, suggest, FALLBACK_RULES };
