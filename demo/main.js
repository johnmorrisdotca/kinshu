import "@johnmorrisdotca/chizu/element/define";
import "@johnmorrisdotca/hata/element/define";
import { country } from "@johnmorrisdotca/kuni";
import {
  bitcoinLaws,
  cashBreakdown,
  currencies,
  currenciesOf,
  fromMinor,
  issueStanding,
  issues,
  noteCensus,
  quote,
  redenominations,
  tender,
  tenures,
  withdrawn,
} from "@johnmorrisdotca/kinshu";

const root = document.querySelector("#app");
const list = currencies();
const TOP = ["USD", "EUR", "JPY", "GBP", "CAD", "CNY", "AUD", "CHF"];
const byCode = new Map(list.map((item) => [item.code, item]));
const LAW_STATUS = {
  tender: "Legal tender",
  permitted: "Permitted",
  restricted: "Restricted",
  banned: "Banned",
};

const currencySelect = document.createElement("select");

function optionFor(item) {
  const option = document.createElement("option");
  option.value = item.code;
  const mark = quote(item.code)?.cash === null ? "" : " · cash";
  option.textContent = `${item.code} ${item.name.en}${mark}`;
  return option;
}

function group(label, items) {
  const box = document.createElement("optgroup");
  box.label = label;
  for (const item of items) box.append(optionFor(item));
  return box;
}

currencySelect.append(
  group(
    "Common",
    TOP.map((code) => byCode.get(code)).filter(Boolean),
  ),
  group("All", list),
);
currencySelect.value = "JPY";

const amount = document.createElement("input");
amount.type = "number";
amount.value = "10000";
amount.min = "0";
amount.step = "any";

const cashButton = button("Cash");
const lawButton = button("Bitcoin");
const quizButton = button("Quiz");
const historyButton = button("History");
const modeBar = document.createElement("div");
modeBar.className = "mode";
modeBar.append(cashButton, lawButton, quizButton, historyButton);

const mast = document.createElement("header");
mast.className = "mast";
const mastFlag = document.createElement("hata-flag");
mastFlag.setAttribute("shape", "4:3");
mastFlag.setAttribute("size", "72");
const mastTitle = document.createElement("h2");
const mastDeck = document.createElement("p");
const mastNames = document.createElement("div");
mastNames.className = "names";
mastNames.append(mastTitle, mastDeck);
const yearInput = document.createElement("input");
yearInput.type = "number";
yearInput.min = "1600";
yearInput.max = "2100";
yearInput.value = "1980";
const currencyLabel = labelled("Currency", currencySelect);
const amountLabel = labelled("Amount", amount);
const yearLabel = labelled("Year", yearInput);
const mastControls = document.createElement("div");
mastControls.className = "controls";
mastControls.append(currencyLabel, amountLabel, yearLabel);
mast.append(mastFlag, mastNames, mastControls);

const quizBox = document.createElement("div");
quizBox.className = "quiz";
quizBox.hidden = true;
const quizChoices = document.createElement("div");
quizChoices.className = "choices";
const quizNext = button("Next question");
quizBox.append(quizChoices, quizNext);

const historyBody = document.createElement("div");
historyBody.className = "record";
historyBody.hidden = true;

const result = document.createElement("p");
result.setAttribute("aria-live", "polite");
const map = document.createElement("chizu-map");
map.setAttribute("region", "world");
map.setAttribute("theme", "light");
map.setAttribute("capital", "off");
map.setAttribute("selectable", "off");
map.options = { fit: false };
const lawNote = document.createElement("p");
lawNote.className = "story";
lawNote.hidden = true;
const note = document.createElement("p");
note.className = "note";

const stage = document.createElement("div");
stage.className = "stage";
stage.append(map, result, quizBox, historyBody, lawNote, note);
root.append(modeBar, mast, stage);

let mode = "cash";
let pointed = null;
let pressed = null;
let paintCodes = [];
let asked = 0;
let correctCount = 0;
let lastAsked = null;
let answered = false;
let historyCountry = null;
let lawCountry = null;

const moneyNames = new Intl.DisplayNames(["en"], { type: "currency" });

function button(text) {
  const el = document.createElement("button");
  el.type = "button";
  el.textContent = text;
  return el;
}

function labelled(text, control) {
  const label = document.createElement("label");
  label.append(document.createTextNode(`${text} `), control);
  return label;
}

function placeName(code) {
  return country(code)?.name.en ?? code;
}

function primary(codes) {
  return codes.slice().sort((a, b) => tender(a).length - tender(b).length || a.localeCompare(b))[0];
}

function ordered(codes) {
  const main = primary(codes);
  return [main, ...codes.filter((code) => code !== main)];
}

