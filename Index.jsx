import React, { useState, useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { LayoutDashboard, Mic, Library, ShieldCheck, Trophy, Send, Settings, Upload, Gavel, Smartphone, Cpu, Fingerprint } from 'lucide-react';

// --- CONFIGURATION ---
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: "limitless-kreationz.firebaseapp.com",
  projectId: "limitless-kreationz"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([{ role: 'assistant', text: "Neural Studio v7.8 Online. Biometric identity: QueenBeeKarmaT83. Source of Truth verified." }]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u) || signInAnonymously(auth));
    return () => unsubscribe();
  }, []);

  const handleChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatHistory([...chatHistory, { role: 'user', text: chatInput }, { role: 'assistant', text: "Directive received by the Architect. Processing Legal Deed..." }]);
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col md:flex-row">
      <nav className="fixed bottom-0 w-full bg-black/80 backdrop-blur-xl border-t border-white/10 flex justify-around p-4 z-50 md:relative md:w-64 md:h-screen md:flex-col md:justify-start md:border-r md:border-t-0 md:p-8">
        <div className="hidden md:flex items-center gap-3 mb-10"><Cpu className="text-purple-500"/><h2 className="font-black text-lg">KREATIONZ</h2></div>
        <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-4 p-4 rounded-xl ${activeTab === 'dashboard' ? 'bg-purple-600/10 text-purple-400' : 'text-gray-500'}`}><LayoutDashboard size={20}/> Studio</button>
        <button onClick={() => setActiveTab('voicelab')} className={`flex items-center gap-4 p-4 rounded-xl ${activeTab === 'voicelab' ? 'bg-purple-600/10 text-purple-400' : 'text-gray-500'}`}><Mic size={20}/> Voice Lab</button>
        <button onClick={() => setActiveTab('legal')} className={`flex items-center gap-4 p-4 rounded-xl ${activeTab === 'legal' ? 'bg-purple-600/10 text-purple-400' : 'text-gray-500'}`}><ShieldCheck size={20}/> Legal</button>
      </nav>

      <main className="flex-1 p-6 pb-24 md:pb-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black uppercase italic">{activeTab}</h1>
          <div className="bg-neutral-900 px-4 py-2 rounded-lg border border-white/5 text-[10px] font-mono text-green-500">SYNCED: {user?.uid?.substring(0,8) || 'CONNECTING'}</div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="bg-neutral-900/50 border border-white/5 rounded-3xl h-[500px] flex flex-col overflow-hidden">
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {chatHistory.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-4 rounded-2xl max-w-[80%] text-sm ${m.role === 'user' ? 'bg-purple-600' : 'bg-neutral-800 border border-white/10 font-mono'}`}>{m.text}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleChat} className="p-4 bg-black/40 flex gap-2"><input value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="flex-1 bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-sm" placeholder="Enter directive..."/><button type="submit" className="bg-purple-600 p-3 rounded-xl"><Send size={18}/></button></form>
          </div>
        )}

        {activeTab === 'voicelab' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-900/50 border border-white/5 p-10 rounded-3xl flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20"><Mic size={32}/></div>
              <h3 className="font-bold">Biometric Record</h3>
              <button className="w-full py-4 bg-white text-black rounded-xl font-black text-xs uppercase">Start Recording</button>
            </div>
            <div className="bg-neutral-900/50 border border-white/5 p-10 rounded-3xl flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center"><Upload size={32}/></div>
              <h3 className="font-bold">Media Upload</h3>
              <label className="w-full py-4 bg-purple-600 rounded-xl font-black text-xs uppercase text-center cursor-pointer">Select File<input type="file" className="hidden"/></label>
            </div>
          </div>
        )}

        {activeTab === 'legal' && (
          <div className="bg-neutral-900/50 border border-white/5 p-10 rounded-3xl space-y-6">
            <div className="flex items-center gap-4 text-green-500"><Gavel size={32}/><h2 className="text-xl font-black uppercase">Sovereign Legal Shield</h2></div>
            <p className="text-sm text-gray-400 italic font-serif">"All neural artifacts are the exclusive private property of QueenBeeKarmaT83. Rule: ADDITIVE ONLY."</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/40 p-4 border border-white/5 rounded-xl"><p className="text-[10px] text-gray-500">OWNER</p><p className="font-mono text-xs">QueenBeeKarmaT83</p></div>
              <div className="bg-black/40 p-4 border border-white/5 rounded-xl"><p className="text-[10px] text-gray-500">DEED ID</p><p className="font-mono text-xs">QB-JB-DEED-001</p></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


