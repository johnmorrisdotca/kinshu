# Notice: the data's licences

The code of this package is under the MIT licence (see [LICENSE](LICENSE)). The currency names, symbols,
exponents and tender places in `src/data/` are made from Unicode CLDR. The cash files and the bitcoin rows
are written for this package and cite the page they were checked against.

| What | Made from | Terms |
| --- | --- | --- |
| English and Japanese currency names, and the narrow symbol | Node's ICU, which ships Unicode CLDR. Generated 2026-11-20. | Unicode-3.0, below |
| Minor-unit exponent and the CLDR cash step | Unicode CLDR 48 `cldr-core` `supplemental/currencyData.json` fractions | Unicode-3.0, below |
| Where a currency is legal tender | Inverted from `@johnmorrisdotca/kuni` 1.3.0 country rows, themselves CLDR current tender plus Kosovo | Unicode-3.0, below. Kuni's code is MIT. |
| When a currency was in use in a country | Unicode CLDR 48 `currencyData.json` region list, generated 2026-11-20 | Unicode-3.0, below |
| Redenominations, withdrawn Mexican cash, and the Bank of Japan's note count | Written for this package from the page named on each row, checked 2026-11-20 | MIT |
| Notes and coins by year, including Canada's retired bills and US high denominations | Written for this package from the page named on each row, checked 2026-11-20. A currency with no such page keeps only the issuer's current list, and a past year does not assume it. | MIT |
| Notes, coins and the everyday amount for CAD, USD, JPY, GBP, EUR, THB, KRW, CNY and INR | Written for this package from the central-bank page named on each cash file, checked 2026-11-20 | MIT |
| El Salvador's bitcoin row | Decreto Legislativo No. 199, 29 January 2025, Diario Oficial 30 January 2025, as published by the Salvadoran courts | A citation. The row is MIT. |

## Unicode CLDR

Names, symbols, exponents and tender places come from the Unicode Common Locale Data Repository
(https://cldr.unicode.org/). Its licence (https://www.unicode.org/license.txt) asks that this notice
appear with all copies of the data or in its documentation:

```text
UNICODE LICENSE V3

COPYRIGHT AND PERMISSION NOTICE

Copyright © 2004-2026 Unicode, Inc.

NOTICE TO USER: Carefully read the following legal agreement. BY
DOWNLOADING, INSTALLING, COPYING OR OTHERWISE USING DATA FILES, AND/OR
SOFTWARE, YOU UNEQUIVOCALLY ACCEPT, AND AGREE TO BE BOUND BY, ALL OF THE
TERMS AND CONDITIONS OF THIS AGREEMENT. IF YOU DO NOT AGREE, DO NOT
DOWNLOAD, INSTALL, COPY, DISTRIBUTE OR USE THE DATA FILES OR SOFTWARE.

Permission is hereby granted, free of charge, to any person obtaining a
copy of data files and any associated documentation (the "Data Files") or
software and any associated documentation (the "Software") to deal in the
Data Files or Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, and/or sell
copies of the Data Files or Software, and to permit persons to whom the
Data Files or Software are furnished to do so, provided that either (a)
this copyright and permission notice appear with all copies of the Data
Files or Software, or (b) this copyright and permission notice appear in
associated Documentation.

THE DATA FILES AND SOFTWARE ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF
THIRD PARTY RIGHTS.

IN NO EVENT SHALL THE COPYRIGHT HOLDER OR HOLDERS INCLUDED IN THIS NOTICE
BE LIABLE FOR ANY CLAIM, OR ANY SPECIAL INDIRECT OR CONSEQUENTIAL DAMAGES,
OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THE DATA
FILES OR SOFTWARE.

Except as contained in this notice, the name of a copyright holder shall
not be used in advertising or otherwise to promote the sale, use or other
dealings in these Data Files or Software without prior written
authorization of the copyright holder.

SPDX-License-Identifier: Unicode-3.0
```

Names are kept as ICU returns them. Tender places are the countries Kuni lists for that code, sorted.
A country that uses two currencies, such as Panama, is tender for both.
