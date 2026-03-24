import { useState, useEffect } from "react";

const EXAM_DATES = {
  german:       ["2026-05-07","2026-05-14"],
  english_lit:  ["2026-05-11","2026-05-19"],
  biology:      ["2026-05-12","2026-06-08"],
  geography:    ["2026-05-13","2026-06-03","2026-06-11"],
  maths:        ["2026-05-14","2026-06-03","2026-06-10"],
  english_lang: ["2026-05-21","2026-06-05"],
  pe:           ["2026-05-22","2026-06-01"],
  chemistry:    ["2026-05-18","2026-06-12"],
  physics:      ["2026-06-02","2026-06-15"],
  dt:           ["2026-06-10"],
};

const EXAM_LABELS = {
  german:       ["P1 Listening & P3 Reading","P4 Writing"],
  english_lit:  ["Paper 1 — Macbeth & ACC","Paper 2 — AIC & Poetry"],
  biology:      ["Paper 1","Paper 2"],
  geography:    ["Paper 1 Physical","Paper 2 Human","Paper 3 Fieldwork"],
  maths:        ["Paper 1 Non-Calc","Paper 2 Calc","Paper 3 Calc"],
  english_lang: ["Paper 1","Paper 2"],
  pe:           ["Paper 1","Paper 2"],
  chemistry:    ["Paper 1","Paper 2"],
  physics:      ["Paper 1","Paper 2"],
  dt:           ["Written Exam"],
};

const SUBJECTS = [
  { id:"german", name:"German", board:"AQA", icon:"🇩🇪", color:"#9b7ee8",
    topics:["Theme 1 — Me, Family & Relationships","Theme 1 — Technology & Social Media","Theme 1 — Free Time, Music & Sport","Theme 1 — Customs & Festivals","Theme 2 — Town & Neighbourhood","Theme 2 — Travel & Transport","Theme 2 — Holidays & Tourism","Theme 3 — School: Subjects, Rules & Pressures","Theme 3 — Jobs, Careers & Ambitions","Theme 3 — Further Education & Gap Year","Theme 4 — Environment & Sustainability","Theme 4 — Poverty & Social Issues","Grammar — Present Tense","Grammar — Perfect Tense (haben & sein)","Grammar — Imperfect Tense","Grammar — Future Tense (werden)","Grammar — Cases (Nom, Acc, Dat, Gen)","Grammar — Adjective Endings","Grammar — Modal Verbs","Grammar — Subordinate Clauses & Word Order","Reading — Comprehension & Inference","Listening — Key Vocab & Inference","Writing — Extended Responses & Opinions","Speaking — Photo Card","Speaking — General Conversation"] },
  { id:"english_lit", name:"English Literature", board:"AQA", icon:"📖", color:"#e87e9b",
    topics:["Macbeth — Plot & Structure","Macbeth — Themes (Ambition, Power, Evil)","Macbeth — Key Characters","Macbeth — Context & Stagecraft","A Christmas Carol — Plot & Structure","A Christmas Carol — Themes (Redemption, Poverty)","A Christmas Carol — Dickens Context","An Inspector Calls — Plot & Structure","An Inspector Calls — Themes (Responsibility, Class)","An Inspector Calls — Priestley Message","An Inspector Calls — Key Characters","P&C — Ozymandias","P&C — London","P&C — The Prelude","P&C — My Last Duchess","P&C — Charge of the Light Brigade","P&C — Exposure","P&C — Storm on the Island","P&C — Bayonet Charge","P&C — Remains","P&C — Poppies","P&C — War Photographer","P&C — Tissue","P&C — The Emigree","P&C — Kamikaze","P&C — Checking Out Me History","Unseen Poetry — Techniques & Response","Essay Writing — Comparative Skills"] },
  { id:"english_lang", name:"English Language", board:"AQA", icon:"✍️", color:"#e8a87e",
    topics:["P1 — Impressions & Atmosphere (Q1)","P1 — Language Analysis (Q2)","P1 — Structure Analysis (Q3)","P1 — Evaluation (Q4)","P1 — Descriptive/Narrative Writing (Q5)","P2 — Summary (Q1 & Q2)","P2 — Language Analysis (Q3)","P2 — Comparing Writers Perspectives (Q4)","P2 — Viewpoint & Argument Writing (Q5)","Vocabulary, Grammar & Punctuation","Language & Structural Techniques Toolkit"] },
  { id:"maths", name:"Maths", board:"Edexcel", icon:"📐", color:"#7eb8e8",
    topics:["Number — Fractions, Decimals, Percentages","Number — Powers, Roots & Surds","Number — Standard Form","Algebra — Expanding & Factorising","Algebra — Solving Equations & Inequalities","Algebra — Quadratics","Algebra — Simultaneous Equations","Algebra — Sequences (nth term)","Algebra — Graphs (Linear, Quadratic, Cubic)","Ratio, Proportion & Rates of Change","Geometry — Angles & Proofs","Geometry — Area, Perimeter & Volume","Geometry — Circles & Sectors","Geometry — Trigonometry (SOHCAHTOA)","Geometry — Sine & Cosine Rules","Geometry — Pythagoras","Geometry — Vectors","Geometry — Transformations","Probability — Basic & Combined Events","Probability — Tree Diagrams & Venn Diagrams","Statistics — Averages & Frequency Tables","Statistics — Cumulative Frequency & Box Plots","Statistics — Histograms"] },
  { id:"geography", name:"Geography A", board:"Edexcel", icon:"🌍", color:"#7ee8a0",
    topics:["Topic 1 — Climate Zones & Atmospheric Circulation","Topic 1 — Tropical Storms Case Study","Topic 1 — Tectonic Hazards Case Studies","Topic 2 — Development Dynamics & India CS","Topic 2 — Measuring Development (HDI etc.)","Topic 3 — Urban Growth Patterns","Topic 3 — Mumbai Case Study","Topic 3 — Bristol / UK City Case Study","Topic 4 — Coastal Processes & Landforms","Topic 4 — Coastal Management","Topic 4 — River Processes & Landforms","Topic 5 — London Case Study","Topic 5 — Regeneration & Inequality","Topic 6 — Fieldwork Methods","Topic 7 — Biomes & Ecosystem Services","Topic 7 — Forests Under Threat (Amazon/Taiga)","Topic 8 — Oceans on the Edge","Topic 9 — Tectonic Hazards (extended)","Topic 10 — Extreme Climates","Topic 11 — Superpower Geographies","Topic 12 — Disease Dilemmas","Skills — Figure & Data Interpretation","Skills — 6 & 8-mark Answer Technique"] },
  { id:"biology", name:"Biology", board:"AQA", icon:"🧬", color:"#a0e87e",
    topics:["Cell Biology — Structure & Microscopy","Cell Biology — Mitosis & Meiosis","Cell Biology — Diffusion, Osmosis, Active Transport","Organisation — Digestive System & Enzymes","Organisation — Blood & Circulatory System","Organisation — Plant Tissues & Transport","Infection & Response — Pathogens & Immunity","Infection & Response — Vaccines & Drugs","Bioenergetics — Photosynthesis","Bioenergetics — Aerobic & Anaerobic Respiration","Homeostasis — Nervous System & Reflexes","Homeostasis — Hormones & Endocrine System","Homeostasis — Kidneys & Water Balance","Homeostasis — Blood Sugar & Temperature","Inheritance — DNA & Protein Synthesis","Inheritance — Punnett Squares & Patterns","Inheritance — Genetic Disorders","Evolution — Natural Selection & Adaptation","Evolution — Evidence & Classification","Ecology — Ecosystems & Nutrient Cycles","Ecology — Human Impact & Biodiversity","Required Practicals"] },
  { id:"chemistry", name:"Chemistry", board:"AQA", icon:"⚗️", color:"#e8d87e",
    topics:["Atomic Structure — Atoms, Elements & Compounds","Atomic Structure — Periodic Table & History","Atomic Structure — Electronic Configuration","Bonding — Ionic & Giant Structures","Bonding — Covalent & Metallic","Quantitative — Moles & Molar Mass","Quantitative — Yield & Atom Economy","Quantitative — Titration Calculations","Chemical Changes — Reactivity Series & Extraction","Chemical Changes — Electrolysis","Chemical Changes — Acids, Bases & Salts","Energy Changes — Exo/Endothermic & Bond Energies","Rates — Factors & Collision Theory","Rates — Catalysts & Reversible Reactions","Organic — Crude Oil & Fractional Distillation","Organic — Alkanes, Alkenes & Polymers","Chemical Analysis — Chromatography & Gas Tests","Atmosphere — Carbon Cycle & Climate Change","Resources — Water Treatment & LCA","Resources — Haber Process & Fertilisers","Required Practicals"] },
  { id:"physics", name:"Physics", board:"AQA", icon:"⚡", color:"#e8b87e",
    topics:["Energy — Stores, Transfers & Conservation","Energy — Efficiency, Power & SHC","Energy — National Grid & Renewables","Electricity — Circuit Components & Ohms Law","Electricity — Series & Parallel Circuits","Electricity — Mains, Power & Static","Particle Model — Density, States & Internal Energy","Particle Model — Specific Latent Heat","Atomic Structure — Radioactive Decay & Equations","Atomic Structure — Half-Life & Radiation Uses","Forces — Speed, Velocity & Acceleration","Forces — Newtons Laws","Forces — Stopping Distances & Momentum","Forces — Hookes Law","Waves — Properties, Transverse & Longitudinal","Waves — EM Spectrum, Reflection & Refraction","Waves — Sound & Seismic Waves","Magnetism — Motor Effect & Generators","Space Physics","Required Practicals"] },
  { id:"pe", name:"PE", board:"AQA", icon:"🏃", color:"#7ee8e8",
    topics:["Applied Anatomy — Skeleton & Joints","Applied Anatomy — Muscles (Agonist/Antagonist)","Applied Anatomy — Planes & Axes","Applied Anatomy — Cardiovascular System","Applied Anatomy — Respiratory System","Exercise Physiology — Short-term Effects","Exercise Physiology — Long-term Effects","Exercise Physiology — Energy Systems (ATP-PC, Lactic, Aerobic)","Movement Analysis — Lever Systems","Movement Analysis — Fluid Mechanics","Sport Psychology — Skill Classification","Sport Psychology — Goal Setting (SMART)","Sport Psychology — Arousal & Mental Prep","Sport Psychology — Feedback & Guidance","Socio-Cultural — Commercialisation & Media","Socio-Cultural — Participation & Barriers","Socio-Cultural — Ethics, Drugs & Deviance","Health & Fitness — Components of Fitness","Health & Fitness — Principles of Training","Health & Fitness — Training Methods","Health & Fitness — Warm-up, Cool-down & Injury"] },
  { id:"dt", name:"Design & Technology", board:"AQA", icon:"🔧", color:"#c07ee8",
    topics:["Materials — Papers & Boards","Materials — Timber & Manufactured Boards","Materials — Metals & Alloys","Materials — Polymers (Thermoplastic & Thermosetting)","Materials — Textiles & Smart/Modern Materials","Designing — Strategies & User-Centred Design","Designing — Communication (Sketching, CAD)","Designing — Factors (Function, Aesthetics, Cost, Safety)","Making — Tools, Equipment & Processes","Making — Tolerances & Quality Control","Electronics — Systems, Components & Programmable","Sustainability — Life Cycle Assessment & 6Rs","Social & Moral — Culture, Ethics & Fair Trade","NEA — Design Portfolio & Making Evidence"] },
];

