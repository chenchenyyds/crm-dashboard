'use client';

export default function Error({
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
    error?.message?.includes('prisma');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      {isDbError ? (
        <>
          <h1 className="text-2xl font-semibold mb-2">Database Not Configured</h1>
          <p className="max-w-md text-muted-foreground mb-6">
            This CRM demo requires a PostgreSQL database. Go to your Vercel dashboard
            (Storage → Postgres), create a database, and add the DATABASE_URL environment variable.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
          <p className="text-muted-foreground mb-6">
            {error?.message || 'An unexpected error occurred.'}
          </p>
        </>
      )}
      <button
        onClick={() => reset()}
        className="px-4 py-2 rounded-md border hover:bg-accent"
      >
        Try Again
      </button>
    </div>
  );
}
