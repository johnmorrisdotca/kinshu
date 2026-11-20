# Kinshu 金種

Currency identity, minor units, a cash breakdown, and the places each currency is legal tender.
Zero dependencies. The demo draws the map with [Chizu](https://github.com/johnmorrisdotca/chizu)
and the flags with [Hata](https://github.com/johnmorrisdotca/hata). Country names come from
[Kuni](https://github.com/johnmorrisdotca/kuni).

```ts
import { cashBreakdown, currenciesOf, issuesAt, redenominations, tender, tenures } from "@johnmorrisdotca/kinshu";

cashBreakdown(185.07, "CAD");
// exact 18507 cents, cash-rounded to 18505, notes 100, 50, 20, 10, 5 and one nickel

tender("JPY"); // ["JP"]
tender("USD"); // the places where the dollar is legal tender, not the whole world
currenciesOf("PA"); // ["PAB", "USD"]
tenures("FR"); // the euro, and the franc until 17 February 2002
redenominations("RO"); // 10,000 old lei became 1 leu. The leu did not become the euro.
issuesAt("CAD", "1980"); // includes the 1 and 2 dollar notes
issuesAt("CAD", "2026"); // those notes are no longer legal tender
```

`kinshu/minor`, `kinshu/parts` and `kinshu/breakdown` carry no dataset.
`kinshu/cash/cad` is one currency's notes and coins.
Eight currencies have checked cash files. Every other current tender currency has its name,
symbol, exponent and tender places, and `cashBreakdown` returns null until that cash file is checked.

Bitcoin is `kinshu/bitcoin`. A country is listed only when a primary source has been read.
El Salvador's 2025 decree is the first row. The rest are not guessed.
