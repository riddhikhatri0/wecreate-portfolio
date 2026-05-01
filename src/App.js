import { useState, useEffect, useRef } from "react";
import work1 from "./assests/work1.jpeg";
import work2 from "./assests/work2.jpeg";
import work3 from "./assests/work3.png";
import work4 from "./assests/work4..jpeg";
import work5 from "./assests/work5.png";
import work6 from "./assests/work6.jpeg";
const COLORS = {
  bg: "#F5E6C8",
  cream: "#FDF6E3",
  dark: "#1A1A2E",
  blue: "#4A90D9",
  yellow: "#FFD700",
  red: "#E84545",
  green: "#4CAF50",
  pink: "#FF6B9D",
  orange: "#FF8C00",
  purple: "#7B68EE",
  white: "#FFFFFF",
  darkBrown: "#2C1810",
  tan: "#D4A96A",
  screenBg: "#0A0E27",
  pixelBorder: "#2C1810",
};

const pixelFont = "'Press Start 2P', monospace";

const TIME_STATES = [
  {
    name: "MORNING",
    icon: "☀",
    roomBg: "#F5E6D0",
    wallColor: "#E8D5B7",
    floorColor: "#8B6914",
    windowSky: "linear-gradient(180deg, #87CEEB 0%, #FFD580 60%, #FFA500 100%)",
    windowLight: "rgba(255, 220, 120, 0.35)",
    plantShadow: "rgba(180, 120, 30, 0.3)",
    ambientGlow: "rgba(255, 200, 80, 0.08)",
  },
  {
    name: "AFTERNOON",
    icon: "🌤",
    roomBg: "#EAD9C0",
    wallColor: "#D9C4A0",
    floorColor: "#7A5C10",
    windowSky: "linear-gradient(180deg, #4A90D9 0%, #87CEEB 100%)",
    windowLight: "rgba(150, 200, 255, 0.2)",
    plantShadow: "rgba(100, 80, 20, 0.35)",
    ambientGlow: "rgba(150, 200, 255, 0.06)",
  },
  {
    name: "EVENING",
    icon: "🌅",
    roomBg: "#C4895A",
    wallColor: "#B8784A",
    floorColor: "#5C3A0A",
    windowSky: "linear-gradient(180deg, #1A1A3E 0%, #8B3A62 40%, #FF6B35 70%, #FFD580 100%)",
    windowLight: "rgba(255, 100, 50, 0.4)",
    plantShadow: "rgba(180, 60, 20, 0.5)",
    ambientGlow: "rgba(255, 100, 50, 0.12)",
  },
  {
    name: "NIGHT",
    icon: "🌙",
    roomBg: "#1A1A2E",
    wallColor: "#16213E",
    floorColor: "#0F1923",
    windowSky: "linear-gradient(180deg, #0A0A1A 0%, #1A1A3E 50%, #2D1B69 100%)",
    windowLight: "rgba(100, 120, 255, 0.15)",
    plantShadow: "rgba(20, 20, 60, 0.6)",
    ambientGlow: "rgba(80, 100, 200, 0.08)",
  },
];

function RoomScene({ children }) {
  const [timeIdx, setTimeIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const time = TIME_STATES[timeIdx];

  const cycleTime = () => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setTimeIdx(i => (i + 1) % TIME_STATES.length);
      setTransitioning(false);
    }, 300);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: time.roomBg,
      transition: "background 2s ease",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "20px 16px 80px",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @media (max-width: 600px) {
          .room-window { width: 92vw !important; height: 52vw !important; top: 60px !important; }
          .room-plant  { display: none !important; }
          .tv-wrap     { width: 100% !important; }
          .nav-btns button { padding: 6px 6px !important; font-size: 5px !important; }
        }
      `}</style>

      {/* Ambient glow */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: time.ambientGlow,
        transition: "background 2s ease",
        pointerEvents: "none", zIndex: 0
      }} />

      {/* BIG WINDOW — behind TV, centered */}
      <div className="room-window" style={{
position: "fixed",
left: "180px",
right: "0px",
top: "20px",
width: "auto",
transform: "none",
  height: "min(580px, 70vh)",
  border: `4px solid #5C3A1A`,
  background: time.windowSky,
  transition: "background 2s ease",
  overflow: "hidden",
  boxShadow: `inset 0 0 60px ${time.windowLight}, 10px 10px 0 #3A2010`,
  zIndex: 1,
}}>
        {/* cross dividers */}
          <div style={{ position:"absolute", top:"50%", left:0, right:0, height:"6px", background:"#5C3A1A", transform:"translateY(-50%)" }}/>
  <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:"6px", background:"#5C3A1A", transform:"translateX(-50%)" }}/>

  {/* Stars night */}
  {timeIdx === 3 && [[40,20],[120,15],[200,35],[60,90],[300,60],[400,25],[500,80],[150,130],[450,140],[80,160],[600,50],[700,110],[350,20],[650,170]].map(([x,y],i) => (
    <div key={i} style={{ position:"absolute", left:x, top:y, width:"3px", height:"3px", background:"#FFF", borderRadius:"50%", opacity:i%2===0?1:0.5 }}/>
  ))}

        {/* Stars night */}
        {timeIdx === 3 && [[40,20],[120,15],[200,35],[60,90],[300,60],[400,25],[500,80],[150,130],[450,140],[80,160]].map(([x,y],i) => (
          <div key={i} style={{ position:"absolute", left:x, top:y, width:"3px", height:"3px", background:"#FFF", borderRadius:"50%", opacity: i%2===0?1:0.5 }}/>
        ))}

        {/* Moon */}
        {timeIdx === 3 && (
    <div style={{ position:"absolute", right:"60px", top:"30px", width:"48px", height:"48px", borderRadius:"50%", background:"#FFFDE7", boxShadow:"0 0 16px #FFFDE7" }}/>
  )}

        {/* Sun */}
        {(timeIdx === 0 || timeIdx === 1) && (
    <div style={{
      position:"absolute",
      right: timeIdx===0 ? "80px" : "160px",
      top:   timeIdx===0 ? "260px" : "40px",
      width:"56px", height:"56px", borderRadius:"50%",
      background: timeIdx===0 ? "#FFD700" : "#FFF176",
      boxShadow:`0 0 28px ${timeIdx===0?"#FFD700":"#FFF176"}`,
      transition:"all 2s ease"
    }}/>
  )}

        {/* Light beam */}
         <div style={{
    position:"absolute", top:0, left:0, right:0, bottom:0,
    background:`radial-gradient(ellipse at 50% 0%, ${time.windowLight} 0%, transparent 65%)`,
    transition:"background 2s ease"
  }}/>

        {/* Window sill */}
         <div style={{ position:"absolute", bottom:0,left:"-4px", right:"-4px", height:"22px", background:"#8B6914", boxShadow:"0 8px 0 #5C4A10" }}/>
