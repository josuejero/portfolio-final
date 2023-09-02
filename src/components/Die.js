import React, { useState } from 'react';
import '../styles/__die.scss';

function Die() {
    const [diceValue, setDiceValue] = useState(1);

    const rollDice = () => {
        const newDiceValue = Math.floor(Math.random() * 6 + 1);
        setDiceValue(newDiceValue);
    };

    return (
        <div className="die-body">
        <div className="game">
            <div className="die-container">
            <div id="dice1" className={`dice dice-one show-${diceValue}`}>
                <div id="dice-one-side-one" className="side one">
                <div className="dot one-1" />
                </div>
                <div id="dice-one-side-two" className="side two">
                <div className="dot two-1" />
                <div className="dot two-2" />
                </div>
                <div id="dice-one-side-three" className="side three">
                <div className="dot three-1" />
                <div className="dot three-2" />
                <div className="dot three-3" />
                </div>
                <div id="dice-one-side-four" className="side four">
                <div className="dot four-1" />
                <div className="dot four-2" />
                <div className="dot four-3" />
                <div className="dot four-4" />
                </div>
                <div id="dice-one-side-five" className="side five">
                <div className="dot five-1" />
                <div className="dot five-2" />
                <div className="dot five-3" />
                <div className="dot five-4" />
                <div className="dot five-5" />
                </div>
                <div id="dice-one-side-six" className="side six">
                <div className="dot six-1" />
                <div className="dot six-2" />
                <div className="dot six-3" />
                <div className="dot six-4" />
                <div className="dot six-5" />
                <div className="dot six-6" />
                </div>
            </div>
            </div>
            <div id="roll" className="roll-button" onClick={rollDice}>
            <button className='die-button'>Roll dice!</button>
            </div>
        </div>
        </div>
    );
}

export default Die;
