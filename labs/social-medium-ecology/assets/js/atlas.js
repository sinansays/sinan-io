/* Social Medium Ecology — Atlas page */
(function(){
"use strict";
const P = SME.PLATFORMS, byId = SME.byId, CL = SME.CLUSTERS, reduce = SME.reduce;
const el = SME.svg, cv = SME.clusterVar, esc = SME.esc;
const $ = id => document.getElementById(id);

/* ---------- legend ---------- */
const lg = $("legend");
for (const k in CL) { const s = document.createElement("span"); s.innerHTML = `<i style="background:var(${CL[k].color})"></i>${CL[k].name}`; lg.appendChild(s); }

/* ---------- Plate 1: lens map ---------- */
const hash = s => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
const clamp = v => Math.max(5, Math.min(95, v));
function traitVal(p, spec){
  if (Array.isArray(spec)) return spec.reduce((a, s) => a + traitVal(p, s), 0) / spec.length;
  if (spec === "doctorow") return p.doctorow / 3 * 100;
  if (spec.startsWith("-")) return (4 - p.traits[spec.slice(1)]) / 4 * 100;
  return p.traits[spec] / 4 * 100;
}
function lensPos(L){
  const out = {};
  for (const p of P) {
    let x, y;
    if (L.id === "mcl") [x, y] = p.mcluhan;
    else if (L.id === "cl") [x, y] = SME.CLUSTER_LAYOUT[p.id];
    else {
      const j = hash(p.id + L.id);
      x = traitVal(p, L.fx) + ((j % 9) - 4) * 1.1;
      y = traitVal(p, L.fy) + (((j >> 4) % 9) - 4) * 1.1;
    }
    out[p.id] = [clamp(x), clamp(y)];
  }
  return out;
}
SME.LENSES.forEach(L => L.pos = lensPos(L));

const svg = $("mapSvg");
const W = 760, H = 520, ML = 40, MR = 24, MT = 24, MB = 50;
const sx = v => ML + (W - ML - MR) * v / 100, sy = v => H - MB - (H - MT - MB) * v / 100;
const gAxes = el("g", {}, svg), gDots = el("g", {}, svg);
const rOf = m => 5 + 19 * Math.sqrt(m / 3000);
const nodes = {}; let cur = {}, lens = SME.LENSES[0], sel = "tt";
P.slice().sort((a, b) => b.users.value - a.users.value).forEach(p => {
  const g = el("g", { class:"dot", tabindex:"0", role:"button", "aria-label":p.name }, gDots);
  el("circle", { r:rOf(p.users.value), fill:cv(p.id), "fill-opacity":"0.85" }, g);
  const t = el("text", { class:"dotlabel" }, gDots); t.textContent = p.name.replace(" (formerly Twitter)", "");
  g.addEventListener("click", () => select(p.id));
  g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(p.id); } });
  nodes[p.id] = { g, t, r:rOf(p.users.value), label:t.textContent };
  cur[p.id] = [50, 50];
});
function drawAxes(){
  gAxes.innerHTML = "";
  if (lens.id === "cl") {
    const boxes = { feed:[10,60,30,34], square:[60,62,30,30], rooms:[10,12,26,30], back:[54,10,34,36], aspire:[40,46,20,18] };
    for (const k in boxes) { const [x, y, w, h] = boxes[k];
      el("rect", { x:sx(x), y:sy(y+h), width:sx(x+w)-sx(x), height:sy(y)-sy(y+h), rx:10, fill:"none", stroke:`var(${CL[k].color})`, "stroke-dasharray":"4 4", "stroke-opacity":"0.7" }, gAxes);
      const t = el("text", { x:sx(x)+8, y:sy(y+h)+16, class:"axlabel", fill:`var(${CL[k].color})` }, gAxes); t.textContent = CL[k].name.toUpperCase(); }
    return;
  }
  el("line", { x1:sx(0), x2:sx(100), y1:sy(50), y2:sy(50), class:"axis", "stroke-dasharray":"2 4" }, gAxes);
  el("line", { x1:sx(50), x2:sx(50), y1:sy(0), y2:sy(100), class:"axis", "stroke-dasharray":"2 4" }, gAxes);
  el("rect", { x:sx(0), y:sy(100), width:sx(100)-sx(0), height:sy(0)-sy(100), fill:"none", class:"axis" }, gAxes);
  const a = (x, y, s, anchor, rot) => { const t = el("text", { x, y, class:"axlabel", "text-anchor":anchor, ...(rot ? { transform:`rotate(-90 ${x} ${y})` } : {}) }, gAxes); t.textContent = s; };
  a(sx(0), H-18, "← " + lens.x[0], "start"); a(sx(100), H-18, lens.x[1] + " →", "end");
  a(14, sy(0), "← " + lens.y[0], "start", true); a(14, sy(100), lens.y[1] + " →", "end", true);
}
function placeLabels(){
  const placed = [], order = P.slice().sort((a, b) => b.users.value - a.users.value);
  const circ = order.map(p => ({ x:sx(cur[p.id][0]), y:sy(cur[p.id][1]), r:nodes[p.id].r }));
  for (const p of order) {
    const n = nodes[p.id], x = sx(cur[p.id][0]), y = sy(cur[p.id][1]), w = n.label.length * 6.9 + 4, h = 13, r = n.r;
    const cands = [[x+r+4,y+4,"start"],[x-r-4,y+4,"end"],[x,y-r-5,"middle"],[x,y+r+13,"middle"],[x+r+2,y-r-2,"start"],[x-r-2,y+r+12,"end"]];
    let best = cands[0], bestScore = 1e9;
    for (const c of cands) {
      const bx = c[2] === "start" ? c[0] : c[2] === "end" ? c[0] - w : c[0] - w/2, by = c[1] - 11;
      let s = 0;
      if (bx < 2 || bx + w > W - 2 || by < 2 || by + h > H - 30) s += 500;
      for (const b of placed) if (bx < b.x + b.w && bx + w > b.x && by < b.y + b.h && by + h > b.y) s += 100;
      for (const o of circ) { const cx = Math.max(bx, Math.min(o.x, bx + w)), cy = Math.max(by, Math.min(o.y, by + h)); if ((cx-o.x)**2 + (cy-o.y)**2 < o.r*o.r) s += 30; }
      if (s < bestScore) { bestScore = s; best = c; } if (s === 0) break;
    }
    n.t.setAttribute("x", best[0]); n.t.setAttribute("y", best[1]); n.t.setAttribute("text-anchor", best[2]);
    const bx = best[2] === "start" ? best[0] : best[2] === "end" ? best[0] - w : best[0] - w/2;
    placed.push({ x:bx, y:best[1]-11, w, h });
  }
}
function render(){ for (const p of P) { const [x, y] = cur[p.id]; nodes[p.id].g.setAttribute("transform", `translate(${sx(x)},${sy(y)})`); } }
let anim = null;
function setLens(L){
  lens = L; drawAxes();
  document.querySelectorAll("#lensBtns .btn").forEach(b => b.setAttribute("aria-pressed", b.dataset.id === L.id));
  $("lensName").textContent = L.name;
  $("lensCite").innerHTML = SME.cites(L.cite);
  $("lensBlurb").textContent = L.blurb;
  $("lensCoded").textContent = L.coded;
  const from = JSON.parse(JSON.stringify(cur)), to = L.pos, t0 = performance.now(), dur = reduce ? 0 : 800;
  if (anim) cancelAnimationFrame(anim);
  const step = now => {
    const k = dur ? Math.min(1, (now - t0) / dur) : 1, e = k < .5 ? 4*k*k*k : 1 - Math.pow(-2*k + 2, 3) / 2;
    for (const p of P) cur[p.id] = [from[p.id][0] + (to[p.id][0] - from[p.id][0]) * e, from[p.id][1] + (to[p.id][1] - from[p.id][1]) * e];
    render(); placeLabels();
    if (k < 1) anim = requestAnimationFrame(step);
  };
  anim = requestAnimationFrame(step);
  select(sel);
  renderLensTable();
}
const lb = $("lensBtns");
SME.LENSES.forEach(L => { const b = document.createElement("button"); b.className = "btn"; b.dataset.id = L.id; b.textContent = L.label; b.setAttribute("aria-pressed","false"); b.onclick = () => setLens(L); lb.appendChild(b); });

