import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-cream">
      <div className="relative">
        {/* Big 404 Text */}
        <h1 className="text-[12rem] md:text-[20rem] font-black leading-none select-none text-black opacity-10">
          404
        </h1>
        
        {/* Floating Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="sticker bg-coral text-white text-2xl md:text-4xl font-black mb-8 -rotate-2">
            LOST IN SPACE?
          </div>
          
          <div className="bg-white border-4 border-black p-8 shadow-brutal max-w-md rotate-1">
            <h2 className="text-3xl font-black mb-4">Whoops!</h2>
            <p className="text-xl font-bold mb-8">
              The page you're looking for has drifted into another dimension.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-black hover:bg-mint hover:text-black transition-all border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                <Home size={20} />
                GO HOME
              </Link>
              <Link
                href="javascript:history.back()"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-black hover:bg-yellow transition-all border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                <ArrowLeft size={20} />
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 sticker bg-yellow -rotate-12 hidden md:block">
        ERROR_CODE: 404
      </div>
      <div className="fixed bottom-20 right-10 sticker bg-mint rotate-12 hidden md:block">
        PAGE_NOT_FOUND
      </div>
      <div className="fixed top-1/4 right-20 sticker bg-purple text-white rotate-6 hidden lg:block">
        ¯\_(ツ)_/¯
      </div>
    </main>
  );
}
