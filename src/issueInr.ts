import type { Issue } from "./types";

const checked = "2026-11-20";
const faq = "https://www.rbi.org.in/commonman/english/scripts/FAQs.aspx?Id=3158";
const withdrawal = "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=55707";

const pre2005 =
  "Reserve Bank of India currency FAQ, read 20 November 2026. This is the introduction the page gives. It does not give a last print day. Notes issued before 2005 are being withdrawn from circulation. The page does not say they stopped being legal tender.";

function row(
  minor: number,
  name: string,
  from: string | null,
  issuedTo: string | null,
  tenderTo: string | null,
  stillTender: boolean,
  source: string,
  note: string,
): Issue {
  return {
    code: "INR",
    kind: "note",
    minor,
    from,
    issuedTo,
    tenderTo,
    stillTender,
    honoured: false,
    asOf: null,
    name,
    source,
    checked,
    note,
  };
}

function introduced(minor: number, name: string, from: string): Issue {
  return row(minor, name, from, from, null, true, faq, pre2005);
}

export const INR_ISSUES: Issue[] = [
  row(1000000, "10,000 rupee note, 1938", "1938", null, "1946-01", false, faq, "Reserve Bank of India currency FAQ, read 20 November 2026. The 10,000 rupee note was printed in 1938 and demonetized in January 1946. The page does not give the day in January."),
  row(1000000, "10,000 rupee note, 1954", "1954", null, "1978-01", false, faq, "Reserve Bank of India currency FAQ, read 20 November 2026. Reintroduced in 1954 and demonetized in January 1978."),
  row(500000, "5,000 rupee note, 1954", "1954", null, "1978-01", false, faq, "Reserve Bank of India currency FAQ, read 20 November 2026. Reintroduced in 1954 and demonetized in January 1978."),
  row(100000, "1,000 rupee note, 1954", "1954", null, "1978-01", false, faq, "Reserve Bank of India currency FAQ, read 20 November 2026. Reintroduced in 1954 and demonetized in January 1978. An earlier 1,000 rupee note was demonetized in January 1946. The page gives no start for that earlier note, so it is not a separate row."),
  row(1000, "10 rupee Ashoka Pillar note", "1967", "1992", null, true, faq, "Reserve Bank of India currency FAQ, read 20 November 2026. Issued between 1967 and 1992. Pre-2005 notes are being withdrawn from circulation. The page does not say they stopped being legal tender."),
  introduced(2000, "20 rupee Ashoka Pillar note, 1972", "1972"),
  introduced(2000, "20 rupee Ashoka Pillar note, 1975", "1975"),
  introduced(5000, "50 rupee Ashoka Pillar note, 1975", "1975"),
  introduced(5000, "50 rupee Ashoka Pillar note, 1981", "1981"),
  row(10000, "100 rupee Ashoka Pillar note", "1967", "1979", null, true, faq, "Reserve Bank of India currency FAQ, read 20 November 2026. Issued between 1967 and 1979."),
  introduced(50000, "500 rupee note, October 1987", "1987-10"),
  row(100, "1 rupee note", "1949", null, null, true, faq, "Reserve Bank of India currency FAQ, read 20 November 2026. The first note of independent India was the one rupee note in 1949. One rupee notes are issued by the Government of India, and notes issued in the past continue to be legal tender. The page does not give a last print day."),
  introduced(500, "5 rupee note, Mahatma Gandhi series 1996", "2001-11"),
  introduced(1000, "10 rupee note, Mahatma Gandhi series 1996", "1996-06"),
  introduced(2000, "20 rupee note, Mahatma Gandhi series 1996", "2001-08"),
  introduced(5000, "50 rupee note, Mahatma Gandhi series 1996", "1997-03"),
  introduced(10000, "100 rupee note, Mahatma Gandhi series 1996", "1996-06"),
  row(50000, "500 rupee note, Mahatma Gandhi series 1996", "1997-10", null, "2016-11-08", false, faq, "Reserve Bank of India currency FAQ, read 20 November 2026. Introduced October 1997. Legal tender of the 500 rupee Mahatma Gandhi series notes was withdrawn from the midnight of 8 November 2016."),
  row(100000, "1,000 rupee note, Mahatma Gandhi series 1996", "2000-11", null, "2016-11-08", false, faq, "Reserve Bank of India currency FAQ, read 20 November 2026. Introduced November 2000. Legal tender of the 1,000 rupee Mahatma Gandhi series notes was withdrawn from the midnight of 8 November 2016."),
  introduced(5000, "50 rupee note, Mahatma Gandhi series 2005", "2005-08"),
  introduced(10000, "100 rupee note, Mahatma Gandhi series 2005", "2005-08"),
  row(50000, "500 rupee note, Mahatma Gandhi series 2005", "2005-10", null, "2016-11-08", false, faq, "Reserve Bank of India currency FAQ, read 20 November 2026. Introduced October 2005. Legal tender withdrawn from the midnight of 8 November 2016."),
  row(100000, "1,000 rupee note, Mahatma Gandhi series 2005", "2005-10", null, "2016-11-08", false, faq, "Reserve Bank of India currency FAQ, read 20 November 2026. Introduced October 2005. Legal tender withdrawn from the midnight of 8 November 2016."),
  introduced(1000, "10 rupee note, Mahatma Gandhi series 2005", "2006-04"),
  introduced(2000, "20 rupee note, Mahatma Gandhi series 2005", "2006-08"),
  row(200000, "2,000 rupee note", "2016-11-08", "2019", null, true, withdrawal, "Reserve Bank of India press release, 19 May 2023. Introduced on 8 November 2016. Printing stopped in 2018-19. The release does not give the day, so 2019 is the last year of that named range and not a stated last print day. The note continues to be legal tender. Banks were told to stop issuing it with immediate effect."),
  ...[1000, 2000, 5000, 10000, 20000, 50000].map((minor): Issue => ({
    code: "INR",
    kind: "note",
    minor,
    from: null,
    issuedTo: null,
    tenderTo: null,
    stillTender: true,
    honoured: false,
    asOf: checked,
    name: `${minor / 100} rupee note, Mahatma Gandhi (New) Series`,
    source: faq,
    checked,
    note: "Reserve Bank of India currency FAQ, read 20 November 2026. Banknotes are currently being issued in 10, 20, 50, 100, 200 and 500 rupees. The new series began with the 2,000 rupee note on 8 November 2016, and these denominations were introduced afterwards. The page does not date each one, so a year before 2026 stays unlisted.",
  })),
];
