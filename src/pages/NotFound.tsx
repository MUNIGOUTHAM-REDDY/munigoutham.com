import { Link, useLocation, useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { motion } from 'motion/react'
import SEO from '../components/SEO'

export default function NotFound() {
  const location = useLocation()
  const error = useRouteError()

  const isError = error !== undefined
  const status = isError && isRouteErrorResponse(error) ? error.status : 404
  const title = status === 404 ? 'Page not found' : 'Something broke'
  const detail =
    status === 404
      ? `No route matches ${location.pathname}`
      : isRouteErrorResponse(error)
        ? error.statusText
        : error instanceof Error
          ? error.message
          : 'Unknown error'

  return (
    <main className="relative min-h-screen overflow-hidden bg-night text-star">
      <SEO
        title={`${title} · Muni Goutham`}
        description="The page you tried to reach does not exist."
        path={location.pathname}
        noindex
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(135,194,59,0.10), transparent 45%), radial-gradient(circle at 80% 70%, rgba(135,194,59,0.06), transparent 50%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center px-6 md:px-12">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-star/10 bg-star/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-star/55 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
          Error · {status}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-bold tracking-tight md:text-7xl"
        >
          {title}.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-xl text-base text-star/55 md:text-lg"
        >
          You took an interesting detour. The link may be old, mistyped, or part of an experiment that didn&apos;t ship.
        </motion.p>

        <motion.code
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 inline-block rounded-md border border-star/10 bg-star/[0.03] px-3 py-1.5 font-mono text-xs text-star/55"
        >
          {detail}
        </motion.code>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
            Back to home
          </Link>
          <Link
            to="/#playground"
            className="inline-flex items-center gap-2 rounded-full border border-star/15 bg-star/[0.04] px-5 py-2.5 text-sm font-semibold text-star/80 backdrop-blur transition-colors hover:border-star/30 hover:text-star"
          >
            See the playground
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
