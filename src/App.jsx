import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  ShoppingBag,
  BookOpen,
  Carrot,
  Flower,
  Trees,
  Sun,
  Feather, 
  Wheat,   
  X,
  Droplets,
  Zap,
  Aperture,
  CarFront,
  ArrowUp,
  Flower2,
  Sprout,
  ThumbsDown,
  Box,        
  Ghost,
  Key,
  Sparkles,
  Footprints,
  HelpCircle,
  Gem,
  TreeDeciduous,
  TreePine,
  TreePalm, 
  Clover,
  Cat,
  Utensils,
  Home,
  Waves,
  Castle,
  Dices,      
  TrendingUp,
  Cylinder,
  Check,
  CircleDollarSign,
  Bug,
  CloudRain,
  User,   // NEW
  Trophy, // NEW
  Info    // NEW
} from 'lucide-react';

export default function App() {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false); 
  const [shopCategory, setShopCategory] = useState('feeders'); 
  const [day, setDay] = useState(1);
  const [weather, setWeather] = useState('Sunny');
  
  // Sidebar Menus State
  const [activeMenu, setActiveMenu] = useState(null); 
  const [selectedVeggie, setSelectedVeggie] = useState(null);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [selectedTree, setSelectedTree] = useState(null);

  // Stats
  const [stats, setStats] = useState({
    money: 150, 
    progress: 12   
  });

  const [flash, setFlash] = useState(false);

  // Luck / Dice State
  const [luckyNumber, setLuckyNumber] = useState(null); 
  const [popupNumber, setPopupNumber] = useState(1);    
  const [isRolling, setIsRolling] = useState(false);    
  const [isLuckLocked, setIsLuckLocked] = useState(false); 
  const [showLuckyPopup, setShowLuckyPopup] = useState(false);
  
  // --- Car Meter starts at 0 ---
  const [carProgress, setCarProgress] = useState(0); 
  const isNeighborHere = carProgress >= 100;

  // Timer to fill car meter
  // 3 minutes to fill (180 seconds)
  useEffect(() => {
    if (carProgress >= 100) return;

    const interval = setInterval(() => {
      setCarProgress(prev => {
        // Calculation: 100% / (180 seconds * 10 ticks/sec) = 0.0556
        const next = prev + 0.0556; 
        return next > 100 ? 100 : next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [carProgress]);

  const handleCameraSnap = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
    setStats(prev => ({ ...prev, money: prev.money + 10 }));
  };

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  // --- NEW: Weather Toggle Logic ---
  const toggleWeather = () => {
    setWeather(prev => prev === 'Sunny' ? 'Rainy' : 'Sunny');
  };

  // --- Lucky Number Logic ---
  const rollDice = () => {
    if (isLuckLocked) return;
    
    setIsLuckLocked(true);
    setIsRolling(true);
    setShowLuckyPopup(true);
    
    let currentDelay = 50; 
    const delayIncrement = 30; 
    const maxDelay = 600;      
    
    const runNumberCycle = () => {
      const num = Math.floor(Math.random() * 99) + 1;
      setPopupNumber(num);
      
      currentDelay += delayIncrement; 

      if (currentDelay < maxDelay) {
        setTimeout(runNumberCycle, currentDelay);
      } else {
        const finalNum = Math.floor(Math.random() * 99) + 1;
        setLuckyNumber(finalNum); 
        setPopupNumber(finalNum);
        setIsRolling(false); 

        setTimeout(() => {
          setShowLuckyPopup(false);
          setIsLuckLocked(false);
        }, 800);
      }
    };

    runNumberCycle();
  };

  // --- Data Arrays with Costs ---
  const veggies = [
    { id: 'veg1', icon: Carrot, name: "Carrot", cost: 20, color: 'text-orange-500 bg-orange-100' },
    { id: 'veg2', icon: Sprout, name: "Sprout", cost: 25, color: 'text-green-500 bg-green-100' }, 
    { id: 'veg3', icon: Flower2, name: "Turnip", cost: 30, color: 'text-purple-500 bg-purple-100' },
    { id: 'veg4', icon: Wheat, name: "Wheat", cost: 15, color: 'text-yellow-600 bg-yellow-100' },
  ];

  const flowers = [
    { id: 'fl1', icon: Flower2, name: "Rose", cost: 45, color: 'text-rose-500 bg-rose-100' },
    { id: 'fl2', icon: Sun, name: "Sunflower", cost: 40, color: 'text-amber-500 bg-amber-100' },
    { id: 'fl3', icon: Flower, name: "Violet", cost: 35, color: 'text-violet-500 bg-violet-100' },
    { id: 'fl4', icon: Sprout, name: "Fern", cost: 50, color: 'text-teal-500 bg-teal-100' },
  ];

  const treeOptions = [
    { id: 't1', icon: TreeDeciduous, name: "Oak", cost: 150, color: 'text-emerald-700 bg-emerald-100' },
    { id: 't2', icon: TreePine, name: "Pine", cost: 120, color: 'text-green-800 bg-green-100' },
    { id: 't3', icon: Trees, name: "Copse", cost: 200, color: 'text-teal-700 bg-teal-100' },
    { id: 't4', icon: TreePalm, name: "Palm", cost: 180, color: 'text-lime-600 bg-lime-100' },
  ];

  // --- Helper to get currently selected buy item ---
  const getBuyItem = () => {
    if (activeMenu === 'veggie' && selectedVeggie) {
      return veggies.find(v => v.id === selectedVeggie);
    }
    if (activeMenu === 'flower' && selectedFlower) {
      return flowers.find(f => f.id === selectedFlower);
    }
    if (activeMenu === 'tree' && selectedTree) {
      return treeOptions.find(t => t.id === selectedTree);
    }
    return null;
  };

  const buyItem = getBuyItem();

  // --- Shop Data ---
  const shopItems = {
    houses: [
      { id: 'h1', name: "Basic Box", cost: 120, icon: Box, color: "bg-amber-100 text-amber-800" },
      { id: 'h2', name: "Cozy Hut", cost: 350, icon: Home, color: "bg-orange-100 text-orange-800" },
      { id: 'h3', name: "Estate", cost: 900, icon: Castle, color: "bg-purple-100 text-purple-800" },
    ],
    feeders: [
      { id: 'f1', name: "Seed Tray", cost: 45, icon: Utensils, color: "bg-emerald-100 text-emerald-800" },
      { id: 'f2', name: "Suet Cage", cost: 85, icon: Box, color: "bg-stone-200 text-stone-800" }, 
      { id: 'f3', name: "Nectar", cost: 150, icon: Flower, color: "bg-rose-100 text-rose-800" },
    ],
    baths: [
      { id: 'b1', name: "Puddle", cost: 0, icon: Droplets, color: "bg-blue-100 text-blue-800" },
      { id: 'b2', name: "Stone Bowl", cost: 200, icon: Waves, color: "bg-stone-300 text-stone-800" },
      { id: 'b3', name: "Fountain", cost: 600, icon: Zap, color: "bg-cyan-100 text-cyan-800" },
    ]
  };

  const varietyItems = [
    { id: 'v1', name: "Old Boot", cost: 15, icon: Footprints, color: "bg-stone-400 text-stone-900" },
    { id: 'v2', name: "Shiny Rock", cost: 50, icon: Gem, color: "bg-indigo-200 text-indigo-800" },
    { id: 'v3', name: "Gnome", cost: 120, icon: Ghost, color: "bg-red-200 text-red-800" },
    { id: 'v4', name: "Mystic Key", cost: 300, icon: Key, color: "bg-amber-200 text-amber-800" },
    { id: 'v5', name: "Stardust", cost: 500, icon: Sparkles, color: "bg-yellow-100 text-yellow-600" },
    { id: 'v6', name: "???", cost: 999, icon: HelpCircle, color: "bg-slate-800 text-slate-200" },
  ];

  return (
    // Outer Desktop Wrapper
    <div className="fixed inset-0 bg-stone-950 flex items-center justify-center p-4 font-sans select-none">
      
      {/* Mobile Device Frame */}
      <div className="relative w-full max-w-[400px] h-full max-h-[850px] bg-[#D4C5B0] overflow-hidden flex flex-col rounded-[3rem] shadow-2xl border-[8px] border-stone-800 ring-4 ring-stone-900">
        
        {/* --- Neighbor Arrival Red Pulse Effect --- */}
        <AnimatePresence>
          {isNeighborHere && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 pointer-events-none flex flex-col justify-between"
            >
              {/* Top Red Gradient */}
              <motion.div 
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-32 bg-gradient-to-b from-red-600/60 to-transparent" 
              />
              {/* Bottom Red Gradient */}
              <motion.div 
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-40 bg-gradient-to-t from-red-600/60 to-transparent" 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- 1. Top Bar (Stats & Time) --- */}
        <div className="h-24 bg-gradient-to-b from-[#BCAAA4] via-[#C9Bcab] to-[#D4C5B0] flex items-end pb-4 justify-between px-6 border-b border-[#A1887F] z-30 shadow-md relative">
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] pointer-events-none" />

          {/* Left: Money & Progress & Luck */}
          <div className="flex gap-2 relative z-10">
            {/* Money - Green (Using CircleDollarSign) */}
            <ResourcePill icon={CircleDollarSign} value={stats.money} color="green" />
            
            {/* Progress - Purple */}
            <ResourcePill icon={TrendingUp} value={`${stats.progress}%`} color="purple" />

            {/* Lucky Number - Indigo */}
            <ResourcePill icon={Dices} value={luckyNumber || "-"} color="indigo" />
          </div>

          {/* Right: Day & Weather (UPDATED) */}
          <div className="flex flex-col items-end relative z-10">
            <div className="flex items-center gap-1 mb-1">
               <span className="text-[11px] font-black text-[#5D4037] uppercase tracking-widest">Day {day}</span>
            </div>
            
            {/* Weather Toggle Button */}
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={toggleWeather}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border shadow-sm transition-colors ${
                weather === 'Sunny' 
                  ? 'text-amber-800 bg-amber-100 border-amber-300' 
                  : 'text-blue-900 bg-blue-200 border-blue-300'
              }`}
            >
              {weather === 'Sunny' ? (
                 <Sun size={14} className="fill-amber-500 text-amber-600" />
              ) : (
                 <CloudRain size={14} className="fill-blue-400 text-blue-600" />
              )}
              <span className="text-xs font-bold">{weather}</span>
            </motion.button>
          </div>
        </div>

        {/* --- Main Game Area --- */}
        <div className="flex-1 relative overflow-hidden group">
          
          {/* Background */}
          <div className="absolute inset-0 bg-[#4ade80] z-0">
             <div className="absolute inset-0 opacity-20" 
                  style={{ backgroundImage: 'radial-gradient(#15803d 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}>
             </div>
             <div className="absolute inset-0 bg-gradient-to-b from-sky-300/30 via-transparent to-emerald-900/50 pointer-events-none" />
             
             {/* --- NEW: Minimal Rain Effect --- */}
             {weather === 'Rainy' && (
               <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-50">
                  {/* Generate 20 random drops */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -20, x: Math.random() * 400 }} // Random X start
                      animate={{ y: 800 }}
                      transition={{ 
                        duration: 0.8 + Math.random(), 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: Math.random() * 2 
                      }}
                      style={{ left: `${Math.random() * 100}%` }}
                      className="absolute top-0 w-[1px] h-6 bg-blue-600/60 rotate-12"
                    />
                  ))}
               </div>
             )}
          </div>

          {/* --- Floating Buy Button --- */}
          <AnimatePresence>
            {buyItem && (
               <motion.div 
                 initial={{ opacity: 0, y: -20, x: "-50%" }}
                 animate={{ opacity: 1, y: 0, x: "-50%" }}
                 exit={{ opacity: 0, y: -10, x: "-50%" }}
                 className="absolute top-4 left-1/2 z-50 cursor-pointer pointer-events-auto"
                 onClick={() => {
                   setStats(p => ({...p, money: p.money - buyItem.cost}))
                   toggleMenu(activeMenu) // Close menu on buy for effect
                 }}
               >
                 <div className="bg-emerald-500 hover:bg-emerald-600 text-white pl-4 pr-5 py-2 rounded-full shadow-lg border-2 border-emerald-400 flex items-center gap-3 transition-colors">
                    <div className="flex flex-col items-start leading-none">
                       <span className="text-[9px] font-bold uppercase opacity-80">Purchase</span>
                       <span className="text-sm font-black">{buyItem.name}</span>
                    </div>
                    <div className="h-6 w-[1px] bg-emerald-400" />
                    <div className="flex items-center gap-1 font-bold">
                       <CircleDollarSign size={14} className="fill-emerald-200" />
                       <span>{buyItem.cost}</span>
                    </div>
                 </div>
               </motion.div>
            )}
          </AnimatePresence>

          {/* --- UPDATED: Placement Items --- */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 flex items-end gap-6 z-10 opacity-90">
             
             {/* Bird Feeder (Cylinder) */}
             <div className="flex flex-col items-center gap-0.5 group">
                <div className="relative cursor-pointer hover:scale-105 transition-transform">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-300 -skew-x-12 rounded-xl shadow-[6px_6px_0px_rgba(0,0,0,0.3)]" />
                  <div className="relative w-16 h-16 flex items-center justify-center text-amber-700 z-10">
                     <Cylinder size={24} />
                  </div>
                </div>
             </div>

             {/* Bird Bath (Waves) */}
             <div className="flex flex-col items-center gap-0.5 group">
                 <div className="relative cursor-pointer hover:scale-105 transition-transform">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-cyan-300 -skew-x-12 rounded-xl shadow-[6px_6px_0px_rgba(0,0,0,0.3)]" />
                    <div className="relative w-16 h-16 flex items-center justify-center text-cyan-600 z-10">
                       <Waves size={24} />
                    </div>
                 </div>
             </div>
          </div>

          {/* 2. Left Sidebar (Actions) */}
          <div className="absolute left-4 top-6 flex flex-col gap-3 z-30">
            {/* Info Book Button */}
            <SidebarButton 
              icon={BookOpen} 
              color="bg-[#FFF3E0] text-orange-800 border-orange-300" 
              onClick={() => setIsInfoOpen(true)}
            />
            
            {/* Carrot / Veggie Button Wrapper */}
            <div className="relative flex items-center">
              <SidebarButton 
                icon={Carrot} 
                color="bg-[#FFF3E0] text-orange-700 border-orange-300" 
                onClick={() => toggleMenu('veggie')}
                isActive={activeMenu === 'veggie'}
              />
              <SliderMenu 
                isOpen={activeMenu === 'veggie'} 
                items={veggies} 
                selectedId={selectedVeggie} 
                onSelect={setSelectedVeggie} 
                colorBase="orange"
              />
            </div>

            {/* Flower Button Wrapper */}
            <div className="relative flex items-center">
              <SidebarButton 
                icon={Flower} 
                color="bg-[#FCE4EC] text-pink-700 border-pink-300"
                onClick={() => toggleMenu('flower')}
                isActive={activeMenu === 'flower'}
              />
              <SliderMenu 
                isOpen={activeMenu === 'flower'} 
                items={flowers} 
                selectedId={selectedFlower} 
                onSelect={setSelectedFlower} 
                colorBase="pink"
              />
            </div>

            {/* Tree Button Wrapper */}
            <div className="relative flex items-center">
              <SidebarButton 
                icon={Trees} 
                color="bg-[#E8F5E9] text-emerald-800 border-emerald-300" 
                onClick={() => toggleMenu('tree')}
                isActive={activeMenu === 'tree'}
              />
              <SliderMenu 
                isOpen={activeMenu === 'tree'} 
                items={treeOptions} 
                selectedId={selectedTree} 
                onSelect={setSelectedTree} 
                colorBase="emerald"
              />
            </div>
          </div>

          {/* 3. Right Slim Panel */}
          <div className="absolute right-4 top-6 flex flex-col gap-3 z-20">
            {/* Dynamic Car Meter */}
            <MeterBar 
              icon={CarFront} 
              color={isNeighborHere ? "bg-red-600" : "bg-red-500"} 
              bg="bg-red-100" 
              iconColor="text-red-700" 
              fill={`${carProgress}%`} 
            />
            
            <MeterBar icon={ArrowUp} color="bg-blue-600" bg="bg-blue-100" iconColor="text-blue-700" fill="85%" />
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-12 h-20 bg-[#FFF8E1]/90 backdrop-blur-md rounded-2xl border-2 border-white/70 flex flex-col items-center justify-start py-2 shadow-sm gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shadow-inner border border-white/20 shrink-0">
                <ThumbsDown size={16} />
              </div>
              <div className="flex items-center justify-center flex-1">
                <Cat size={22} className="text-stone-800" />
              </div>
            </motion.div>
          </div>

          {/* 4. The New Pure-Icon Backyard */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            
            {/* Hills */}
            <div className="absolute bottom-0 w-full h-2/3 bg-[#15803d] rounded-t-[100%] scale-x-[1.8] translate-y-24 blur-2xl opacity-80" />

            {/* --- TREES (Left Side) --- */}
            <div className="absolute left-[-20px] bottom-16 flex flex-col items-start opacity-90">
                {/* 1. Top Tree (Smallest) */}
                <div className="relative z-10 translate-x-12 translate-y-4">
                    <TreeDeciduous size={80} className="text-[#166534] fill-[#166534] drop-shadow-lg" strokeWidth={1.5} />
                </div>
                
                {/* 2. Middle Tree (Large - Holds Birdhouse) */}
                <div className="relative z-20 -mb-12">
                    <TreeDeciduous size={180} className="text-[#14532d] fill-[#14532d] drop-shadow-2xl" strokeWidth={1.5} />
                    
                    {/* The Birdhouse Nestled Inside */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                       <div className="relative group cursor-pointer pointer-events-auto hover:scale-105 transition-transform">
                          {/* Slanted Background + Angled Drop Shadow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#5D4037] to-[#3E2723] -skew-x-12 rounded-xl shadow-[6px_6px_0px_rgba(0,0,0,0.3)]" />
                          
                          {/* Icon (Unskewed via container) */}
                          <div className="relative w-16 h-16 flex items-center justify-center z-10">
                             <Home size={28} className="text-[#FFF8E1] fill-[#FFF8E1]" strokeWidth={2} />
                          </div>
                       </div>
                    </div>
                </div>

                {/* 3. Bottom Tree (Medium) - Darkened significantly */}
                <div className="relative z-30 ml-8 translate-y-4">
                    <TreeDeciduous size={120} className="text-[#064e3b] fill-[#064e3b] drop-shadow-xl" strokeWidth={1.5} />
                </div>
            </div>

             {/* --- UPDATED: STARTING GARDEN (Solid Colors) --- */}
             <div className="absolute left-36 bottom-32 flex items-end gap-1 opacity-90 z-20 pointer-events-none">
                 <div className="relative hover:scale-110 transition-transform">
                    {/* Orange Solid Sprout */}
                    <Sprout size={24} className="text-orange-500 fill-orange-500" />
                 </div>
                 <div className="relative -mb-1 hover:scale-110 transition-transform">
                    {/* Yellow Solid Sprout */}
                    <Sprout size={32} className="text-yellow-500 fill-yellow-500" />
                 </div>
                 <div className="relative mb-2 hover:scale-110 transition-transform animate-pulse">
                     <Bug size={20} className="text-stone-700 fill-stone-400" />
                 </div>
             </div>

            {/* --- FLOWERS (Bottom Right) --- */}
            <div className="absolute right-4 bottom-10 flex items-end gap-[-5px] z-40">
                
                {/* Allure Stat +17 */}
                <motion.div 
                   animate={{ y: [0, -4, 0] }}
                   transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -top-5 -left-12 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-rose-200 shadow-sm flex items-center gap-1 min-w-max z-50 pointer-events-none"
                >
                   <Sparkles size={12} className="text-rose-500 fill-rose-200" />
                   <span className="text-[10px] font-black text-rose-800 uppercase tracking-wide">+17 Allure</span>
                </motion.div>

                {/* Flower 1 */}
                <div className="relative z-20 hover:scale-110 transition-transform cursor-pointer pointer-events-auto">
                  <Flower size={48} className="text-rose-700 fill-rose-500 drop-shadow-md" strokeWidth={1.5} />
                </div>
                
                {/* Flower 2 */}
                <div className="relative z-10 -ml-4 mb-2 hover:scale-110 transition-transform cursor-pointer pointer-events-auto">
                   <Flower2 size={36} className="text-yellow-400 fill-yellow-200 drop-shadow-sm" />
                </div>

                {/* Clover */}
                <div className="relative z-30 -ml-3 hover:scale-110 transition-transform cursor-pointer pointer-events-auto">
                   <Clover size={32} className="text-emerald-300 fill-emerald-200/50" />
                </div>
                
                {/* Flower 3 */}
                <div className="relative z-0 -ml-2 mb-4 hover:scale-110 transition-transform cursor-pointer pointer-events-auto">
                   <Flower size={34} className="text-purple-400 fill-purple-300 drop-shadow-sm" />
                </div>
            </div>

          </div>

          {/* Camera Flash */}
          <AnimatePresence>
            {flash && (
              <motion.div
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white z-50 pointer-events-none"
              />
            )}
          </AnimatePresence>
        </div>

        {/* --- 5. Bottom Panel (Actions) --- */}
        <div className="h-32 bg-gradient-to-t from-[#A1887F] via-[#BCAAA4] to-[#D4C5B0] shadow-[0_-5px_30px_rgba(0,0,0,0.15)] flex items-start pt-6 justify-between px-8 z-30 relative border-t border-[#8D6E63]">
           <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] pointer-events-none" />
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsShopOpen(true)}
            className="flex flex-col items-center gap-1.5 text-[#3E2723] transition-colors group relative z-10"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FFF8E1] flex items-center justify-center border-2 border-[#8D6E63] shadow-[0_4px_0px_#5D4037] transition-all active:translate-y-1 active:shadow-none">
              <ShoppingBag size={24} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider opacity-90 drop-shadow-sm">Shop</span>
          </motion.button>

          {/* CAMERA Button */}
          <div className="relative -top-12 z-20">
             <motion.button 
               whileTap={{ scale: 0.95 }}
               onClick={handleCameraSnap}
               className="group relative"
             >
               <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#3E2723] to-[#261612] shadow-2xl flex items-center justify-center border border-[#5D4037]">
                  <div className="w-[86px] h-[86px] rounded-full bg-gradient-to-br from-stone-400 via-stone-200 to-stone-500 flex items-center justify-center shadow-inner">
                    <div className="w-[74px] h-[74px] rounded-full bg-[#000] flex items-center justify-center relative shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)] border border-stone-900">
                       <div className="w-[58px] h-[58px] rounded-full bg-gradient-to-tr from-indigo-950 via-blue-900 to-indigo-900 relative overflow-hidden shadow-inner ring-1 ring-black/50">
                          <div className="absolute top-3 right-4 w-5 h-8 bg-white/30 -rotate-[30deg] blur-md rounded-full" />
                          <div className="absolute bottom-2 left-3 w-2 h-2 bg-sky-400/60 blur-sm rounded-full" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-80 transition-transform duration-300">
                             <Aperture size={32} className="text-white drop-shadow-md" />
                          </div>
                       </div>
                       <div className="absolute top-1.5 w-1.5 h-1.5 bg-red-600 rounded-full shadow-[0_0_5px_rgba(220,38,38,0.9)]" />
                    </div>
                  </div>
               </div>
             </motion.button>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Pop-up Number Bubble */}
            <AnimatePresence>
              {showLuckyPopup && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.5 }}
                  animate={{ 
                    opacity: 1, 
                    y: -20, 
                    scale: 1,
                    // Smooth linear cycle through deep colors
                    backgroundColor: ["#dc2626", "#9333ea", "#2563eb", "#059669", "#d97706", "#dc2626"] 
                  }}
                  transition={{ 
                    backgroundColor: { duration: 3, repeat: Infinity, ease: "linear" },
                    default: { duration: 0.3 }
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute bottom-full mb-3 w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-50 overflow-hidden"
                >
                   <span className="text-2xl font-black text-yellow-100 drop-shadow-md">
                     {popupNumber}
                   </span>
                   {/* Celebration Ring - only shows when finished */}
                   {!isRolling && (
                     <motion.div 
                       initial={{ scale: 1.2, opacity: 0 }}
                       animate={{ scale: 1.5, opacity: 0 }}
                       className="absolute inset-0 rounded-full border-2 border-white/50"
                     />
                   )}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              whileTap={!isLuckLocked ? { scale: 0.9 } : {}}
              onClick={rollDice}
              disabled={isLuckLocked} // Completely disables interactions
              className={`flex flex-col items-center gap-1.5 text-[#3E2723] transition-all group relative ${isLuckLocked ? 'opacity-50 grayscale-[0.5] cursor-not-allowed' : ''}`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-[#FFF8E1] flex items-center justify-center border-2 border-[#8D6E63] shadow-[0_4px_0px_#5D4037] transition-all ${isLuckLocked ? 'translate-y-1 shadow-none' : 'active:translate-y-1 active:shadow-none'}`}>
                {/* REMOVED animate-bounce */}
                <Dices size={24} className={isRolling ? 'text-indigo-500' : ''} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider opacity-90 drop-shadow-sm">Luck</span>
            </motion.button>
          </div>
        </div>

        {/* --- Shop Modal (Split Layout) --- */}
        <AnimatePresence>
          {isShopOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-stone-950/50 backdrop-blur-[3px] flex items-end"
            >
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full h-[90%] bg-[#F5F5F4] rounded-t-[2.5rem] shadow-2xl flex flex-col border-t border-white/50 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 pb-2 shrink-0 bg-[#F5F5F4] z-10">
                  <div>
                    <h2 className="text-xl font-black text-stone-800 tracking-tight">Garden Supply</h2>
                    <p className="text-stone-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">Everything you need</p>
                  </div>
                  <button onClick={() => setIsShopOpen(false)} className="p-2 bg-stone-200 rounded-full active:bg-stone-300 text-stone-500 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                {/* SCROLLABLE CONTENT AREA */}
                <div className="flex-1 overflow-y-auto px-6 pb-6">
                  
                  {/* --- TOP HALF: Garden Essentials --- */}
                  <div className="mb-8">
                    {/* Tabs */}
                    <div className="flex bg-stone-200/50 p-1 rounded-2xl mb-4">
                      {['houses', 'feeders', 'baths'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setShopCategory(cat)}
                          className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wide transition-all ${
                            shopCategory === cat 
                              ? 'bg-white shadow-sm text-stone-800' 
                              : 'text-stone-400 hover:text-stone-600'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      <AnimatePresence mode="popLayout">
                        {shopItems[shopCategory].map((item) => (
                          <ShopItem 
                            key={item.id}
                            name={item.name} 
                            cost={item.cost} 
                            icon={item.icon} 
                            color={item.color} 
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* --- DIVIDER --- */}
                  <div className="flex items-center gap-4 mb-6 opacity-60">
                    <div className="h-[2px] flex-1 bg-stone-300 rounded-full" />
                    <StarIcon />
                    <div className="h-[2px] flex-1 bg-stone-300 rounded-full" />
                  </div>

                  {/* --- BOTTOM HALF: Variety Shop --- */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <Sparkles size={16} />
                      </div>
                      <div>
                         <h3 className="font-black text-stone-800 text-sm">Curiosities</h3>
                         <p className="text-[10px] text-stone-400 font-bold uppercase">Strange finds</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {varietyItems.map((item) => (
                         <ShopItem 
                            key={item.id}
                            name={item.name} 
                            cost={item.cost} 
                            icon={item.icon} 
                            color={item.color} 
                          />
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Info Book Modal (UPDATED) --- */}
        <AnimatePresence>
          {isInfoOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-stone-950/50 backdrop-blur-[3px] flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-sm bg-[#FFFBF0] rounded-[2rem] shadow-2xl overflow-hidden border-4 border-[#8D6E63] relative flex flex-col h-[500px]"
              >
                 {/* Close Button - positioned absolute to overlay top section */}
                 <button 
                   onClick={() => setIsInfoOpen(false)} 
                   className="absolute top-4 right-4 p-2 bg-stone-200/50 rounded-full hover:bg-stone-300/50 text-stone-600 transition-colors z-20"
                 >
                    <X size={20} />
                 </button>

                 {/* Top Section - 66% */}
                 <div className="h-[66%] p-6 flex flex-col">
                    <h2 className="text-2xl font-black text-[#5D4037] tracking-tight">Bird Album</h2>
                    <div className="flex-1 mt-4 border-2 border-dashed border-[#D7CCC8] rounded-xl flex items-center justify-center bg-[#F9F5F0]">
                       <span className="text-[#A1887F] font-bold text-sm uppercase tracking-wider">No Birds Yet</span>
                    </div>
                 </div>

                 {/* Bottom Section - remaining height */}
                 <div className="flex-1 bg-[#EFEBE9] border-t-2 border-[#D7CCC8] flex items-center justify-around px-6">
                    {/* User Profile Button */}
                    <button className="flex flex-col items-center gap-1 group">
                       <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#BCAAA4] flex items-center justify-center text-[#5D4037] shadow-sm group-active:scale-95 transition-transform">
                          <User size={20} />
                       </div>
                       <span className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-wide">Profile</span>
                    </button>

                    {/* Awards Button */}
                    <button className="flex flex-col items-center gap-1 group">
                       <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#BCAAA4] flex items-center justify-center text-[#5D4037] shadow-sm group-active:scale-95 transition-transform">
                          <Trophy size={20} />
                       </div>
                       <span className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-wide">Awards</span>
                    </button>

                    {/* Info/About Button */}
                    <button className="flex flex-col items-center gap-1 group">
                       <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#BCAAA4] flex items-center justify-center text-[#5D4037] shadow-sm group-active:scale-95 transition-transform">
                          <Info size={20} />
                       </div>
                       <span className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-wide">About</span>
                    </button>
                 </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

// --- Sub-components ---

function SidebarButton({ icon: Icon, color, onClick, isActive }) {
  return (
    <div className="flex flex-col items-center gap-1 group relative z-30">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-2 ${color} ${isActive ? 'ring-2 ring-offset-1 ring-orange-300' : ''} bg-opacity-95 backdrop-blur-sm transition-all relative z-20`}
      >
        <Icon size={22} />
      </motion.button>
    </div>
  );
}

function SliderMenu({ isOpen, items, selectedId, onSelect, colorBase }) {
  // Map simple color base names to tailwind border/bg classes for the container
  const borderColors = {
    orange: "border-orange-200",
    pink: "border-pink-200",
    emerald: "border-emerald-200"
  };

  const activeClasses = {
    orange: "bg-orange-200 ring-2 ring-orange-400",
    pink: "bg-pink-200 ring-2 ring-pink-400",
    emerald: "bg-emerald-200 ring-2 ring-emerald-400"
  }
  const hoverClasses = {
    orange: "hover:bg-orange-50",
    pink: "hover:bg-pink-50",
    emerald: "hover:bg-emerald-50"
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 'auto', opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className={`absolute left-14 top-0 h-11 bg-white/90 backdrop-blur-md rounded-xl border-2 ${borderColors[colorBase]} flex items-center overflow-hidden shadow-lg pl-1`}
        >
          <div className="flex gap-1 px-1 min-w-max">
            {items.map((item) => (
              <button 
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-90 ${
                  selectedId === item.id ? activeClasses[colorBase] : hoverClasses[colorBase]
                }`}
              >
                <item.icon size={16} className={item.color.split(' ')[0]} />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


function MeterBar({ icon: Icon, color, bg, iconColor, fill, children }) {
  return (
    <div className="w-12 h-28 bg-[#FFF8E1]/80 backdrop-blur-md rounded-2xl border-2 border-white/70 flex flex-col items-center justify-start py-2 gap-2 shadow-sm">
      <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center ${iconColor} shadow-inner border border-white/20`}>
        <Icon size={18} />
      </div>
      <div className="w-2 h-12 bg-stone-300/50 rounded-full overflow-hidden flex items-end ring-1 ring-black/5">
        <motion.div 
          className={`w-full ${color}`}
          initial={{ height: 0 }}
          animate={{ height: fill }}
          transition={{ duration: 1, ease: "linear" }} // Smooth linear fill
        />
      </div>
      {children}
    </div>
  );
}

function ResourcePill({ icon: Icon, value, color }) {
  const colors = {
    amber: "bg-[#FFECB3] text-[#5D4037] border-[#FFC107]",
    emerald: "bg-[#C8E6C9] text-[#1B5E20] border-[#81C784]",
    green: "bg-green-100 text-green-800 border-green-300",
    purple: "bg-purple-100 text-purple-800 border-purple-300",
    indigo: "bg-indigo-100 text-indigo-800 border-indigo-300"
  };

  return (
    <div className={`flex items-center gap-1.5 ${colors[color]} px-3 py-1.5 rounded-xl border font-black text-xs shadow-sm`}>
      <Icon size={14} />
      <span>{value}</span>
    </div>
  );
}

const ShopItem = React.forwardRef(({ name, cost, icon: Icon, color }, ref) => {
  return (
    <motion.button 
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white p-2 rounded-2xl shadow-[0_2px_5px_rgba(0,0,0,0.03)] border border-stone-200 flex flex-col gap-2 items-center text-center transition-colors group pb-3"
    >
      <div className={`w-12 h-10 w-full rounded-xl flex items-center justify-center ${color} transition-transform`}>
        <Icon size={20} />
      </div>
      <div className="w-full">
        <h4 className="font-bold text-stone-800 text-[10px] leading-tight truncate px-1">{name}</h4>
        <div className="flex items-center justify-center gap-1 text-stone-500 text-[10px] mt-1 font-bold">
          {/* UPDATED: CircleDollarSign instead of Feather */}
          <CircleDollarSign size={10} />
          <span>{cost}</span>
        </div>
      </div>
    </motion.button>
  );
});

function StarIcon() {
  return (
    <div className="text-stone-300">
       <div className="w-2 h-2 rotate-45 bg-current" />
    </div>
  )
}