const STAGES = ["Good to users", "Squeezing users for business customers", "Squeezing everyone for shareholders"];
function lensCoding(p){
  const T = SME.TRAITS, fmt = k => `${T[k].name} ${p.traits[k]}/4`;
  switch (lens.id) {
    case "inn": return `${fmt("persist")} · ${fmt("gov")} · ${fmt("exit")}`;
    case "boyd": return `${fmt("bound")} · ${fmt("conflict")}`;
    case "zub": return `Doctorow stage ${p.doctorow.toFixed(1)}/3 · ${fmt("extract")}`;
    case "ill": return `${fmt("gov")} · ${fmt("exit")}`;
    case "mcl": return "Hand-placed";
    default: return CL[p.cluster].name;
  }
}
function select(id){
  sel = id; const p = byId[id];
  for (const k in nodes) nodes[k].g.classList.toggle("sel", k === id);
  const u = p.users, src = SME.SOURCES[u.src];
  $("detail").innerHTML = `<div class="cluster-tag eyebrow"><i class="swatch" style="background:${cv(id)}"></i>${CL[p.cluster].name}</div>
   <h3>${esc(p.name)}</h3>
   <dl class="kv">
    <dt>Users</dt><dd>${esc(u.label)} <span class="muted small">(${esc(SME.kindLabel[u.kind])}, ${esc(u.date)}${src ? `; <a href="${esc(src.url)}" target="_blank" rel="noopener">source</a>` : ""})</span></dd>
    <dt>Coded as</dt><dd>${esc(lensCoding(p))} <a class="cite" href="method.html#traits">coding table</a></dd>
    <dt>Doctorow</dt><dd>${STAGES[Math.min(2, Math.floor(p.doctorow))]}. <span class="muted small">${esc(p.doctorowWhy)}</span></dd>
    <dt>Reverses into</dt><dd>${esc(p.tetrad.v)}</dd>
   </dl>`;
}
function renderLensTable(){
  const rows = P.slice().sort((a, b) => a.name.localeCompare(b.name)).map(p => {
    const [x, y] = lens.pos[p.id];
    return `<tr><td>${esc(p.name)}</td><td>${esc(CL[p.cluster].short)}</td><td class="num">${Math.round(x)}</td><td class="num">${Math.round(y)}</td><td>${esc(lensCoding(p))}</td></tr>`;
  }).join("");
  $("lensTable").innerHTML = `<table><thead><tr><th>Platform</th><th>Cluster</th><th class="num">x</th><th class="num">y</th><th>Basis</th></tr></thead><tbody>${rows}</tbody></table>`;
  $("lensTableSum").textContent = `Positions under the ${lens.label} lens as a table`;
}

