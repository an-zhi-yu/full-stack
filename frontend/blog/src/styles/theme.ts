import type { ThemeConfig } from 'antd'
import { theme } from 'antd'

const { darkAlgorithm } = theme

/**
 * 自定义主题：深色科技感
 * 与 useThemeStore 联动做亮/暗切换
 */
const baseToken: ThemeConfig['token'] = {
  colorPrimary: '#6366f1',
  colorInfo: '#6366f1',
  colorSuccess: '#22c55e',
  colorWarning: '#f59e0b',
  colorError: '#ef4444',
  borderRadius: 8,
  fontFamily: '"Noto Sans SC", "JetBrains Mono", sans-serif',
}

export const themeConfig: ThemeConfig = {
  token: baseToken,
  components: {
    Button: {
      controlHeight: 40,
      primaryShadow: '0 2px 8px rgba(99, 102, 241, 0.4)',
    },
    Card: {
      borderRadiusLG: 12,
    },
    Input: {
      activeBorderColor: '#6366f1',
      hoverBorderColor: '#818cf8',
    },
  },
}

/** 根据是否深色返回主题（用于 ConfigProvider theme） */
export function getThemeConfig(dark: boolean): ThemeConfig {
  return dark
    ? { ...themeConfig, algorithm: darkAlgorithm }
    : themeConfig
}
