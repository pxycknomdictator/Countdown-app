import React, { useState, useEffect } from "react";
import "../../index.css";
import "./Counter.css";
import starsbackground from "../../assets/bg-stars.svg";
import Heading from "../Heading/Heading.jsx";
import SocialIcons from "../SocialIcons/SocialIcons.jsx";
import Hill from "../Hill/Hill.jsx";
import TimerBox from "../TimerBox/TimerBox.jsx";

const Counter = () => {
  const calculateTimeLeft = () => {
    const difference = new Date("2024-07-31T23:59:59") - new Date();
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  const timerData = [
    { value: formatNumber(timeLeft.days), label: "Days" },
    { value: formatNumber(timeLeft.hours), label: "Hours" },
    { value: formatNumber(timeLeft.minutes), label: "Minutes" },
    { value: formatNumber(timeLeft.seconds), label: "Seconds" },
  ];

  return (
    <>
      <main className="container">
        <div className="backstars">
          <img className="start" src={starsbackground} alt="starsbackground" />
        </div>
        <div className="counter-container flex items-center justify-center">
          <div className="counter-body center">
            <Heading />
            <div className="timer-container grid">
              {timerData.map((data, index) => (
                <TimerBox key={index} number={data.value} timer={data.label} />
              ))}
            </div>
            <SocialIcons />
          </div>
        </div>
        <Hill />
      </main>
    </>
  );
};

export default Counter;
