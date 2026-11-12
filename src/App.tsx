import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Grid3X3, Smartphone, RotateCcw } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [showGrid, setShowGrid] = useState<boolean>(true);

  const goToPage2 = () => {
    setDirection('forward');
    setCurrentPage(2);
  };

  const goToPage1 = () => {
    setDirection('backward');
    setCurrentPage(1);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentPage === 1) goToPage2();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        if (currentPage === 2) goToPage1();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Motion slide variants
  const slideVariants = {
    enter: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-black font-mono flex flex-col items-center justify-center p-3 sm:p-6 select-none relative overflow-x-hidden">
      {/* Background blueprint decorative subtle dots/grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40" 
        style={{
          backgroundImage: 'radial-gradient(#a1a1aa 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Top wireframe meta header / toolbar */}
      <header className="z-10 mb-4 flex flex-wrap items-center justify-between gap-3 w-full max-w-[430px] px-2 text-xs border-b border-black pb-2">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wider uppercase border border-black px-1.5 py-0.5 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            WIREFRAME
          </span>
          <span className="text-zinc-600 font-sans text-[11px]">
            iPhone 14 (390 × 844)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGrid(!showGrid)}
            title="Mostra/Nascondi griglia di riferimento"
            className={`flex items-center gap-1 border border-black px-2 py-0.5 transition-colors cursor-pointer text-[11px] ${
              showGrid ? 'bg-black text-white' : 'bg-white text-black hover:bg-zinc-100'
            }`}
          >
            <Grid3X3 className="w-3 h-3" />
            <span>Griglia</span>
          </button>

          <button
            onClick={() => {
              if (currentPage === 1) goToPage2();
              else goToPage1();
            }}
            title="Resetta a Pagina 1"
            className="flex items-center gap-1 border border-black bg-white hover:bg-zinc-100 px-2 py-0.5 cursor-pointer text-[11px]"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </header>

      {/* Wireframe info badge */}
      <div className="z-10 mb-3 flex items-center justify-between w-full max-w-[430px] px-2 text-[11px] text-zinc-700">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full border border-black bg-white inline-block" />
          <span>Schermata attiva: <strong className="text-black font-semibold">Pagina {currentPage}</strong></span>
        </div>
        <span className="border-b border-dashed border-zinc-500">
          {currentPage === 1 ? 'Premi "avanti" per Pagina 2' : 'Premi "indietro" per Pagina 1'}
        </span>
      </div>

      {/* iPhone 14 Device Mockup Frame */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Hardware side buttons (Wireframe outlines) */}
        {/* Left: Silent switch */}
        <div className="absolute -left-[5px] top-[115px] w-[5px] h-[26px] bg-white border border-black rounded-l-sm" />
        {/* Left: Volume Up */}
        <div className="absolute -left-[5px] top-[155px] w-[5px] h-[50px] bg-white border border-black rounded-l-sm" />
        {/* Left: Volume Down */}
        <div className="absolute -left-[5px] top-[215px] w-[5px] h-[50px] bg-white border border-black rounded-l-sm" />
        {/* Right: Power button */}
        <div className="absolute -right-[5px] top-[170px] w-[5px] h-[75px] bg-white border border-black rounded-r-sm" />

        {/* iPhone 14 Chassis */}
        <div className="w-[390px] h-[844px] max-h-[85vh] aspect-[390/844] bg-white border-[3px] border-black rounded-[50px] p-[10px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative flex flex-col overflow-hidden">
          
          {/* Inner bezel / screen container */}
          <div className="w-full h-full bg-white border border-black rounded-[40px] flex flex-col relative overflow-hidden">
            
            {/* Wireframe optional coordinate grid inside screen */}
            {showGrid && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-20 z-0"
                style={{
                  backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />
            )}

            {/* iPhone 14 Notch with Front Camera & Speaker */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[30px] bg-white border-b-2 border-x-2 border-black rounded-b-[18px] z-30 flex items-center justify-center gap-3">
              {/* Speaker slit */}
              <div className="w-12 h-1 bg-black rounded-full" />
              {/* Camera aperture wireframe */}
              <div className="w-2.5 h-2.5 rounded-full border border-black flex items-center justify-center">
                <div className="w-1 h-1 bg-black rounded-full" />
              </div>
            </div>

            {/* iOS Status Bar (Wireframe style) */}
            <div className="w-full h-[44px] pt-3 px-6 flex items-center justify-between text-[11px] font-sans font-medium text-black z-20 shrink-0">
              {/* Left: Clock */}
              <span className="font-semibold tracking-tight">09:41</span>

              {/* Right: Status Icons (Cellular, WiFi, Battery) */}
              <div className="flex items-center gap-1.5">
                {/* Cellular signal bars */}
                <div className="flex items-end gap-0.5 h-2.5">
                  <div className="w-0.5 h-1 bg-black" />
                  <div className="w-0.5 h-1.5 bg-black" />
                  <div className="w-0.5 h-2 bg-black" />
                  <div className="w-0.5 h-2.5 bg-black" />
                </div>
                {/* WiFi wireframe */}
                <div className="w-3 h-2.5 border-t-2 border-black rounded-t-full flex items-end justify-center">
                  <div className="w-1 h-1 bg-black rounded-full" />
                </div>
                {/* Battery wireframe */}
                <div className="w-5 h-2.5 border border-black rounded-[2px] p-0.5 flex items-center relative">
                  <div className="h-full w-3 bg-black rounded-[1px]" />
                  <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-1.5 bg-black rounded-r-xs" />
                </div>
              </div>
            </div>

            {/* Screen Content: Page 1 and Page 2 */}
            {/* Requirement: Both pages are empty, containing ONLY their respective button */}
            <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {currentPage === 1 ? (
                  <motion.div
                    key="page-1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 350, damping: 35 },
                      opacity: { duration: 0.2 },
                    }}
                    className="absolute inset-0 flex items-center justify-center p-6 z-10"
                  >
                    {/* PAGINA 1: con dentro SOLO un bottone con scritto “avanti” */}
                    <button
                      onClick={goToPage2}
                      className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white text-black text-base font-bold uppercase tracking-wider border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                      aria-label="Passa alla Pagina 2"
                    >
                      <span>avanti</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover:translate-x-1" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="page-2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 350, damping: 35 },
                      opacity: { duration: 0.2 },
                    }}
                    className="absolute inset-0 flex items-center justify-center p-6 z-10"
                  >
                    {/* PAGINA 2: con dentro SOLO un bottone con scritto “indietro” */}
                    <button
                      onClick={goToPage1}
                      className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white text-black text-base font-bold uppercase tracking-wider border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                      aria-label="Torna alla Pagina 1"
                    >
                      <ArrowLeft className="w-4 h-4 stroke-[2.5] transition-transform group-hover:-translate-x-1" />
                      <span>indietro</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* iOS Home Indicator (Wireframe style) */}
            <div className="w-full h-8 flex items-center justify-center z-20 shrink-0">
              <div className="w-32 h-1 bg-black rounded-full" />
            </div>

          </div>
        </div>
      </div>

      {/* Footer / Helper notes */}
      <footer className="z-10 mt-4 text-center text-xs text-zinc-600 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        <span>Formato: <strong>iPhone 14</strong></span>
        <span className="hidden sm:inline">•</span>
        <span>Stile: <strong>Wireframe B&W</strong></span>
        <span className="hidden sm:inline">•</span>
        <span className="text-zinc-500">Navigazione via click o tastiera (← / →)</span>
      </footer>
    </div>
  );
}