/* ---------- Plate 2: drift ---------- */
const ROWS = ["tt","yt","ig","fb","x","th","bs","md","rd","tw","dc","sc","wa","tg","sg","pi","li"];
const dsvg = $("driftSvg");
const DL = 110, DR = 30, DT = 34, RH = 29;
const dx = v => DL + (760 - DL - DR) * v / 100;
el("text", { x:dx(0), y:20, class:"axlabel", "text-anchor":"start" }, dsvg).textContent = "← You choose (follows, chronology)";
el("text", { x:dx(100), y:20, class:"axlabel", "text-anchor":"end" }, dsvg).textContent = "A model chooses (ranked feed) →";
el("line", { x1:dx(50), x2:dx(50), y1:DT-6, y2:DT+RH*ROWS.length, class:"axis", "stroke-dasharray":"2 4" }, dsvg);
const drows = {};
ROWS.forEach((id, i) => {
  const y = DT + i * RH + RH / 2;
  el("line", { x1:dx(0), x2:dx(100), y1:y, y2:y, class:"axis" }, dsvg);
  const lab = el("text", { x:DL-12, y:y+4, class:"dotlabel", "text-anchor":"end" }, dsvg); lab.textContent = byId[id].name.replace(" (formerly Twitter)", "");
  const trail = el("line", { y1:y, y2:y, stroke:cv(id), "stroke-width":4, "stroke-opacity":".3", "stroke-linecap":"round" }, dsvg);
  const dot = el("circle", { cy:y, r:8, fill:cv(id) }, dsvg);
  drows[id] = { lab, trail, dot };
});
function driftVal(id, yr){
  const k = Object.keys(SME.DRIFT[id]).map(Number).sort((a, b) => a - b);
  if (yr < k[0]) return null;
  for (let i = 0; i < k.length - 1; i++) if (yr <= k[i+1]) { const f = (yr - k[i]) / (k[i+1] - k[i]); return SME.DRIFT[id][k[i]] + (SME.DRIFT[id][k[i+1]] - SME.DRIFT[id][k[i]]) * f; }
  return SME.DRIFT[id][k[k.length - 1]];
}
const yr = $("yearRange"), yo = $("yearOut"), ev = $("driftEvent");
function drawDrift(y){
  yo.textContent = Math.floor(y);
  const evs = SME.DRIFT_EVENTS.filter(e => e.year <= y);
  const last = evs[evs.length - 1];
  ev.innerHTML = last ? `${last.year}: ${esc(last.text)} ${SME.cites([].concat(last.src).map(k => [k]))}` : "Before ranked feeds became the norm.";
  for (const id of ROWS) { const v = driftVal(id, y), r = drows[id];
    if (v === null) { r.dot.setAttribute("opacity", 0); r.trail.setAttribute("opacity", 0); r.lab.setAttribute("opacity", .35); continue; }
    const k0 = Object.keys(SME.DRIFT[id]).map(Number).sort((a, b) => a - b)[0];
    r.dot.setAttribute("opacity", 1); r.trail.setAttribute("opacity", 1); r.lab.setAttribute("opacity", 1);
    r.dot.setAttribute("cx", dx(v)); r.trail.setAttribute("x1", dx(SME.DRIFT[id][k0])); r.trail.setAttribute("x2", dx(v)); }
}
yr.addEventListener("input", () => { stopPlay(); drawDrift(+yr.value); });
let playing = null; const pb = $("playBtn");
function stopPlay(){ if (playing) { cancelAnimationFrame(playing); playing = null; } pb.textContent = "▶ Play 2008–2026"; pb.setAttribute("aria-pressed","false"); }
pb.onclick = () => {
  if (playing) { stopPlay(); return; }
  if (reduce) { yr.value = 2026; drawDrift(2026); return; }
  let y = +yr.value >= 2026 ? 2008 : +yr.value, last = performance.now();
  pb.textContent = "❚❚ Pause"; pb.setAttribute("aria-pressed","true");
  const step = now => { y += (now - last) / 1000 * 2.2; last = now;
    if (y >= 2026) { y = 2026; yr.value = y; drawDrift(y); stopPlay(); return; }
    yr.value = y; drawDrift(y); playing = requestAnimationFrame(step); };
  playing = requestAnimationFrame(step);
};
drawDrift(2026);
$("driftTable").innerHTML = `<table><thead><tr><th>Platform</th>${[2008,2012,2016,2020,2026].map(y => `<th class="num">${y}</th>`).join("")}</tr></thead><tbody>${
  ROWS.map(id => `<tr><td>${esc(byId[id].name)}</td>${[2008,2012,2016,2020,2026].map(y => { const v = driftVal(id, y); return `<td class="num">${v === null ? "–" : Math.round(v)}</td>`; }).join("")}</tr>`).join("")}</tbody></table>`;

