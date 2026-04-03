import React, { useState, useEffect } from 'react';
// These are the new "top lines" - we now pull auth and db from your lib folder
import { auth, db } from '../lib/firebase'; 
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { LayoutDashboard, Mic, ShieldCheck, Send, Cpu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', text: "Source of Truth Verified. QueenBeeKarmaT83 identified." }
  ]);

  // Unified Auth Effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) { 
        setUser(u); 
      } else { 
        // If no user, trigger the anonymous sign-in bridge
        signInAnonymously(auth).catch(err => console.error("Auth Protocol Failed:", err)); 
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Update local history with the user command and a system response
    setChatHistory(prev => [
      ...prev, 
      { role: 'user', text: chatInput }, 
      { role: 'assistant', text: "Legal Deed Generated for this directive." }
    ]);
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row font-sans selection:bg-purple-500/30">
      {/* SIDE NAVIGATION */}
      <nav className="w-full md:w-64 bg-neutral-900/50 p-6 flex md:flex-col border-b md:border-r border-white/10 gap-4">
        <div className="hidden md:flex items-center gap-2 mb-8">
          <Cpu className="text-purple-500"/>
          <span className="font-bold tracking-tighter uppercase">Kreationz</span>
        </div>
        
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className={`p-4 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'dashboard' ? 'bg-purple-600 shadow-lg shadow-purple-500/20' : 'hover:bg-white/5'}`}
        >
          <LayoutDashboard size={18}/> 
          <span className="text-xs font-bold uppercase tracking-widest">Studio</span>
        </button>

        <button 
          onClick={() => setActiveTab('voicelab')} 
          className={`p-4 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'voicelab' ? 'bg-purple-600 shadow-lg shadow-purple-500/20' : 'hover:bg-white/5'}`}
        >
          <Mic size={18}/> 
          <span className="text-xs font-bold uppercase tracking-widest">Voice Lab</span>
        </button>

        <button 
          onClick={() => setActiveTab('legal')} 
          className={`p-4 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'legal' ? 'bg-purple-600 shadow-lg shadow-purple-500/20' : 'hover:bg-white/5'}`}
        >
          <ShieldCheck size={18}/> 
          <span className="text-xs font-bold uppercase tracking-widest">Legal Shield</span>
        </button>
      </nav>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 p-8 md:p-12">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-black uppercase tracking-tighter italic">
            {activeTab}
          </h1>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              Core_Status: {user ? 'Online' : 'Syncing...'}
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="max-w-4xl animate-in fade-in duration-500">
            <div className="bg-neutral-900/80 border border-white/10 rounded-[2rem] h-[500px] flex flex-col overflow-hidden shadow-2xl">
              <div className="flex-1 p-8 overflow-y-auto space-y-6">
                {chatHistory.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-5 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                      m.role === 'user' 
                      ? 'bg-purple-600 font-bold' 
                      : 'bg-neutral-800 border border-white/5 text-neutral-300 font-mono'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleChat} className="p-6 bg-black/40 border-t border-white/5 flex gap-3">
                <input 
                  value={chatInput} 
                  onChange={(e) => setChatInput(e.target.value)} 
                  className="flex-1 bg-black border border-white/10 rounded-xl px-6 py-4 text-sm focus:border-purple-500 outline-none transition-colors" 
                  placeholder="Enter System Directive..."
                />
                <button type="submit" className="bg-purple-600 w-14 h-14 rounded-xl flex items-center justify-center hover:bg-purple-500 transition-all active:scale-95">
                  <Send size={18}/>
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'voicelab' && (
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-white/5 rounded-[2rem] text-neutral-600 font-black uppercase tracking-[0.3em] text-xs">
            Vocal DNA Mapping Module Initializing...
          </div>
        )}

        {activeTab === 'legal' && (
          <div className="p-8 bg-neutral-900/50 border border-white/5 rounded-[2rem]">
            <p className="text-sm font-serif italic text-neutral-400">
              "All neural artifacts and code constructions within this environment are protected under the Sovereign Core protocol."
            </p>
          </div>
        )}
      </main>
    </div>
  );
}