const CONF = [
  { value:0, label:"—",     long:"Not started", bg:"#252535", border:"#363650", text:"#5a5a7a" },
  { value:1, label:"Shaky", long:"Shaky",        bg:"#3d1515", border:"#6b2020", text:"#ff8080" },
  { value:2, label:"Mid",   long:"Getting there",bg:"#3d2a00", border:"#6b4a00", text:"#ffc84a" },
  { value:3, label:"Solid", long:"Solid",        bg:"#0f3320", border:"#1a6040", text:"#4ade80" },
];

const BOARD_BADGE = {
  AQA:     { bg:"#1e1540", text:"#a088ee" },
  Edexcel: { bg:"#0d2218", text:"#55aa77" },
};

function todayISO() { return new Date().toISOString().slice(0,10); }
function daysBetween(a, b) { return Math.ceil((new Date(b) - new Date(a)) / 86400000); }
function fmtShort(d) { return new Date(d + "T12:00:00").toLocaleDateString("en-GB", { day:"numeric", month:"short" }); }
function fmtFull(d)  { return new Date(d + "T12:00:00").toLocaleDateString("en-GB", { weekday:"short", day:"numeric", month:"long" }); }
function minsToH(m)  { return Math.round(m / 60 * 10) / 10; }

function initTopics() {
  const d = {};
  for (const s of SUBJECTS) { d[s.id] = {}; for (const t of s.topics) d[s.id][t] = 0; }
  return d;
}
function initHours() {
  const h = {};
  for (const s of SUBJECTS) h[s.id] = 0;
  return h;
}
function subjectScore(topics) {
  const v = Object.values(topics || {});
  if (!v.length) return 0;
  return Math.round(v.reduce((a, b) => a + b, 0) / (v.length * 3) * 100);
}
function getNextExam(id) {
  const t = todayISO();
  const dates = (EXAM_DATES[id] || []).filter(d => d >= t).sort();
  return dates[0] || null;
}
function getDaysToExam(id) {
  const n = getNextExam(id);
  return n ? daysBetween(todayISO(), n) : null;
}
function calcPriority(id, topicData, hours) {
  const days = getDaysToExam(id) != null ? getDaysToExam(id) : 999;
  const cov = subjectScore(topicData[id] || {}) / 100;
  const hrs = hours[id] || 0;
  return (1 / (days + 1)) * 4 + (1 - cov) * 2 + Math.max(0, 1200 - hrs) / 1200;
}
function heatColor(mins) {
  if (!mins)     return "#15151f";
  if (mins < 30) return "#0d2210";
  if (mins < 60) return "#0f3318";
  if (mins < 120) return "#145c28";
  if (mins < 180) return "#166534";
  return "#15803d";
}
function getCalDays(calMonth) {
  const parts = calMonth.split("-");
  const yr = parseInt(parts[0]);
  const mo = parseInt(parts[1]);
  const first = new Date(yr, mo - 1, 1);
  const last  = new Date(yr, mo, 0);
  const dow = (first.getDay() + 6) % 7;
  const days = [];
  for (let i = 0; i < dow; i++) days.push(null);
  for (let d = 1; d <= last.getDate(); d++) days.push(calMonth + "-" + String(d).padStart(2, "0"));
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }) {
  return (
    <div style={{background:"#161624",border:"1px solid #252540",borderRadius:"14px",padding:"9px 8px",textAlign:"center"}}>
      <div style={{fontSize:"8px",letterSpacing:"1.5px",color:"#44446a",marginBottom:"4px"}}>{label}</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:"20px",fontWeight:800,color:"#9090ff",lineHeight:1}}>{value}</div>
      <div style={{fontSize:"8px",color:"#44446a",marginTop:"2px"}}>{sub}</div>
    </div>
  );
}