/* ---------- Clusters ---------- */
const host = $("clusterHost"), canvases = [];
SME.CLUSTER_TEXT.forEach(C => {
  const s = document.createElement("div"); s.className = "cluster"; s.id = "c-" + C.k;
  const v = `var(${CL[C.k].color})`;
  s.innerHTML = `<div class="stack" style="min-width:0">
     <div class="cluster-tag eyebrow"><i class="swatch" style="background:${v}"></i>${CL[C.k].name}</div>
     <h2 style="color:${v}">${esc(C.title)}</h2>
     <div class="chips">${C.ids.map(i => `<span class="chip" style="color:${v}">${esc(byId[i].name)}</span>`).join("")}</div>
     <p>${esc(C.thesis)}</p>
     <div>${C.reads.map(r => `<div class="reading"><div class="who">${esc(r[0])}<span class="cites">${SME.cites(r[1])}</span></div><p>${esc(r[2])}</p></div>`).join("")}</div>
     <p class="tension">${esc(C.tension)}</p>
   </div>
   <div class="topo"><canvas aria-label="Animated network shape: ${esc(C.title)}"></canvas><div class="cap plain">${esc(C.topoCap)}</div></div>`;
  host.appendChild(s);
  canvases.push({ cv:s.querySelector("canvas"), mode:C.topo, k:C.k });
});

