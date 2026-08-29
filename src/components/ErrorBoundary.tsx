import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean; error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (typeof window !== 'undefined') {
      console.error('[ErrorBoundary]', error, info)
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen grid place-items-center px-5 bg-[#f8fafc] text-slate-950">
          <div className="max-w-lg text-center">
            <p className="text-xs font-black tracking-[0.24em] text-blue-700 uppercase">Something went wrong</p>
            <h1 className="mt-5 text-4xl font-black tracking-tight">We hit a small snag.</h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              The page encountered an unexpected error. You can safely reload or return home — your data is safe.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-extrabold text-white shadow-lg"
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #223e86)' }}
              >
                Return home
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-3.5 font-extrabold text-slate-900"
              >
                Reload page
              </button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
