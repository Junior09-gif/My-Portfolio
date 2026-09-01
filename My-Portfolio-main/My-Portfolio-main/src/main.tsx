import { StrictMode, Component, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Error boundary to catch and display runtime crashes
class ErrorBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error: error.message + '\n' + error.stack };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh', background: '#090d16', color: '#f1f5f9',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '2rem', fontFamily: 'monospace',
        }}>
          <div style={{ maxWidth: '56rem', width: '100%' }}>
            <p style={{ color: '#ef4444', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
              ⚠ Runtime Error — Tell Kiro this message:
            </p>
            <pre style={{
              background: '#0d1120', border: '1px solid #1e293b', borderRadius: '0.5rem',
              padding: '1.25rem', fontSize: '0.78rem', color: '#fca5a5',
              whiteSpace: 'pre-wrap', wordBreak: 'break-all', lineHeight: 1.6,
            }}>
              {this.state.error}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
