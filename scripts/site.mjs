import { copyFileSync, mkdirSync, rmSync, writeFileSync } from "node:fs";

rmSync("site", { recursive: true, force: true });
mkdirSync("site", { recursive: true });
copyFileSync("demo/main.js", "site/main.js");

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Kinshu</title>
  <script type="importmap">
  {
    "imports": {
      "@johnmorrisdotca/kinshu": "../dist/index.js",
      "@johnmorrisdotca/hata/element/define": "../node_modules/@johnmorrisdotca/hata/dist/element-define.js",
      "@johnmorrisdotca/chizu/element/define": "../node_modules/@johnmorrisdotca/chizu/dist/element-define.js",
      "@johnmorrisdotca/kuni": "../node_modules/@johnmorrisdotca/kuni/dist/index.js"
    }
  }
  </script>
  <style>
    body { margin: 0; font: 16px/1.45 "Iowan Old Style", Palatino, Georgia, serif; color: #1c1915; background: #f6f1e7; }
    main { max-width: 880px; margin: 0 auto; padding: 32px 20px 64px; }
    h1 { font-weight: 600; font-size: 32px; margin: 0 0 8px; }
    .lead { margin: 0 0 20px; }
    label { display: block; margin: 10px 0; }
    [hidden] { display: none !important; }
    select, input, button { font: inherit; }
    select, input { padding: 6px 8px; }
    .mode { display: flex; gap: 8px; margin-bottom: 12px; }
    button[aria-pressed="true"] { background: #214337; color: #f6f1e7; }
    .choices { display: flex; flex-wrap: wrap; gap: 8px; margin: 8px 0 12px; }
    .choices button { padding: 8px 12px; }
    .choices button[data-mark="right"] { background: #214337; color: #f6f1e7; }
    .choices button[data-mark="wrong"] { background: #8a3b3b; color: #f6f1e7; }
    .timeline { list-style: none; padding: 0; margin: 8px 0 12px; }
    .timeline li { padding: 4px 0; border-top: 1px solid #e4dccb; }
    .mast { display: flex; align-items: center; flex-wrap: wrap; gap: 12px 16px; margin: 4px 0 12px; }
    .mast h2 { margin: 0; font-size: 32px; font-weight: 600; line-height: 1.1; }
    .names { flex: 1 1 160px; min-width: 0; }
    .mast p { margin: 4px 0 0; color: #5c564c; }
    .controls { margin-left: auto; display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px 16px; max-width: 100%; }
    .controls label { display: flex; align-items: center; gap: 8px; margin: 0; min-width: 0; max-width: 100%; }
    .controls select, .controls input { max-width: 100%; }
    .controls input[type="number"] { width: 6rem; }
    .record h3 { margin: 18px 0 0; font-size: 13px; font-weight: 600; color: #5c564c; }
    .pieces { list-style: none; padding: 0; margin: 0; }
    .pieces li { display: flex; justify-content: space-between; gap: 16px; padding: 7px 0; border-top: 1px solid #e4dccb; }
    .pieces .when { color: #5c564c; text-align: right; }
    .story { margin: 12px 0 0; }
    chizu-map { display: block; width: 100%; height: 360px; margin: 0 0 16px; background: #fff; border: 1px solid #e4dccb; }
    .note { color: #5c564c; }
    @media (max-width: 640px) {
      .mast h2 { font-size: 26px; }
      .controls { margin-left: 0; width: 100%; justify-content: flex-start; }
      .controls label { width: 100%; }
    }
  </style>
</head>
<body>
  <main>
    <h1>Kinshu</h1>
    <p class="lead">Where a currency is legal tender, and the notes and coins that make an amount.</p>
    <div id="app"></div>
  </main>
  <script type="module" src="./main.js?v=16"></script>
</body>
</html>
`;

writeFileSync("site/index.html", html);
console.log("wrote site/");
