import { Component, type ReactNode } from 'react';

/** Keep a recoverable screen if a downloaded page chunk fails to load. */
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <main className="load-error" role="alert">
          <h1>Не вдалося завантажити сторінку</h1>
          <p>Перевірте з’єднання та спробуйте ще раз.</p>
          <button onClick={() => location.reload()}>Оновити сторінку</button>
        </main>
      );
    return this.props.children;
  }
}