function rnd(seed){ let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
function setupTopo(o, idx){
  const r = rnd(7 + idx * 13), N = [];
  const add = (x, y, g) => N.push({ x, y, g, ph:r() * 6.28 });
  if (o.mode === "star") { add(.5, .5, "hub"); for (let i = 0; i < 36; i++) { const a = i / 36 * 6.283 + r() * .1, d = .28 + r() * .16; add(.5 + Math.cos(a) * d, .5 + Math.sin(a) * d, "leaf"); } }
  if (o.mode === "cascade") for (let i = 0; i < 46; i++) add(.08 + r() * .84, .08 + r() * .84, "n");
  if (o.mode === "rooms") [[.28,.3],[.72,.3],[.3,.72],[.72,.72]].forEach((c, ci) => { for (let i = 0; i < 10; i++) { const a = r() * 6.28, d = r() * .13; add(c[0] + Math.cos(a) * d, c[1] + Math.sin(a) * d, ci); } });
  if (o.mode === "groups") [[.2,.22],[.5,.18],[.8,.25],[.25,.55],[.55,.5],[.82,.58],[.3,.84],[.68,.83]].forEach((c, ci) => { const n = 3 + Math.floor(r() * 4); for (let i = 0; i < n; i++) { const a = i / n * 6.28, d = .055; add(c[0] + Math.cos(a) * d, c[1] + Math.sin(a) * d, ci); } });
  if (o.mode === "grid") for (let i = 0; i < 20; i++) { const col = i % 5, row = Math.floor(i / 5); N.push({ x:r(), y:r(), tx:.08 + col * .175, ty:.08 + row * .225, g:"pin", h:.08 + r() * .1, ph:r() * 6.28 }); }
  const E = [];
  if (o.mode === "star") N.forEach((n, i) => { if (i) E.push([0, i]); });
  if (o.mode === "cascade") N.forEach((a, i) => N.forEach((b, j) => { if (j > i && Math.hypot(a.x - b.x, a.y - b.y) < .2) E.push([i, j]); }));
  if (o.mode === "rooms") { N.forEach((a, i) => N.forEach((b, j) => { if (j > i && a.g === b.g && r() < .35) E.push([i, j]); })); E.push([3, 15], [17, 27], [25, 36]); }
  if (o.mode === "groups") N.forEach((a, i) => N.forEach((b, j) => { if (j > i && a.g === b.g) E.push([i, j]); }));
  Object.assign(o, { N, E, t:0, pulses:[], r });
}
function drawTopo(o, dt){
  const c = o.cv, w = c.clientWidth; if (!w) return;
  const dpr = window.devicePixelRatio || 1;
  if (c.width !== Math.round(w * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(w * dpr); }
  const g = c.getContext("2d"), S = c.width; g.setTransform(1,0,0,1,0,0); g.clearRect(0, 0, S, S);
  const ac = SME.css(CL[o.k].color), ink = SME.css("--muted");
  const N = o.N, E = o.E; o.t += dt; const t = o.t, X = n => n.x * S, Y = n => n.y * S;
  g.lineWidth = dpr; g.strokeStyle = ink; g.globalAlpha = .28;
  E.forEach(([a, b]) => { g.beginPath(); g.moveTo(X(N[a]), Y(N[a])); g.lineTo(X(N[b]), Y(N[b])); g.stroke(); });
  g.globalAlpha = 1;
  if (!reduce) {
    if (o.mode === "star" && o.r() < dt * 6) o.pulses.push({ a:0, b:1 + Math.floor(o.r() * (N.length - 1)), p:0 });
    if (o.mode === "cascade" && !o.pulses.length && !o.lit && o.r() < dt * 1.2) { const s = Math.floor(o.r() * N.length); o.lit = new Set([s]); E.forEach(([a, b]) => { if (a === s) o.pulses.push({ a, b, p:0, gen:0 }); if (b === s) o.pulses.push({ a:b, b:a, p:0, gen:0 }); }); }
    if (o.mode === "rooms" && o.r() < dt * 5) { const e = E[Math.floor(o.r() * E.length)]; o.pulses.push({ a:e[0], b:e[1], p:0 }); }
    if (o.mode === "groups") {
      if (o.pulses.filter(p => p.fw).length < 1 && o.r() < dt * .9) { const a = Math.floor(o.r() * N.length), b = Math.floor(o.r() * N.length); if (N[a].g !== N[b].g) o.pulses.push({ a, b, p:0, fw:true }); }
      if (o.r() < dt * 4) { const e = E[Math.floor(o.r() * E.length)]; o.pulses.push({ a:e[0], b:e[1], p:0 }); }
    }
  }
  const keep = [];
  o.pulses.forEach(pu => {
    pu.p += dt * (pu.fw ? .55 : 1.4);
    if (pu.p < 1) { keep.push(pu);
      const A = N[pu.a], B = N[pu.b], x = X(A) + (X(B) - X(A)) * pu.p, y = Y(A) + (Y(B) - Y(A)) * pu.p;
      if (pu.fw) { g.strokeStyle = ac; g.setLineDash([4*dpr, 4*dpr]); g.globalAlpha = .6; g.beginPath(); g.moveTo(X(A), Y(A)); g.lineTo(x, y); g.stroke(); g.setLineDash([]); g.globalAlpha = 1; }
      g.fillStyle = ac; g.beginPath(); g.arc(x, y, (pu.fw ? 4 : 3) * dpr, 0, 6.283); g.fill();
    } else if (o.mode === "cascade" && pu.gen < 3 && o.lit && !o.lit.has(pu.b)) {
      o.lit.add(pu.b);
      E.forEach(([a, b]) => { const nb = a === pu.b ? b : b === pu.b ? a : -1; if (nb >= 0 && !o.lit.has(nb) && o.r() < .55) keep.push({ a:pu.b, b:nb, p:0, gen:pu.gen + 1 }); });
    }
  });
  o.pulses = keep;
  if (o.mode === "cascade" && !keep.length && o.lit) { o.fade = (o.fade || 0) + dt; if (o.fade > .8) { o.lit = null; o.fade = 0; } }
  N.forEach((n, i) => {
    if (n.g === "pin") { const k = reduce ? 1 : Math.min(1, (Math.sin(t * .5 + n.ph) * .5 + .5) * 1.6);
      const x = (n.x + (n.tx - n.x) * k) * S, y = (n.y + (n.ty - n.y) * k) * S;
      g.fillStyle = ac; g.globalAlpha = .25 + .55 * k; g.fillRect(x, y, .14 * S, n.h * S); g.globalAlpha = 1; return; }
    let rad = 4 * dpr, f = ac;
    if (n.g === "hub") rad = 13 * dpr + (reduce ? 0 : Math.sin(t * 3) * 2 * dpr);
    if (o.mode === "cascade") { const on = o.lit && o.lit.has(i); f = on ? ac : ink; rad = (on ? 5 : 3.5) * dpr; }
    if (o.mode === "star" && n.g === "leaf") { f = ink; rad = 3.5 * dpr; }
    g.fillStyle = f; g.beginPath(); g.arc(X(n), Y(n), rad, 0, 6.283); g.fill();
  });
  if (o.mode === "groups") { const gs = {}; N.forEach(n => (gs[n.g] = gs[n.g] || []).push(n)); g.strokeStyle = ac; g.globalAlpha = .35;
    Object.values(gs).forEach(grp => { const cx = grp.reduce((s, n) => s + n.x, 0) / grp.length, cy = grp.reduce((s, n) => s + n.y, 0) / grp.length; g.beginPath(); g.arc(cx * S, cy * S, .09 * S, 0, 6.283); g.stroke(); }); g.globalAlpha = 1; }
  if (o.mode === "star") { g.fillStyle = SME.css("--ink"); g.font = `600 ${10 * dpr}px ${SME.css("--mono")}`; g.textAlign = "center"; g.fillText("MODEL", .5 * S, .5 * S - 20 * dpr); }
}
canvases.forEach(setupTopo);
const visible = new Set();
const io = ("IntersectionObserver" in window) ? new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target))) : null;
canvases.forEach(o => { if (io) io.observe(o.cv); else visible.add(o.cv); });
let lastT = performance.now();
function loop(now){ const dt = Math.min(.05, (now - lastT) / 1000); lastT = now;
  canvases.forEach(o => { if (visible.has(o.cv) || !o.drawn) { drawTopo(o, dt); o.drawn = true; } });
  if (!reduce) requestAnimationFrame(loop); }
