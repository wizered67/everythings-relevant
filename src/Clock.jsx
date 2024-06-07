import "./Clock.css"

import { useEffect, useState } from "react";

export function Clock() {
    const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];;
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    useEffect(() => {
        const intervalId = setInterval(() => {
            const cd = new Date();
            setTime(zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2));
            setDate(zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth() + 1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()]);
        }, 1000)

        return () => clearInterval(intervalId); //This is important
    }, []);

    return <div id="clock">
        <p class="date">{ date }</p>
        <p class="time">{time }</p>
    </div>;
}

function zeroPadding(num, digit) {
    var zero = '';
    for (var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}