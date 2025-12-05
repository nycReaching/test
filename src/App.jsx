import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  Heart, 
  Zap, 
  Shield, 
  Sword, 
  Backpack, 
  Skull, 
  Coins, 
  Sparkles,
  X,
  Menu,
  ChevronRight
} from 'lucide-react';

/**
 * --- GAME CONFIGURATION & THEME ---
 * This section defines the "look" without needing image assets.
 * We use Tailwind utility classes to define color palettes for game concepts.
 */

const THEME = {
  bg: "bg-slate-900",
  text: "text-slate-100",
  primary: "indigo", // Magic/UI
  danger: "rose",    // Health/Enemies
  warning: "amber",  // Gold/Loot
  success: "emerald" // Stamina/Buffs
};

/**
 * --- COMPONENTS ---
 */

// 1. The "Juicy" Button
// A reusable button component that has depth (shadow-b) and bounce on click.
const GameButton = ({ onClick, color = "indigo", icon: Icon, label, disabled, size = "md" }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95, y: 4 }} // The "press" effect
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group w-full flex flex-col items-center justify-center 
        ${size === 'lg' ? 'h-24' : 'h-16'}
        rounded-2xl transition-all
        bg-${color}-500 border-b-4 border-${color}-700
        active:border-b-0 active:translate-y-1
        disabled:opacity-50 disabled:grayscale
        shadow-lg
      `}
    >
      {/* Gloss effect overlay */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-white/20 rounded-t-2xl pointer-events-none" />
      
      {Icon && <Icon className={`mb-1 ${size === 'lg' ? 'w-8 h-8' : 'w-5 h-5'} text-white drop-shadow-md`} />}
      <span className="font-bold uppercase tracking-wider text-xs text-white drop-shadow-md">
        {label}
      </span>
    </motion.button>
  );
};

// 2. Resource Badge (Top Bar)
// Displays HP, Gold, Energy with a popping animation when values change.
const ResourceBadge = ({ icon: Icon, value, color, label }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-2 rounded-xl bg-slate-800/80 border border-slate-700 min-w-[70px]`}>
      <div className={`text-${color}-400 mb-1`}>
        <Icon size={18} fill="currentColor" fillOpacity={0.2} />
      </div>
      {/* We key the value so framer-motion re-renders the animation when numbers change */}
      <motion.span 
        key={value}
        initial={{ scale: 1.5, color: '#fff' }}
        animate={{ scale: 1, color: '#e2e8f0' }}
        className="font-mono font-bold text-sm"
      >
        {value}
      </motion.span>
    </div>
  );
};

// 3. Floating Combat Text
// Spawns when damage happens
const FloatingText = ({ x, y, text, color, onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0, scale: 0.5 }}
      animate={{ opacity: 0, y: -50, scale: 1.2 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={onComplete}
      className={`absolute font-black text-2xl text-${color}-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] pointer-events-none z-50`}
      style={{ left: x, top: y }}
    >
      {text}
    </motion.div>
  );
};

