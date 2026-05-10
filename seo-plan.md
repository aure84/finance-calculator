# SEO Audit — finance-fast.com
Date: 2026-04-26
GSC baseline (3 hónap): 1 kattintás, 284 megjelenés, átlagos pozíció: 61.7

---

## KRITIKUS PROBLÉMA: SPA + SSR hiánya

**A site React 19 SPA, Cloudflare Pages-en, SSR/prerendering nélkül.**

A Google JavaScript-alapú renderelést alkalmaz, de a crawler queue-ban késik — ez az oka a 61.7-es átlagpozíciónak és a 12 "Felfedezve – jelenleg nincs indexelve" oldalnak. A meta tagek (title, description, canonical) a `SEOMeta` komponensből csak JS futás után kerülnek a DOM-ba, ami azt jelenti, hogy a Google első-pass crawlerje üres `<title>`-t lát a `index.html`-ből: `"Free Financial Calculators — finance-fast.com"` minden egyes oldalon.

Ez azt is jelenti, hogy a canonical URL minden oldalnál helyesen van beállítva (dinamikusan `useLocation()`-ből), de csak JS futás után. Ha a Google nem rendereli az oldalt, az alapértelmezett title jelenik meg minden URL-en a SERP-ben.

**Nincs noindex probléma** — a robots.txt, az index.html és az oldalak egyike sem tartalmaz noindex direktívát. Ez jó hír.

---

## 1. TECHNIKAI AUDIT

### 1.1 SPA rendering — a fő probléma

A `SEOMeta` komponens (`src/components/SEOMeta.tsx`) `useEffect()`-ben fut, vagyis:
- Az `index.html`-ben lévő statikus `<title>` (`"Free Financial Calculators — finance-fast.com"`) minden URL-en azonos lesz az első crawl-nál.
- A description meta tag és canonical link szintén csak JS-futás után jelenik meg.
- Ha a Google cached/rendelt verziója nem futtatja a JS-t, az összes kalkulátor oldal ugyanolyan title-lel indexelődik.

Ez magyarázza az alacsony pozíciókat és a sok "Felfedezve – jelenleg nincs indexelve" státuszt: a Google látja az URL-t, de a tartalom nem differenciálható az alapoldaltól.

**Fix (két lehetőség):**

**A — Prerendering (ajánlott, kevés munkával jár):**
Vite plugin: `vite-plugin-prerender` vagy `@prerenderer/renderer-puppeteer`.
Ez build time renderel minden URL-t statikus HTML-lé — a GSC azonnal látná az egyedi title/meta tageket.

**B — Cloudflare Pages prerender worker:**
Cloudflare `_worker.js` HTML rewriting-gel: minden request esetén a megfelelő title/description injektálása a `<head>`-be URL-alapján, mielőtt a válasz visszamegy a crawlernek.

A legjobb megoldás az A opció (prerendering) — a legtöbb statikus site-hoz ez elegendő és nem igényel szerverinfrastruktúrát.

### 1.2 Blog post oldalak indexelési státusza

A BlogPostPage (`src/pages/BlogPostPage.tsx`) helyesen használja a SEOMeta-t:
```
title={`${post.title} | Finance Fast`}
description={post.description}
```
Ez működik, de szintén JS-függő. A 12 indexeletlen oldal valószínűleg blog posztok.

### 1.3 index.html statikus title

`/Volumes/SLT/Claude Code/finance-calculator/index.html` — a `<title>` tag:
```
Free Financial Calculators — finance-fast.com
```
Ez a fallback title, ami megjelenik JS nélkül. A Google indexelhet ezzel a title-lel minden aloldalt, ami duplicate title problémát okoz.

### 1.4 Sitemap — rendben

A `public/sitemap.xml` 23 URL-t tartalmaz, és hiánytalanul lefedi az összes kalkulátort és blog posztot. A robots.txt hivatkozik rá. Nincs probléma.

### 1.5 Canonical — feltételesen rendben