</div>

      {/* Wall left panel — painting */}
      <div style={{
        position:"fixed", top:0, left:0, bottom:0, width:"180px",
        background: time.wallColor,
        transition:"background 2s ease",
        zIndex:2,
        display:"flex", flexDirection:"column", alignItems:"center", paddingTop:"50px", gap:"16px"
      }}>
        {/* Painting */}
        <div style={{
          width:"120px", height:"90px",
          border:`5px solid #8B7355`,
          background:"#FFF8F0",
          boxShadow:`4px 4px 0 #5C4A2A`,
          overflow:"hidden"
        }}>
          <svg width="100%" height="100%" viewBox="0 0 110 80">
            <rect width="110" height="80" fill="#FFF8F0"/>
            <ellipse cx="30" cy="40" rx="26" ry="34" fill="#E84B6B" opacity="0.8"/>
            <ellipse cx="75" cy="30" rx="22" ry="26" fill="#4B9EE8" opacity="0.75"/>
            <ellipse cx="60" cy="58" rx="30" ry="18" fill="#F5C842" opacity="0.7"/>
            <ellipse cx="22" cy="22" rx="15" ry="15" fill="#6BE87A" opacity="0.65"/>
            <ellipse cx="90" cy="55" rx="14" ry="20" fill="#9B4BE8" opacity="0.55"/>
          </svg>
        </div>
        <div style={{ fontFamily:pixelFont, fontSize:"5px", color:"#8B7355", textAlign:"center" }}>ABSTRACT No.7</div>

        {/* Time button */}
        <button onClick={cycleTime} style={{
          background: COLORS.yellow,
          border:`2px solid ${COLORS.dark}`,
          fontFamily:pixelFont, fontSize:"5px",
          color:COLORS.dark, padding:"5px 8px",
          cursor:"pointer",
          boxShadow:`2px 2px 0 ${COLORS.dark}`,
          marginTop:"12px", whiteSpace:"nowrap"
        }}>
          {time.icon} {time.name}
        </button>
      </div>

      {/* PLANT — right side desk */}
      <div className="room-plant" style={{
        position:"fixed", right:"16px", bottom:"100px",
        zIndex:2, display:"flex", flexDirection:"column", alignItems:"center"
      }}>
        {/* Desk */}
        <div style={{ width:"90px", height:"10px", background:"#8B6914", boxShadow:"0 5px 0 #5C4A10" }}/>
        <div style={{ width:"10px", height:"50px", background:"#5C4A10", margin:"0 auto" }}/>

        {/* Plant */}
        <div style={{ position:"absolute", bottom:"60px", left:"50%", transform:"translateX(-50%)" }}>
          <svg width="90" height="90" viewBox="0 0 90 90">
            <line x1="45" y1="90" x2="45" y2="25" stroke="#2D7A2D" strokeWidth="4"/>
            <ellipse cx="25" cy="52" rx="20" ry="10" fill="#3A9E3A" transform="rotate(-30 25 52)"/>
            <ellipse cx="65" cy="45" rx="20" ry="10" fill="#2D8A2D" transform="rotate(30 65 45)"/>
            <ellipse cx="28" cy="33" rx="16" ry="9" fill="#44B044" transform="rotate(-20 28 33)"/>
            <ellipse cx="62" cy="30" rx="16" ry="9" fill="#3A9E3A" transform="rotate(20 62 30)"/>
            <ellipse cx="45" cy="20" rx="13" ry="8" fill="#55C055"/>
            <ellipse cx="45" cy="88" rx="22" ry="5" fill={time.plantShadow} style={{transition:"fill 2s"}}/>
          </svg>
          {/* Pot */}
          <div style={{
            width:"46px", height:"34px",
            background:"#C46A2D",
            margin:"-10px auto 0",
            clipPath:"polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
            border:`2px solid #8B4010`
          }}/>
        </div>
      </div>

      {/* Floor */}
      <div style={{
        position:"fixed", bottom:0, left:0, right:0, height:"100px",
        background:time.floorColor,
        transition:"background 2s ease",
        zIndex:1
      }}/>

      {/* Main content */}
     <div className="tv-wrap" style={{ 
  position: "relative", 
  zIndex: 10, 
  width: "100%", 
  maxWidth: "860px", 
  marginLeft: "90px",
  marginTop: "auto",
  paddingTop: "40px",
}}>
        {children}
      </div>
    </div>
  );
}

