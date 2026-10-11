import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div >
          <h3 >Something went wrong</h3>
          <p>{this.state.error?.message || "An unexpected error occurred in this section."}</p>
          <button onClick={this.handleReset} >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}