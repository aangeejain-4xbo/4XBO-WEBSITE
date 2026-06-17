import React from "react";

interface Props {
  children: React.ReactNode;
  /** Rendered if the child subtree throws (e.g. a WebGL/Three.js failure). */
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches render-time errors in a subtree so a single failing widget
 * (most often a WebGL canvas on an unsupported device) degrades gracefully
 * instead of white-screening the whole page.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("ErrorBoundary caught an error:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
