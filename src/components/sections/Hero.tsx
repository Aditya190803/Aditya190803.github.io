'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATEMENTS = [
  'Building scalable ML & GenAI systems.',
  'From research to production.',
  'Not just models — systems that think.',
  'Perception. Design. Deploy.',
];

const CONCEPT_LOGS: Record<string, string[]> = {
  NEURAL_AGENTS: [
    '>> INITIALIZING MULTI-AGENT SWARM...',
    '>> AGENT_CORE_0: STOCHASTIC PERCEPTION LOADED.',
    '>> DEPLOYING REASONING NODES...',
    '>> LOSS DECAY: ACCELERATING VIA REFLECTION FEEDBACK.',
    '>> SYSTEM: SWARM COHESION ALIGNED AT 99.42% ACC.',
  ],
  LATENT_FLOW: [
    '>> CALCULATING DENSE VECTOR EMBEDDINGS...',
    '>> PROJECTIONS: DIMENSIONALITY REDUCED (t-SNE/UMAP)...',
    '>> NEAREST NEIGHBORS RESOLVED IN HIERARCHICAL INDEX...',
    '>> VECTOR FLOW FIELD STABILIZED BY K-SPACE ATTRACTORS.',
    '>> SYSTEM: HIGH-DIMENSIONAL CO-ORDINATION ESTABLISHED.',
  ],
  REINFORCEMENT: [
    '>> BOOTING POLICY GRADIENT NETWORKS...',
    '>> ALIGNING TO SYSTEM OBJECTIVES VIA HUMAN FEEDBACK (RLHF)...',
    '>> POLICY LOSS: -0.0412 | VALUE LOSS: 0.0894',
    '>> DYNAMIC ADVANTAGE FUNCTION COMPILING...',
    '>> SYSTEM: AGENT UTILITY OPTIMIZED AND SECURED.',
  ]
};

// Text Scramble Component Hook for technical loading feel
function useTextScramble(initialText: string, delay = 300, speed = 25) {
  const [text, setText] = useState('');
  
  useEffect(() => {
    let frame = 0;
    const chars = '01#@$%&*<>?/\\+=^-_[]{}';
    let intervalId: NodeJS.Timeout;
    
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        let scrambled = '';
        for (let i = 0; i < initialText.length; i++) {
          if (i < frame / 3) {
            scrambled += initialText[i];
          } else {
            scrambled += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        setText(scrambled);
        if (frame / 3 >= initialText.length) {
          setText(initialText);
          clearInterval(intervalId);
        }
        frame++;
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [initialText, delay, speed]);

  return text;
}

function LiveTime() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      ref.current.textContent = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
      }).format(new Date());
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return <span ref={ref} />;
}

