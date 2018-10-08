import React from "react";
import moment from "moment-timezone";
import Clock from "./Clock";

import "./clock.css";

function convertCityToTimezoneName(city) {
  if (city.toLowerCase() === "new york") {
    return "America/New_York";
  } else if (city.toLowerCase() === "sydney") {
    return "Australia/Sydney";
  } else if (city.toLowerCase() === "seoul") {
    return "Asia/Seoul";
  } else if (city.toLowerCase() === "london") {
    return "Europe/London";
  }
  throw new Error(`Didn't recgonize the city: ${city}`);
}

export default class WorldClock extends Clock {
  render() {
    const { time } = this.state;
    const timezone = convertCityToTimezoneName(this.props.city || "sydney");

    const localDateTime = moment(time).tz(timezone);
    const date = localDateTime.format("ddd MMM DD YYYY");
    const hours = localDateTime.format("HH");
    const minutes = localDateTime.format("mm");
    const seconds = localDateTime.format("ss");

    return (
      <div className="jr-clock">
        <div className="jr-clock__date">{date}</div>
        <div className="jr-clock__time">
          <div className="jr-clock__time-square">{hours}</div>
          <span className="jr-clock__time-colon">:</span>
          <div className="jr-clock__time-square">{minutes}</div>
          <span className="jr-clock__time-colon">:</span>
          <div className="jr-clock__time-square">{seconds}</div>
        </div>
      </div>
    );
  }
}