const workImages = [
  { id: 1, title: "Brand Identity", img: work1 },
  { id: 2, title: "Social Posts",   img: work2 },
  { id: 3, title: "Event Flyer",    img: work3 },
  { id: 4, title: "Business Card",  img: work4 },  // was missing import
  { id: 5, title: "Web Banner",     img: work5 },
  { id: 6, title: "Brand Poster",   img: work6 },
];

const skills = ["FIGMA", "PHOTOSHOP", "ILLUSTRATOR", "CANVA PRO", "HTML/CSS", "UI/UX"];

function TVStatic() {
 const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // random grey pixel
        const val = Math.random() * 255;
        data[i]     = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 200; // slight transparency
      }

      // add horizontal scan bands (brighter streaks)
      const bandY = Math.floor(Math.random() * h);
      for (let x = 0; x < w; x++) {
        const idx = (bandY * w + x) * 4;
        data[idx] = data[idx+1] = data[idx+2] = 255;
        // band thickness ~3px
        for (let dy = 1; dy < 4; dy++) {
          const idx2 = ((bandY + dy) * w + x) * 4;
          if (idx2 < data.length) {
            data[idx2] = data[idx2+1] = data[idx2+2] = 200;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={420}
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 20,
        pointerEvents: "none",
        opacity: 0.9,
      }}
    />
  );
}

function WorkFullView({ img, onClose }) {
    return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 50, background: "#000",
      display: "flex", flexDirection: "column"
    }}>
      {/* Close button — top right corner */}
      <button onClick={onClose} style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 60,
        background: COLORS.yellow,
        border: `2px solid ${COLORS.dark}`,
        fontFamily: pixelFont,
        fontSize: "7px",
        color: COLORS.dark,
        padding: "6px 10px",
        cursor: "pointer",
        boxShadow: `2px 2px 0 ${COLORS.dark}`,
      }}>✕</button>

      {/* Image fills screen */}
      <img
        src={img.img}
        alt={img.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
          background: "#000"
        }}
      />
    </div>
  );
}

