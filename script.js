const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)],
  cl = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
let i = 0;
const h = $("#h1");
(function w(n) {
  [...n.childNodes].forEach((c) => {
    if (c.nodeType === 3) {
      const f = document.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach((t) => {
        if (!t.trim()) {
          f.append(t);
          return;
        }
        const s = document.createElement("span");
        s.className = "w";
        s.innerHTML = '<i style="--i:' + i++ + '">' + t + "</i>";
        f.append(s);
      });
      c.replaceWith(f);
    } else w(c);
  });
})(h);
$$(".row").forEach(
  (r) =>
    (r.querySelector("button").onclick = () => {
      const o = r.classList.contains("on");
      $$(".row").forEach((x) => {
        x.classList.remove("on");
        x.querySelector("button").setAttribute("aria-expanded", "false");
      });
      if (!o) {
        r.classList.add("on");
        r.querySelector("button").setAttribute("aria-expanded", "true");
      }
    }),
);
const testimonialsMarquee = $(".testimonials-marquee");
const testimonialGroup = testimonialsMarquee.querySelector(".testimonials-group");
const testimonialCopy = testimonialGroup.cloneNode(true);
testimonialCopy.setAttribute("aria-hidden", "true");
testimonialGroup.after(testimonialCopy);
testimonialGroup.querySelectorAll(".c").forEach((card) => {
  const quote = card.querySelector("q");
  const author = card.querySelector(".c > span");
  const truncated = quote.scrollHeight > quote.clientHeight + 1;
  if (!truncated) return;

  const more = document.createElement("span");
  more.className = "c-more";
  more.textContent = "Ler comentário";
  card.classList.add("is-truncated");
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-expanded", "false");
  author.before(more);

  const toggleCard = () => {
    const expanded = card.classList.toggle("is-expanded");
    if (expanded) {
      testimonialGroup.querySelectorAll(".c.is-expanded").forEach((other) => {
        if (other === card) return;
        other.classList.remove("is-expanded");
        other.setAttribute("aria-expanded", "false");
        other.querySelector(".c-more").textContent = "Ler comentário";
      });
    }
    card.setAttribute("aria-expanded", String(expanded));
    more.textContent = expanded ? "Mostrar menos" : "Ler comentário";
    testimonialsMarquee.classList.toggle("has-expanded-card", expanded);
  };

  card.addEventListener("click", toggleCard);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCard();
    }
    if (event.key === "Escape" && card.classList.contains("is-expanded")) {
      card.classList.remove("is-expanded");
      card.setAttribute("aria-expanded", "false");
      more.textContent = "Ler comentário";
      testimonialsMarquee.classList.remove("has-expanded-card");
      card.focus();
    }
  });
});
$("#f").onsubmit = (e) => {
  e.preventDefault();
  const d = new FormData(e.target);
  open(
    "https://wa.me/554899743090?text=" +
      encodeURIComponent(
        "Olá, Dr. Warley! Sou " +
          d.get("n") +
          " e quero agendar uma avaliação de " +
          d.get("p") +
          ".",
      ),
    "_blank",
  );
};
const lns = $$(".ln"),
  L = lns.map((p) => p.getTotalLength());
lns.forEach((p, k) => (p.style.strokeDasharray = L[k]));
const prog = (el, vh) => {
  const r = el.getBoundingClientRect();
  return cl(-r.top / (r.height - vh));
};
const effectsToggle = $("#effects-toggle");
let effectsEnabled = true;
function clearScrollEffects() {
  $$(".blob").forEach((blob) => blob.style.removeProperty("transform"));
  lns.forEach((path) => {
    path.style.removeProperty("stroke-dashoffset");
    path.style.removeProperty("transform");
  });
  $("#pimg").style.removeProperty("transform");
  $("#lt").style.removeProperty("clip-path");
  $("#ring").style.removeProperty("transform");
  $("#ring").style.removeProperty("opacity");
  $("#dk").style.removeProperty("transform");
  $("#dk").style.removeProperty("opacity");
  $("#arch").style.removeProperty("transform");
  $("#fl").style.removeProperty("height");
  $("#nav").classList.remove("s");
  $$(".s").forEach((step) => step.classList.remove("on"));
}
function t() {
  if (!effectsEnabled) {
    clearScrollEffects();
    return;
  }

  const y = scrollY,
    vh = innerHeight,
    vw = innerWidth,
    H = document.documentElement.scrollHeight - vh,
    pg = y / H;
  $("#nav").classList.toggle("s", y > 40);
  $$(".blob").forEach(
    (b, k) =>
      (b.style.transform = `translate3d(${Math.sin(y / 500 + k * 2) * 60}px,${-y * (0.18 + k * 0.1)}px,0) scale(${1 + pg * 0.5})`),
  );
  lns.forEach((p, k) => {
    p.style.strokeDashoffset = L[k] * (1 - cl(pg * 1.6 - k * 0.2 + 0.05));
    p.style.transform = `translateY(${-y * 0.04 * (k + 1)}px)`;
  });
  $("#pimg").style.transform = `translateY(${y * 0.08}px) scale(${1 + y / 5000})`;
  const p = prog($("#pr"), vh),
    R = Math.hypot(vw, vh) * 1.05,
    r = cl(p * 1.25) * R;
  $("#lt").style.clipPath = `circle(${r}px at 50% 100%)`;
  const rg = $("#ring");
  rg.style.transform = `translateY(50px) scale(${Math.max(r, 0) / 50})`;
  rg.style.opacity = p > 0 && p < 0.82 ? 1 : 0;
  $("#dk").style.transform = `translateY(${-p * 60}px)`;
  $("#dk").style.opacity = 1 - p * 0.8;
  const a = $("#arch").getBoundingClientRect();
  $("#arch").style.transform = `translateY(${(a.top - vh / 2) * -0.06}px)`;
  const sb = $("#steps"),
    sr = sb.getBoundingClientRect(),
    f = cl((vh * 0.6 - sr.top) / sr.height);
  $("#fl").style.height = (sr.height - 16) * f + "px";
  $$(".s").forEach((s) => s.classList.toggle("on", s.getBoundingClientRect().top < vh * 0.6));
}
effectsToggle.addEventListener("click", () => {
  effectsEnabled = !effectsEnabled;
  document.body.classList.toggle("effects-off", !effectsEnabled);
  document.documentElement.classList.toggle("effects-off", !effectsEnabled);
  effectsToggle.setAttribute("aria-pressed", String(effectsEnabled));
  effectsToggle.setAttribute(
    "aria-label",
    effectsEnabled ? "Desativar efeitos visuais" : "Ativar efeitos visuais",
  );
  effectsToggle.textContent = effectsEnabled ? "Efeitos: ligados" : "Efeitos: desligados";
  t();
});
let tk = 0;
addEventListener(
  "scroll",
  () => {
    cancelAnimationFrame(tk);
    tk = requestAnimationFrame(t);
  },
  { passive: true },
);
addEventListener("resize", t);
t();