function ExamBadge({ days }) {
  const color  = days <= 3 ? "#ff6b6b" : days <= 7 ? "#ffc14a" : "#4ade80";
  const bg     = days <= 3 ? "#3d0a0a" : days <= 7 ? "#3d2200" : "#0a2a14";
  const label  = days === 0 ? "TODAY" : days === 1 ? "TMRW" : days + "d";
  return (
    <div style={{flexShrink:0,fontSize:"11px",fontWeight:700,color:color,background:bg,padding:"3px 9px",borderRadius:"6px"}}>
      {label}
    </div>
  );
}

function SubjectRow({ subject, score, hrs, notStarted, daysLeft, onClick }) {
  const bc = BOARD_BADGE[subject.board] || { bg:"#1e1e2e", text:"#888" };
  const scoreColor = score > 66 ? "#4ade80" : score > 33 ? "#fbbf24" : "#f87171";
  const barBg = score > 66
    ? "linear-gradient(90deg,#166534,#4ade80)"
    : score > 33
    ? "linear-gradient(90deg,#92400e,#fbbf24)"
    : "linear-gradient(90deg,#7f1d1d,#f87171)";
  return (
    <div onClick={onClick} style={{background:"#161624",border:"1px solid #252540",borderRadius:"14px",padding:"10px 12px",display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"}}>
      <span style={{fontSize:"20px",flexShrink:0}}>{subject.icon}</span>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"4px"}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:"13px",fontWeight:700,color:"#d8d8f8"}}>{subject.name}</div>
          <div style={{fontSize:"8px",background:bc.bg,color:bc.text,padding:"1px 5px",borderRadius:"3px",flexShrink:0}}>{subject.board}</div>
        </div>
        <div style={{height:"4px",background:"#1e1e30",borderRadius:"2px",overflow:"hidden",marginBottom:"4px"}}>
          <div style={{height:"100%",width:score+"%",background:barBg,borderRadius:"2px",transition:"width .4s"}} />
        </div>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <span style={{fontSize:"9px",color:"#44446a"}}>{hrs}h logged{notStarted > 0 ? " · " + notStarted + " left" : " · all rated"}</span>
          {daysLeft != null && (
            <span style={{fontSize:"9px",color:daysLeft<=7?"#ff6b6b":daysLeft<=14?"#fbbf24":"#44446a"}}>exam in {daysLeft}d</span>
          )}
        </div>
      </div>
      <div style={{flexShrink:0,textAlign:"right"}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"18px",fontWeight:800,color:scoreColor,lineHeight:1}}>{score}</div>
        <div style={{fontSize:"8px",color:"#44446a"}}>%</div>
      </div>
    </div>
  );
}