function PixelTV({ activeSection, onNavigate }) {
  const [displaySection, setDisplaySection] = useState(activeSection);
  const [phase, setPhase] = useState("idle");

  const handleNavigate = (id) => {
    if (id === displaySection || phase !== "idle") return;
    setPhase("off");
    setTimeout(() => {
      setPhase("static");
      setDisplaySection(id);
      onNavigate(id);
      setTimeout(() => {
        setPhase("on");
        setTimeout(() => setPhase("idle"), 600);
      }, 1000);
    }, 400);
  };

  const navButtons = [
    { id:"about",    label:"ABOUT",    icon:"◉", color:COLORS.pink,   preview:"WHO WE ARE" },
    { id:"services", label:"SERVICES", icon:"◈", color:COLORS.blue,   preview:"WHAT WE DO" },
    { id:"work",     label:"OUR WORK", icon:"▣", color:COLORS.yellow, preview:"PORTFOLIO"  },
    { id:"connect",  label:"CONNECT",  icon:"◆", color:COLORS.green,  preview:"HIT US UP"  },
  ];

  const screenClass = phase==="off" ? "tv-screen-off" : phase==="on" ? "tv-screen-on" : "";

  return (
    <div style={{ width:"100%", display:"flex", flexDirection:"column", alignItems:"center" }}>
      {/* WECREATE tiles */}
      <div style={{ display:"flex", gap:"6px", zIndex:2, position:"relative" }}>
        {["W","E","C","R","E","A","T","E"].map((l,i) => (
          <div key={i} style={{
            width:"22px", height:"22px",
            background: i%2===0 ? COLORS.pink : COLORS.yellow,
            border:`2px solid ${COLORS.dark}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:pixelFont, fontSize:"8px", color:COLORS.dark,
          }}>{l}</div>
        ))}
      </div>

      {/* TV body */}
      <div style={{
        background:"#C8B89A", border:`5px solid ${COLORS.dark}`,
        padding:"16px", width:"100%", maxWidth:"720px",
        boxShadow:`6px 6px 0px ${COLORS.dark}`, position:"relative"
      }}>
        {/* Screen */}
        <div style={{
          background:COLORS.screenBg, border:`4px solid ${COLORS.dark}`,
          minHeight:"420px", marginBottom:"16px",
          position:"relative", overflow:"hidden"
        }}>
          <div style={{
            position:"absolute", top:0, left:0, right:0, bottom:0,
            background:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
            pointerEvents:"none", zIndex:10
          }}/>
          {phase === "static" && <TVStatic />}
          <div className={screenClass} style={{ width:"100%", height:"100%" }}>
            {phase !== "static" && <ScreenContent activeSection={displaySection} />}
          </div>
        </div>

        {/* Bottom Controls */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"8px" }}>
          {/* Glow tags */}
          <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
            <div className="tag-yellow" style={{
  background: COLORS.yellow,
  border: `2px solid ${COLORS.dark}`,
  padding: "3px 7px", fontFamily: pixelFont,
  fontSize: "6px", color: COLORS.dark,
  transform: "rotate(-2deg)",
            }}>GRAPHIC DESIGN</div>
            <div className="tag-pink" style={{
  background: COLORS.pink,
  border: `2px solid ${COLORS.dark}`,
  padding: "3px 7px", fontFamily: pixelFont,
  fontSize: "6px", color: COLORS.dark,
  transform: "rotate(1deg)",
            }}>ILLUSTRATION</div>
          </div>

          {/* Smileys */}
          <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
            <div style={{ fontSize:"16px", color:COLORS.yellow, fontFamily:pixelFont }}>:)</div>
            <div style={{ fontSize:"12px", color:COLORS.pink,   fontFamily:pixelFont }}>*</div>
            <div style={{ fontSize:"16px", color:COLORS.blue,   fontFamily:pixelFont }}>:)</div>
          </div>

          {/* Nav buttons */}
          <div style={{ display:"flex", gap:"6px", flexWrap:"nowrap", overflowX:"auto", paddingBottom:"4px", scrollbarWidth:"none", msOverflowStyle:"none", WebkitOverflowScrolling:"touch" }}>
            {navButtons.map(btn => {
              const isActive = activeSection === btn.id;
              return (
                <button className="nav-btn" key={btn.id}
                  onClick={() => handleNavigate(btn.id)}
                  style={{
                    background: isActive ? btn.color : COLORS.dark,
                    border:`3px solid ${isActive ? btn.color : "#444"}`,
                    fontFamily:pixelFont, fontSize:"6px",
                    color: isActive ? COLORS.dark : btn.color,
                    padding:"8px 10px",
                    cursor: phase !== "idle" ? "not-allowed" : "pointer",
                    boxShadow: isActive ? `0 0 0 2px ${COLORS.dark}, 2px 2px 0 #000` : `3px 3px 0 #000`,
                    transform: isActive ? "translate(1px,1px)" : "none",
                    transition:"all 0.12s",
                    display:"flex", flexDirection:"column",
                    alignItems:"center", gap:"4px",
                    minWidth:"58px", position:"relative",
                  }}
                >
                  {isActive && (
                    <div style={{
                      position:"absolute", top:"-8px", left:"50%",
                      transform:"translateX(-50%)",
                      width:"6px", height:"6px",
                      background:btn.color, border:`2px solid ${COLORS.dark}`,
                    }}/>
                  )}
                  <span style={{ fontSize:"14px", lineHeight:1 }}>{btn.icon}</span>
                  <span>{btn.label}</span>
                  <span style={{ fontSize:"5px", color:isActive?COLORS.dark:"#666", letterSpacing:"0.5px" }}>{btn.preview}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* TV stand */}
      <div style={{ width:"120px", height:"16px", background:"#B8A882", border:`3px solid ${COLORS.dark}`, borderTop:"none" }}/>
      <div style={{ width:"200px", height:"8px",  background:"#A09070", border:`3px solid ${COLORS.dark}`, borderTop:"none" }}/>
    </div>
  );
}

function ScreenContent({ activeSection }) {
  if (activeSection === "home") return <HomeScreen />;
  if (activeSection === "about") return <AboutScreen />;
  if (activeSection === "services") return <ServicesScreen />;
  if (activeSection === "work") return <WorkScreen />;
  if (activeSection === "connect") return <ConnectScreen />;
  return <HomeScreen />;
}

function HomeScreen() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useState(() => {
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) { p = 100; setLoaded(true); clearInterval(iv); }
      setProgress(Math.min(p, 100));
    }, 150);
    return () => clearInterval(iv);
  });

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      minHeight: "420px", padding: "24px", color: COLORS.white, textAlign: "center",
      background: "#3A6BC4", position: "relative"
    }}>
      <div style={{ fontFamily: pixelFont, fontSize: "11px", color: "#88AAFF", marginBottom: "8px", letterSpacing: "4px" }}>
        EST. 2024
      </div>
      <div style={{
        fontFamily: pixelFont, fontSize: "28px", color: COLORS.white,
        letterSpacing: "2px", marginBottom: "6px",
        textShadow: `3px 3px 0 #1A3A8A`
      }}>
        WECREATE
      </div>
      <div style={{
        fontFamily: pixelFont, fontSize: "10px", color: COLORS.yellow,
        letterSpacing: "6px", marginBottom: "32px"
      }}>
        0_o
      </div>

      <div style={{ fontFamily: pixelFont, fontSize: "8px", color: "#AACCFF", marginBottom: "12px" }}>
        LOADING PORTFOLIO...
      </div>
      <div style={{
        width: "280px", height: "14px",
        border: `3px solid ${COLORS.white}`,
        background: "#1A3A8A", position: "relative", overflow: "hidden", marginBottom: "8px"
      }}>
        <div style={{
          width: `${progress}%`, height: "100%",
          background: COLORS.yellow,
          transition: "width 0.15s"
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "repeating-linear-gradient(90deg, transparent, transparent 16px, rgba(0,0,0,0.2) 16px, rgba(0,0,0,0.2) 18px)"
        }} />
      </div>
      <div style={{ fontFamily: pixelFont, fontSize: "7px", color: COLORS.white }}>
        {Math.round(progress)}%
      </div>

      {loaded && (
        <div style={{
          position: "absolute", bottom: "20px",
          fontFamily: pixelFont, fontSize: "7px", color: COLORS.yellow,
          animation: "none"
        }}>
          USE BUTTONS BELOW TO EXPLORE
        </div>
      )}

      {/* Taskbar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "#1A3A8A", borderTop: `2px solid #88AAFF`,
        padding: "4px 8px", display: "flex", gap: "8px", alignItems: "center"
      }}>
        <div style={{
          background: "#88CC44", border: `2px solid ${COLORS.white}`,
          padding: "2px 8px", fontFamily: pixelFont, fontSize: "7px", color: COLORS.dark
        }}>START</div>
        <div style={{ fontFamily: pixelFont, fontSize: "7px", color: "#AACCFF" }}>|</div>
        <div style={{ fontFamily: pixelFont, fontSize: "7px", color: COLORS.white }}>WECREATE PORTFOLIO</div>
      </div>
    </div>
  );
}

function PixelAvatar({ name, color, role }) {
  const isRiddhi = name === "RIDDHI";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      {/* Pixel character */}
      <div style={{ imageRendering: "pixelated" }}>
        {isRiddhi ? (
          <svg width="64" height="80" viewBox="0 0 16 20" style={{ imageRendering: "pixelated" }}>
            {/* Hair top */}
            <rect x="3" y="0" width="10" height="3" fill="#1A0A00"/>
            <rect x="2" y="1" width="12" height="3" fill="#1A0A00"/>
            {/* Face */}
            <rect x="3" y="3" width="10" height="8" fill="#D4956A"/>
            {/* Eyes */}
            <rect x="5" y="6" width="2" height="2" fill="#1A0A00"/>
            <rect x="9" y="6" width="2" height="2" fill="#1A0A00"/>
            {/* Glasses */}
            <rect x="4" y="5" width="4" height="4" fill="none" stroke="#4A90D9" strokeWidth="0.5"/>
            <rect x="8" y="5" width="4" height="4" fill="none" stroke="#4A90D9" strokeWidth="0.5"/>
            <rect x="8" y="7" width="1" height="1" fill="#4A90D9"/>
            {/* Smile */}
            <rect x="6" y="9" width="4" height="1" fill="#C07050"/>
            <rect x="5" y="8" width="1" height="1" fill="#C07050"/>
            <rect x="10" y="8" width="1" height="1" fill="#C07050"/>
            {/* Hair sides */}
            <rect x="1" y="3" width="2" height="6" fill="#1A0A00"/>
            <rect x="13" y="3" width="2" height="6" fill="#1A0A00"/>
            {/* Ponytail */}
            <rect x="13" y="5" width="3" height="8" fill="#1A0A00"/>
            {/* Body / blazer */}
            <rect x="2" y="11" width="12" height="9" fill="#1A1A2E"/>
            {/* Shirt */}
            <rect x="5" y="11" width="6" height="5" fill="#FFFFFF"/>
            {/* Arms */}
            <rect x="0" y="11" width="2" height="8" fill="#1A1A2E"/>
            <rect x="14" y="11" width="2" height="8" fill="#1A1A2E"/>
          </svg>
        ) : (
          <svg width="64" height="80" viewBox="0 0 16 20" style={{ imageRendering: "pixelated" }}>
            {/* Hair */}
            <rect x="3" y="1" width="10" height="3" fill="#1A0A00"/>
            <rect x="2" y="2" width="12" height="2" fill="#1A0A00"/>
            {/* Face */}
            <rect x="3" y="3" width="10" height="8" fill="#C4845A"/>
            {/* Eyes */}
            <rect x="5" y="6" width="2" height="2" fill="#1A0A00"/>
            <rect x="9" y="6" width="2" height="2" fill="#1A0A00"/>
            {/* Beard */}
            <rect x="3" y="9" width="10" height="3" fill="#2A1000"/>
            <rect x="4" y="10" width="8" height="2" fill="#3A1800"/>
            {/* Headphones */}
            <rect x="1" y="3" width="2" height="5" fill="#333333"/>
            <rect x="13" y="3" width="2" height="5" fill="#333333"/>
            <rect x="1" y="1" width="14" height="3" fill="#222222"/>
            <rect x="0" y="4" width="3" height="3" fill="#111111"/>
            <rect x="13" y="4" width="3" height="3" fill="#111111"/>
            {/* Body / tshirt */}
            <rect x="2" y="12" width="12" height="8" fill="#8B7355"/>
            {/* Arms */}
            <rect x="0" y="12" width="2" height="7" fill="#8B7355"/>
            <rect x="14" y="12" width="2" height="7" fill="#8B7355"/>
          </svg>
        )}
      </div>
      <div style={{
        background: color, border: `3px solid ${COLORS.dark}`,
        padding: "4px 10px", fontFamily: pixelFont, fontSize: "7px", color: COLORS.dark,
        boxShadow: `2px 2px 0 ${COLORS.dark}`
      }}>{name}</div>
      <div style={{ fontFamily: pixelFont, fontSize: "6px", color: "#AACCFF", textAlign: "center" }}>{role}</div>
    </div>
  );
}

