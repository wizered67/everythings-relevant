import "./Clock.css";

export function Clock(props) {
  const { dateTime } = props;
  return (
    <div id="clock">
      <p className="date">{formatDate(dateTime)}</p>
      <p className="time">{formatTime(dateTime)}</p>
      <p className="seconds">{formatSeconds(dateTime)}</p>
    </div>
  );
}

function formatDate(cd) {
  return cd.format("dddd");
}

function formatTime(cd) {
  return cd.format("h:mm");
}

function formatSeconds(cd) {
  return cd.format("ss");
}
