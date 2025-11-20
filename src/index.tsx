import React from "react";
import { createRoot } from "react-dom/client";
import "./themes";
import "./index.less";
import "./misc/fonts";
import App from "./App";

import initApp from "./initApp";

// React 18 是 semantic-ui-react 最后支持的大版本，而且原项目的 react 包装器已经死了（2022年停止维护）
// 只能通过抑制这些警告来苟且，因为完全迁移到 fomantic-ui-react 目前只有 alpha 版本不适合生产环境使用
// Suppress known warnings from semantic-ui-react
if (process.env.NODE_ENV === "development") {
  const originalWarn = console.warn;
  const originalError = console.error;

  console.warn = function (...args: any[]) {
    // Check if first argument is a string containing the warning we want to suppress
    if (typeof args[0] === "string") {
      if (
        args[0].includes("Support for defaultProps will be removed") ||
        args[0].includes("findDOMNode is deprecated")
      ) {
        return;
      }
    }
    originalWarn.apply(console, args);
  };

  console.error = function (...args: any[]) {
    // Check if first argument is a string containing the warning we want to suppress
    if (typeof args[0] === "string") {
      if (
        args[0].includes("Support for defaultProps will be removed") ||
        args[0].includes("findDOMNode is deprecated")
      ) {
        return;
      }
    }
    originalError.apply(console, args);
  };
}

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    window.fatalError(
      ["There's a fatal error in the application. It may be a bug.", "应用程序遇到致命错误，这可能是一个 Bug。"],
      error.stack
    );
  }

  render() {
    if (this.state.hasError) return <></>;
    return this.props.children;
  }
}

initApp()
  .then(() => {
    createRoot(document.getElementById("root")).render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
  })
  .catch(err => {
    window.fatalError(
      [
        "There's an error initializing the application. It may be a bug or network issue.",
        "初始化应用程序时出错，这可能是一个 Bug 或网络故障。"
      ],
      err.stack
    );
  });
