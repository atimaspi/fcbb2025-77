
import React, { Component, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
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
    this.setState({ error, errorInfo });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Erro na Aplicação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Algo deu errado</AlertTitle>
                <AlertDescription>
                  Ocorreu um erro inesperado na aplicação. Nossa equipe foi notificada.
                </AlertDescription>
              </Alert>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-4 p-3 bg-gray-100 rounded text-xs font-mono overflow-auto max-h-32">
                  <div className="font-bold text-red-600">Erro:</div>
                  <div>{this.state.error.message}</div>
                  {this.state.errorInfo && (
                    <>
                      <div className="font-bold text-red-600 mt-2">Stack:</div>
                      <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                    </>
                  )}
                </div>
              )}
              
              <div className="flex gap-2">
                <Button onClick={this.handleRetry} variant="outline" className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Tentar Novamente
                </Button>
                <Button onClick={this.handleGoHome} className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Ir para Início
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
