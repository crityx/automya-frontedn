'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle } from 'phosphor-react';
import Button from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[200px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="mb-4">
              <AlertTriangle size={48} className="text-red-500 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-black mb-2">
              Une erreur s&apos;est produite
            </h2>
            <p className="text-gray mb-4">
              Désolé, quelque chose s&apos;est mal passé. Veuillez rafraîchir la page ou essayer plus tard.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-4 text-left bg-gray-50 p-4 rounded-lg">
                <summary className="cursor-pointer font-medium">
                  Détails de l&apos;erreur (dev)
                </summary>
                <pre className="text-sm text-red-600 mt-2 whitespace-pre-wrap">
                  {this.state.error.message}
                  {'\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
            >
              Rafraîchir la page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;