function TopicRow({ topic, current, onSet }) {
  const c = CONF[current];
  const barColor = current === 0 ? "#5a5a7a" : c.text;
  return (
    <div style={{background:"#141422",border:"1px solid " + c.border,borderRadius:"10px",padding:"9px 10px"}}>
      <div style={{fontSize:"12px",color:current===0?"#55556a":c.text,marginBottom:"8px",lineHeight:1.4,fontWeight:current>0?500:400}}>
        {topic}
      </div>
      <div style={{display:"flex",gap:"5px"}}>
        {CONF.map(function(cf) {
          return (
            <button key={cf.value} onClick={function() { onSet(cf.value); }}
              style={{flex:1,padding:"7px 0",fontSize:"10px",background:current===cf.value?cf.bg:"#1c1c2e",color:current===cf.value?cf.text:"#44446a",border:"1px solid "+(current===cf.value?cf.border:"#252535"),fontWeight:current===cf.value?700:400,borderRadius:"8px",cursor:"pointer",fontFamily:"inherit",transition:"all .12s"}}>
              {cf.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DayDetail({ date, dailyLog, onClose }) {
  const dayData = dailyLog[date] || {};
  const entries = Object.keys(dayData).filter(function(k) { return !k.includes("_note"); });

  var papers = [];
  for (var si = 0; si < SUBJECTS.length; si++) {
    var subj   = SUBJECTS[si];
    var eDates  = EXAM_DATES[subj.id]  || [];
    var eLabels = EXAM_LABELS[subj.id] || [];
    for (var di = 0; di < eDates.length; di++) {
      if (eDates[di] === date) {
        papers.push({
          key:   subj.id + "_" + di,
          icon:  subj.icon,
          name:  subj.name,
          label: eLabels[di] || ("Exam " + (di + 1))
        });
      }
    }
  }

  return (
    <div style={{background:"#161624",border:"1px solid #333366",borderRadius:"14px",padding:"14px",marginBottom:"12px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
        <div style={{fontSize:"11px",color:"#9090cc",fontWeight:600}}>{fmtFull(date)}</div>
        <div onClick={onClose} style={{fontSize:"14px",color:"#44446a",cursor:"pointer",padding:"0 4px"}}>×</div>
      </div>
      {papers.length > 0 && (
        <div style={{marginBottom:"10px",paddingBottom:"10px",borderBottom:"1px solid #2a1a1a"}}>
          <div style={{fontSize:"8px",letterSpacing:"1.5px",color:"#883333",marginBottom:"7px",fontWeight:600}}>📋 EXAMS THIS DAY</div>
          {papers.map(function(p) {
            return (
              <div key={p.key} style={{display:"flex",alignItems:"center",gap:"9px",padding:"4px 0"}}>
                <span style={{fontSize:"16px",flexShrink:0}}>{p.icon}</span>
                <div>
                  <div style={{fontSize:"12px",color:"#ff8888",fontWeight:700}}>{p.name}</div>
                  <div style={{fontSize:"10px",color:"#aa5555",marginTop:"1px"}}>{p.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {entries.length > 0 ? (
        <div>
          {entries.map(function(sid) {
            const s    = SUBJECTS.find(function(x) { return x.id === sid; });
            const mins = dayData[sid];
            const note = dayData[sid + "_note"];
            if (!s) return null;
            return (
              <div key={sid} style={{display:"flex",alignItems:"flex-start",gap:"8px",padding:"6px 0",borderBottom:"1px solid #1e1e2e"}}>
                <span style={{fontSize:"16px"}}>{s.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:"12px",color:"#c0c0e0",fontWeight:600}}>{s.name + " — " + minsToH(mins) + "h"}</div>
                  {note ? <div style={{fontSize:"10px",color:"#55556a",marginTop:"2px"}}>{"📝 " + note}</div> : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{fontSize:"11px",color:"#333355",textAlign:"center",padding:"8px 0"}}>No revision logged</div>
      )}
    </div>
  );
}


// ── MAIN APP ──────────────────────────────────────────────────────────────────

export default function App() {
  const TODAY = todayISO();

  const [loaded,      setLoaded]      = useState(false);
  const [topicData,   setTopicData]   = useState(initTopics);
  const [hours,       setHours]       = useState(initHours);
  const [dailyLog,    setDailyLog]    = useState(function() { return {}; });
  const [tab,         setTab]         = useState("home");
  const [activeSub,   setActiveSub]   = useState(null);
  const [showLog,     setShowLog]     = useState(false);
  const [logSub,      setLogSub]      = useState(SUBJECTS[0].id);
  const [logMins,     setLogMins]     = useState(30);
  const [logDate,     setLogDate]     = useState(TODAY);
  const [logNote,     setLogNote]     = useState("");
  const [calMonth,    setCalMonth]    = useState(TODAY.slice(0, 7));
  const [calSelected, setCalSelected] = useState(null);

  // ── LOAD from localStorage on mount ─────────────────────────────────────
  useEffect(function() {
    try {
      const s = localStorage.getItem("gcse4_topics");
      if (s) {
        const p = JSON.parse(s);
        const f = initTopics();
        for (const sid in p) {
          if (f[sid]) {
            for (const t in p[sid]) {
              if (f[sid][t] !== undefined) f[sid][t] = p[sid][t];
            }
          }
        }
        setTopicData(f);
      }
    } catch(e) {}
    try {
      const h = localStorage.getItem("gcse4_hours");
      if (h) setHours(JSON.parse(h));
    } catch(e) {}
    try {
      const d = localStorage.getItem("gcse4_daily");
      if (d) setDailyLog(JSON.parse(d));
    } catch(e) {}
    setLoaded(true);
  }, []);

  // ── SAVE to localStorage whenever data changes ────────────────────────────
  useEffect(function() {
    if (!loaded) return;
    try { localStorage.setItem("gcse4_topics", JSON.stringify(topicData)); } catch(e) {}
  }, [topicData, loaded]);

  useEffect(function() {
    if (!loaded) return;
    try { localStorage.setItem("gcse4_hours", JSON.stringify(hours)); } catch(e) {}
  }, [hours, loaded]);

  useEffect(function() {
    if (!loaded) return;
    try { localStorage.setItem("gcse4_daily", JSON.stringify(dailyLog)); } catch(e) {}
  }, [dailyLog, loaded]);

  if (!loaded) {
    return (
      <div style={{width:"100%",maxWidth:"430px",height:"100dvh",background:"#0e0e18",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'IBM Plex Mono',monospace",flexDirection:"column",gap:"12px",margin:"0 auto"}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"20px",fontWeight:800,color:"#8888ff"}}>GCSE TRACKER</div>
        <div style={{fontSize:"11px",color:"#44446a",letterSpacing:"1px"}}>Loading...</div>
      </div>
    );
  }

  function setLevel(sid, topic, val) {
    setTopicData(function(p) {
      const next = Object.assign({}, p);
      next[sid] = Object.assign({}, p[sid]);
      next[sid][topic] = val;
      return next;
    });
  }

  function saveLog() {
    const m = parseInt(logMins) || 0;
    if (!m) return;
    setHours(function(p) {
      const next = Object.assign({}, p);
      next[logSub] = (p[logSub] || 0) + m;
      return next;
    });
    setDailyLog(function(p) {
      const next = Object.assign({}, p);
      const day  = Object.assign({}, p[logDate] || {});
      day[logSub] = (day[logSub] || 0) + m;
      if (logNote) {
        const k = logSub + "_note";
        day[k] = day[k] ? day[k] + "; " + logNote : logNote;
      }
      next[logDate] = day;
      return next;
    });
    setLogMins(30);
    setLogNote("");
    setShowLog(false);
  }

  function deleteSession(date, sid) {
    // Remove the session entry for this subject on this date
    // and subtract from total hours
    setDailyLog(function(p) {
      const next = Object.assign({}, p);
      const day  = Object.assign({}, p[date] || {});
      const mins = day[sid] || 0;
      delete day[sid];
      delete day[sid + "_note"];
      // If day is now empty, remove it
      if (Object.keys(day).length === 0) {
        delete next[date];
      } else {
        next[date] = day;
      }
      return next;
    });
    setHours(function(p) {
      const next = Object.assign({}, p);
      const dayData = dailyLog[date] || {};
      const mins = dayData[sid] || 0;
      next[sid] = Math.max(0, (p[sid] || 0) - mins);
      return next;
    });
  }

  function adjustSession(date, sid, newMins) {
    const m = parseInt(newMins) || 0;
    if (m < 0) return;
    setDailyLog(function(p) {
      const next = Object.assign({}, p);
      const day  = Object.assign({}, p[date] || {});
      const oldMins = day[sid] || 0;
      if (m === 0) {
        delete day[sid];
        delete day[sid + "_note"];
        if (Object.keys(day).length === 0) {
          delete next[date];
        } else {
          next[date] = day;
        }
      } else {
        day[sid] = m;
        next[date] = day;
      }
      return next;
    });
    setHours(function(p) {
      const next = Object.assign({}, p);
      const dayData = dailyLog[date] || {};
      const oldMins = dayData[sid] || 0;
      const m2 = parseInt(newMins) || 0;
      next[sid] = Math.max(0, (p[sid] || 0) - oldMins + m2);
      return next;
    });
  }

  // Derived values
  const totalMins  = Object.values(hours).reduce(function(a, b) { return a + b; }, 0);
  const totalSolid = SUBJECTS.reduce(function(a, s) {
    return a + Object.values(topicData[s.id] || {}).filter(function(v) { return v === 3; }).length;
  }, 0);
  const totalTopics = SUBJECTS.reduce(function(a, s) { return a + s.topics.length; }, 0);

  const allExams = [];
  for (const s of SUBJECTS) {
    const dates = EXAM_DATES[s.id] || [];
    for (let i = 0; i < dates.length; i++) {
      allExams.push({ d: dates[i], s: s });
    }
  }
  const futureExams = allExams.filter(function(x) { return x.d >= TODAY; });
  futureExams.sort(function(a, b) { return a.d.localeCompare(b.d); });
  const firstExam   = futureExams[0] || null;
  const daysFirst   = firstExam ? daysBetween(TODAY, firstExam.d) : null;

  const upcomingExams = [];
  for (const s of SUBJECTS) {
    const dates  = EXAM_DATES[s.id]  || [];
    const labels = EXAM_LABELS[s.id] || [];
    for (let i = 0; i < dates.length; i++) {
      const days = daysBetween(TODAY, dates[i]);
      if (days >= 0 && days <= 21) {
        upcomingExams.push({ s: s, d: dates[i], label: labels[i] || "", days: days });
      }
    }
  }
  upcomingExams.sort(function(a, b) { return a.d.localeCompare(b.d); });

  const priorityRanked = SUBJECTS.map(function(s) {
    return {
      s:     s,
      score: subjectScore(topicData[s.id] || {}),
      days:  getDaysToExam(s.id),
      hrs:   minsToH(hours[s.id] || 0),
      pri:   calcPriority(s.id, topicData, hours),
    };
  }).sort(function(a, b) { return b.pri - a.pri; });

  const calDays = getCalDays(calMonth);

  function getDayMins(ds) {
    const day = dailyLog[ds] || {};
    return Object.keys(day).filter(function(k) { return !k.includes("_note"); })
      .reduce(function(a, k) { return a + day[k]; }, 0);
  }
  function getExamsOnDay(ds) {
    return SUBJECTS.filter(function(s) { return (EXAM_DATES[s.id] || []).includes(ds); });
  }

  const activeSubObj = SUBJECTS.find(function(s) { return s.id === activeSub; }) || null;

  // ── PREV/NEXT MONTH ────────────────────────────────────────────────────────
  function prevMonth() {
    const parts = calMonth.split("-");
    const y = parseInt(parts[0]);
    const m = parseInt(parts[1]);
    const d = new Date(y, m - 2, 1);
    setCalMonth(d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0"));
  }
  function nextMonth() {
    const parts = calMonth.split("-");
    const y = parseInt(parts[0]);
    const m = parseInt(parts[1]);
    const d = new Date(y, m, 1);
    setCalMonth(d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0"));
  }

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div style={{width:"100%",maxWidth:"430px",height:"100dvh",background:"#0e0e18",color:"#e0e0f0",fontFamily:"'IBM Plex Mono','Courier New',monospace",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative",margin:"0 auto"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; -webkit-tap-highlight-color:transparent; }
        .scroll-body::-webkit-scrollbar { width:3px; } .scroll-body::-webkit-scrollbar-track { background:transparent; } .scroll-body::-webkit-scrollbar-thumb { background:#2e2e55; border-radius:2px; }
        .tap { cursor:pointer; user-select:none; transition:opacity .1s; }
        .tap:active { opacity:.6; }
        .pill { border-radius:8px; border:none; font-family:inherit; cursor:pointer; transition:all .12s; }
        .pill:active { opacity:.7; transform:scale(.97); }
        @keyframes up { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .up { animation:up .18s ease; }
        @keyframes modal-in { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        .modal-in { animation:modal-in .2s ease; }
        input, select { background:#1c1c2e; border:1.5px solid #2e2e50; color:#e0e0f0; font-family:inherit; border-radius:10px; padding:10px 12px; font-size:14px; width:100%; outline:none; }
        input:focus, select:focus { border-color:#7070cc; }
        select option { background:#1c1c2e; }
      `}</style>

      {/* ── TOP HEADER + NAV ────────────────────────────────────────────── */}
      <div style={{flexShrink:0,background:"#0e0e18",borderBottom:"1px solid #1e1e30",zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px 6px"}}>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:"15px",fontWeight:800,color:"#8888ff",letterSpacing:"-0.5px"}}>GCSE TRACKER</div>
            <div style={{fontSize:"9px",color:"#44446a",marginTop:"1px"}}>
              {fmtFull(TODAY)}
              {daysFirst != null ? (
                <span style={{color:"#ff6b6b",fontWeight:600,marginLeft:"6px"}}>{"· " + daysFirst + "d to first exam"}</span>
              ) : null}
            </div>
          </div>
          <div className="tap" onClick={function() { setShowLog(true); }}
            style={{width:"36px",height:"36px",background:"linear-gradient(135deg,#4444aa,#7777ff)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 12px #4444aa55",fontSize:"20px",color:"#fff",flexShrink:0}}>
            +
          </div>
        </div>

        {activeSub === null ? (
          <div style={{display:"flex",padding:"0 8px"}}>
            {[{id:"home",label:"Board"},{id:"priority",label:"Priority"},{id:"calendar",label:"Calendar"}].map(function(n) {
              const active = tab === n.id;
              return (
                <div key={n.id} className="tap" onClick={function() { setTab(n.id); }}
                  style={{flex:1,textAlign:"center",padding:"6px 0",fontSize:"11px",fontWeight:active?700:400,color:active?"#9090ff":"#44446a",borderBottom:"2px solid "+(active?"#7070cc":"transparent"),transition:"all .15s",letterSpacing:"0.5px"}}>
                  {n.label}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{padding:"0 16px 10px"}}>
            <div className="tap" onClick={function() { setActiveSub(null); }}
              style={{display:"inline-flex",alignItems:"center",gap:"4px",color:"#7070cc",fontSize:"12px",fontWeight:600}}>
              ‹ Back
            </div>
          </div>
        )}
      </div>

      {/* ── SCROLLABLE BODY ─────────────────────────────────────────────── */}
      <div className="scroll-body" style={{flex:1,overflowY:"auto",padding:"10px 12px 20px"}}>

        {/* HOME */}
        {tab === "home" && activeSub === null && (
          <div className="up">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"6px",marginBottom:"10px"}}>
              <StatCard label="HOURS"   value={minsToH(totalMins)+"h"} sub="logged" />
              <StatCard label="EXAM IN" value={daysFirst != null ? daysFirst+"d" : "–"} sub={firstExam ? firstExam.s.name.slice(0,6) : ""} />
              <StatCard label="SOLID"   value={totalSolid} sub={"of "+totalTopics} />
            </div>

            {upcomingExams.length > 0 && (
              <div style={{background:"#161624",border:"1px solid #2a1a40",borderRadius:"14px",padding:"12px 14px",marginBottom:"12px"}}>
                <div style={{fontSize:"9px",letterSpacing:"1.5px",color:"#aa66dd",marginBottom:"8px",fontWeight:600}}>📅 COMING UP</div>
                {upcomingExams.slice(0, 5).map(function(e, i) {
                  const isLast = i >= Math.min(upcomingExams.length, 5) - 1;
                  return (
                    <div key={i} style={{display:"flex",alignItems:"center",gap:"10px",paddingBottom:isLast?"0":"7px",marginBottom:isLast?"0":"7px",borderBottom:isLast?"none":"1px solid #1e1e30"}}>
                      <span style={{fontSize:"16px",flexShrink:0}}>{e.s.icon}</span>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:"12px",color:"#c8c8f0",fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{e.s.name}</div>
                        <div style={{fontSize:"10px",color:"#55556a"}}>{e.label + " · " + fmtShort(e.d)}</div>
                      </div>
                      <ExamBadge days={e.days} />
                    </div>
                  );
                })}
              </div>
            )}

            <div style={{fontSize:"9px",letterSpacing:"1.5px",color:"#44446a",marginBottom:"8px",fontWeight:600}}>SUBJECTS</div>
            <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
              {SUBJECTS.map(function(s) {
                const score      = subjectScore(topicData[s.id] || {});
                const hrs        = minsToH(hours[s.id] || 0);
                const notStarted = Object.values(topicData[s.id] || {}).filter(function(v) { return v === 0; }).length;
                const dl         = getDaysToExam(s.id);
                return (
                  <SubjectRow key={s.id} subject={s} score={score} hrs={hrs} notStarted={notStarted} daysLeft={dl}
                    onClick={function() { setActiveSub(s.id); }} />
                );
              })}
            </div>
          </div>
        )}

        {/* SUBJECT DETAIL */}
        {activeSub !== null && activeSubObj !== null && (
          <div className="up">
            <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"10px",paddingTop:"4px"}}>
              <span style={{fontSize:"28px"}}>{activeSubObj.icon}</span>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:"18px",fontWeight:800,color:"#e0e0ff"}}>{activeSubObj.name}</div>
                <div style={{fontSize:"10px",color:"#55556a",marginTop:"1px"}}>
                  {activeSubObj.board + " · " + subjectScore(topicData[activeSub] || {}) + "% · " + minsToH(hours[activeSub] || 0) + "h logged"}
                </div>
              </div>
            </div>

            <div style={{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"12px"}}>
              {(EXAM_DATES[activeSub] || []).map(function(d, i) {
                const dl = daysBetween(TODAY, d);
                const label = (EXAM_LABELS[activeSub] || [])[i] || ("Exam " + (i+1));
                const col = dl <= 7 ? "#ff6b6b" : dl <= 14 ? "#fbbf24" : "#6666aa";
                const status = dl < 0 ? "done" : dl === 0 ? "TODAY" : dl === 1 ? "tomorrow" : dl + " days";
                return (
                  <div key={d} style={{background:"#1a1030",border:"1px solid #331a55",borderRadius:"8px",padding:"7px 10px",fontSize:"10px"}}>
                    <div style={{color:"#aa77ff",fontWeight:600,marginBottom:"1px"}}>{label}</div>
                    <div style={{color:col}}>{fmtShort(d) + " · " + status}</div>
                  </div>
                );
              })}
            </div>

            <div className="tap" onClick={function() { setLogSub(activeSub); setShowLog(true); }}
              style={{display:"inline-flex",alignItems:"center",gap:"6px",padding:"9px 14px",background:"#1e1e3a",border:"1px solid #4040aa",borderRadius:"10px",fontSize:"11px",color:"#9090ff",marginBottom:"14px",fontWeight:600}}>
              + Log session
            </div>

            <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"10px"}}>
              {CONF.map(function(c) {
                return (
                  <div key={c.value} style={{display:"flex",alignItems:"center",gap:"4px",fontSize:"9px",color:"#55556a"}}>
                    <div style={{width:"8px",height:"8px",background:c.bg,border:"1px solid "+c.border,borderRadius:"2px"}} />
                    {c.long}
                  </div>
                );
              })}
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:"4px",paddingBottom:"8px"}}>
              {activeSubObj.topics.map(function(topic) {
                const cur = (topicData[activeSub] && topicData[activeSub][topic] != null) ? topicData[activeSub][topic] : 0;
                return (
                  <TopicRow key={topic} topic={topic} current={cur}
                    onSet={function(val) { setLevel(activeSub, topic, val); }} />
                );
              })}
            </div>
          </div>
        )}

        {/* PRIORITY */}
        {tab === "priority" && activeSub === null && (
          <div className="up">
            <div style={{marginBottom:"12px",paddingTop:"4px"}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:"18px",fontWeight:800,color:"#e0e0ff",marginBottom:"2px"}}>Priority</div>
              <div style={{fontSize:"10px",color:"#44446a"}}>Ranked by exam urgency · coverage · hours</div>
            </div>

            <div style={{background:"#0f1825",border:"1px solid #1a2a40",borderRadius:"14px",padding:"14px",marginBottom:"12px"}}>
              <div style={{fontSize:"9px",letterSpacing:"1.5px",color:"#5599cc",marginBottom:"10px",fontWeight:600}}>🎯 FOCUS TODAY</div>
              {priorityRanked.slice(0, 3).map(function(item, i) {
                return (
                  <div key={item.s.id} className="tap" onClick={function() { setActiveSub(item.s.id); }}
                    style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 0",borderBottom:i<2?"1px solid #141e2a":"none"}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:"16px",fontWeight:800,color:i===0?"#8888ff":i===1?"#555580":"#333355",width:"16px",textAlign:"center"}}>{i+1}</div>
                    <span style={{fontSize:"20px"}}>{item.s.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:"13px",fontWeight:700,color:"#d0d0f0"}}>{item.s.name}</div>
                      <div style={{fontSize:"10px",color:"#44446a",marginTop:"1px"}}>
                        {item.days != null ? item.days+"d to exam · " : ""}{item.score+"% done · "+item.hrs+"h logged"}
                      </div>
                    </div>
                    <div style={{fontSize:"12px",color:"#7070cc",fontWeight:600}}>›</div>
                  </div>
                );
              })}
            </div>

            <div style={{background:"#161624",border:"1px solid #252540",borderRadius:"14px",padding:"14px",marginBottom:"12px"}}>
              <div style={{fontSize:"9px",letterSpacing:"1.5px",color:"#44446a",marginBottom:"10px",fontWeight:600}}>ALL SUBJECTS</div>
              {priorityRanked.map(function(item, i) {
                const sc = item.score;
                const barCol = sc > 66 ? "#166534" : sc > 33 ? "#92400e" : "#7f1d1d";
                const txtCol = sc > 66 ? "#4ade80" : sc > 33 ? "#fbbf24" : "#f87171";
                return (
                  <div key={item.s.id} className="tap" onClick={function() { setActiveSub(item.s.id); }}
                    style={{display:"flex",alignItems:"center",gap:"8px",padding:"9px 0",borderBottom:i<SUBJECTS.length-1?"1px solid #1a1a28":"none"}}>
                    <span style={{fontSize:"9px",color:i<3?"#8888ff":"#333355",width:"14px",fontWeight:i<3?700:400}}>{i+1}</span>
                    <span style={{fontSize:"18px"}}>{item.s.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:"12px",color:"#c0c0e0",fontWeight:600}}>{item.s.name}</div>
                      <div style={{fontSize:"9px",color:"#44446a"}}>{item.hrs+"h · "+(item.days!=null?"exam "+item.days+"d":"")}</div>
                    </div>
                    <div style={{width:"55px",height:"4px",background:"#1e1e30",borderRadius:"2px",overflow:"hidden"}}>
                      <div style={{height:"100%",width:sc+"%",background:barCol,borderRadius:"2px",transition:"width .4s"}} />
                    </div>
                    <span style={{fontSize:"11px",fontWeight:700,color:txtCol,width:"32px",textAlign:"right"}}>{sc+"%"}</span>
                  </div>
                );
              })}
            </div>

            <div style={{background:"#161624",border:"1px solid #252540",borderRadius:"14px",padding:"14px"}}>
              <div style={{fontSize:"9px",letterSpacing:"1.5px",color:"#44446a",marginBottom:"10px",fontWeight:600}}>HOURS PER SUBJECT</div>
              {SUBJECTS.slice().sort(function(a,b){ return (hours[b.id]||0)-(hours[a.id]||0); }).map(function(s) {
                const m   = hours[s.id] || 0;
                const max = Math.max.apply(null, SUBJECTS.map(function(x){ return hours[x.id]||0; }).concat([1]));
                return (
                  <div key={s.id} style={{display:"flex",alignItems:"center",gap:"8px",padding:"5px 0",borderBottom:"1px solid #1a1a28"}}>
                    <span style={{fontSize:"14px",width:"20px"}}>{s.icon}</span>
                    <span style={{fontSize:"10px",flex:1,color:"#8888aa",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.name}</span>
                    <div style={{width:"80px",height:"5px",background:"#1e1e30",borderRadius:"3px",overflow:"hidden"}}>
                      <div style={{height:"100%",width:((m/max)*100)+"%",background:s.color+"cc",borderRadius:"3px",transition:"width .4s"}} />
                    </div>
                    <span style={{fontSize:"10px",color:"#6666aa",width:"28px",textAlign:"right"}}>{minsToH(m)+"h"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CALENDAR */}
        {tab === "calendar" && activeSub === null && (
          <div className="up">
            <div style={{marginBottom:"12px",paddingTop:"4px"}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:"18px",fontWeight:800,color:"#e0e0ff",marginBottom:"2px"}}>Calendar</div>
              <div style={{fontSize:"10px",color:"#44446a"}}>Revision heatmap · exam dates</div>
            </div>

            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
              <button className="pill tap" onClick={prevMonth}
                style={{padding:"7px 16px",background:"#1c1c2e",color:"#7070cc",fontSize:"16px",border:"1px solid #2e2e50"}}>
                ‹
              </button>
              <span style={{fontSize:"13px",color:"#c0c0e0",fontWeight:600}}>
                {new Date(calMonth + "-01T12:00:00").toLocaleDateString("en-GB", {month:"long",year:"numeric"})}
              </span>
              <button className="pill tap" onClick={nextMonth}
                style={{padding:"7px 16px",background:"#1c1c2e",color:"#7070cc",fontSize:"16px",border:"1px solid #2e2e50"}}>
                ›
              </button>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"3px",marginBottom:"4px"}}>
              {["M","T","W","T","F","S","S"].map(function(d, i) {
                return <div key={i} style={{textAlign:"center",fontSize:"9px",color:"#44446a",padding:"2px 0"}}>{d}</div>;
              })}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"3px",marginBottom:"12px"}}>
              {calDays.map(function(ds, i) {
                if (!ds) return <div key={i} />;
                const mins     = getDayMins(ds);
                const exams    = getExamsOnDay(ds);
                const isToday  = ds === TODAY;
                const isFuture = ds > TODAY;
                const isSel    = ds === calSelected;
                const borderCol = isSel ? "#8888ff" : isToday ? "#6666cc" : exams.length ? "#883333" : "#1e1e2e";
                return (
                  <div key={ds} className="tap"
                    onClick={function() { setCalSelected(calSelected === ds ? null : ds); }}
                    style={{background:heatColor(mins),border:"1.5px solid "+borderCol,borderRadius:"6px",minHeight:"44px",padding:"4px 3px",opacity:isFuture?0.5:1,position:"relative",transition:"all .15s"}}>
                    <div style={{fontSize:"10px",color:isToday?"#aaaaff":isFuture?"#333344":"#6666aa",fontWeight:isToday?700:400,textAlign:"center"}}>{parseInt(ds.slice(8))}</div>
                    {exams.length > 0 && (
                      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"1px",marginTop:"2px"}}>
                        {exams.slice(0, 2).map(function(s) {
                          return <span key={s.id} style={{fontSize:"9px"}}>{s.icon}</span>;
                        })}
                      </div>
                    )}
                    {mins > 0 && (
                      <div style={{fontSize:"7px",color:"#55886a",textAlign:"center",marginTop:"2px"}}>{minsToH(mins)+"h"}</div>
                    )}
                  </div>
                );
              })}
            </div>

            {calSelected !== null && (
              <DayDetail date={calSelected} dailyLog={dailyLog} onClose={function(){ setCalSelected(null); }} />
            )}

            <div style={{display:"flex",gap:"6px",flexWrap:"wrap",alignItems:"center",marginBottom:"12px"}}>
              <span style={{fontSize:"8px",color:"#333355",letterSpacing:"1px"}}>HOURS:</span>
              {[["0","#15151f"],["30m","#0f3318"],["1h","#145c28"],["2h","#166534"],["3h+","#15803d"]].map(function(pair) {
                return (
                  <div key={pair[0]} style={{display:"flex",alignItems:"center",gap:"3px"}}>
                    <div style={{width:"10px",height:"10px",background:pair[1],borderRadius:"2px",border:"1px solid #2a2a3a"}} />
                    <span style={{fontSize:"8px",color:"#333355"}}>{pair[0]}</span>
                  </div>
                );
              })}
              <div style={{display:"flex",alignItems:"center",gap:"3px",marginLeft:"4px"}}>
                <div style={{width:"10px",height:"10px",border:"1.5px solid #883333",borderRadius:"2px",background:"#15151f"}} />
                <span style={{fontSize:"8px",color:"#333355"}}>exam</span>
              </div>
            </div>

            <div style={{fontSize:"9px",letterSpacing:"1.5px",color:"#44446a",marginBottom:"8px",fontWeight:600}}>RECENT SESSIONS</div>
            {Object.keys(dailyLog).length === 0 ? (
              <div style={{fontSize:"11px",color:"#333355",textAlign:"center",padding:"20px 0"}}>No sessions yet — tap + to start</div>
            ) : (
              <div>
                {Object.keys(dailyLog).sort(function(a,b){ return b.localeCompare(a); }).slice(0,10).map(function(date) {
                  const dayData = dailyLog[date];
                  const entries = Object.keys(dayData).filter(function(k){ return !k.includes("_note"); });
                  if (!entries.length) return null;
                  const total = entries.reduce(function(a,k){ return a + dayData[k]; }, 0);
                  return (
                    <div key={date} style={{background:"#161624",border:"1px solid #252540",borderRadius:"14px",padding:"12px",marginBottom:"6px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"7px"}}>
                        <span style={{fontSize:"11px",color:"#8888aa"}}>{fmtFull(date)}</span>
                        <span style={{fontSize:"11px",color:"#7070cc",fontWeight:600}}>{minsToH(total)+"h"}</span>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
                        {entries.map(function(sid) {
                          const s    = SUBJECTS.find(function(x){ return x.id===sid; });
                          const note = dayData[sid + "_note"];
                          if (!s) return null;
                          return (
                            <div key={sid} style={{background:"#1c1c2e",border:"1px solid #2e2e50",borderRadius:"7px",padding:"7px 10px",display:"flex",alignItems:"center",gap:"8px"}}>
                              <span style={{fontSize:"15px"}}>{s.icon}</span>
                              <div style={{flex:1}}>
                                <div style={{fontSize:"11px",color:"#a0a0cc",fontWeight:600}}>{s.name}</div>
                                <div style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"3px"}}>
                                  <input
                                    type="number"
                                    defaultValue={dayData[sid]}
                                    onBlur={function(e){ adjustSession(date, sid, e.target.value); }}
                                    style={{width:"52px",padding:"2px 6px",fontSize:"11px",background:"#252535",border:"1px solid #333355",borderRadius:"5px",color:"#c0c0e0",textAlign:"center"}}
                                  />
                                  <span style={{fontSize:"9px",color:"#44446a"}}>mins</span>
                                </div>
                                {note ? <div style={{fontSize:"9px",color:"#44446a",marginTop:"2px"}}>{"📝 " + note}</div> : null}
                              </div>
                              <div className="tap" onClick={function(){ deleteSession(date, sid); }}
                                style={{fontSize:"16px",color:"#663333",padding:"4px",flexShrink:0}}>
                                🗑
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ── LOG MODAL ───────────────────────────────────────────────────── */}
      {showLog && (
        <div style={{position:"absolute",inset:0,background:"#000000cc",zIndex:200,display:"flex",alignItems:"flex-end"}}
          onClick={function(e){ if(e.target===e.currentTarget) setShowLog(false); }}>
          <div className="modal-in" style={{background:"#14141f",borderRadius:"20px 20px 0 0",padding:"24px 20px 32px",width:"100%",border:"1px solid #2a2a4a",borderBottom:"none"}}>
            <div style={{width:"36px",height:"4px",background:"#333355",borderRadius:"2px",margin:"0 auto 18px"}} />
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:"17px",fontWeight:800,color:"#c0c0ff",marginBottom:"18px"}}>Log Revision Session</div>
            <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
              <div>
                <div style={{fontSize:"9px",letterSpacing:"1px",color:"#55556a",marginBottom:"5px",fontWeight:600}}>SUBJECT</div>
                <select value={logSub} onChange={function(e){ setLogSub(e.target.value); }}>
                  {SUBJECTS.map(function(s){
                    return <option key={s.id} value={s.id}>{s.icon + " " + s.name}</option>;
                  })}
                </select>
              </div>
              <div>
                <div style={{fontSize:"9px",letterSpacing:"1px",color:"#55556a",marginBottom:"5px",fontWeight:600}}>DATE</div>
                <input type="date" value={logDate} max={TODAY} onChange={function(e){ setLogDate(e.target.value); }} />
              </div>
              <div>
                <div style={{fontSize:"9px",letterSpacing:"1px",color:"#55556a",marginBottom:"8px",fontWeight:600}}>DURATION</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"6px",marginBottom:"8px"}}>
                  {[15,30,45,60,90,120].map(function(m){
                    const active = logMins === m;
                    return (
                      <button key={m} className="pill tap" onClick={function(){ setLogMins(m); }}
                        style={{padding:"10px",fontSize:"12px",background:active?"#2a2a6a":"#1c1c2e",color:active?"#aaaaff":"#55556a",border:"1px solid "+(active?"#5555aa":"#2e2e50"),fontWeight:active?700:400}}>
                        {m < 60 ? m+"m" : (m/60)+"h"}
                      </button>
                    );
                  })}
                </div>
                <input type="number" value={logMins} placeholder="Custom (minutes)"
                  onChange={function(e){ setLogMins(parseInt(e.target.value)||0); }} />
              </div>
              <div>
                <div style={{fontSize:"9px",letterSpacing:"1px",color:"#55556a",marginBottom:"5px",fontWeight:600}}>NOTES (optional)</div>
                <input type="text" value={logNote} placeholder="e.g. past paper, revised enzymes…"
                  onChange={function(e){ setLogNote(e.target.value); }} />
              </div>
              <div style={{display:"flex",gap:"8px",marginTop:"2px"}}>
                <button className="pill tap" onClick={saveLog}
                  style={{flex:1,padding:"13px",background:"#2a2a6a",color:"#aaaaff",border:"1px solid #5555aa",fontSize:"13px",fontWeight:700}}>
                  Save Session
                </button>
                <button className="pill tap" onClick={function(){ setShowLog(false); }}
                  style={{padding:"13px 18px",background:"#1c1c2e",color:"#55556a",border:"1px solid #2e2e50",fontSize:"13px"}}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
