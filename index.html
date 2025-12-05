import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Zap, 
  Menu, 
  X, 
  Backpack, 
  Map as MapIcon, 
  Sword, 
  Settings, 
  Gem, 
  Coins, 
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';

const App = () => {
  // State for active panels and interactions
  const [activePanel, setActivePanel] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <div className="relative w-full h-[100dvh] bg-slate-900 overflow-hidden font-sans select-none text-slate-100">
      
      {/* --- BACKGROUND & AMBIANCE --- */}
      {/* This represents the "Game World" behind the UI */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
        
        {/* Animated Orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-[80px] animate-blob animation-delay-2000"></div>

        {/* Central Content Placeholder (The "Game" View) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`transition-all duration-700 ease-out transform ${activePanel ? 'scale-90 opacity-50 blur-sm translate-y-[-5%]' : 'scale-100 opacity-100'}`}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-64 h-80 bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-2xl">
                 <Sparkles className="w-16 h-16 text-cyan-400 mb-4 animate-spin-slow" />
                 <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-400 tracking-widest">AETHER</h2>
                 <p className="text-slate-400 text-xs mt-2 uppercase tracking-widest">System Ready</p>
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
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-10 h-10" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-slate-900 rounded-full p-0.5">
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-900 border border-slate-700">
                  12
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-100 tracking-wide drop-shadow-md">Player One</span>
              <div className="w-24 h-1.5 bg-slate-700/50 rounded-full mt-1 overflow-hidden backdrop-blur-sm">
                <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 w-[70%]"></div>
              </div>
            </div>
          </div>

          {/* Resources Pill */}
          <div className="flex flex-col gap-2 items-end">
             <div className="flex items-center gap-3 bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-full px-4 py-1.5 shadow-xl">
                <div className="flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  <span className="text-xs font-bold text-yellow-100">4,250</span>
                </div>
                <div className="w-px h-4 bg-white/10"></div>
                <div className="flex items-center gap-1.5">
                  <Gem className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-purple-100">128</span>
                </div>
             </div>
             
             {/* Energy Bar */}
             <div className="flex items-center gap-2 bg-slate-900/40 backdrop-blur-sm rounded-full px-3 py-1 border border-white/5">
                <Zap className="w-3 h-3 text-cyan-400 fill-current" />
                <span className="text-[10px] font-mono text-cyan-200">{energy}/100</span>
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
        className={`absolute inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-500 ${activePanel ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setActivePanel(null)}
      ></div>

      {/* The Panel Itself */}
      <div 
        className={`absolute bottom-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-2xl border-t border-white/10 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${activePanel ? 'translate-y-0' : 'translate-y-[110%]'}`}
        style={{ height: '75dvh', paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Panel Handle */}
        <div className="w-full h-8 flex items-center justify-center cursor-grab active:cursor-grabbing" onClick={() => setActivePanel(null)}>
          <div className="w-12 h-1.5 bg-white/20 rounded-full"></div>
        </div>

        {/* Panel Header */}
        <div className="px-8 pb-4 flex justify-between items-center border-b border-white/5">
          <h2 className="text-2xl font-light tracking-tight text-white">
            {activePanel === 'inventory' ? 'Inventory' : 'Settings'}
          </h2>
          <button 
            onClick={() => setActivePanel(null)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
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

          {activePanel === 'settings' && (
             <div className="space-y-6">
                <SettingsToggle label="Music" desc="Background ambience" active={true} />
                <SettingsToggle label="SFX" desc="Interaction sounds" active={true} />
                <SettingsToggle label="Haptics" desc="Vibration feedback" active={false} />
                <SettingsToggle label="High Performance" desc="Battery drain warning" active={true} />
                
                <div className="pt-6">
                   <button className="w-full py-4 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-200 font-bold tracking-wider hover:bg-red-500/30 active:scale-[0.98] transition-all">
                     LOGOUT
                   </button>
                </div>
             </div>
          )}
        </div>
      </div>


      {/* --- BOTTOM DOCK --- */}
      <nav className="absolute bottom-6 left-4 right-4 z-50 pb-safe-bottom">
        <div className="relative">
          {/* Glass Dock Background */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"></div>
          
          <div className="relative flex justify-between items-center px-2 py-2">
            
            {/* Left Group */}
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

            {/* Main Action Button (Floating above dock) */}
            <div className="relative -top-8 mx-2">
               <button 
                 className="group relative w-20 h-20 rounded-full bg-gradient-to-b from-cyan-400 to-blue-600 shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center transform transition-all duration-300 hover:scale-105 active:scale-95 border-4 border-slate-900"
                 onClick={() => setEnergy(prev => Math.max(0, prev - 10))}
               >
                 <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 to-transparent opacity-50"></div>
                 <Sword className="w-8 h-8 text-white fill-current drop-shadow-md group-hover:rotate-12 transition-transform duration-300" />
                 
                 {/* Ripple Effect Ring */}
                 <div className="absolute -inset-1 rounded-full border border-cyan-400/30 opacity-0 group-active:animate-ping"></div>
               </button>
            </div>

            {/* Right Group */}
            <DockItem 
              icon={Sparkles} 
              label="Craft" 
              isActive={activePanel === 'craft'}
              onClick={() => togglePanel('craft')} 
            />
            <DockItem 
              icon={Menu} 
              label="Menu" 
              isActive={activePanel === 'settings'}
              onClick={() => togglePanel('settings')} 
            />

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
    <Icon className={`w-6 h-6 mb-1 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
    <span className={`text-[10px] uppercase font-bold tracking-wider ${isActive ? 'text-cyan-200' : 'text-slate-500'}`}>
      {label}
    </span>
    {isActive && (
      <div className="absolute bottom-1 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_cyan]"></div>
    )}
  </button>
);

const SideActionButton = ({ icon: Icon, label, delay }) => (
  <button 
    className="group flex items-center justify-center w-12 h-12 bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-xl shadow-lg hover:bg-slate-700/60 active:scale-90 transition-all duration-300"
    style={{ transitionDelay: `${delay}ms` }}
  >
    <Icon className="w-5 h-5 text-slate-300 group-hover:text-white" />
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
    <div className={`aspect-square rounded-2xl border ${isRare ? 'border-amber-500/30 bg-amber-500/10' : 'border-white/5 bg-white/5'} flex items-center justify-center relative overflow-hidden group active:scale-95 transition-transform`}>
      {!isEmpty && (
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className={`w-8 h-8 rounded-full ${isRare ? 'bg-amber-400/20' : 'bg-slate-400/20'} animate-pulse`}></div>
          <span className="absolute bottom-1 right-2 text-[10px] font-bold text-slate-400">x{isRare ? 1 : Math.floor(Math.random() * 10) + 1}</span>
        </>
      )}
    </div>
  );
};

const SettingsToggle = ({ label, desc, active }) => {
  const [isOn, setIsOn] = useState(active);
  return (
    <div 
      className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 active:bg-white/10 transition-colors cursor-pointer"
      onClick={() => setIsOn(!isOn)}
    >
      <div>
        <h3 className="text-sm font-bold text-slate-200">{label}</h3>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
      <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isOn ? 'bg-cyan-500/20 border border-cyan-500/50' : 'bg-slate-800 border border-slate-700'}`}>
        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${isOn ? 'translate-x-6 bg-cyan-400' : 'translate-x-0 bg-slate-500'}`}></div>
      </div>
    </div>
  );
}

// Add custom tailwind styles for animations if needed via style tag or config
// For this snippet, we use standard classes and some arbitrary values.
// The 'safe-top' and 'safe-bottom' classes assume an environment that supports env(safe-area-inset).

export default App;
