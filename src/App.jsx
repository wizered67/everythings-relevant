import "./App.css";

import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { Clock } from "./clock/Clock";

let mockTime = undefined;
// mockTime = dayjs("2018-04-04T16:43:45.000");

function App() {
  const [dateTime, setDateTime] = useState(() => getTime());
  const [hasUnlockedCard, setHasUnlockedCard] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(getTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const isRelevancy = isEverythingRelevant(dateTime);
  if (isRelevancy && !hasUnlockedCard) {
    setHasUnlockedCard(true);
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
        <p className={`App-download ${hideWithTransition(hasUnlockedCard)}`}>
          <a href="https://google.com" target="_blank">
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
