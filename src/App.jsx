import React, { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  Sparkles,
  X
} from 'lucide-react';

/**
 * --- GAME THEME CONFIGURATION ---
 * We use a "Pop" palette: bold colors, thick borders.
 */
const COLORS = {
  bg: "bg-indigo-950",
};

/**
 * --- COMPONENTS ---
 */

// A chunky, game-style button with a thick bottom border for 3D effect
const ChunkyButton = ({ onClick, color = "indigo", emoji, label, disabled, size = "md", className = "" }) => {
  // Map colors to specific tailwind classes for the "3D" look
  const themes = {
    indigo: "bg-indigo-500 border-indigo-800 hover:bg-indigo-400 text-white",
    rose:   "bg-rose-500 border-rose-800 hover:bg-rose-400 text-white",
    emerald:"bg-emerald-500 border-emerald-800 hover:bg-emerald-400 text-white",
    amber:  "bg-amber-500 border-amber-800 hover:bg-amber-400 text-white",
    violet: "bg-violet-600 border-violet-900 hover:bg-violet-500 text-white",
    slate:  "bg-slate-600 border-slate-800 hover:bg-slate-500 text-slate-100",
  };

  const themeClass = themes[color] || themes.indigo;
  const sizeClass = size === 'lg' ? 'h-24 text-lg' : 'h-14 text-sm';

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.95, y: 4, borderBottomWidth: "0px", marginTop: "4px" }}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-full flex flex-col items-center justify-center 
        ${sizeClass}
        rounded-2xl transition-colors
        border-b-[6px] border-x-2 border-t-2
        ${themeClass}
        disabled:opacity-50 disabled:grayscale disabled:pointer-events-none
        shadow-xl font-black uppercase tracking-wider
        ${className}
      `}
    >
      <div className="flex items-center gap-2 z-10">
        {emoji && <span className={size === 'lg' ? "text-3xl" : "text-xl"}>{emoji}</span>}
        <span className="drop-shadow-md">{label}</span>
      </div>
      {/* Glossy highlight */}
      <div className="absolute top-2 left-2 right-2 h-1/3 bg-white/20 rounded-full pointer-events-none" />
    </motion.button>
  );
};

// A stat display that looks like a sticker or token
const StatBadge = ({ emoji, value, label, shake }) => {
  return (
    <motion.div 
      animate={shake ? { x: [0, -5, 5, -5, 5, 0] } : {}}
      className="flex flex-col items-center"
    >
      <div className="relative z-10 bg-slate-800 border-4 border-slate-700 rounded-full w-14 h-14 flex items-center justify-center shadow-lg -mb-4">
        <span className="text-2xl filter drop-shadow-md">{emoji}</span>
      </div>
      <div className="bg-slate-900 border-2 border-slate-700 rounded-xl px-3 pt-5 pb-1 min-w-[70px] text-center shadow-md">
        <div className="font-mono font-black text-white text-lg leading-none">{value}</div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</div>
      </div>
    </motion.div>
  );
};

// Floating damage numbers / text
const FloatingText = ({ x, y, text, color, scale = 1, onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0, scale: 0.5 * scale, rotate: Math.random() * 20 - 10 }}
      animate={{ opacity: 0, y: -100, scale: 1.5 * scale }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onAnimationComplete={onComplete}
      className={`
        absolute font-black whitespace-nowrap pointer-events-none z-50
        text-transparent bg-clip-text bg-gradient-to-b
        drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]
      `}
      style={{ 
        left: x, 
        top: y,
        fontSize: '2rem',
        backgroundImage: color === 'red' 
          ? 'linear-gradient(to bottom, #fca5a5, #ef4444)' 
          : color === 'gold' 
          ? 'linear-gradient(to bottom, #fde047, #eab308)'
          : 'linear-gradient(to bottom, #ffffff, #94a3b8)'
      }}
    >
      {text}
    </motion.div>
  );
};

const InventoryModal = ({ isOpen, onClose, items, equipItem }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-indigo-950/80 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="fixed inset-x-4 top-20 bottom-20 bg-slate-800 rounded-3xl z-50 shadow-2xl border-[6px] border-slate-600 flex flex-col overflow-hidden"
          >
            {/* Header looking like a wooden plank or metal bar */}
            <div className="bg-slate-700 p-4 border-b-4 border-slate-600 flex justify-between items-center shadow-md">
              <h2 className="text-2xl font-black text-white flex items-center gap-2 uppercase tracking-widest drop-shadow-md">
                <span className="text-3xl">🎒</span> Backpack
              </h2>
              <button onClick={onClose} className="bg-rose-500 hover:bg-rose-400 text-white p-2 rounded-xl border-b-4 border-rose-800 active:border-b-0 active:translate-y-1 transition-all">
                <X size={24} strokeWidth={3} />
              </button>
            </div>

            <div className="p-4 grid grid-cols-3 gap-4 overflow-y-auto content-start flex-1 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]">
              {items.map((item) => (
                <motion.button
                  key={item.id}
                  layoutId={item.id}
                  onClick={() => equipItem(item)}
                  whileTap={{ scale: 0.9 }}
                  className={`
                    aspect-square rounded-2xl border-4 flex flex-col items-center justify-center relative overflow-hidden shadow-sm
                    ${item.equipped ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-700 border-slate-600'}
                  `}
                >
                  <span className="text-4xl drop-shadow-lg filter">{item.emoji}</span>
                  {item.equipped && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80]" />
                  )}
                  <span className="absolute bottom-1 text-[10px] font-bold text-slate-300 uppercase truncate w-full px-2 text-center bg-black/20">
                    {item.name}
                  </span>
                </motion.button>
              ))}
              
              {/* Empty slots */}
              {[...Array(5)].map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square bg-slate-900/40 rounded-2xl border-4 border-slate-700 border-dashed flex items-center justify-center opacity-50">
                   <div className="w-2 h-2 rounded-full bg-slate-700" />
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/**
 * --- MAIN APP ---
 */

export default function RoguelikePrototype() {
  // Game State
  const [hp] = useState(85);
  // Removed unused maxHp
  const [gold] = useState(120);
  const [energy, setEnergy] = useState(3);
  const [enemyHp, setEnemyHp] = useState(50);
  const [enemyMaxHp] = useState(50);
  const [level, setLevel] = useState(1);
  
  // UI State
  const [showInventory, setShowInventory] = useState(false);
  const [activeEffects, setActiveEffects] = useState([]);
  const [shakeScreen, setShakeScreen] = useState(false);
  
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Rusty Sword', emoji: '🗡️', type: 'weapon', equipped: true },
    { id: 2, name: 'Red Potion', emoji: '🍷', type: 'consumable', equipped: false },
    { id: 3, name: 'Gold Coin', emoji: '🪙', type: 'trinket', equipped: false },
    { id: 4, name: 'Map', emoji: '📜', type: 'quest', equipped: false },
  ]);

  const enemyControls = useAnimation();

  // Helper to spawn floating text
  const spawnText = (text, color = "white", x = "50%", y = "30%", scale = 1) => {
    const id = Date.now() + Math.random();
    setActiveEffects(prev => [...prev, { id, text, color, x, y, scale }]);
  };

  // Actions
  const handleAttack = async () => {
    if (energy < 1) {
      spawnText("NO ENERGY!", "white", "50%", "60%");
      return;
    }

    setEnergy(e => e - 1);
    
    // Screen shake logic
    setShakeScreen(true);
    setTimeout(() => setShakeScreen(false), 200);

    // Enemy hit animation
    await enemyControls.start({ 
      scale: [1, 0.8, 1.1, 1],
      rotate: [0, -10, 10, 0],
      filter: ["brightness(1)", "brightness(2) hue-rotate(90deg)", "brightness(1)"],
      transition: { duration: 0.3 } 
    });
    
    // Damage Calc
    const dmg = Math.floor(Math.random() * 8) + 4;
    const isCrit = Math.random() > 0.7;
    const finalDmg = isCrit ? dmg * 2 : dmg;

    setEnemyHp(h => Math.max(0, h - finalDmg));
    
    // Spawn damage numbers with slight random offset
    const randomX = 40 + Math.random() * 20;
    spawnText(finalDmg, "red", `${randomX}%`, "25%", isCrit ? 1.5 : 1);

    if (isCrit) {
      spawnText("CRIT!", "gold", `${randomX}%`, "15%", 0.8);
    }

    if (enemyHp - finalDmg <= 0) {
      spawnText("VICTORY!", "gold", "50%", "40%", 1.5);
      setTimeout(() => {
        setEnemyHp(50 + level * 10);
        setLevel(l => l + 1);
        spawnText("NEW FOE!", "white", "50%", "40%");
      }, 1500);
    }
  };

  const handleDefend = () => {
    if (energy < 1) return;
    setEnergy(e => e - 1);
    spawnText("BLOCK!", "white", "50%", "50%");
  };

  const handleRest = () => {
    setEnergy(3);
    spawnText("MAX POWER", "gold", "50%", "60%");
  };

  return (
    <div className={`h-screen w-full ${COLORS.bg} font-sans overflow-hidden flex flex-col select-none touch-manipulation relative`}>
      
      {/* BACKGROUND PATTERN */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
             backgroundSize: '24px 24px' 
           }} 
      />
      
      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

      {/* TOP HUD */}
      <header className="p-4 pt-6 flex justify-between items-start z-20 shrink-0">
        <div className="flex gap-4">
          <StatBadge emoji="❤️" value={hp} label="Health" shake={hp < 30} />
          <StatBadge emoji="⚡" value={energy} label="Energy" shake={energy === 0} />
        </div>
        
        <div className="flex gap-3 items-start">
          <div className="bg-amber-500 text-amber-900 font-black px-4 py-2 rounded-full border-b-4 border-amber-700 shadow-lg flex items-center gap-2 transform rotate-2">
            <span>🪙</span>
            <span>{gold}</span>
          </div>
          <button 
            onClick={() => setShowInventory(true)}
            className="bg-slate-700 p-3 rounded-xl border-b-4 border-slate-900 active:border-b-0 active:translate-y-1 transition-all text-white shadow-xl hover:bg-slate-600"
          >
            <span className="text-xl">🎒</span>
          </button>
        </div>
      </header>

      {/* MAIN GAME VIEWPORT */}
      <motion.main 
        className="flex-1 relative flex flex-col items-center justify-center p-6 z-10"
        animate={{ x: shakeScreen ? [0, -10, 10, -10, 10, 0] : 0 }}
        transition={{ duration: 0.1 }}
      >
        {/* Floating Effects Layer */}
        {activeEffects.map(effect => (
          <FloatingText 
            key={effect.id} 
            {...effect} 
            onComplete={() => setActiveEffects(prev => prev.filter(e => e.id !== effect.id))} 
          />
        ))}

        {/* ENEMY STAGE */}
        <div className="w-full max-w-xs relative group">
          
          {/* Floor platform effect */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-black/40 blur-xl rounded-[100%]" />
          
          {/* Enemy Card / Sprite Container */}
          <motion.div 
            className="bg-slate-800 rounded-[2rem] border-[6px] border-slate-700 p-1 relative overflow-hidden shadow-2xl"
            initial={{ rotate: -2 }}
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Card Background */}
            <div className="absolute inset-0 bg-slate-900">
               <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)]" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center pt-8 pb-4">
              
              {/* Level Tag */}
              <div className="absolute top-4 left-4 bg-slate-700 text-slate-300 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md border border-slate-600">
                Floor {level}
              </div>

              {/* Enemy Sprite */}
              <motion.div 
                animate={enemyControls}
                className="text-[9rem] leading-none filter drop-shadow-2xl hover:scale-110 transition-transform cursor-pointer select-none"
                onClick={handleAttack} // Click enemy to attack!
              >
                👾
              </motion.div>

              {/* Enemy Name Plate */}
              <div className="mt-4 bg-slate-900/80 px-4 py-2 rounded-xl border-2 border-slate-700 backdrop-blur-md text-center w-[90%]">
                <h2 className="text-rose-400 font-black uppercase tracking-wider text-lg">Slime King</h2>
                
                {/* Enemy HP Bar */}
                <div className="w-full h-4 bg-slate-950 rounded-full mt-2 overflow-hidden border border-slate-700 relative">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-rose-500 to-rose-400"
                    initial={{ width: "100%" }}
                    animate={{ width: `${(enemyHp / enemyMaxHp) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>HP {enemyHp}/{enemyMaxHp}</span>
                  <span className="text-yellow-400 flex items-center gap-1">
                    <Sparkles size={10} /> ATK IMPENDING
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decorative elements around the card */}
          <div className="absolute -top-4 -right-4 text-4xl animate-bounce delay-700 pointer-events-none">✨</div>
          <div className="absolute bottom-10 -left-6 text-2xl animate-pulse pointer-events-none text-slate-700 opacity-50">☠️</div>
        </div>

      </motion.main>

      {/* CONTROLS AREA */}
      <footer className="p-4 pb-8 shrink-0 z-20">
        <div className="max-w-md mx-auto relative">
          
          {/* Controls Container background */}
          <div className="absolute -inset-4 bg-slate-900/90 backdrop-blur-xl rounded-t-[3rem] border-t-4 border-slate-700 -z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]" />

          <div className="grid grid-cols-4 gap-4 items-end">
            <div className="col-span-2">
              <ChunkyButton 
                label="Attack" 
                emoji="⚔️" 
                color="rose" 
                size="lg" 
                onClick={handleAttack}
                className="rotate-1" 
              />
            </div>
            <div className="col-span-1">
              <ChunkyButton 
                label="Block" 
                emoji="🛡️" 
                color="indigo" 
                onClick={handleDefend}
                className="-rotate-2" 
              />
            </div>
            <div className="col-span-1">
              <ChunkyButton 
                label="Rest" 
                emoji="💤" 
                color="emerald" 
                onClick={handleRest}
                className="rotate-2" 
              />
            </div>
          </div>
          
          <div className="text-center mt-6">
            <div className="inline-block px-3 py-1 bg-black/40 rounded-full text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] border border-white/5">
              Turn 4 • Prototype v0.2
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <InventoryModal 
        isOpen={showInventory} 
        onClose={() => setShowInventory(false)} 
        items={inventory}
        equipItem={(item) => {
          setInventory(prev => prev.map(i => ({
            ...i,
            equipped: i.id === item.id ? !i.equipped : i.equipped
          })));
        }}
      />

    </div>
  );
}
