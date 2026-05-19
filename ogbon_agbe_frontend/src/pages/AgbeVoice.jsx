import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Volume2, VolumeX, User, ChevronLeft, Trash2 } from 'lucide-react';

export default function AgbeVoice({ onBack }) {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      role: 'ai', 
      text: 'Ẹ káàárọ̀! Mo le ràn ọ́ lọ́wọ́ lórí ọ̀rọ̀ gbegiri cassava, rọ́sì àgbàdo, tàbí ìlera ilẹ̀ rẹ. Béèrè lọ́wọ́ mi ní èdè Yorùbá tàbí Gẹ̀ẹ́sì.',
      isPlaying: false 
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef(null);

  // Handle WhatsApp-Style Recording Timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setRecordingTime(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleReadAloud = (msgId, textToSpeak) => {
    if (!window.speechSynthesis) return;

    if (messages.find(m => m.id === msgId).isPlaying) {
      window.speechSynthesis.cancel();
      setMessages(messages.map(m => m.id === msgId ? { ...m, isPlaying: false } : m));
      return;
    }

    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.8; // Slowed down slightly to help local browser pacing

    utterance.onend = () => {
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isPlaying: false } : m));
    };
    utterance.onerror = () => {
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isPlaying: false } : m));
    };

    setMessages(messages.map(m => m.id === msgId ? { ...m, isPlaying: true } : { ...m, isPlaying: false }));
    window.speechSynthesis.speak(utterance);
  };

  // Action: Handles Text Submission or Voice Note Submission
  const handleSendMessage = () => {
    let userText = "";

    if (isRecording) {
      // User tapped send while recording a voice note
      userText = `🎤 Voice Note (${formatTime(recordingTime)})`;
      setIsRecording(false);
    } else if (inputText.trim()) {
      // User sent standard text
      userText = inputText;
      setInputText("");
    } else {
      return;
    }

    const userMsg = { id: Date.now(), role: 'user', text: userText, isPlaying: false };
    
    // Simulated backend response mimicking Ibrahim's deep Yoruba persona prompts
    const mockAiMsg = {
      id: Date.now() + 1,
      role: 'ai',
      text: 'Mo gbọ́ àlàyé rẹ. Fun àìsàn gbegiri (CMD), rí i dájú pé o yọ àwọn ewé tí ó ti bàjẹ́ kúrò lójú ẹsẹ̀.',
      isPlaying: false
    };

    setMessages(prev => [...prev, userMsg, mockAiMsg]);
  };

  const handleCancelRecording = () => {
    setIsRecording(false);
  };

  return (
    <div className="h-screen flex flex-col bg-osun-cream dark:bg-osun-bg-dark font-sans transition-colors duration-300">
      {/* Header Panel */}
      <header className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between bg-white dark:bg-osun-card-dark">
        <div className="flex items-center gap-4">
          <button onClick={() => { if (window.speechSynthesis) window.speechSynthesis.cancel(); onBack(); }} className="text-osun-green-mid">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="font-serif text-2xl font-bold dark:text-white">Àgbẹ̀ Voice</h2>
            <p className="text-[#C8860A] font-bold text-[10px] uppercase tracking-widest">Ohùn Àgbẹ̀ · AI Advisor</p>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-[#C8860A]/10 text-[#C8860A] px-3 py-1 rounded-full font-bold">
          AV-03: Chat Playback
        </span>
      </header>

      {/* Chat Space */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'ai' ? 'bg-[#C8860A]' : 'bg-osun-green-mid'}`}>
              {msg.role === 'ai' ? <Mic size={16} className="text-osun-green-deep" /> : <User size={16} className="text-white" />}
            </div>

            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 ${msg.role === 'ai' ? 'bg-white dark:bg-osun-card-dark rounded-tl-none text-gray-800 dark:text-gray-100' : 'bg-osun-green-mid text-white rounded-tr-none'}`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              
              {msg.role === 'ai' && (
                <div className="mt-3 flex flex-col gap-1">
                  <button 
                    onClick={() => handleReadAloud(msg.id, msg.text)}
                    className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-xl transition-all self-start ${msg.isPlaying ? 'bg-red-500/10 text-red-500 animate-pulse' : 'bg-[#C8860A]/10 text-[#C8860A]'}`}
                  >
                    {msg.isPlaying ? <><VolumeX size={14} /> Dúró (Stop)</> : <><Volume2 size={14} /> Gbọ́ Ohùn (Listen)</>}
                  </button>
                  <p className="text-[9px] text-gray-400 italic mt-1 font-mono">*Local synthesis preview. Cloud TTS engine integrates next.</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </main>

      {/* Input Tray Section */}
      <footer className="p-6 bg-white dark:bg-osun-card-dark border-t border-gray-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          
          <div className="flex-1 bg-osun-cream dark:bg-osun-bg-dark rounded-full px-5 py-2 flex items-center border border-gray-100 dark:border-white/5 min-h-[56px]">
            {isRecording ? (
              <div className="flex items-center gap-3 w-full animate-pulse">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_red]"></div>
                <span className="text-sm font-mono font-bold text-red-500">{formatTime(recordingTime)}</span>
                <span className="text-xs text-gray-400 flex-1 ml-2 font-medium">Ẹ kọ́ ohùn sílẹ̀... (Recording audio)</span>
                <button onClick={handleCancelRecording} className="text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            ) : (
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about crops, rain or fertilizer..."
                className="w-full bg-transparent p-2 outline-none text-sm dark:text-white"
              />
            )}
          </div>

          {/* CRITICAL UPDATE: Button switches behavior context dynamically */}
          <button 
            onClick={isRecording || inputText.trim().length > 0 ? handleSendMessage : () => setIsRecording(true)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-90 shrink-0 ${
              isRecording || inputText.trim().length > 0 
                ? 'bg-osun-green-mid text-white shadow-osun-green-mid/20' 
                : 'bg-osun-gold text-osun-green-deep shadow-osun-gold/20'
            }`}
          >
            {isRecording || inputText.trim().length > 0 ? <Send size={22} /> : <Mic size={22} />}
          </button>
        </div>
      </footer>
    </div>
  );
}