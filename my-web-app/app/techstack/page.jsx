// Reusing badges used in profile readme: https://github.com/inttter/md-badges
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Matter from 'matter-js';

const STORAGE_KEY = 'techstack-v1';

const BASE_ITEMS = [
  { 
    id: 'python',
    label: 'Python',     
    w: 160, h: 50,  
    badge: 'https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white'
  },

  { 
    id: 'c',
    label: 'C',     
    w: 160, h: 90,  
    badge: 'https://img.shields.io/badge/C-00599C?style=flat-square&logo=c&logoColor=white'
  },

  { 
    id: 'cpp',        
    label: 'C++',        
    w: 160, h: 60,  
    badge: 'https://img.shields.io/badge/C++-%2300599C.svg?style=flat-square&logo=c%2B%2B&logoColor=white' 
  },

  { 
    id: 'javascript', 
    label: 'JavaScript', 
    w: 160, h: 40,  
    badge: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=white' 
  },

  { 
    id: 'flutter',        
    label: 'Flutter',        
    w: 160, h: 50,  
    badge: 'https://img.shields.io/badge/Flutter-02569B?style=flat-square&logo=flutter&logoColor=white' 
  },

  { 
    id: 'react',      
    label: 'React',      
    w: 160, h: 60,  
    badge: 'https://img.shields.io/badge/React-%2320232a.svg?style=flat-square&logo=react&logoColor=white' 
  },

  { 
    id: 'next',       
    label: 'Next.js',    
    w: 160, h: 50,  
    badge: 'https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js&logoColor=white' 
  },

  { 
    id: 'django',     
    label: 'Django',     
    w: 160, h: 50,  
    badge: 'https://img.shields.io/badge/Django-%23092E20.svg?style=flat-square&logo=django&logoColor=white' 
  },

  { 
    id: 'postgres',   
    label: 'PostgreSQL', 
    w: 160, h: 45,  
    badge: 'https://img.shields.io/badge/Postgres-%23316192.svg?style=flat-square&logo=postgresql&logoColor=white' 
  },

   { 
    id: 'sqlite', 
    label: 'SQLite', 
    w: 160, h: 50,  
    badge: 'https://img.shields.io/badge/SQLite-%2307405e.svg?style=flat-square&logo=sqlite&logoColor=white' 
  },

  { 
    id: 'oracle',   
    label: 'ORACLE',   
    w: 160, h: 50,  
    badge: 'https://custom-icon-badges.demolab.com/badge/Oracle-F80000?style=flat-square&logo=oracle&logoColor=white' 
  },

  { 
    id: 'firebase',   
    label: 'Firebase',   
    w: 160, h: 40,  
    badge: 'https://img.shields.io/badge/Firebase-039BE5?style=flat-square&logo=Firebase&logoColor=white' 
  },

  { 
    id: 'html',       
    label: 'HTML',       
    w: 160, h: 60,  
    badge: 'https://img.shields.io/badge/HTML-%23E34F26.svg?style=flat-square&logo=html5&logoColor=white' 
  },

  { 
    id: 'css',        
    label: 'CSS',        
    w: 160, h: 65,  
    badge: 'https://img.shields.io/badge/CSS-639?style=flat-square&logo=css&logoColor=white' 
  }
];

// Fall down with space for
function seedPositions(items, width) {
  const margin = 16;
  let x = margin, y = margin, rowH = 0;
  return items.map(it => {
    if (x + it.w + margin > width) { x = margin; y += rowH + margin; rowH = 0; }
    const pos = { ...it, x: x + it.w / 2, y: y + it.h / 2, angle: 0 };
    x += it.w + margin;
    rowH = Math.max(rowH, it.h);
    return pos;
  });
}

