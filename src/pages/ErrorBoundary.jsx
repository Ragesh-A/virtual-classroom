import React, { Component } from 'react';
import ErrorElement from '../components/common/ErrorElement';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    this.setState({error })
    console.log( error);
  }

  render() {
    if (this.state.hasError) {
      // Render your fallback UI when an error occurs
      return <ErrorElement error={this.state.error}/>;
    }

    // Render the children if no error occurred
    return this.props.children;
  }
}

export default ErrorBoundary;
