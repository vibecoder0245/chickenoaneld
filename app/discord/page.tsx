import NewHeader from "@/components/new-header"
import { Button } from "@/components/ui/button"
import { MessageSquareText, Users, Zap, ShieldCheck } from "lucide-react" // Using Lucide icons

export default function DiscordPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <NewHeader />
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="bg-slate-800/50 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-2xl max-w-3xl w-full">
          <MessageSquareText className="w-20 h-20 md:w-28 md:h-28 text-purple-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Join the CDNCheats Community!
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
            Step into our vibrant Discord server – the central hub for all things CDNCheats. Connect with fellow gamers,
            get instant support, receive exclusive announcements, and be part of a thriving community.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 text-left">
            <div className="flex items-start space-x-3 p-4 bg-slate-700/30 rounded-lg">
              <Users className="w-6 h-6 text-purple-400 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-100">Connect & Chat</h3>
                <p className="text-sm text-slate-400">Meet like-minded individuals and discuss your favorite games.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-slate-700/30 rounded-lg">
              <Zap className="w-6 h-6 text-purple-400 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-100">Instant Support</h3>
                <p className="text-sm text-slate-400">Get quick help from our dedicated support team and community.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-slate-700/30 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-purple-400 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-100">Exclusive Updates</h3>
                <p className="text-sm text-slate-400">Be the first to know about new products and special offers.</p>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
            asChild
          >
            <a href="https://discord.gg/yourserverinvite" target="_blank" rel="noopener noreferrer">
              <MessageSquareText className="mr-2 h-5 w-5" />
              Click to Join Discord
            </a>
          </Button>
          <p className="mt-8 text-sm text-slate-400">Your adventure with an enhanced gaming experience starts here!</p>
        </div>
      </main>
      {/* Footer will be added via layout.tsx, but if you need it specifically here for some reason, uncomment: */}
      {/* <Footer /> */}
    </div>
  )
}
