import React from 'react';
import { COMPANY_DETAILS } from '../../data/mockData';

interface State {
  hasError: boolean;
}

/**
 * A render error in any section previously blanked the whole page with no way to
 * contact anyone. Now the contact routes survive the crash.
 */
export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Unhandled UI error', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const tel = 'tel:' + COMPANY_DETAILS.phone.replace(/\s/g, '');
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBFA] px-6 text-center font-sans">
        <div className="max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
          <p className="text-sm text-slate-600">
            Sorry — this page failed to load. Our advisory team is still reachable directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href={tel}
              className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Call {COMPANY_DETAILS.phone}
            </a>
            <a
              href={'mailto:' + COMPANY_DETAILS.email}
              className="px-5 py-2.5 border border-slate-300 text-slate-800 text-sm font-bold rounded-lg hover:bg-slate-100 transition-colors"
            >
              {COMPANY_DETAILS.email}
            </a>
          </div>
          <button
            type="button"
            onClick={() => window.location.assign('/')}
            className="text-xs text-sky-600 hover:underline pt-2"
          >
            Reload the site
          </button>
        </div>
      </div>
    );
  }
}