A SEOMeta komponens dinamikusan állítja a canonical-t `https://finance-fast.com${pathname}` formában. Ez helyes, de megint csak JS-függő.

---

## 2. TITLE / META AUDIT — top lekérdezések szerint

### 2.1 "apr calculator" — 14 megjelenés, 0 kattintás

**URL:** `/apr-calculator`
**Jelenlegi title:** `"APR Calculator — Finance Fast"` (30 karakter)
**Jelenlegi meta:** `"Calculate the true APR of any loan. Enter the loan amount, interest rate, term, and fees to find the Annual Percentage Rate and compare loan offers accurately."` — 161 karakter, 1-gyel túl hosszú.

**Problémák:**
- A title rövidnek tűnik, de a SERP-ben jó lehet. A valódi probléma a JS-függő rendering.
- A meta 161 karakteres — 1 karakterrel túllépi a 160-as limitet. A Google levágja.
- A "calculating apr" query (8 megjelenés) igényelne egy FAQ-t vagy tartalmi választ arra, hogyan számolják ki az APR-t — ez már megvan a FAQ szekcióban, de a meta description nem tartalmaz konkrét számot.

**Javasolt meta (158 karakter):**
`"Calculate the true APR of any loan. Enter amount, rate, term, and fees — get the Annual Percentage Rate instantly. Free, no sign-up required."`

### 2.2 "tax refund calculator" — 7 megjelenés

**URL:** `/tax-refund-calculator`
**Jelenlegi title:** `"Tax Refund Calculator 2026 — How Much Will I Get Back?"` (54 karakter)
**Jelenlegi meta:** `"Estimate your 2026 federal and state tax refund or amount owed. Enter your income, filing status, and withholding. Free, no sign-up required."` — 143 karakter, rendben.

Nincs probléma a title/meta-val. A "2026" évszám időben releváns. Ez rendben van.

### 2.3 "what are interest rates" — 5 megjelenés

Ez informális lekérdezés — valószínűleg a `/blog/what-is-interest-rate` blog post rangsorolja be.

**Jelenlegi blog title:** `"What Is APR and How Does It Affect Your Loan? | Finance Fast"` — nem pontos illeszkedés.

Ténylegesen a `what-is-interest-rate` slug létezik a sitemapban, de ennek a konkrét posztnak a tartalmát nem láttuk. Ellenőrizni kell, hogy az H1 és description illeszkedik-e a "what are interest rates" lekérdezésre.

### 2.4 "vat calculator" — 5 megjelenés, NINCS OLDAL?

A GSC adatok szerint nincs VAT Calculator oldal — de ez téves. A `VatPage.tsx` létezik (`/vat-calculator`), és a sitemap tartalmazza. A GSC-ben valószínűleg azért mutat 0 kattintást, mert az oldal nem indexelt (JS-rendering probléma).

A VAT oldal title/meta rendben van:
- Title: `"VAT Calculator — Add or Remove VAT Instantly | finance-fast.com"` (64 karakter — 4-gyel túl hosszú!)
- Meta: `"Add VAT to a net price or remove VAT from a gross price. Supports all standard VAT rates: 5%, 10%, 19%, 20%, 21%, 25%, 27%. Free and instant."` — 141 karakter, rendben.

**Title fix szükséges:** le kell 60 karakter alá csökkenteni.
Javasolt: `"VAT Calculator — Add or Remove VAT | finance-fast.com"` (53 karakter)

---

## 3. CONTENT GAP ELEMZÉS

### 3.1 "vat calculator" — oldal LÉTEZIK, csak nem indexelt

A `/vat-calculator` oldal jól megírt, FAQ schema van rajta, a meta description konkrét. A GSC megjelenések annak bizonyítékai, hogy a Google ismeri az URL-t (a sitemapból), de nem indexeli megfelelően (JS-rendering). Az oldal nem content gap — indexelési probléma.

### 3.2 Content, ami hiányzik

