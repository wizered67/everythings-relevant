import "./App.css";

import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { Clock } from "./clock/Clock";

const CARD_LINKS = {
  111: "https://drive.google.com/file/d/1QMHpmXyJpKrogLtgOWqNVo0w7pEISw_H/view?usp=drive_link",
  222: "https://drive.google.com/file/d/1ktXupryoAPHwbyNo9KrfFnKxFvT6miLw/view?usp=drive_link",
  333: "https://drive.google.com/file/d/1x7h1nDn5et9nqHDIb5in_yteZgt0UsZn/view?usp=drive_link",
  444: "https://drive.google.com/file/d/1LQ8qUKqEgF5XUN90JAmbMMiKtIrn6han/view?usp=drive_link",
  555: "https://drive.google.com/file/d/1ub1hcPiUPJncF4KfFzkZ_jMbF5cNPh5I/view?usp=drive_link",
  1111: "https://drive.google.com/file/d/141xZ3ChqOdhJqA4hdssTSgs5msZzfz6g/view?usp=drive_link",
};

let mockTime = undefined;
// mockTime = dayjs("2018-04-04T04:44:00.000");

function App() {
  const [dateTime, setDateTime] = useState(() => getTime());
  const [cardLink, setCardLink] = useState(null);
  // A bit hacky, but make sure the elements are hidden a bit so the animation plays
  // even if site is opened during the relevancy.
  const [isInitialSecond, setIsInitialSecond] = useState(true);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(getTime());
      setIsInitialSecond(false);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const isRelevancy = isEverythingRelevant(dateTime) && !isInitialSecond;
  if (isRelevancy && cardLink === null) {
    setCardLink(CARD_LINKS[dateTime.format("hmm")] ?? CARD_LINKS["1111"]);
  }

  return (
    <div className="App">
      <div className="App-body">
        <p className="App-relevancySection">
          <div
            className={`App-relevancyText ${hideWithTransition(isRelevancy)}`}
          >
            Everything's Relevant!
          </div>
        </p>
        <Clock dateTime={dateTime} />
        <p className={`App-download ${hideWithTransition(Boolean(cardLink))}`}>
          <a href={cardLink} target="_blank">
            Congratulations!
            <br />
            You've unlocked your special Father's Day card. Click here to
            download it.
          </a>
        </p>
      </div>
    </div>
  );
}

function getTime() {
  if (mockTime !== undefined) {
    mockTime = mockTime.add(1, "second");
    return mockTime;
  }
  return dayjs();
}

function isEverythingRelevant(cd) {
  const timeCharacters = cd.format("hmm");
  return new Set([...timeCharacters]).size === 1;
}

function hideWithTransition(isVisible) {
  return `hiddenWithTransition ${isVisible ? "visible" : ""}`;
}

export default App;
