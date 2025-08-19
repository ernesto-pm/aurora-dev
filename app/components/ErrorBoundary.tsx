// app/components/ErrorBoundary.tsx
import { useRouteError, isRouteErrorResponse } from "@remix-run/react";

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div className="error-container" style={{ padding: '20px', backgroundColor: '#fee', border: '1px solid #fcc' }}>
                <h2>Route Error</h2>
                <p><strong>Status:</strong> {error.status}</p>
                <p><strong>Status Text:</strong> {error.statusText}</p>
                {error.data && (
                    <details>
                        <summary>Error Details</summary>
                        <pre>{JSON.stringify(error.data, null, 2)}</pre>
                    </details>
                )}
            </div>
        );
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';

    return (
        <div className="error-container" style={{ padding: '20px', backgroundColor: '#fee', border: '1px solid #fcc' }}>
            <h2>Application Error</h2>
            <p><strong>Message:</strong> {errorMessage}</p>
            {errorStack && (
                <details>
                    <summary>Stack Trace</summary>
                    <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>{errorStack}</pre>
                </details>
            )}
        </div>
    );
}