function uses(codes) {
  const names = ordered(codes).map((code) => byCode.get(code)?.name.en ?? code);
  if (names.length === 1) return `the ${names[0]}`;
  const last = names[names.length - 1];
  return `the ${names.slice(0, -1).join(", the ")} and the ${last}`;
}

function setHeading(title, deck, countryCode) {
  if (countryCode) {
    mastFlag.hidden = false;
    mastFlag.setAttribute("code", countryCode);
  } else {
    mastFlag.hidden = true;
    mastFlag.removeAttribute("code");
  }
  mastTitle.textContent = title;
  mastDeck.hidden = deck === "";
  mastDeck.textContent = deck;
}

function setResult(text) {
  result.textContent = text;
  result.hidden = text === "" || mode === "history" || mode === "law";
}

function exponentOf(code) {
  return quote(code)?.exponent ?? 2;
}

function paint(codes) {
  const next = codes.join(" ");
  paintCodes = codes;
  if (map.getAttribute("highlight") !== next) map.setAttribute("highlight", next);
}

function fitMap() {
  map.style.width = "100%";
  const says = map.shadowRoot?.querySelector(".czm-says");
  if (says) says.hidden = true;
}

function applyPaint(codes) {
  const want = new Set(codes);
  const svg = map.shadowRoot?.querySelector("svg");
  if (!svg) return;
  for (const node of svg.querySelectorAll(".cz-region")) {
    const on = want.has(node.dataset.code);
    node.classList.toggle("cz-tone-selected", on);
    if (on) node.dataset.tone = "selected";
    else node.removeAttribute("data-tone");
  }
}

function renderCash(code) {
  const places = [...tender(code)];
  const focus = pointed && places.includes(pointed) ? pointed : places.length === 1 ? places[0] : null;
  const money = byCode.get(code)?.name.en ?? code;
  if (focus) setHeading(placeName(focus), money, focus);
  else setHeading(money, `Legal tender in ${places.length} ${places.length === 1 ? "place" : "places"}.`, null);
  const value = Number(amount.value);
  const broken = Number.isFinite(value) ? cashBreakdown(value, code) : null;
  if (quote(code)?.cash === null || broken === null) {
    setResult(`${code} is legal tender in ${places.length} ${places.length === 1 ? "place" : "places"}. No cash file yet.`);
  } else {
    const exponent = exponentOf(code);
    const exact = `${broken.parts.sign}${broken.parts.whole}${broken.parts.fraction === null ? "" : `.${broken.parts.fraction}`}`;
    const pieces = broken.pieces.map((piece) => `${piece.count} × ${fromMinor(piece.minor, exponent)}`).join(", ");
    setResult(`${exact} exact. Cash amount ${fromMinor(broken.cashMinor, exponent)}. ${pieces}.`);
  }
  note.textContent = "Point at a country to show its currency. Coloured countries are where that currency is legal tender.";
}

function drawCash() {
  const code = currencySelect.value;
  pointed = null;
  paint([...tender(code)]);
  renderCash(code);
}

function showCountry(countryCode) {
  if (mode !== "cash") return;
  const codes = currenciesOf(countryCode);
  if (codes.length === 0) return;
  const code = primary(codes);
  if (countryCode === pointed && currencySelect.value === code) return;
  pointed = countryCode;
  currencySelect.value = code;
  paintCodes = [...tender(code)];
  applyPaint(paintCodes);
  renderCash(code);
  if (codes.length > 1) {
    const rest = codes.filter((item) => item !== code).map((item) => byCode.get(item)?.name.en ?? item);
    mastDeck.hidden = false;
    mastDeck.textContent = `${byCode.get(code)?.name.en}. Also legal tender: ${rest.join(", ")}.`;
  }
}

function countryAt(x, y) {
  const hit = map.shadowRoot?.elementFromPoint(x, y);
  const node = hit?.closest?.(".cz-region");
  if (!node || node.classList.contains("cz-inset")) return null;
  return node.dataset.code ?? null;
}

function moneyName(code) {
  try {
    return moneyNames.of(code) ?? code;
  } catch {
    return code;
  }
}

function historyYear() {
  return /^\d{4}$/.test(yearInput.value) ? yearInput.value : "1980";
}

function tenureCovers(row, year) {
  const start = `${year}-01-01`;
  const end = `${year}-12-31`;
  if (!row.tender) return false;
  if (row.from && row.from > end) return false;
  if (row.to && row.to < start) return false;
  return true;
}

const STANDINGS = [
  ["issued", "Still being made"],
  ["tender", "In use, no longer made"],
  ["honoured", "No longer legal tender, still honoured"],
  ["unknown", "No longer made"],
  ["before", "Not issued yet"],
  ["ended", "No longer legal tender"],
];

