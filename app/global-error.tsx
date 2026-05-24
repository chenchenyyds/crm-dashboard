'use client';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isDbError =
    error?.message?.includes('database') ||
    error?.message?.includes('connection') ||
    error?.message?.includes('DATABASE_URL') ||
    error?.message?.includes('prisma') ||
    error?.digest?.includes('DB');

  return (
    <html>
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            textAlign: 'center',
            background: '#fafafa',
            color: '#1a1a1a'
          }}
        >
          {isDbError ? (
            <>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Database Not Configured
              </h1>
              <p style={{ maxWidth: '480px', color: '#666', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                This CRM demo requires a PostgreSQL database. Create one in your Vercel dashboard
                (Storage → Postgres), then add the <code>DATABASE_URL</code> environment variable.
              </p>
              <button
                onClick={() => reset()}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #d4d4d4',
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Try Again
              </button>
            </>
          ) : (
            <>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Something went wrong
              </h1>
              <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                {error?.message || 'An unexpected error occurred.'}
              </p>
              <button
                onClick={() => reset()}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #d4d4d4',
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </body>
    </html>
  );
}
