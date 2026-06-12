import Link from 'next/link';
import TerminalHeader from '@/components/TerminalHeader';
import TerminalFooter from '@/components/TerminalFooter';

export default function NotFound() {
  return (
    <div className="min-h-screen p-6 sm:p-10 flex flex-col">
      <TerminalHeader />
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-[color:var(--accent-2)] mb-4 animate-pulse">404</h1>
        <p className="text-[color:var(--p)] mb-2 font-mono">
          <span className="text-red-400">bash:</span> /page/not/found: No such file or directory
        </p>
        <p className="text-[color:var(--muted)] mb-8 font-mono text-sm">The requested route could not be resolved.</p>
        <Link 
          href="/" 
          className="px-4 py-2 border border-[color:var(--border)] text-[color:var(--accent)] hover:bg-[color:var(--div)] hover:border-[color:var(--accent)] hover:shadow-[0_0_12px_var(--glow)] transition duration-200 rounded-md font-mono inline-flex items-center gap-2"
        >
          <span className="text-[color:var(--muted)]">~$</span> cd ~/home
        </Link>
      </div>
      <TerminalFooter />
    </div>
  );
}