function AboutScreen() {
  return (
    <div style={{
      minHeight: "420px", background: "#0A0E27", color: COLORS.white,
      padding: "20px", display: "flex", flexDirection: "column", gap: "16px",
      fontFamily: pixelFont, overflowY: "auto"
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "14px", color: COLORS.yellow, marginBottom: "4px" }}>ABOUT US</div>
        <div style={{ width: "100%", height: "2px", background: COLORS.yellow, marginBottom: "16px" }} />
      </div>

      {/* Avatars */}
      <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
        <PixelAvatar name="RIDDHI" color={COLORS.pink} role="UI/UX + ILLUSTRATION" />
        <PixelAvatar name="DHRUV" color={COLORS.blue} role="DESIGN + BRANDING" />
      </div>

      <div style={{
        border: `2px solid ${COLORS.yellow}`,
        background: "rgba(255,215,0,0.05)",
        padding: "12px", fontSize: "7px", lineHeight: "2", color: "#DDDDFF"
      }}>
        <span style={{ color: COLORS.yellow }}>WECREATE0_O</span> IS A CREATIVE DUO OF TWO ENGINEERING STUDENTS WHO TURNED THEIR PASSION FOR DESIGN INTO A FREELANCE POWERHOUSE.
        <br /><br />
        WE BLEND TECHNICAL THINKING WITH VISUAL STORYTELLING TO CRAFT DESIGNS THAT DONT JUST LOOK GOOD — THEY WORK.
        <br /><br />
        FROM A SINGLE BUSINESS CARD TO A COMPLETE BRAND IDENTITY, WE BRING THE SAME ENERGY AND PRECISION TO EVERY PROJECT.
        <br /><br />
        <span style={{ color: COLORS.pink }}>WE ARE STUDENTS. WE ARE CREATORS. WE ARE WECREATE.</span>
      </div>

      {/* Skills */}
      <div>
        <div style={{ fontSize: "8px", color: COLORS.yellow, marginBottom: "8px" }}>SKILLS & TOOLS</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {skills.map(s => (
            <div key={s} style={{
              background: "#1A1A4E", border: `2px solid ${COLORS.blue}`,
              padding: "4px 8px", fontSize: "6px", color: COLORS.blue,
              boxShadow: `2px 2px 0 ${COLORS.blue}`
            }}>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesScreen() {
  const services = [
    { icon: "▣", name: "WEBSITE DESIGN", desc: "RESPONSIVE UI + UX THAT CONVERTS", color: COLORS.blue },
    { icon: "◈", name: "INSTAGRAM POSTS", desc: "SCROLL-STOPPING CONTENT FOR YOUR FEED", color: COLORS.pink },
    { icon: "◉", name: "FLYERS & BANNERS", desc: "PRINT-READY DESIGNS FOR ANY EVENT", color: COLORS.yellow },
    { icon: "◆", name: "BUSINESS CARDS", desc: "FIRST IMPRESSIONS THAT LAST", color: COLORS.green },
    { icon: "▲", name: "POSTERS", desc: "BOLD VISUALS FOR BIG MESSAGES", color: COLORS.orange },
    { icon: "★", name: "BRAND IDENTITY", desc: "LOGO + PALETTE + COMPLETE BRAND KIT", color: COLORS.purple },
  ];

  return (
    <div style={{
      minHeight: "420px", background: "#0A0E27", color: COLORS.white,
      padding: "20px", fontFamily: pixelFont, overflowY: "auto"
    }}>
      <div style={{ fontSize: "14px", color: COLORS.yellow, marginBottom: "4px", textAlign: "center" }}>SERVICES</div>
      <div style={{ width: "100%", height: "2px", background: COLORS.yellow, marginBottom: "16px" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {services.map(s => (
          <div key={s.name} style={{
            border: `2px solid ${s.color}`,
            background: "rgba(255,255,255,0.03)",
            padding: "10px",
            boxShadow: `3px 3px 0 ${s.color}`,
            cursor: "default"
          }}>
            <div style={{ fontSize: "16px", color: s.color, marginBottom: "4px" }}>{s.icon}</div>
            <div style={{ fontSize: "7px", color: s.color, marginBottom: "4px" }}>{s.name}</div>
            <div style={{ fontSize: "6px", color: "#AAAACC", lineHeight: "1.8" }}>{s.desc}</div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: "12px", border: `2px solid ${COLORS.yellow}`,
        padding: "8px", textAlign: "center", fontSize: "7px", color: COLORS.yellow,
        background: "rgba(255,215,0,0.05)"
      }}>
        PRICING IS REASONABLE. QUALITY IS NON-NEGOTIABLE.
      </div>
    </div>
  );
}

function WorkScreen() {
  const [selected, setSelected] = useState(null);
  const [fullView, setFullView] = useState(null);

  const selectedImg = workImages.find(i => i.id === fullView);

  return (
    <div style={{
      minHeight: "420px", background: "#0A0E27", color: COLORS.white,
      padding: "20px", fontFamily: pixelFont, overflowY: "auto",
      position: "relative"
    }}>
      {/* Full screen overlay */}
      {fullView && selectedImg && (
        <WorkFullView img={selectedImg} onClose={() => setFullView(null)} />
      )}

      <div style={{ fontSize: "14px", color: COLORS.yellow, marginBottom: "4px", textAlign: "center" }}>OUR WORK</div>
      <div style={{ width: "100%", height: "2px", background: COLORS.yellow, marginBottom: "8px" }} />
      <div style={{ fontSize: "6px", color: "#AAAACC", textAlign: "center", marginBottom: "12px" }}>
        CLICK A PROJECT TO REVEAL IT
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
        {workImages.map(img => {
          const isSelected = selected === img.id;
          return (
            <div
              key={img.id}
              onClick={() => {
                if (isSelected) {
                  // second click → full view
                  setFullView(img.id);
                } else {
                  setSelected(img.id);
                }
              }}
              style={{
                border: `2px solid ${isSelected ? img.color : "#333366"}`,
                background: isSelected ? `${img.color}22` : "#111133",
                padding: "10px 8px",
                cursor: "pointer",
                boxShadow: isSelected ? `3px 3px 0 ${img.color}` : "none",
                transition: "all 0.15s",
                transform: isSelected ? "scale(1.04)" : "scale(1)",
                opacity: selected && !isSelected ? 0.4 : 1,
                textAlign: "center"
              }}
            >
              <div style={{
                width: "100%", height: "60px",
                marginBottom: "6px", overflow: "hidden",
                filter: isSelected ? "none" : "blur(3px)",
                transition: "all 0.2s"
              }}>
                <img
                  src={img.img}
                  alt={img.title}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    opacity: isSelected ? 1 : 0.3
                  }}
                />
              </div>
              <div style={{ fontSize: "6px", color: isSelected ? img.color : "#555577" }}>{img.type}</div>
              <div style={{ fontSize: "7px", color: isSelected ? COLORS.white : "#333355", marginTop: "2px" }}>
                {isSelected ? img.title : "??????"}
              </div>
              {isSelected && (
                <div style={{ fontSize: "5px", color: "#AAAACC", marginTop: "4px", lineHeight: "1.8" }}>
                  {img.desc}
                </div>
              )}
              {isSelected && (
                <div style={{ fontSize: "5px", color: COLORS.yellow, marginTop: "4px" }}>
                  ▶ CLICK AGAIN TO EXPAND
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: "6px", color: "#666688", textAlign: "center", marginTop: "10px" }}>
        WORKED WITH 10+ CLIENTS | FLYERS, POSTS, BRANDING & MORE
      </div>
    </div>
  );
}

function ConnectScreen() {
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [msg, setMsg]         = useState("");

  const handleConnect = async () => {
  if (!name.trim() || !msg.trim()) return;
  setSending(true);
  try {
    await fetch("https://formspree.io/f/mnjwndao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:     name,
        email:    email || "not provided",
        _replyto: email || "wecreatee0.o@gmail.com",
        _subject: `New inquiry from ${name} — wecreate0_o portfolio`,
        message:  msg,
      }),
    });
    setSent(true);
  } catch(e) { setSent(true); }
  setSending(false);
};

  return (
    <div style={{ minHeight:"420px", background:"#0A0E27", color:"#FFFFFF", padding:"20px", fontFamily:pixelFont, overflowY:"auto" }}>
      <div style={{ fontSize:"14px", color:COLORS.yellow, marginBottom:"4px", textAlign:"center" }}>LETS KNOW EACH OTHER</div>
      <div style={{ width:"100%", height:"2px", background:COLORS.yellow, marginBottom:"16px" }}/>

      {/* WhatsApp */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginBottom:"12px" }}>
        <a href="https://wa.me/919321890932" target="_blank" rel="noreferrer"
          style={{ border:`2px solid ${COLORS.pink}`, padding:"10px", boxShadow:`2px 2px 0 ${COLORS.pink}`, textDecoration:"none", display:"block" }}>
          <div style={{ fontSize:"6px", color:COLORS.pink, marginBottom:"4px" }}>RIDDHI</div>
          <div style={{ fontSize:"6px", color:"#CCCCEE", marginBottom:"2px" }}>+91 93218 90932</div>
          <div style={{ fontSize:"5px", color:"#888899" }}>TAP TO WHATSAPP</div>
        </a>
        <a href="https://wa.me/918104974966" target="_blank" rel="noreferrer"
          style={{ border:`2px solid ${COLORS.blue}`, padding:"10px", boxShadow:`2px 2px 0 ${COLORS.blue}`, textDecoration:"none", display:"block" }}>
          <div style={{ fontSize:"6px", color:COLORS.blue, marginBottom:"4px" }}>DHRUV</div>
          <div style={{ fontSize:"6px", color:"#CCCCEE", marginBottom:"2px" }}>+91 81049 74966</div>
          <div style={{ fontSize:"5px", color:"#888899" }}>TAP TO WHATSAPP</div>
        </a>
      </div>

      {/* Email */}
      <a href="mailto:wecreatee0.o@gmail.com"
        style={{ border:`2px solid ${COLORS.yellow}`, padding:"8px", marginBottom:"10px", background:"rgba(255,215,0,0.04)", textAlign:"center", textDecoration:"none", display:"block" }}>
        <div style={{ fontSize:"6px", color:COLORS.yellow }}>MAIL US AT</div>
        <div style={{ fontSize:"7px", color:"#FFFFFF", marginTop:"4px" }}>wecreatee0.o@gmail.com</div>
      </a>

      {/* Instagram */}
      <a href="https://instagram.com/wecreate0_o" target="_blank" rel="noreferrer"
        style={{ border:`2px solid ${COLORS.purple}`, padding:"8px", marginBottom:"12px", textAlign:"center", boxShadow:`2px 2px 0 ${COLORS.purple}`, textDecoration:"none", display:"block" }}>
        <div style={{ fontSize:"6px", color:COLORS.purple, marginBottom:"2px" }}>FIND US ON INSTAGRAM</div>
        <div style={{ fontSize:"8px", color:"#FFFFFF" }}>@WECREATE0_O</div>
      </a>

      {/* Form */}
      {!sent ? (
        <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
          <div style={{ fontSize:"7px", color:COLORS.yellow, marginBottom:"2px" }}>DROP A QUICK NOTE</div>

          <input value={name} onChange={e => setName(e.target.value)}
            placeholder="YOUR NAME"
            style={{ background:"#111133", border:`2px solid ${name ? COLORS.blue : "#333366"}`, color:"#FFFFFF", fontFamily:pixelFont, fontSize:"7px", padding:"8px", outline:"none", width:"100%", boxSizing:"border-box" }}
          />
          <input value={email} onChange={e => setEmail(e.target.value)}
            placeholder="YOUR EMAIL (SO WE CAN REPLY)"
            type="email"
            style={{ background:"#111133", border:`2px solid ${email ? COLORS.blue : "#333366"}`, color:"#FFFFFF", fontFamily:pixelFont, fontSize:"7px", padding:"8px", outline:"none", width:"100%", boxSizing:"border-box" }}
          />
          <textarea value={msg} onChange={e => setMsg(e.target.value)}
            placeholder="WHAT DO YOU NEED..." rows={3}
            style={{ background:"#111133", border:`2px solid ${msg ? COLORS.blue : "#333366"}`, color:"#FFFFFF", fontFamily:pixelFont, fontSize:"7px", padding:"8px", outline:"none", resize:"none", width:"100%", boxSizing:"border-box" }}
          />

          <button onClick={handleConnect}
            disabled={sending || !name.trim() || !msg.trim()}
            style={{
              background: (!name.trim() || !msg.trim()) ? "#333" : COLORS.yellow,
              border:`2px solid ${COLORS.dark}`,
              fontFamily:pixelFont, fontSize:"7px", color:COLORS.dark,
              padding:"8px", boxShadow:`3px 3px 0 ${COLORS.dark}`,
              cursor: (!name.trim() || !msg.trim()) ? "not-allowed" : "pointer",
              opacity: (!name.trim() || !msg.trim()) ? 0.5 : 1,
            }}
          >{sending ? "SENDING..." : "CONNECT"}</button>

          {(!name.trim() || !msg.trim()) && (
            <div style={{ fontSize:"5px", color:"#555577", textAlign:"center" }}>FILL NAME + MESSAGE TO SEND</div>
          )}
        </div>
      ) : (
        <div style={{ border:`2px solid ${COLORS.green}`, padding:"16px", textAlign:"center", background:"rgba(76,175,80,0.1)", boxShadow:`3px 3px 0 ${COLORS.green}` }}>
          <div style={{ fontSize:"8px", color:COLORS.green, marginBottom:"4px" }}>MESSAGE SENT!</div>
          <div style={{ fontSize:"6px", color:"#AAAACC" }}>WE WILL REPLY WITHIN 24 HOURS.</div>
        </div>
      )}
    </div>
  );
}

export default function WeCreatePortfolio() {
  const [section, setSection] = useState("home");

  return (
    <RoomScene>
      <div style={{ fontFamily:pixelFont, padding:"20px", boxSizing:"border-box", position:"relative" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          * { box-sizing: border-box; image-rendering: pixelated; }
        `}</style>

        <div style={{ textAlign:"center", marginBottom:"16px" }}>
          <div style={{ fontSize:"9px", color:COLORS.darkBrown, letterSpacing:"4px" }}>PORTFOLIO</div>
        </div>

        <PixelTV activeSection={section} onNavigate={setSection} />

        <div style={{ textAlign:"center", marginTop:"16px", display:"flex", justifyContent:"center", gap:"16px", flexWrap:"wrap" }}>
          <div style={{ background:COLORS.cream,  border:`2px solid ${COLORS.dark}`, padding:"4px 10px", fontSize:"6px", color:COLORS.dark, boxShadow:`2px 2px 0 ${COLORS.dark}`, fontFamily:pixelFont }}>RIDDHI + DHRUV</div>
          <div style={{ background:COLORS.cream,  border:`2px solid ${COLORS.dark}`, padding:"4px 10px", fontSize:"6px", color:COLORS.dark, boxShadow:`2px 2px 0 ${COLORS.dark}`, fontFamily:pixelFont }}>@WECREATE0_O</div>
          <div style={{ background:COLORS.yellow, border:`2px solid ${COLORS.dark}`, padding:"4px 10px", fontSize:"6px", color:COLORS.dark, boxShadow:`2px 2px 0 ${COLORS.dark}`, fontFamily:pixelFont }}>OPEN FOR WORK</div>
        </div>
      </div>
    </RoomScene>
  );
}