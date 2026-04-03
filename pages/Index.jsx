import React, { useState, useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { LayoutDashboard, Mic, Library, ShieldCheck, Send, Settings, Upload, Gavel, Cpu } from 'lucide-react';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "placeholder",
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
  const [chatHistory, setChatHistory] = useState([{ role: 'assistant', text: "Source of Truth Verified. QueenBeeKarmaT83 identified." }]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) { setUser(u); } else { signInAnonymously(auth); }
    });
    return () => unsubscribe();
  }, []);

  const handleChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatHistory([...chatHistory, { role: 'user', text: chatInput }, { role: 'assistant', text: "Legal Deed Generated for this directive." }]);
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row font-sans">
      <nav className="w-full md:w-64 bg-neutral-900/50 p-6 flex md:flex-col border-b md:border-r border-white/10 gap-4">
        <div className="hidden md:flex items-center gap-2 mb-8"><Cpu className="text-purple-500"/><span className="font-bold tracking-tighter">KREATIONZ</span></div>
        <button onClick={() => setActiveTab('dashboard')} className={`p-3 rounded-lg flex gap-3 ${activeTab === 'dashboard' ? 'bg-purple-600' : ''}`}><LayoutDashboard size={18}/> Studio</button>
        <button onClick={() => setActiveTab('voicelab')} className={`p-3 rounded-lg flex gap-3 ${activeTab === 'voicelab' ? 'bg-purple-600' : ''}`}><Mic size={18}/> Voice</button>
        <button onClick={() => setActiveTab('legal')} className={`p-3 rounded-lg flex gap-3 ${activeTab === 'legal' ? 'bg-purple-600' : ''}`}><ShieldCheck size={18}/> Legal</button>
      </nav>
      <main className="flex-1 p-8">
        <header className="flex justify-between mb-8">
          <h1 className="text-xl font-black uppercase tracking-widest">{activeTab}</h1>
          <div className="text-[10px] font-mono text-green-500">AUTH_STATUS: ONLINE</div>
        </header>
        {activeTab === 'dashboard' && (
          <div className="bg-neutral-900 border border-white/10 rounded-2xl h-[400px] flex flex-col overflow-hidden">
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {chatHistory.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-xl max-w-[80%] text-sm ${m.role === 'user' ? 'bg-purple-600' : 'bg-neutral-800'}`}>{m.text}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleChat} className="p-4 bg-black/50 flex gap-2"><input value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-2" placeholder="Directive..."/><button className="bg-purple-600 px-4 rounded-lg"><Send size={16}/></button></form>
          </div>
        )}
      </main>
    </div>
  );
}
