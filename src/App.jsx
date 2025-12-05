import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Zap, 
  X, 
  Backpack, 
  Map as MapIcon, 
  Gem, 
  Coins, 
  Layers,
  User
} from 'lucide-react';

const App = () => {
  // State for active panels and interactions
  const [activePanel, setActivePanel] = useState(null);
  const [energy, setEnergy] = useState(85);

  // Prevent default touch behaviors (like pull-to-refresh) for a native app feel
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.body.addEventListener('touchmove', preventDefault, { passive: false });
    return () => document.body.removeEventListener('touchmove', preventDefault);
  }, []);

  // Simulate energy regeneration
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(e => (e < 100 ? e + 1 : 100));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const togglePanel = (panelName) => {
    if (activePanel === panelName) {
      setActivePanel(null);
    } else {
      setActivePanel(panelName);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] bg-stone-900 overflow-hidden font-sans select-none text-stone-100">
      
      {/* --- BACKGROUND & AMBIANCE --- */}
      {/* Dark Cherry & Forest Theme Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-950 via-stone-950 to-emerald-950">
        {/* Scales texture - Made LARGER and MORE PROMINENT */}
        <div className="absolute inset-0 opacity-60 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] bg-[length:100px_100px] animate-pulse"></div>
        
        {/* Animated Orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-800/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-800/20 rounded-full blur-[80px] animate-blob animation-delay-2000"></div>

        {/* Central Content Placeholder (The "Game" View) */}
        {/* Adjusted padding: pb-16 brings it down from the previous pb-32, creating a balanced space */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-16">
          <div className={`transition-all duration-700 ease-out transform ${activePanel ? 'scale-90 opacity-50 blur-sm translate-y-[-5%]' : 'scale-100 opacity-100'}`}>
            <div className="relative group">
              {/* Gradient border glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative w-64 h-[28rem] bg-stone-900/80 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center justify-end pb-8 shadow-2xl">
                 <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-emerald-400 tracking-widest text-center px-2">DRAGON BLADE</h2>
                 <p className="text-stone-500 text-xs mt-2 uppercase tracking-widest">Hope and Grace</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- HUD LAYER --- */}

      {/* Top Bar: Resources & Status */}
      <header className="absolute top-0 left-0 right-0 z-40 p-4 pt-safe-top">
        <div className="flex justify-between items-start">
          
          {/* Player Profile / Level */}
          <div className="flex items-center gap-4">
            <div className="relative">
              {/* Avatar Ring */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-emerald-600 p-[2px] shadow-lg shadow-rose-900/50">
                <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center overflow-hidden">
                   <User className="w-8 h-8 text-stone-400" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-stone-950 rounded-full p-0.5">
                <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-stone-900">
                  12
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-stone-100 tracking-wide drop-shadow-md">Player One</span>
              <div className="w-28 h-2 bg-stone-800/50 rounded-full mt-1 overflow-hidden backdrop-blur-sm">
                <div className="h-full bg-gradient-to-r from-rose-500 to-rose-400 w-[70%]"></div>
              </div>
            </div>
          </div>

          {/* Resources Pill */}
          <div className="flex flex-col gap-2 items-end">
             <div className="flex items-center gap-3 bg-stone-900/60 backdrop-blur-md border border-white/5 rounded-full px-4 py-1.5 shadow-xl">
                <div className="flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-500" fill="currentColor" />
                  <span className="text-xs font-bold text-amber-100">4,250</span>
                </div>
                <div className="w-px h-4 bg-white/10"></div>
                <div className="flex items-center gap-1.5">
                  <Gem className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-bold text-rose-100">128</span>
                </div>
             </div>
             
             {/* Energy Bar - SCALED DOWN */}
             <div className="flex items-center gap-2 bg-stone-900/40 backdrop-blur-sm rounded-full px-3 py-1 border border-emerald-500/30 shadow-lg shadow-emerald-900/20">
                <Zap className="w-3 h-3 text-emerald-400 fill-current" />
                <span className="text-[10px] font-mono font-bold text-emerald-100">{energy}/100</span>
             </div>
          </div>
        </div>
      </header>

      {/* Right Side Actions (Contextual) */}
      <div className="absolute right-4 top-1/3 z-30 flex flex-col gap-4">
        <SideActionButton icon={MapIcon} label="Quest" delay="0" />
        <SideActionButton icon={Layers} label="Build" delay="100" />
      </div>

      {/* --- FLOATING PANELS (Modal / Windows) --- */}
      {/* Backdrop for Panels */}
      <div 
        className={`absolute inset-0 z-40 bg-stone-950/60 backdrop-blur-sm transition-opacity duration-500 ${activePanel ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setActivePanel(null)}
      ></div>

      {/* The Panel Itself */}
      <div 
        className={`absolute bottom-0 left-0 right-0 z-50 bg-stone-900/95 backdrop-blur-2xl border-t border-white/10 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${activePanel ? 'translate-y-0' : 'translate-y-[110%]'}`}
        style={{ height: '75dvh', paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Panel Handle */}
        <div className="w-full h-8 flex items-center justify-center cursor-grab active:cursor-grabbing" onClick={() => setActivePanel(null)}>
          <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
        </div>

        {/* Panel Header */}
        <div className="px-8 pb-4 flex justify-between items-center border-b border-white/5">
          <h2 className="text-2xl font-light tracking-tight text-white">
            {activePanel === 'inventory' ? 'Inventory' : 'Hero'}
          </h2>
          <button 
            onClick={() => setActivePanel(null)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-stone-400" />
          </button>
        </div>

        {/* Panel Content (Scrollable) */}
        <div className="h-full overflow-y-auto px-6 py-6 pb-24 scrollbar-hide">
          {activePanel === 'inventory' && (
            <div className="grid grid-cols-4 gap-4">
               {Array.from({ length: 16 }).map((_, i) => (
                 <InventorySlot key={i} index={i} />
               ))}
            </div>
          )}
          
          {/* Simplified Content for Hero Panel */}
          {activePanel === 'hero' && (
             <div className="flex flex-col items-center justify-center h-64 text-stone-500">
                <Shield className="w-12 h-12 mb-4 opacity-20" />
                <p>Hero Details Panel</p>
             </div>
          )}
        </div>
      </div>


      {/* --- BOTTOM DOCK --- */}
      <nav className="absolute bottom-6 left-4 right-4 z-50 pb-safe-bottom">
        <div className="relative">
          {/* Glass Dock Background */}
          <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl"></div>
          
          <div className="relative flex justify-between items-center px-4 py-2">
            
            {/* Left Group */}
            <div className="flex gap-1 flex-1">
              <DockItem 
                icon={Shield} 
                label="Hero" 
                isActive={activePanel === 'hero'}
                onClick={() => togglePanel('hero')} 
              />
              <DockItem 
                icon={Backpack} 
                label="Bag" 
                isActive={activePanel === 'inventory'}
                onClick={() => togglePanel('inventory')} 
              />
            </div>

            {/* Main Action Button (Floating above dock) */}
            <div className="relative -top-8 mx-4">
               <button 
                 className="group relative w-20 h-20 rounded-full bg-gradient-to-b from-rose-500 to-emerald-700 shadow-[0_0_30px_rgba(225,29,72,0.4)] flex items-center justify-center transform transition-all duration-300 hover:scale-105 active:scale-95 border-4 border-stone-900"
                 onClick={() => setEnergy(prev => Math.max(0, prev - 10))}
               >
                 <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 to-transparent opacity-50"></div>
                 {/* Ripple Effect Ring */}
                 <div className="absolute -inset-1 rounded-full border border-rose-500/30 opacity-0 group-active:animate-ping"></div>
               </button>
            </div>

            {/* Right Group */}
            <div className="flex flex-1 justify-center items-center">
              <button 
                className="group relative w-14 h-14 rounded-2xl bg-gradient-to-b from-rose-500 to-emerald-700 shadow-[0_0_20px_rgba(225,29,72,0.3)] flex items-center justify-center transform transition-all duration-300 hover:scale-105 active:scale-95 border-4 border-stone-900"
              >
                 <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/30 to-transparent opacity-50"></div>
                 {/* Empty Button */}
              </button>
            </div>

          </div>
        </div>
      </nav>

    </div>
  );
};

/* --- SUB COMPONENTS --- */

const DockItem = ({ icon: Icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`relative flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/10' : 'hover:bg-white/5 active:bg-white/10'}`}
  >
    <Icon className={`w-6 h-6 mb-1 transition-colors ${isActive ? 'text-rose-400' : 'text-stone-400'}`} />
    <span className={`text-[10px] uppercase font-bold tracking-wider ${isActive ? 'text-rose-200' : 'text-stone-500'}`}>
      {label}
    </span>
    {isActive && (
      <div className="absolute bottom-1 w-1 h-1 bg-rose-400 rounded-full shadow-[0_0_8px_rgb(251,113,133)]"></div>
    )}
  </button>
);

const SideActionButton = ({ icon: Icon, label, delay }) => (
  <button 
    className="group flex items-center justify-center w-12 h-12 bg-stone-800/40 backdrop-blur-md border border-white/10 rounded-xl shadow-lg hover:bg-stone-700/60 active:scale-90 transition-all duration-300"
    style={{ transitionDelay: `${delay}ms` }}
  >
    <Icon className="w-5 h-5 text-stone-300 group-hover:text-white" />
    <span className="absolute right-full mr-3 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      {label}
    </span>
  </button>
);

const InventorySlot = ({ index }) => {
  // Mock rare items
  const isRare = index === 0 || index === 4;
  const isEmpty = index > 6;
  
  return (
    <div className={`aspect-square rounded-2xl border ${isRare ? 'border-rose-500/30 bg-rose-500/10' : 'border-white/5 bg-white/5'} flex items-center justify-center relative overflow-hidden group active:scale-95 transition-transform`}>
      {!isEmpty && (
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className={`w-8 h-8 rounded-full ${isRare ? 'bg-rose-400/20' : 'bg-stone-400/20'} animate-pulse`}></div>
          <span className="absolute bottom-1 right-2 text-[10px] font-bold text-stone-400">x{isRare ? 1 : Math.floor(Math.random() * 10) + 1}</span>
        </>
      )}
    </div>
  );
};

export default App;
