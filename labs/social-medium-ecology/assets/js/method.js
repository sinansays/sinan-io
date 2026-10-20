/* Social Medium Ecology — methods page */
(function(){
"use strict";
const P = SME.PLATFORMS, T = SME.TRAITS, F = SME.FORMATS, CL = SME.CLUSTERS, esc = SME.esc;
const $ = id => document.getElementById(id);

$("traitDefs").innerHTML = `<table><thead><tr><th>Trait</th><th>0 means</th><th>4 means</th></tr></thead><tbody>${
  Object.values(T).map(t => `<tr><td><b>${esc(t.name)}</b></td><td>${esc(t.lo)}</td><td>${esc(t.hi)}</td></tr>`).join("")}
  <tr><td><b>Formats</b></td><td colspan="2">How central each format is: ${Object.values(F).map(esc).join(", ")}</td></tr></tbody></table>`;

const tk = Object.keys(T), fk = Object.keys(F);
$("traitTable").innerHTML = `<table><thead><tr><th>Platform</th><th>Cluster</th>${tk.map(k => `<th class="num">${esc(T[k].name)}</th>`).join("")}${fk.map(k => `<th class="num">${esc(F[k])}</th>`).join("")}<th class="num">Doctorow</th></tr></thead><tbody>${
  P.map(p => `<tr><td>${esc(p.name)}</td><td>${esc(CL[p.cluster].short)}</td>${tk.concat(fk).map(k => `<td class="num">${p.traits[k]}</td>`).join("")}<td class="num">${p.doctorow.toFixed(1)}</td></tr>`).join("")}</tbody></table>`;

$("driftEvents").innerHTML = SME.DRIFT_EVENTS.map(e => `<li>${e.year}: ${esc(e.text)} ${SME.cites([].concat(e.src).map(k => [k]), "")}</li>`).join("");

$("dataTable").innerHTML = `<table><thead><tr><th>Platform</th><th>Owner</th><th>Launched</th><th>Users</th><th>Kind</th><th>As of</th><th>Source and notes</th></tr></thead><tbody>${
  P.map(p => { const u = p.users, s = SME.SOURCES[u.src];
    return `<tr><td>${esc(p.name)}</td><td>${esc(p.owner)}</td><td class="num">${p.launched}</td><td>${esc(u.label)}</td><td>${esc(SME.kindLabel[u.kind])}</td><td>${esc(u.date)}</td>
      <td>${s ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a>, ${esc(s.publisher)}, ${esc(s.date)}.` : ""}${u.note ? ` <span class="muted">${esc(u.note)}</span>` : ""}</td></tr>`; }).join("")}</tbody></table>`;

const keys = Object.keys(SME.REFS).sort((a, b) => {
  const A = SME.REFS[a], B = SME.REFS[b];
  return A.a.localeCompare(B.a, "en", { sensitivity:"base" }) || A.y - B.y;
});
$("bibList").innerHTML = keys.map(k => `<li id="ref-${esc(k)}">${SME.refFull(k)}</li>`).join("");

const url = location.href.replace(/method\.html.*$/, "");
$("citeText").textContent = `Sinanian, Michael. 2026. Social Medium Ecology: A Field Guide to Social Platforms through Media Theory. sinanLabs. Data as of ${SME.AS_OF}. ${url}`;

/* scroll to a cited reference after the list renders */
if (location.hash.startsWith("#ref-")) { const t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
})();
