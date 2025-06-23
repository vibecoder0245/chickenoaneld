export default function TrustedBanner() {
  return (
    <div className="inline-flex items-center px-4 py-2 bg-green-900/30 border border-green-500/30 rounded-full mb-8 motion-safe:animate-fadeInUp">
      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
      <span className="text-sm font-medium text-green-400">All Systems Operational</span>
    </div>
  )
}