requestAnimationFrame(loop);
window.addEventListener("resize", () => canvases.forEach(o => drawTopo(o, 0)));
if (window.matchMedia) { const mq = window.matchMedia("(prefers-color-scheme: dark)"); if (mq.addEventListener) mq.addEventListener("change", () => canvases.forEach(o => drawTopo(o, 0))); }

/* ---------- Plate 3: tetrads ---------- */
const tb = $("tetBtns");
function showTet(id){
  tb.querySelectorAll(".btn").forEach(b => b.setAttribute("aria-pressed", b.dataset.id === id));
  const qs = document.querySelectorAll(".quad"); qs.forEach(q => q.classList.add("out"));
  setTimeout(() => { qs.forEach(q => { q.querySelector("p").textContent = byId[id].tetrad[q.dataset.k]; q.classList.remove("out"); });
    const c = $("tetCenter"); c.textContent = byId[id].name.replace(" (formerly Twitter)", ""); c.style.background = cv(id); }, reduce ? 0 : 220);
}
ROWS.forEach(id => { const b = document.createElement("button"); b.className = "btn"; b.dataset.id = id; b.textContent = byId[id].name.replace(" (formerly Twitter)", ""); b.onclick = () => showTet(id); tb.appendChild(b); });

/* ---------- Plate 4: Doctorow ---------- */
const ds = $("docSvg");
const QL = 110, QR = 24, QT = 60, QH = 30, qx = v => QL + (760 - QL - QR) * v / 3;
[["Stage 1","Good to users"],["Stage 2","Squeeze users for business"],["Stage 3","Squeeze all for shareholders"]].forEach((b, i) => {
  el("rect", { x:qx(i), y:QT-8, width:qx(1)-qx(0), height:QH*P.length+8, fill:"var(--paper)", "fill-opacity":i % 2 ? 0 : .55 }, ds);
  el("text", { x:qx(i)+8, y:22, class:"axlabel" }, ds).textContent = b[0].toUpperCase();
  el("text", { x:qx(i)+8, y:38, class:"axlabel" }, ds).textContent = b[1];
});
const DOC = P.slice().sort((a, b) => a.doctorow - b.doctorow);
DOC.forEach((p, i) => { const y = QT + i * QH + QH / 2;
  el("line", { x1:qx(0), x2:qx(3), y1:y, y2:y, class:"axis" }, ds);
  el("text", { x:QL-12, y:y+4, class:"dotlabel", "text-anchor":"end" }, ds).textContent = p.name.replace(" (formerly Twitter)", "");
  const ln = el("line", { x1:qx(0), x2:qx(p.doctorow), y1:y, y2:y, stroke:cv(p.id), "stroke-width":3, "stroke-opacity":.4 }, ds);
  const c = el("circle", { cx:qx(p.doctorow), cy:y, r:7, fill:cv(p.id) }, ds);
  const tt = el("title", {}, c); tt.textContent = `${p.name}: ${p.doctorowWhy}`;
  p._doc = { ln, c };
});
function growDoc(){ const t0 = performance.now(), dur = 1200;
  const f = now => { const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
    DOC.forEach((p, i) => { const kk = Math.max(0, Math.min(1, e * 1.3 - i * .015)), x = qx(p.doctorow * kk); p._doc.ln.setAttribute("x2", x); p._doc.c.setAttribute("cx", x); });
    if (k < 1) requestAnimationFrame(f); };
  requestAnimationFrame(f); }
