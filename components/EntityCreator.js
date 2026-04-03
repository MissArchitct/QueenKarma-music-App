import { useState } from 'react';
import { db, storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export default function EntityCreator({ owner }) {
  const [entityName, setEntityName] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleCreateEntity = async (e) => {
    e.preventDefault();
    if (!file || !entityName) return;

    setStatus('Uploading Identity...');
    try {
      // 1. Upload Voice Reference to Firebase Storage
      const storageRef = ref(storage, `entities/${owner}/${entityName}/voice_sample.mp3`);
      await uploadBytes(storageRef, file);
      const voiceUrl = await getDownloadURL(storageRef);

      // 2. Save Entity Profile to Firestore
      await addDoc(collection(db, "entities"), {
        owner: owner,
        name: entityName,
        voiceUrl: voiceUrl,
        createdAt: new Date(),
        status: 'active'
      });

      setStatus('Entity Sealed & Secured.');
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  return (
    <div className="p-8 bg-neutral-900 border border-white/5 rounded-[2rem]">
      <h3 className="text-xl font-bold mb-4 uppercase italic">Create New Entity</h3>
      <form onSubmit={handleCreateEntity} className="space-y-4">
        <input 
          type="text" 
          placeholder="Entity Name (e.g. The Hive)" 
          className="w-full bg-black p-4 rounded-xl border border-white/10"
          onChange={(e) => setEntityName(e.target.value)}
        />
        <div className="border-2 border-dashed border-white/10 p-8 rounded-xl text-center">
          <input 
            type="file" 
            accept="audio/*,video/*" 
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden" 
            id="voice-upload"
          />
          <label htmlFor="voice-upload" className="cursor-pointer text-purple-500 hover:text-white transition">
            {file ? file.name : "Upload Voice DNA / Video Clip"}
          </label>
        </div>
        <button type="submit" className="w-full bg-purple-600 p-4 rounded-xl font-black uppercase tracking-widest">
          Initialize Entity
        </button>
        {status && <p className="text-[10px] font-mono text-center mt-2">{status}</p>}
      </form>
    </div>
  );
}
