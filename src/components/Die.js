import React, { useState } from 'react';
import '../styles/__die.scss';

function Die() {
    const skills = ['javascript', 'python', 'react', 'node.js', 'java', 'c#'];
    const [diceValue, setDiceValue] = useState(1);
    const [selectedSkill, setSelectedSkill] = useState('');
    const [projects, setProjects] = useState([]);

    const rollDice = () => {
        const newDiceValue = Math.floor(Math.random() * 6 + 1);
        setDiceValue(newDiceValue);

        const randomSkill = skills[newDiceValue - 1];
        setSelectedSkill(randomSkill);

        const dummyProjects = [
            { id: 1, name: 'Project 1', skills: ['javascript', 'react', 'node.js'] },
            { id: 2, name: 'Project 2', skills: ['python', 'javascript'] },
            { id: 3, name: 'Project 3', skills: ['java', 'c#'] },
        ];

        const filteredProjects = dummyProjects.filter(project => project.skills.includes(randomSkill));

        setProjects(filteredProjects);
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
            {selectedSkill && (
                <div className='selected-skill'>
                    <h2>Selected Skill: {selectedSkill}</h2>
                    <h3>Projects:</h3>
                    <ul>
                        {projects.map(project => (
                            <li key={project.id}>{project.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Die;