if (io && !reduce) { const o2 = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { growDoc(); o2.disconnect(); } }), { threshold:.35 }); o2.observe(ds); }
$("docTable").innerHTML = `<table><thead><tr><th>Platform</th><th class="num">Stage</th><th>Reasoning</th></tr></thead><tbody>${
  DOC.slice().reverse().map(p => `<tr><td>${esc(p.name)}</td><td class="num">${p.doctorow.toFixed(1)}</td><td>${esc(p.doctorowWhy)}</td></tr>`).join("")}</tbody></table>`;

/* ---------- Thinkers ---------- */
const sb = $("stanceBtns"), tg = $("tgrid");
function showTh(s){
  sb.querySelectorAll(".btn").forEach(b => b.setAttribute("aria-pressed", b.textContent === s));
  tg.innerHTML = SME.THINKERS.filter(t => s === "All" || t.s === s).map(t => `<div class="tcard"><div class="tags"><span class="tag">${t.s}</span><span class="tag">${t.e}</span></div>
    <h3>${esc(t.n)}</h3><div class="works">${t.refs.map(k => `<a class="cite" href="method.html#ref-${k}">${esc(SME.REFS[k].t)} (${SME.REFS[k].y})</a>`).join("")}</div><p>${esc(t.d)}</p></div>`).join("");
}
["All","Ecologist","Critic","Ethnographer","Optimist"].forEach(s => { const b = document.createElement("button"); b.className = "btn"; b.textContent = s; b.onclick = () => showTh(s); sb.appendChild(b); });

/* ---------- Limits ---------- */
$("limits").innerHTML = SME.LIMITS.map(([h, t]) => `<li><strong>${esc(h)}</strong> ${esc(t)}</li>`).join("");

/* init */
setLens(SME.LENSES[0]); select("tt"); showTet("tt"); showTh("All");
})();
