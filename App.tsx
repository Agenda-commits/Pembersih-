
import React, { useState, useEffect, useCallback } from 'react';
import { AppState, SecurityLog } from './types';
import { Terminal } from './components/Terminal';

const MONKEY_IMAGE = 'https://infokalteng.co/foto_berita/135642-dbb76965-0732-4b1b-bbe2-cbea751844c6.jpeg';
const ALERT_SOUND = 'https://www.soundjay.com/buttons/beep-01a.mp3';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [countdown, setCountdown] = useState(5);
  const [showMonkey, setShowMonkey] = useState(false);

  const addLog = useCallback((message: string, type: SecurityLog['type'] = 'info') => {
    const newLog: SecurityLog = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
    };
    setLogs((prev) => [...prev, newLog].slice(-20));
  }, []);

  const startAnalysis = () => {
    setState(AppState.SCANNING);
    addLog('Starting Deep System Analysis...', 'info');
    
    const steps = [
      { msg: 'Kernel integrity check: PASSED', delay: 800 },
      { msg: 'Firewall status: ACTIVE', delay: 1500 },
      { msg: 'Port scan: 65,535 ports analyzed', delay: 2200 },
      { msg: 'WARNING: UNKNOWN ENTITY DETECTED', delay: 3000, type: 'warn' },
      { msg: 'TRACING ORIGIN...', delay: 3800, type: 'warn' },
      { msg: 'CRITICAL ERROR: SYSTEM COMPROMISED', delay: 4500, type: 'error' },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        addLog(step.msg, step.type as SecurityLog['type'] || 'info');
        if (index === steps.length - 1) {
          setTimeout(() => setState(AppState.COUNTDOWN), 1000);
        }
      }, step.delay);
    });
  };

  useEffect(() => {
    if (state === AppState.COUNTDOWN && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
        const audio = new Audio(ALERT_SOUND);
        audio.play().catch(() => {});
      }, 1000);
      return () => clearTimeout(timer);
    } else if (state === AppState.COUNTDOWN && countdown === 0) {
      setState(AppState.PRANK);
      setShowMonkey(true);
    }
  }, [state, countdown]);

  const reset = () => {
    setState(AppState.IDLE);
    setLogs([]);
    setCountdown(5);
    setShowMonkey(false);
  };

  return (
    <div className="min-h-screen matrix-bg flex flex-col items-center justify-center p-4">
      {/* Overlay for Prank */}
      {showMonkey && (
        <div 
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center cursor-none"
          onClick={reset}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center animate-pulse p-4 text-center">
            <h1 className="text-red-600 text-4xl md:text-6xl font-bold mb-8 glitch uppercase tracking-widest">WKWKWK MONYET!</h1>
            <div className="relative group">
              <img 
                src={MONKEY_IMAGE} 
                alt="Surprise!" 
                className="max-w-full max-h-[60vh] md:max-h-[70vh] rounded-2xl border-4 border-red-600 shadow-[0_0_50px_rgba(255,0,0,0.5)] transform scale-110 md:scale-125 animate-bounce"
              />
            </div>
            <p className="text-white mt-12 text-xl md:text-2xl font-mono animate-pulse">Lu kena prank! Click anywhere to exit</p>
          </div>
        </div>
      )}

      {/* Main UI */}
      <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-green-500/30 shadow-2xl transition-all duration-500">
        <header className="mb-8 text-center">
          <div className="inline-block p-3 bg-green-500/10 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Security Analyzer v4.0.2</h1>
          <p className="text-gray-400">Enterprise Grade Device Forensics & Threat Mitigation</p>
        </header>

        {state === AppState.IDLE && (
          <div className="space-y-6 text-center">
            <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-xl">
              <p className="text-green-400 mb-4">Click below to begin a comprehensive security audit of this terminal.</p>
              <button
                onClick={startAnalysis}
                className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-green-500/20"
              >
                START SYSTEM ANALYSIS
              </button>
            </div>
            <p className="text-xs text-gray-500">Authorized personnel only. Data usage rates may apply.</p>
          </div>
        )}

        {(state === AppState.SCANNING || state === AppState.COUNTDOWN) && (
          <div>
            <Terminal logs={logs} />
            
            {state === AppState.COUNTDOWN && (
              <div className="text-center py-6 animate-pulse">
                <h2 className="text-red-500 text-xl font-bold mb-4 uppercase tracking-tighter">
                  CRITICAL SYSTEM PURGE INITIATED
                </h2>
                <div className="flex justify-center items-center gap-4">
                  <div className="text-7xl font-bold text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                    {countdown}
                  </div>
                </div>
                <div className="mt-6 w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                   <div 
                    className="bg-red-600 h-full transition-all duration-1000" 
                    style={{ width: `${(countdown / 5) * 100}%` }}
                   />
                </div>
              </div>
            )}

            {state === AppState.SCANNING && (
              <div className="flex items-center justify-center gap-3 py-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                <span className="text-green-500 font-mono">Analyzing bitstreams... <span className="cursor-blink">|</span></span>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="mt-8 text-gray-600 text-xs font-mono">
        &copy; 2024 CYBER_SEC_PROTOCOLS // ENCRYPTION: AES-256
      </footer>
    </div>
  );
};

export default App;