// ── Interactive HTML5 Canvas Loss Curve Component ───────────
function LossChart({ epoch, lrSpeed }: { epoch: number; lrSpeed: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataPointsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensions
    canvas.width = canvas.parentElement?.clientWidth || 250;
    canvas.height = 70;

    // Prepopulate data points with a clean decaying function
    if (dataPointsRef.current.length === 0) {
      for (let i = 0; i < 40; i++) {
        dataPointsRef.current.push(0.85 * Math.exp(-i * 0.06) + Math.random() * 0.05);
      }
    }

    // Add a new decaying point periodically based on epoch/speed
    const step = 0.85 * Math.exp(-(40 + epoch) * 0.04) + Math.random() * 0.03;
    dataPointsRef.current.push(Math.max(0.015, step));
    if (dataPointsRef.current.length > 60) {
      dataPointsRef.current.shift();
    }

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(17, 17, 17, 0.04)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 15) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw curve
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    const count = dataPointsRef.current.length;
    const stepX = canvas.width / (count - 1);
    
    dataPointsRef.current.forEach((pt, i) => {
      // Map loss value (0 to 1) to canvas height (height to 0)
      const x = i * stepX;
      const y = canvas.height - (pt * (canvas.height - 10)) - 5;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw area under curve
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fillStyle = 'rgba(17, 17, 17, 0.02)';
    ctx.fill();

    // Pulse dot at the end
    if (count > 0) {
      const lastPt = dataPointsRef.current[count - 1];
      const endX = canvas.width;
      const endY = canvas.height - (lastPt * (canvas.height - 10)) - 5;
      
      ctx.fillStyle = '#111111';
      ctx.beginPath();
      ctx.arc(endX - 3, endY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

  }, [epoch, lrSpeed]);

  return <canvas ref={canvasRef} className="w-full h-[70px] opacity-75 mt-2" />;
}

// ── Interactive Neural Console Workspace ────────────────────
function LatentWorkspace() {
  const [lr, setLr] = useState(0.0003);
  const [optimizer, setOptimizer] = useState('AdamW');
  const [batchSize, setBatchSize] = useState(128);
  const [epoch, setEpoch] = useState(104);
  const [activeConcept, setActiveConcept] = useState('NEURAL_AGENTS');
  const [logs, setLogs] = useState<string[]>([
    '>> BOOTING ML EXPERIMENTAL WORKSPACE...',
    '>> SYSTEM CHECK: OK | WebGL SHADERS REGISTERED.',
    '>> LOADED MODEL CORE: ADITYA-v2.6-PERCEPTION.',
    '>> EPOCH 104/200: LOSS LANDSCAPE MINIMA CONVERGENCE.',
  ]);

  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs terminal
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Simulate real-time logs flow
  useEffect(() => {
    const logPool = [
      '>> [TRAIN] Backprop step completed.',
      '>> [GRADIENT] Computing Jacobian mappings...',
      '>> [OPTIMIZER] Applying weight decay penalty.',
      '>> [ALIGN] Evaluating latent cosine similarity.',
      '>> [ATTENTION] Attention weights entropy stable.',
      '>> [PERCEPTION] Rendering camera manifold vectors.',
    ];

    const interval = setInterval(() => {
      setEpoch((prev) => (prev < 200 ? prev + 1 : 100));
      const randLog = logPool[Math.floor(Math.random() * logPool.length)];
      setLogs((prev) => {
        const next = [...prev, `${randLog} | Loss: ${(0.042 * Math.exp(-epoch * 0.001) + Math.random() * 0.005).toFixed(4)}`];
        return next.slice(-8); // Keep last 8 lines
      });
    }, Math.max(300, 2000 - lr * 4000000)); // lr increases speed

    return () => clearInterval(interval);
  }, [lr, epoch]);

  // Handle Tuning Click
  const handleTune = () => {
    // Spike learning rate and randomize
    setLr((prev) => (prev < 0.001 ? prev + 0.0002 : 0.0001));
    setLogs((prev) => [
      ...prev,
      '>> [TUNER] HYPERPARAMETERS RE-CALCULATED!',
      `>> [TUNER] SPEED RATE SET TO ${(lr + 0.0002).toExponential(3)}`,
    ].slice(-8));

    // Dispatch custom event to trigger shockwave in WebGL particles
    const evt = new CustomEvent('ml-tuner-spike', { detail: { speed: lr } });
    window.dispatchEvent(evt);
  };

  // Handle Concept Click
  const handleConceptSelect = (concept: string) => {
    setActiveConcept(concept);
    const conceptLogs = CONCEPT_LOGS[concept];
    if (conceptLogs) {
      setLogs((prev) => [...prev, ...conceptLogs].slice(-8));
    }
  };

  return (
    <div
      className="border border-[var(--fg)] bg-[#FAFAFA]/85 backdrop-blur-md p-5 text-[11px] leading-[1.3] text-[var(--fg)] space-y-4 w-full shadow-sm relative overflow-hidden"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      {/* Decorative Blueprint Corner Hooks */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[var(--fg)]" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[var(--fg)]" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[var(--fg)]" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[var(--fg)]" />

      {/* Terminal Title */}
      <div className="flex justify-between items-center border-b border-[var(--fg)]/10 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--fg)] rounded-full animate-pulse-soft" />
          <span className="font-bold tracking-tight">[CORE_LATENT_WORKSPACE]</span>
        </div>
        <span className="text-[10px] text-[var(--fg)]/40 font-medium">ADITYA-v2.6</span>
      </div>

      {/* Hyperparameter Controllers */}
      <div className="grid grid-cols-2 gap-3 text-[10px] bg-[var(--fg)]/3 p-3 border border-[var(--fg)]/5">
        <div className="space-y-1.5">
          <div className="text-[var(--fg)]/40">LEARNING_RATE:</div>
          <div className="flex items-center justify-between font-bold pr-2">
            <span>{lr.toExponential(3)}</span>
            <div className="flex gap-1">
              <button
                onClick={() => setLr((l) => Math.max(1e-4, l - 1e-4))}
                className="w-4 h-4 flex items-center justify-center border border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[#FAFAFA] transition-colors cursor-none text-[8px]"
              >
                -
              </button>
              <button
                onClick={() => setLr((l) => Math.min(1e-2, l + 1e-4))}
                className="w-4 h-4 flex items-center justify-center border border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[#FAFAFA] transition-colors cursor-none text-[8px]"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="text-[var(--fg)]/40">OPTIMIZER:</div>
          <button
            onClick={() => setOptimizer((prev) => (prev === 'AdamW' ? 'SGD' : prev === 'SGD' ? 'RMSprop' : 'AdamW'))}
            className="w-full text-left font-bold border border-[var(--fg)]/15 py-0.5 px-1.5 hover:border-[var(--fg)] hover:bg-[var(--fg)]/5 transition-all text-[10px] uppercase cursor-none"
          >
            {optimizer} ↱
          </button>
        </div>

        <div className="space-y-1.5 col-span-2 border-t border-[var(--fg)]/5 pt-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--fg)]/40">BATCH_SIZE:</span>
            <button
              onClick={() => setBatchSize((prev) => (prev === 128 ? 256 : prev === 256 ? 64 : 128))}
              className="font-bold border border-[var(--fg)]/15 px-1 hover:border-[var(--fg)] cursor-none"
            >
              {batchSize}
            </button>
          </div>
          <button
            onClick={handleTune}
            className="border border-[var(--fg)] px-2 py-0.5 font-bold hover:bg-[var(--fg)] hover:text-[#FAFAFA] transition-colors active:scale-95 cursor-none text-[9px] uppercase"
          >
            [TUNE HYPERPARAMS]
          </button>
        </div>
      </div>

      {/* Real-time Loss Curve Canvas */}
      <div className="space-y-1">
        <div className="flex justify-between items-center text-[9px] text-[var(--fg)]/40 pr-1">
          <span>LOSS LANDSCAPE CONVERGENCE:</span>
          <span>VAL_LOSS: {(0.045 * Math.exp(-epoch * 0.001)).toFixed(4)}</span>
        </div>
        <LossChart epoch={epoch} lrSpeed={lr} />
      </div>

      {/* Interactive Concept Cores */}
      <div className="space-y-1.5">
        <div className="text-[9px] text-[var(--fg)]/40">INTERACTIVE GRAPH CORES:</div>
        <div className="grid grid-cols-3 gap-1 text-[9px]">
          {(['NEURAL_AGENTS', 'LATENT_FLOW', 'REINFORCEMENT'] as const).map((concept) => (
            <button
              key={concept}
              onClick={() => handleConceptSelect(concept)}
              className={`border py-1 text-center font-bold transition-all truncate cursor-none uppercase ${
                activeConcept === concept
                  ? 'border-[var(--fg)] bg-[var(--fg)] text-[#FAFAFA]'
                  : 'border-[var(--fg)]/20 hover:border-[var(--fg)] hover:bg-[var(--fg)]/3 text-[var(--fg)]/60'
              }`}
            >
              {concept.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Live Scrolling Logs Terminal */}
      <div className="space-y-1.5">
        <div className="text-[9px] text-[var(--fg)]/40">REAL-TIME TRAIN LOGS:</div>
        <div className="h-[105px] border border-[var(--fg)]/15 bg-[var(--fg)]/2 p-2.5 overflow-hidden text-[9px] space-y-1 select-text">
          {logs.map((lg, i) => (
            <div
              key={i}
              className={`truncate transition-opacity duration-300 ${
                i === logs.length - 1 ? 'text-[var(--fg)] opacity-100 font-medium' : 'text-[var(--fg)]/65'
              }`}
            >
              {lg}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const statementsRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Text Scrambles for high-end look
  const subtitleScramble = useTextScramble('ML ENGINEER · GENAI ARCHITECT · RESEARCHER', 300, 20);
  const detailsScramble = useTextScramble('MODEL: ADITYA-v2.6 // CONVERGENCE: STABLE', 700, 15);

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Page load GSAP reveals
    if (rm) {
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char-reveal');
        chars.forEach((c) => {
          (c as HTMLElement).style.opacity = '1';
          (c as HTMLElement).style.transform = 'translateY(0)';
        });
      }
      if (statementsRef.current) {
        const stmts = statementsRef.current.querySelectorAll('.statement');
        stmts.forEach((s) => {
          (s as HTMLElement).style.opacity = '1';
          (s as HTMLElement).style.transform = 'translateY(0)';
        });
      }
      return;
    }

    // Slide and fade char reveal sequence
    const chars = nameRef.current?.querySelectorAll('.char-reveal');
    if (chars) {
      chars.forEach((c, i) => {
        const el = c as HTMLElement;
        setTimeout(() => {
          el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 500 + i * 35);
      });
    }

    // Scroll Cue reveal
    if (scrollCueRef.current) {
      const line = scrollCueRef.current.querySelector('.scroll-line') as HTMLElement;
      const label = scrollCueRef.current.querySelector('.scroll-label') as HTMLElement;
      if (line) {
        setTimeout(() => {
          line.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          line.style.transform = 'scaleY(1)';
        }, 1600);
      }
      if (label) {
        setTimeout(() => {
          label.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
          label.style.opacity = '0.6';
        }, 1800);
      }
    }

    // GSAP Scroll reveals for progressive statements
    const section = sectionRef.current;
    const statements = statementsRef.current?.querySelectorAll('.statement');
    if (!section || !statements || statements.length === 0) return;

    const ctx = gsap.context(() => {
      const totalScroll = window.innerHeight * 3;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalScroll}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      // Animate statements on pin-scroll
      tl.fromTo(
        statements[0],
        { opacity: 1, y: 0 },
        { opacity: 0.15, y: -20, duration: 0.15 },
        0
      );

      for (let i = 1; i < statements.length; i++) {
        const prev = statements[i - 1];
        const curr = statements[i];

        tl.fromTo(
          curr,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.25, ease: 'none' },
          (i - 1) * 0.25 + 0.05
        );

        if (i > 1) {
          tl.to(prev, { opacity: 0.1, duration: 0.1, ease: 'none' }, (i - 1) * 0.25);
        }

        if (i < statements.length - 1) {
          tl.to(curr, { opacity: 0.15, y: -20, duration: 0.2, ease: 'none' }, i * 0.25 + 0.18);
        }
      }

      if (scrollCueRef.current) {
        tl.to(scrollCueRef.current, { opacity: 0, duration: 0.05 }, 0);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex flex-col bg-transparent overflow-hidden"
    >
      {/* ── Main Hero Row: 12-Column Editorial Grid ────────────── */}
      <div className="flex-1 flex items-end pb-12 md:pb-16 pt-24 md:pt-32 relative z-10">
        <div className="section-container w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            
            {/* Left Side Column: Bold Editorial Branding (7 Cols) */}
            <div className="lg:col-span-7 space-y-8 md:space-y-12">
              <div>
                {/* Tech Blueprint Tags */}
                <div 
                  className="text-[10px] font-bold tracking-[0.2em] text-[var(--fg)]/40 mb-3 md:mb-5"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <span className="text-[var(--fg)] border border-[var(--fg)]/10 px-2 py-0.5 mr-2">[ROOT_DIR]</span>
                  <span>{subtitleScramble || '\u00A0'}</span>
                </div>

                {/* Massive Serif Title */}
                <h1
                  ref={nameRef}
                  className="font-display font-bold leading-[0.82] tracking-tight text-[var(--fg)] uppercase"
                  style={{ fontSize: 'clamp(3.8rem, 8vw, 7.8rem)' }}
                >
                  {'Aditya Mer'.split('').map((c, i) => (
                    <span
                      key={i}
                      className="char-reveal"
                      style={{ transform: 'translateY(70px)', opacity: 0 }}
                    >
                      {c === ' ' ? '\u00A0' : c}
                    </span>
                  ))}
                </h1>

                {/* Simulated Coordinates Blueprint Line */}
                <div 
                  className="mt-4 text-[9px] text-[var(--fg)]/30 space-y-1"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <div>LOC: NEW DELHI, IN // LAT_LON: 28.6139° N, 77.2090° E</div>
                  <div>{detailsScramble || '\u00A0'}</div>
                </div>
              </div>

              {/* Scrolling Pin-revealed Manifesto Statements */}
              <div ref={statementsRef} className="space-y-5 md:space-y-6 min-h-[160px] md:min-h-[220px]">
                {STATEMENTS.map((text, i) => (
                  <p
                    key={i}
                    className="statement font-display text-[5vw] md:text-[3.6vw] lg:text-[3.2vw] font-medium leading-[1.08] tracking-tight text-[var(--fg)]"
                    style={{
                      opacity: i === 0 ? 1 : 0,
                      transform: i === 0 ? 'translateY(0)' : 'translateY(40px)',
                    }}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>

            {/* Right Side Column: Interactive System Console (5 Cols) */}
            <div className="lg:col-span-5 w-full flex justify-end">
              <LatentWorkspace />
            </div>

          </div>
        </div>
      </div>

      {/* ── Footer Stats & HUD indicators ─────────────────────── */}
      <div className="section-container relative z-10 w-full pb-8">
        <div className="border-t border-[var(--fg)]/10 pt-4 flex items-center justify-between">
          <div ref={scrollCueRef} className="flex items-center gap-3">
            <div className="h-10 w-[1px] bg-[var(--fg)]/15 relative overflow-hidden">
              <div
                className="scroll-line absolute top-0 left-0 w-full bg-[var(--fg)]"
                style={{ height: '100%', transform: 'scaleY(0)', transformOrigin: 'top' }}
              />
            </div>
            <span
              className="scroll-label text-[10px] font-bold uppercase tracking-widest text-[var(--fg)]/40"
              style={{ fontFamily: 'var(--font-mono)', opacity: 0 }}
            >
              Scroll Manifold
            </span>
          </div>

          <div
            className="text-[10px] font-bold text-[var(--fg)]/35 tracking-wider"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <LiveTime />
            {' '}<span className="opacity-20">·</span>{' '}
            {typeof window !== 'undefined'
              ? Intl.DateTimeFormat().resolvedOptions().timeZone.toUpperCase()
              : 'UTC'}
          </div>
        </div>
      </div>
    </section>
  );
}
