/* Social Medium Ecology — shared helpers */
window.SME = window.SME || {};
(function(){
  "use strict";
  const SVGNS = "http://www.w3.org/2000/svg";
  SME.reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  SME.css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  SME.clusterVar = id => `var(${SME.CLUSTERS[SME.byId[id].cluster].color})`;
  SME.esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  /* SVG element helper. Theme colors passed as var(--x) go to inline style so they track the theme. */
  SME.svg = (tag, attrs = {}, parent) => {
    const e = document.createElementNS(SVGNS, tag);
    for (const k in attrs) {
      const v = String(attrs[k]);
      if ((k === "fill" || k === "stroke") && v.startsWith("var(")) e.style[k] = v;
      else e.setAttribute(k, v);
    }
    if (parent) parent.appendChild(e);
    return e;
  };

  /* Short author-date label from a reference */
  SME.refLabel = key => {
    const r = SME.REFS && SME.REFS[key];
    if (!r) return key;
    const parts = r.a.split(/,? and /);
    const first = parts[0].split(", ");
    const count = (first.length - 1) + (parts.length - 1);
    const lead = first[0];
    let a = lead;
    if (count >= 3) a = `${lead} et al.`;
    else if (count === 2) a = `${lead} and ${parts[parts.length-1].trim().split(" ").pop()}`;
    return `${a} ${r.y}`;
  };
  /* Linked citation list: [[key, locator], ...] */
  SME.cites = (list, base = "method.html") =>
    list.map(([k, loc]) => `<a class="cite" href="${base}#ref-${k}">(${SME.esc(SME.refLabel(k))}${loc ? ", " + SME.esc(loc) : ""})</a>`).join(" ");

  /* Full Chicago-style entry */
  SME.refFull = key => {
    const r = SME.REFS[key]; if (!r) return SME.esc(key);
    const title = r.article ? `“${SME.esc(r.t)}.”` : `<i>${SME.esc(r.t)}</i>.`;
    const link = r.url ? ` <a href="${SME.esc(r.url)}" target="_blank" rel="noopener">${SME.esc(r.url.replace(/^https?:\/\//,""))}</a>` : "";
    return `${SME.esc(r.a)}. ${r.y}. ${title} ${SME.esc(r.p)}.${link}`;
  };

  SME.kindLabel = { reported:"Company-reported", claimed:"Company claim", estimate:"Third-party estimate", proxy:"Different metric" };

  SME.storage = {
    get(k){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch(e){ return null; } },
    set(k,v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} },
    del(k){ try { localStorage.removeItem(k); } catch(e){} }
  };

  /* Fill any [data-asof] element with the data date */
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-asof]").forEach(el => { el.textContent = SME.AS_OF; });
  });
})();