A sitemap és a lekérdezések alapján az alábbi témák nincsenek lefedve kalkulátorként:
- "income tax calculator" (általános) — jelenleg csak tax-refund és salary van
- "net pay calculator" — a salary calculator lefedi, de a URL/H1 nem ezt a szót tartalmazza
- "simple interest calculator" — compound interest van, de simple interest külön kalkulátor nincs

Rövid távon ezek nem prioritásak — a fő probléma az indexelés, nem a tartalomhiány.

---

## 4. BELSŐ LINKELÉS AUDIT

### 4.1 Kalkulátor → blog linkek

Minden vizsgált kalkulátor oldal (APR, TaxRefund, Mortgage, Salary, VAT) tartalmaz `RelatedCalculators` szekciót blog linkekkel. Ez rendben van.

### 4.2 Blog → kalkulátor linkek

A `BlogPostPage.tsx` a `post.relatedLinks` tömböt rendereli "Related Calculators" szekcióként. Ez is rendben van.

### 4.3 HomePage — nincs blog link

A `HomePage.tsx` csak a 13 kalkulátorkártyát jeleníti meg. Nincs link a blogra, nincs "Latest guides" szekció. Ez gyenge pont: a homepage link juice nem folyik a blog felé.

**Fix:** Adj hozzá egy "Latest Guides" szekciót a homepage aljára (3-4 kártya a legújabb blog posztokból), vagy egy egyszerű "Read our finance guides →" linket a blog indexre.

### 4.4 Kalkulátor → kalkulátor linkek

A RelatedCalculators komponens 2-3 kapcsolódó kalkulátort linkez. Ez meglévő, de a lefedettség esetenként gyér.

Példa: az APR oldal linkeli a Loan, Mortgage és Debt Payoff kalkulátorokat — ez jó.
A Salary oldal csak a Compound Interest kalkulátort linkeli — ez szegényes.

### 4.5 Blog → blog linkek

A blog posztokban nincs blog→blog belső linkek rendszer (csak blog→kalkulátor). Ez elveszített lehetőség: a "what-is-apr" cikk például nem linkeli a "how-loan-payment-is-calculated" cikket, pedig szorosan kapcsolódnak.

---

## PRIORITIZÁLT JAVÍTÁSI LISTA

| # | Feladat | Fájl | Hatás | Effort |
|---|---------|------|-------|--------|
| 1 | Prerendering beállítása (vite-plugin-prerender) | `vite.config.ts` + minden page URL | Kritikus — az összes indexelési probléma gyökere | 4-8 óra |
| 2 | APR meta description 1 karakterrel rövidítése | `src/pages/AprPage.tsx` line 43 | Apró, de kötelező | 5 perc |
| 3 | VAT title rövidítése 60 karakter alá | `src/pages/VatPage.tsx` line 42 | Apró, de kötelező | 5 perc |
| 4 | index.html fallback title frissítése | `index.html` line 11 | Javítja a JS-nélküli crawl megjelenést | 5 perc |
| 5 | Homepage → blog szekció hozzáadása | `src/pages/HomePage.tsx` | Belső linkelés javítása | 1 óra |
| 6 | Salary oldal Related Calculators bővítése | `src/pages/SalaryPage.tsx` RELATED tömb | Gyenge belső linkelés fix | 20 perc |
| 7 | Blog posztokban blog→blog linkek | `src/data/blogPosts.ts` relatedLinks | Topical authority erősítése | 2 óra |

---

## Összefoglaló

A site nincs technikai SEO szempontból blokkolva (nincs noindex, robots.txt rendben, sitemap rendben), de a React SPA architektúra miatt a Google JS-rendering queue-ban vár — ez az összes alacsony pozíció és "Felfedezve – nincs indexelve" státusz elsődleges oka.

**Az egyetlen kritikus teendő:** prerendering bekapcsolása. Minden más javítás (title hossz, belső linkek, meta description) csak utána érezteti hatását, mert addig az oldalak nem indexeltek megfelelően.
