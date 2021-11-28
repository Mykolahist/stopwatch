import { useEffect, useState } from "react"
import { Observable, Subject } from "rxjs";
import { buffer, map, filter, debounceTime } from "rxjs/operators"
import { Container, Title, Button, Section } from "App.styled";

export const App = () => {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState("stop");
  const [isOn, setIsOn] = useState(false)
 
  
  const start = () => {
    setStatus("run");
    setIsOn(true)
  };
 
  const stop = () => {
    setStatus("stop");
    setSec(0);
    setIsOn(false)
  };
 
  const reset = () => {
    setSec(0);
    setIsOn(true);
    setStatus("run")
  };
 
  const wait = () => {
    waitClick$.next();
  }

  const waitClick$ = new Subject()

  waitClick$.pipe(
    buffer(waitClick$.pipe(debounceTime(300))),
    map(item => item.length),
    filter(item => item === 2),
  ).subscribe(() => {
    setStatus("wait");
    setIsOn(false)
  })

  useEffect(() => {
    if (status === "run") {
      const timer$ = new Observable(observer => {
        const intervalId = setInterval(() => {
          observer.next();
        }, 1000);

        return () => {
          clearInterval(intervalId);
        };
      });
      const observer = {
        next: () => {
          setSec((sec) => sec + 1)
        },
        error: () => {
          console.log("error")
        },
        complete: () => {
          console.log("observer complete")
        }
      };
      const subscription = timer$.subscribe(observer);
      return (() => {
        subscription.unsubscribe();
      })
    }
  }, [status])
 

  const countTime = {
    seconds: (sec % 60),
    minutes: Math.floor(sec / 60),
    hours: Math.floor(sec / 3600),
  }
  const showTime = {}
  for (let key in countTime) {
    if (countTime[key] < 1) {
      showTime[key] = "00";
    }
    else if (countTime[key] < 10) {
      showTime[key] = `0${countTime[key]}`
    }
    else {
      showTime[key] = `${countTime[key]}`;
    }
  }

  return (
    <Container>
      <Title>{showTime.hours}:{showTime.minutes}:{showTime.seconds}</Title>
      <Section>
        {!isOn
              ?<Button onClick={start}>Start</Button>
              :<Button onClick={stop}>Stop</Button>}
        <Button onClick={wait}>Wait</Button>
        <Button onClick={reset}>Reset</Button>        
    </Section>
    </Container>
  );
}