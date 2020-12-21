import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import axios from 'axios'

const useCountdown = ({ id,countdownMin, finishVisualExamHandler,islast ,next}) => {
  const [cd, setCd] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const history = useHistory();

  useEffect(() => {
    let hours = Math.floor((cd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (hours < 10) {
      setHours(`0${hours}`);
    } else {
      setHours(hours);
    }

    let minutes = Math.floor((cd % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes < 10) {
      setMinutes(`0${minutes}`);
    } else {
      setMinutes(minutes);
    }

    setSeconds(Math.floor((cd % (1000 * 60)) / 1000));
    if (cd < 0) {
      console.log(islast)
      if(!islast)
      {
        Swal.fire({
          title: "<strong>Sorunuzun süresi bitti.</strong>",
          html: "<p>Bir sonraki soruya geçiyorsunuz.</p>",
          icon: "warning",
          confirmButtonColor: "#1BC5BD",
          confirmButtonText: "Tamam",
          timer: 2000,
          showCancelButton: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
        })
     
        next()
      }
      else{
  finishVisualExamHandler();
 Swal.fire({
  title: "<strong>Süre Doldu.</strong>",
  html: "<p>Sınavınızın süresi doldu. Anasayfaya yönlendirileceksiniz.</p>",
  icon: "warning",
  confirmButtonColor: "#1BC5BD",
  confirmButtonText: "Tamam",
  showCancelButton: false,
  allowEscapeKey: false,
  allowOutsideClick: false,
}).then(() => {
  
   
    history.push("/")
  
  
 
  
})
      }
   
     
      clearInterval(intervalRef.current);
    }
  }, [cd]);

  useEffect(() => {
    console.log(countdownMin);
    const countdownSec = countdownMin * 60 * 1000;

    intervalRef.current = setInterval(() => {
      setCd((c) => c - 1000);
    }, 1000);

    setCd(countdownSec);
    return () => clearInterval(intervalRef.current);
  }, [countdownMin]);

  
  
  return <>{`${hours}:${minutes}:${seconds}`}</>;
};

export default useCountdown;