function spanText(issue) {
  if (issue.asOf) return `listed ${issue.asOf.slice(0, 4)}`;
  const end = issue.issuedTo ?? issue.tenderTo ?? "now";
  return issue.from ? `${issue.from} – ${end}` : end;
}

function addGroup(title, entries) {
  if (entries.length === 0) return;
  const heading = document.createElement("h3");
  heading.textContent = title;
  const items = document.createElement("ul");
  items.className = "pieces";
  for (const entry of entries) {
    const row = document.createElement("li");
    const name = document.createElement("span");
    name.textContent = entry.name;
    const when = document.createElement("span");
    when.className = "when";
    when.textContent = entry.when;
    if (entry.detail) row.title = entry.detail;
    row.append(name, when);
    items.append(row);
  }
  historyBody.append(heading, items);
}

function drawHistory(countryCode) {
  setResult("");
  const same = countryCode === historyCountry;
  historyCountry = countryCode;
  const year = historyYear();
  const rows = [...tenures(countryCode)].reverse();
  if (!same) paint([countryCode]);
  const active = rows.filter((row) => tenureCovers(row, year));
  const deck = active.length === 0
    ? `No tender currency covers ${year}.`
    : active.map((row) => `${moneyName(row.code)} in ${year}`).join(" · ");
  setHeading(placeName(countryCode), deck, countryCode);
  historyBody.replaceChildren();
  addGroup("Currencies", rows.map((row) => ({
    name: `${moneyName(row.code)} (${row.code})`,
    when: `${row.from ?? "…"} – ${row.to ?? "now"}${row.tender ? "" : " · not tender"}`,
  })));
  for (const [standing, title] of STANDINGS) {
    const entries = [];
    for (const row of active) {
      for (const issue of issues(row.code)) {
        if (issueStanding(issue, year) !== standing) continue;
        entries.push({
          name: active.length > 1 ? `${row.code} ${issue.name}` : issue.name,
          when: spanText(issue),
          detail: issue.note,
        });
      }
    }
    addGroup(title, entries);
  }
  const stories = [];
  for (const row of redenominations(countryCode)) {
    stories.push(`1 ${moneyName(row.to)} = ${row.ratio} ${moneyName(row.from)}, from ${row.on}. ${row.note}`);
  }
  for (const row of withdrawn(countryCode)) {
    stories.push(`${row.name}: legal tender ended ${row.on}. ${row.note}`);
  }
  const census = noteCensus(countryCode);
  if (census) stories.push(census.note);
  if (active.some((row) => issues(row.code).some((issue) => issue.asOf && issueStanding(issue, year) === "unlisted"))) {
    stories.push("Some notes and coins on the current list have no start year, so a past year leaves them out.");
  }
  if (stories.length === 0 && rows.length === 0) stories.push("CLDR has no currency spell for this place.");
  for (const text of stories) {
    const line = document.createElement("p");
    line.className = "story";
    line.textContent = text;
    historyBody.append(line);
  }
  note.textContent = "Point at a country. A year shows a note or coin only when a page gives its dates.";
}

function drawLaw(countryCode) {
  const laws = bitcoinLaws();
  const focus = laws.find((law) => law.country === countryCode) ?? laws[0] ?? null;
  lawCountry = focus?.country ?? null;
  paint(laws.map((law) => law.country));
  if (focus) {
    setHeading(placeName(focus.country), LAW_STATUS[focus.status] ?? focus.status, focus.country);
    lawNote.hidden = false;
    lawNote.textContent = focus.note;
  } else {
    setHeading("Bitcoin", "No law has been read.", null);
    lawNote.hidden = true;
    lawNote.textContent = "";
  }
  setResult("");
  note.textContent = "A country is coloured only when a primary source has been read. The other countries are not guessed.";
}

function focusLaw(countryCode) {
  if (!bitcoinLaws().some((law) => law.country === countryCode)) return;
  if (countryCode === lawCountry) return;
  drawLaw(countryCode);
}

function quizPool() {
  const seen = new Set();
  const places = [];
  for (const item of list) {
    for (const code of item.tender) {
      if (seen.has(code) || currenciesOf(code).length === 0) continue;
      seen.add(code);
      places.push(code);
    }
  }
  return places;
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    const hold = copy[index];
    copy[index] = copy[swap];
    copy[swap] = hold;
  }
  return copy;
}

function choiceCodes(correctCodes) {
  const banned = new Set(correctCodes);
  const common = TOP.filter((code) => !banned.has(code));
  const rest = list.map((item) => item.code).filter((code) => !banned.has(code) && !TOP.includes(code));
  const picked = [...shuffle(common), ...shuffle(rest)].slice(0, 3);
  return shuffle([primary(correctCodes), ...picked]);
}

