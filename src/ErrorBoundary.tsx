import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      let errorMessage = "Something went wrong. Please try refreshing the page.";
      
      try {
        if (error?.message) {
          const parsedError = JSON.parse(error.message);
          if (parsedError.error && parsedError.error.includes('Missing or insufficient permissions')) {
            errorMessage = "You don't have permission to perform this action. Please check your account status.";
          }
        }
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="flex items-center justify-center min-h-[400px] p-4">
          <Card className="w-full max-w-md card-shadow border-warning/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="text-warning w-6 h-6" />
              </div>
              <CardTitle>Oops! Pole sana.</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-text-secondary">{errorMessage}</p>
              <Button onClick={() => window.location.reload()} className="w-full">
                Refresh Page
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return children;
  }
}