// 4. The Inventory "Modal"
// Sliding sheet from bottom, typical in modern mobile UIs
const InventorySheet = ({ isOpen, onClose, items, equipItem }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 h-[70vh] bg-slate-800 rounded-t-3xl z-50 p-6 shadow-2xl border-t border-slate-600 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Backpack className="text-indigo-400" /> Inventory
              </h2>
              <button onClick={onClose} className="p-2 bg-slate-700 rounded-full text-white">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 overflow-y-auto pb-20">
              {items.map((item, idx) => (
                <motion.button
                  key={item.id}
                  layoutId={item.id}
                  onClick={() => equipItem(item)}
                  className="aspect-square bg-slate-700 rounded-xl border-2 border-slate-600 flex items-center justify-center text-3xl relative overflow-hidden"
                >
                  {item.emoji}
                  {item.equipped && (
                    <div className="absolute top-1 right-1 w-3 h-3 bg-emerald-400 rounded-full border border-white" />
                  )}
                </motion.button>
              ))}
              {/* Empty slots for visual consistency */}
              {[...Array(4)].map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square bg-slate-900/50 rounded-xl border border-slate-800 border-dashed" />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/**
 * --- MAIN APP LOGIC ---
 */

export default function RoguelikePrototype() {
  // Game State
  const [hp, setHp] = useState(85);
  const [maxHp] = useState(100);
  const [gold, setGold] = useState(120);
  const [energy, setEnergy] = useState(3);
  const [enemyHp, setEnemyHp] = useState(50);
  
  // UI State
  const [showInventory, setShowInventory] = useState(false);
  const [activeEffects, setActiveEffects] = useState([]); // For floating text
  const [shake, setShake] = useState(false);
  
  // Mock Data
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Rusty Sword', emoji: '🗡️', type: 'weapon', equipped: true },
    { id: 2, name: 'Health Potion', emoji: '🧪', type: 'consumable', equipped: false },
    { id: 3, name: 'Lucky Coin', emoji: '🪙', type: 'trinket', equipped: false },
    { id: 4, name: 'Old Map', emoji: '📜', type: 'quest', equipped: false },
  ]);

  const enemyControls = useAnimation();

  // Helper to spawn floating text
  const spawnText = (text, color = "white", x = "50%", y = "40%") => {
    const id = Date.now();
    setActiveEffects(prev => [...prev, { id, text, color, x, y }]);
  };

  // Actions
  const handleAttack = async () => {
    if (energy < 1) {
      spawnText("No Energy!", "slate", "50%", "70%");
      return;
    }

    // 1. Deduct Energy
    setEnergy(e => e - 1);

    // 2. Animate Player Strike (Camera shake effect)
    setShake(true);
    setTimeout(() => setShake(false), 200);

    // 3. Animate Enemy Hit
    await enemyControls.start({ x: [0, 10, -10, 5, -5, 0], color: "#ef4444", transition: { duration: 0.3 } });
    
    // 4. Calculate Damage
    const dmg = Math.floor(Math.random() * 10) + 5;
    const isCrit = Math.random() > 0.8;
    const finalDmg = isCrit ? dmg * 2 : dmg;

    setEnemyHp(h => Math.max(0, h - finalDmg));
    spawnText(finalDmg, isCrit ? "orange" : "white", "50%", "30%");

    if (isCrit) spawnText("CRITICAL!", "orange", "50%", "25%");
  };

  const handleDefend = () => {
    if (energy < 1) return;
    setEnergy(e => e - 1);
    spawnText("SHIELD UP", "cyan", "50%", "50%");
  };

  const handleLoot = () => {
    // Simulating a turn or refresh
    setEnergy(3);
    spawnText("Energy Restored", "emerald", "50%", "60%");
  };

  // Render
  return (
    <div className={`h-screen w-full ${THEME.bg} ${THEME.text} font-sans overflow-hidden flex flex-col select-none touch-manipulation`}>
      
      {/* 1. TOP HUD - Sticky */}
      <header className="p-4 flex justify-between items-start z-10 shrink-0">
        <div className="flex gap-3">
          <ResourceBadge icon={Heart} value={`${hp}/${maxHp}`} color="rose" label="HP" />
          <ResourceBadge icon={Zap} value={energy} color="emerald" label="AP" />
        </div>
        <div className="flex gap-3">
          <ResourceBadge icon={Coins} value={gold} color="amber" label="Gold" />
          <button 
            onClick={() => setShowInventory(true)}
            className="p-3 bg-indigo-600 rounded-xl shadow-lg active:scale-95 transition-transform"
          >
            <Backpack className="text-white" />
          </button>
        </div>
      </header>

      {/* 2. MAIN GAME VIEWPORT - Flexible Area */}
      {/* This area scales to fill available space. We use flex-col to center the content. */}
      <motion.main 
        className="flex-1 relative flex flex-col items-center justify-center p-6"
        animate={{ x: shake ? [0, -5, 5, -5, 5, 0] : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Floating Texts Layer */}
        {activeEffects.map(effect => (
          <FloatingText 
            key={effect.id} 
            {...effect} 
            onComplete={() => setActiveEffects(prev => prev.filter(e => e.id !== effect.id))} 
          />
        ))}

        {/* The "Card" - Can be an Enemy, Event, or NPC */}
        <div className="w-full max-w-xs aspect-[3/4] bg-slate-800 rounded-3xl shadow-2xl border-4 border-slate-700 relative overflow-hidden flex flex-col">
          
          {/* Card Header (Name/Level) */}
          <div className="bg-slate-900/50 p-4 text-center border-b border-white/5">
            <h2 className="text-xl font-black tracking-widest text-rose-400 uppercase">
              Slime King
            </h2>
            <div className="text-xs text-slate-400 font-mono mt-1">Lvl 5 • Boss</div>
          </div>

          {/* Visual Stage */}
          <div className="flex-1 relative flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900">
            {/* Background Decor (Grid/Glow) */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-500 via-slate-900 to-transparent" />
            
            {/* The Entity */}
            <motion.div 
              animate={enemyControls}
              className="text-9xl drop-shadow-2xl filter brightness-110"
            >
              👾
            </motion.div>

            {/* Entity HP Bar */}
            <div className="absolute bottom-8 w-3/4 h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-600">
              <motion.div 
                className="h-full bg-rose-500"
                initial={{ width: "100%" }}
                animate={{ width: `${(enemyHp / 50) * 100}%` }}
              />
            </div>
          </div>

          {/* Card Footer (Intent/Status) */}
          <div className="p-3 bg-slate-900/80 flex justify-between items-center text-sm px-6">
            <span className="flex items-center gap-2 text-yellow-400">
              <Sparkles size={14} /> Preparing Attack
            </span>
            <span className="font-mono text-slate-500">12 DMG</span>
          </div>
        </div>
      </motion.main>

      {/* 3. CONTROL DECK - Bottom Anchored */}
      {/* Designed for thumbs. Grid layout keeps it tidy. */}
      <footer className="p-4 bg-slate-800/50 backdrop-blur-md rounded-t-3xl border-t border-white/5 shrink-0 z-20 pb-8">
        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
          
          {/* Main Action (Attack) - Takes up 2 slots */}
          <div className="col-span-2">
            <GameButton 
              label="Attack" 
              icon={Sword} 
              color="rose" 
              size="lg" 
              onClick={handleAttack} 
            />
          </div>

          {/* Secondary Actions */}
          <div className="col-span-1">
            <GameButton 
              label="Defend" 
              icon={Shield} 
              color="indigo" 
              size="lg" 
              onClick={handleDefend} 
            />
          </div>

           {/* Utility/Pass Turn */}
           <div className="col-span-1">
            <GameButton 
              label="Rest" 
              icon={Zap} 
              color="emerald" 
              size="lg" 
              onClick={handleLoot} 
            />
          </div>

        </div>
        
        {/* Helper/Meta Text */}
        <div className="text-center mt-4 text-xs text-slate-500 font-mono uppercase tracking-widest opacity-50">
          Turn 4 • Floor 1
        </div>
      </footer>

      {/* 4. OVERLAYS */}
      <InventorySheet 
        isOpen={showInventory} 
        onClose={() => setShowInventory(false)} 
        items={inventory}
        equipItem={(item) => console.log("Equipping", item)}
      />

    </div>
  );
}
