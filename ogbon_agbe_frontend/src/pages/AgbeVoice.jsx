import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Volume2, VolumeX, User, ChevronLeft, Trash2 } from 'lucide-react';
import { agbeVoiceService } from '../services/api'; // Import your live backend voice agent service

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
  const [isWaitingForAi, setIsWaitingForAi] = useState(false); // Controls loading skeleton
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
    utterance.rate = 0.85; 

    utterance.onend = () => {
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isPlaying: false } : m));
    };
    utterance.onerror = () => {
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isPlaying: false } : m));
    };

    setMessages(messages.map(m => m.id === msgId ? { ...m, isPlaying: true } : { ...m, isPlaying: false }));
    window.speechSynthesis.speak(utterance);
  };

  // Action: Submits input directly to Abdullahi's backend routing interface
  const handleSendMessage = async () => {
    let userText = "";

    if (isRecording) {
      userText = `🎤 Voice Note (${formatTime(recordingTime)})`;
      setIsRecording(false);
      // Future hook: agbeVoiceService.uploadVoiceNote(audioBlob)
    } else if (inputText.trim()) {
      userText = inputText;
      setInputText("");
    } else {
      return;
    }

    // Append user message instantly to screen
    const userMsg = { id: Date.now(), role: 'user', text: userText, isPlaying: false };
    setMessages(prev => [...prev, userMsg]);
    
    try {
      setIsWaitingForAi(true);

      // Map chat messages into a clean history payload for Ibrahim's Gemini system guidelines
      const chatHistory = messages.map(m => ({
        role: m.role === 'ai' ? 'model' : 'user',
        text: m.text
      }));
      
      // Make real HTTP call to Cloud Run
      const aiResponse = await agbeVoiceService.sendMessage(userText, chatHistory);
      
      const responseMsg = {
        id: Date.now() + 1,
        role: 'ai',
        text: aiResponse.text || 'Mo gbọ́ àlàyé rẹ, ṣùgbọ́n àmì ẹ̀rọ mi dín kù díẹ̀.', 
        isPlaying: false
      };
      
      setMessages(prev => [...prev, responseMsg]);
    } catch (error) {
      console.error("API Connection dropped, drawing fallback warning text:", error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        text: 'Àkókò ti kọjá (Request timed out). Please check your internet connection or backend endpoint parameters.',
        isPlaying: false
      }]);
    } finally {
      setIsWaitingForAi(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-osun-cream dark:bg-osun-bg-dark font-sans transition-colors duration-300 w-full max-w-full overflow-hidden">
      {/* Header Panel */}
      <header className="p-4 sm:p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between bg-white dark:bg-osun-card-dark w-full shrink-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <button onClick={() => { if (window.speechSynthesis) window.speechSynthesis.cancel(); onBack(); }} className="text-osun-green-mid cursor-pointer hover:opacity-70 transition-opacity p-1 focus:outline-none">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold dark:text-white">Àgbẹ̀ Voice</h2>
            <p className="text-[#C8860A] font-bold text-[9px] sm:text-[10px] uppercase tracking-widest">Ohùn Àgbẹ̀ · AI Advisor</p>
          </div>
        </div>
        <span className="text-[9px] sm:text-[10px] font-mono bg-[#C8860A]/10 text-[#C8860A] px-2.5 sm:px-3 py-1 rounded-full font-bold whitespace-nowrap">
          AV-03: Live Agent
        </span>
      </header>

      {/* Chat Space */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 w-full max-w-4xl mx-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 sm:gap-3 w-full ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'ai' ? 'bg-[#C8860A]' : 'bg-osun-green-mid'}`}>
              {msg.role === 'ai' ? <Mic size={14} className="text-osun-green-deep" /> : <User size={14} className="text-white" />}
            </div>

            <div className={`max-w-[85%] sm:max-w-[75%] p-3.5 sm:p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 ${msg.role === 'ai' ? 'bg-white dark:bg-osun-card-dark rounded-tl-none text-gray-800 dark:text-gray-100' : 'bg-osun-green-mid text-white rounded-tr-none'}`}>
              <p className="text-xs sm:text-sm leading-relaxed break-words">{msg.text}</p>
              
              {msg.role === 'ai' && (
                <div className="mt-3 flex flex-col gap-1">
                  <button 
                    onClick={() => handleReadAloud(msg.id, msg.text)}
                    className={`flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-xl transition-all self-start cursor-pointer focus:outline-none ${msg.isPlaying ? 'bg-red-500/10 text-red-500 animate-pulse' : 'bg-[#C8860A]/10 text-[#C8860A] hover:bg-[#C8860A]/20'}`}
                  >
                    {msg.isPlaying ? <><VolumeX size={12} /> Dúró (Stop)</> : <><Volume2 size={12} /> Gbọ́ Ohùn (Listen)</>}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Live Loading Skeleton Placeholder */}
        {isWaitingForAi && (
          <div className="flex gap-2 sm:gap-3 w-full items-center animate-pulse">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#C8860A]/50 flex items-center justify-center shrink-0">
              <Mic size={14} className="text-osun-green-deep" />
            </div>
            <div className="bg-white dark:bg-osun-card-dark p-3 rounded-2xl border border-gray-100 dark:border-white/5">
              <p className="text-xs text-gray-400 font-mono">Àgbẹ̀ Advisor ń kọ̀wé... (Thinking...)</p>
            </div>
          </div>
        )}
      </main>

      {/* Input Tray Section */}
      <footer className="p-4 sm:p-6 bg-white dark:bg-osun-card-dark border-t border-gray-100 dark:border-white/5 w-full shrink-0">
        <div className="max-w-4xl mx-auto flex items-center gap-2 sm:gap-3">
          
          <div className="flex-1 bg-osun-cream dark:bg-osun-bg-dark rounded-full px-4 sm:px-5 py-1.5 sm:py-2 flex items-center border border-gray-100 dark:border-white/5 min-h-[48px] sm:min-h-[56px] overflow-hidden">
            {isRecording ? (
              <div className="flex items-center gap-2 sm:gap-3 w-full animate-pulse">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_red] shrink-0"></div>
                <span className="text-xs sm:text-sm font-mono font-bold text-red-500 shrink-0">{formatTime(recordingTime)}</span>
                <span className="text-[11px] sm:text-xs text-gray-400 flex-1 truncate ml-1 font-medium">Ẹ kọ́ ohùn sílẹ̀...</span>
                <button 
                  onClick={() => setIsRecording(false)} 
                  className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-1 shrink-0 focus:outline-none"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <input 
                type="text" 
                value={inputText}
                disabled={isWaitingForAi}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isWaitingForAi ? "Processing network parameters..." : "Ask about crops, rain or fertilizer..."}
                className="w-full bg-transparent p-1.5 sm:p-2 outline-none text-xs sm:text-sm dark:text-white disabled:opacity-50"
              />
            )}
          </div>

          <button 
            onClick={isRecording || inputText.trim().length > 0 ? handleSendMessage : () => setIsRecording(true)}
            disabled={isWaitingForAi}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 shrink-0 cursor-pointer focus:outline-none disabled:opacity-40 ${
              isRecording || inputText.trim().length > 0 
                ? 'bg-osun-green-mid text-white shadow-osun-green-mid/20' 
                : 'bg-osun-gold text-osun-green-deep shadow-osun-gold/20'
            }`}
          >
            {isRecording || inputText.trim().length > 0 ? <Send size={18} /> : <Mic size={18} />}
          </button>
        </div>
      </footer>
    </div>
  );
}