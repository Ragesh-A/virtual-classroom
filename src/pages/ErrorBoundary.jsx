import React, { Component } from 'react';
import ErrorElement from '../components/common/ErrorElement';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error })
    console.log( error);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorElement error={this.state.error}/>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
