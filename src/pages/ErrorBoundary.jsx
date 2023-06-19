import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render your fallback UI when an error occurs
      return <h1>Something went wrong.</h1>;
    }

    // Render the children if no error occurred
    return this.props.children;
  }
}

export default ErrorBoundary;