export default function TechStackPhysics() {
  const containerRef = useRef(null);
  const tileRefs = useRef(new Map());              // id -> HTMLElement
  const bodiesRef = useRef(new Map());             // id -> Matter.Body
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const selectedRef = useRef(null);
  const [dims, setDims] = useState({ w: 1000, h: 700 });

  const initialLayout = useMemo(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
        if (Array.isArray(saved)) return saved;
      } catch {}
    }
    return seedPositions(BASE_ITEMS, 900);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const { Engine, World, Bodies, Runner, Mouse, MouseConstraint, Events, Composite } = Matter;

    const engine = Engine.create({ gravity: { x: 0, y: 1, scale: 0.001 }, enableSleeping: true });
    engine.positionIterations = 10;
    engine.velocityIterations = 8;
    engine.constraintIterations = 4;
    engineRef.current = engine;

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // walls
    const thickness = 60;
    const makeWalls = ({ w, h }) => [
      Bodies.rectangle(w / 2, h + thickness / 2, w, thickness, { isStatic: true }),
      Bodies.rectangle(w / 2, -thickness / 2,     w, thickness, { isStatic: true }),
      Bodies.rectangle(-thickness / 2, h / 2, thickness, h, { isStatic: true }),
      Bodies.rectangle(w + thickness / 2, h / 2, thickness, h, { isStatic: true })
    ];
    let walls = makeWalls(dims);
    World.add(engine.world, walls);

    // tiles
    bodiesRef.current.clear();
    const addTile = (t) => {
      const body = Bodies.rectangle(t.x, t.y, t.w, t.h, {
        chamfer: 0,
        restitution: 0.04,
        friction: 0.9,
        frictionStatic: 1.0,
        frictionAir: 0.02,
        density: 0.0018,
        angle: t.angle || 0,
        label: t.id
      });
      bodiesRef.current.set(t.id, body);
      World.add(engine.world, body);
    };
    initialLayout.forEach(addTile);

    // mouse drag
    const mouse = Mouse.create(el);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, angularStiffness: 0.12, render: { visible: false } }
    });
    World.add(engine.world, mouseConstraint);

    const onDown = () => {
      selectedRef.current = mouseConstraint.body || null;
      if (selectedRef.current) {
        const id = selectedRef.current.label;
        const n = tileRefs.current.get(id);
        if (n) n.style.zIndex = '10';
      }
    };
    const onUp = () => {
      if (selectedRef.current) {
        const id = selectedRef.current.label;
        const n = tileRefs.current.get(id);
        if (n) n.style.zIndex = '1';
      }
      selectedRef.current = null;
    };
    Matter.Events.on(mouseConstraint, 'mousedown', onDown);
    Matter.Events.on(mouseConstraint, 'mouseup', onUp);

    // DOM sync
    let raf = 0;
    const sync = () => {
      bodiesRef.current.forEach((body, id) => {
        const elTile = tileRefs.current.get(id);
        if (!elTile) return;
        const { x, y } = body.position;
        const w = elTile.offsetWidth, h = elTile.offsetHeight;
        elTile.style.transform = `translate(${x - w / 2}px, ${y - h / 2}px) rotate(${body.angle}rad)`;
      });
      raf = requestAnimationFrame(sync);
    };
    raf = requestAnimationFrame(sync);

    // save layout
    let saveTimer;
    const save = () => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        const arr = [];
        bodiesRef.current.forEach((body, id) => {
          const meta = BASE_ITEMS.find(b => b.id === id) || { w: 160, h: 80 };
          arr.push({ id, label: meta.label || id, w: meta.w, h: meta.h, x: body.position.x, y: body.position.y, angle: body.angle });
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      }, 250);
    };
    Matter.Events.on(engine, 'afterUpdate', save);

    // resize walls
    const resetWalls = () => {
      Composite.remove(engine.world, walls);
      walls = makeWalls(dims);
      World.add(engine.world, walls);
    };
    resetWalls();

    // track container size
    const ro = new ResizeObserver(([entry]) => {
      const cr = entry.contentRect;
      setDims({ w: cr.width, h: cr.height });
    });
    ro.observe(el);

    // cleanup
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      Matter.Runner.stop(runner);
      engineRef.current = null;
      runnerRef.current = null;
    };
  }, [initialLayout, dims.w, dims.h]);

  // SOFT reset: reseed positions without reloading (music keeps playing)
  const resetLayout = () => {
    localStorage.removeItem(STORAGE_KEY);
    const width = Math.max(600, (containerRef.current?.clientWidth || 900) - 32);
    const seeds = seedPositions(BASE_ITEMS, width);
    seeds.forEach(s => {
      const body = bodiesRef.current.get(s.id);
      if (!body) return;
      Matter.Body.setPosition(body, { x: s.x, y: s.y });
      Matter.Body.setAngle(body, 0);
      Matter.Body.setVelocity(body, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(body, 0);
      Matter.Sleeping.set(body, false);
    });
  };

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Tech Stack</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button style={styles.btn} onClick={resetLayout}>Reset</button>
        </div>
      </header>

      <section ref={containerRef} style={styles.board}>
        {BASE_ITEMS.map(it => (
          <div
            key={it.id}
            ref={el => { if (el) tileRefs.current.set(it.id, el); }}
            style={{
              ...styles.tile,
              width: it.w,
              height: it.h,
              background: 'transparent',
              boxShadow: '0 6px 16px rgba(0,0,0,.10), inset 0 0 0 1px rgba(0,0,0,.10)',
              boxSizing: 'border-box'
            }}
            title={it.label}
          >
            <img
              src={it.badge}
              alt={it.label}
              style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none', userSelect: 'none', display: 'block' }}
              loading="lazy"
            />
          </div>
        ))}
      </section>
    </main>
  );
}

const styles = {
  page: 
  {
    minHeight: 'calc(100dvh - var(--header-h, 0px))',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gap: 12,
    padding: '16px clamp(12px, 3vw, 24px)',
  },

  header: 
  {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 12,
  },

  title: 
  {
    margin: 0,
    fontSize: 'clamp(20px, 2.6vw, 28px)',
    fontWeight: 800,
    letterSpacing: '.2px',
  },

  hint: 
  { 
    fontSize: 13, color: '#6b7280' 
  },

  btn: 
  {
    border: '1px solid #d1d5db',
    background: '#fff',
    padding: '6px 12px',
    borderRadius: 999,
    cursor: 'pointer',
    fontWeight: 600,
  },

  board: 
  {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 18,
    minHeight: '70vh',
    background:
      'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 1px) 0 0 / 20px 20px, #f9fafb',
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.06)',
    touchAction: 'none',
  },

  tile: 
  {
    position: 'absolute',
    transformOrigin: 'center center',
    borderRadius: 12,
    display: 'grid',
    placeItems: 'center',
    userSelect: 'none',
    cursor: 'grab',
    zIndex: 1,
  },

  tileText: 
  {
    padding: '0 10px',
    color: '#111827',
    fontWeight: 800,
    textShadow: '0 1px 0 rgba(255,255,255,.6)',
  },
};