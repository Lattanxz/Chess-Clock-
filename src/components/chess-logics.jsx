import React, { useState, useEffect } from "react";
import PlayButton from "./play-button";
import StopButton from "./stop-button";
import ResetButton from "./reset-button";
import ConfigButton from "./config-button";
import "./chess-logics.css"

function ChessClock() {
  const [isPaused, setIsPaused] = useState(true);
  const [player1Time, setPlayer1Time] = useState(50);
  const [player2Time, setPlayer2Time] = useState(50);
  const [activePlayer, setActivePlayer] = useState(null);


    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleConfigSave = () => {
      const nPlayer1Time = parseInt(changedPlayer1Time) * 60;
      const nPlayer2Time = parseInt(changedPlayer2Time) * 60;

      setPlayer1Time(nPlayer1Time);
      setPlayer2Time(nPlayer2Time);

      setShowModal(false);
    };
    
  useEffect(() => {
    let timer;

    if (!isPaused) {
      timer = setInterval(() => {
        if (activePlayer === 1) {
          setPlayer1Time((prevTime) => {
            const nTime = prevTime - 1;
            if (nTime === 0) {
              clearInterval(timer);
              alert('Player 2 wins!');
              setPlayer1Time(300);
              setPlayer2Time(300);
            }
            return nTime;
          });
        } else if (activePlayer === 2) {
          setPlayer2Time((prevTime) => {
            const nTime = prevTime - 1;
            if (nTime === 0) {
             
              clearInterval(timer);
              alert('Player 1 wins!');
              setPlayer1Time(300);
              setPlayer2Time(300);
            }
            return nTime;
          });
          }
      }, 1000);
    } else {
      clearInterval(timer);
    }
  
    return () => {
      clearInterval(timer);
    };
  }, [activePlayer, isPaused]);


  const handleStartPlayer = (player) => {
    setActivePlayer(player);
    setIsPaused(false);
  };

  const handlePauseGame = () => {
    setIsPaused(true);
  };


  const handleRestartGame = () => {
    setPlayer1Time(300); 
    setPlayer2Time(300); 
    setActivePlayer(null);
    setIsPaused(true);
  };


  return (
    <div className="clock">
      <div className="clock-container">
        <div className="clock1">
              <div onClick={() => handleStartPlayer(2)} className={`timer ${activePlayer === 1 ? 'active' : ''}`}>
                  Player 1: {formatTime(player1Time)}
              </div>
          </div>
        <div className="centered-container">
          <div className="controles">
              {isPaused ? <PlayButton onClick={() => handleStartPlayer(1)}/> : <StopButton onClick={handlePauseGame}/>}
              <ResetButton onClick={handleRestartGame}/>
              <ConfigButton onClick={() => setShowModal(true)}/>
          </div>
        </div>
          <div className="clock2">
              <div onClick={() => handleStartPlayer(1)} className={`timer ${activePlayer === 2 ? 'active' : ''}`}>
                  Player 2: {formatTime(player2Time)}
              </div>
          </div>
          </div>
        </div>
    );
  }
  
  export default ChessClock;