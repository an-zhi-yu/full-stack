import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// 全局样式（CSS 变量、基础重置、动画关键帧）
import './styles/global.less'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