function ask() {
  answered = false;
  const pool = quizPool();
  let countryCode = pool[Math.floor(Math.random() * pool.length)];
  if (pool.length > 1) {
    while (countryCode === lastAsked) countryCode = pool[Math.floor(Math.random() * pool.length)];
  }
  lastAsked = countryCode;
  paint([countryCode]);
  setHeading(placeName(countryCode), "Which currency is legal tender here?", countryCode);
  setResult(asked === 0 ? "" : `${correctCount} of ${asked}`);
  note.textContent = "The coloured country is the question. The answer colours every place that uses that currency.";
  quizChoices.replaceChildren();
  const codes = currenciesOf(countryCode);
  for (const code of choiceCodes(codes)) {
    const choice = button(`${code} ${byCode.get(code)?.name.en ?? code}`);
    choice.dataset.code = code;
    choice.addEventListener("click", () => grade(code, codes, countryCode));
    quizChoices.append(choice);
  }
}

function grade(picked, codes, countryCode) {
  if (answered || mode !== "quiz") return;
  answered = true;
  asked += 1;
  const right = codes.includes(picked);
  if (right) correctCount += 1;
  for (const choice of quizChoices.querySelectorAll("button")) {
    choice.disabled = true;
    if (codes.includes(choice.dataset.code)) choice.dataset.mark = "right";
    else if (choice.dataset.code === picked) choice.dataset.mark = "wrong";
  }
  const sentence = `${placeName(countryCode)} uses ${uses(codes)}.`;
  setHeading(placeName(countryCode), right ? `Correct. ${sentence}` : sentence, countryCode);
  setResult(`${correctCount} of ${asked}`);
  note.textContent = `${correctCount} of ${asked}`;
  paint([...tender(primary(codes))]);
}

function show(next) {
  mode = next;
  cashButton.setAttribute("aria-pressed", next === "cash" ? "true" : "false");
  lawButton.setAttribute("aria-pressed", next === "law" ? "true" : "false");
  quizButton.setAttribute("aria-pressed", next === "quiz" ? "true" : "false");
  historyButton.setAttribute("aria-pressed", next === "history" ? "true" : "false");
  currencyLabel.hidden = next !== "cash";
  amountLabel.hidden = next !== "cash";
  yearLabel.hidden = next !== "history";
  quizBox.hidden = next !== "quiz";
  historyBody.hidden = next !== "history";
  lawNote.hidden = next !== "law";
  if (next === "law") drawLaw(lawCountry);
  else if (next === "quiz") ask();
  else if (next === "history") drawHistory(historyCountry ?? "CA");
  else drawCash();
}

cashButton.addEventListener("click", () => show("cash"));
lawButton.addEventListener("click", () => show("law"));
quizButton.addEventListener("click", () => show("quiz"));
historyButton.addEventListener("click", () => show("history"));
yearInput.addEventListener("input", () => {
  if (mode === "history" && historyCountry) drawHistory(historyCountry);
});
quizNext.addEventListener("click", () => {
  if (mode === "quiz") ask();
});
currencySelect.addEventListener("change", () => {
  if (mode === "cash") drawCash();
});
amount.addEventListener("input", () => {
  if (mode === "cash") renderCash(currencySelect.value);
});
map.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  pressed = { x: event.clientX, y: event.clientY };
});
map.addEventListener("pointermove", (event) => {
  if (event.buttons !== 0) return;
  const code = countryAt(event.clientX, event.clientY);
  if (!code) return;
  if (mode === "history") {
    if (code !== historyCountry) drawHistory(code);
    return;
  }
  if (mode === "law") focusLaw(code);
  else if (mode === "cash") showCountry(code);
});
function pickCountry(event) {
  if (event.button !== 0) return;
  const code = countryAt(event.clientX, event.clientY);
  if (!code) return;
  if (mode === "history") drawHistory(code);
  else if (mode === "law") focusLaw(code);
  else if (mode === "cash") showCountry(code);
}

map.addEventListener("pointerup", (event) => {
  if (pressed === null) return;
  const moved = Math.hypot(event.clientX - pressed.x, event.clientY - pressed.y);
  pressed = null;
  if (moved > 5) return;
  pickCountry(event);
});
map.addEventListener("click", pickCountry);
map.addEventListener("chizu-select", (event) => {
  const code = event.detail?.code;
  if (!code) return;
  if (mode === "history") drawHistory(code);
  else if (mode === "law") focusLaw(code);
  else showCountry(code);
});
map.addEventListener("chizu-load", fitMap);
map.addEventListener("chizu-view", () => {
  fitMap();
  if (paintCodes.length > 0) applyPaint(paintCodes);
});
show("cash");
