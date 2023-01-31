import React from "react";
import Die from "./Die";
import { nanoid } from 'nanoid';
import Confetti from "react-confetti";

export default function MainContent(){

    const [diceFace, setDiceFace] = React.useState(tenNewDice())

    
    const [diceMatch, setDiceMatch] = React.useState(false)
    
    React.useEffect(() => {

        let diceMatched = 0
        const valueToCheck = diceFace[0].value

        for(let i=0; i<diceFace.length; i++){
            if(diceFace[i].value === valueToCheck && diceFace[i].isHeld === true){
                diceMatched++
            }
        }
        if(diceMatched === 10){
            setDiceMatch(true)
        }
    },[diceFace])

    const tenDiceInstance = diceFace.map((item) => {
        return <Die 
                    key={item.id}
                    value={item.value} 
                    isHeld={item.isHeld} 
                    functionOnHeld={changeHeldState}
                    id = {item.id}
                />
    })

    function rollTheDice(){
        setDiceFace(prevDiceState => prevDiceState.map(die => {
            if(die.isHeld){
                return die
            }
            else{
                return generateDice()
            }
        }))
    }

    function generateDice(){

        const randomNum = Math.ceil(Math.random() * 6)
        return {
            value: randomNum,
            isHeld: false,
            id: nanoid()
        }
    }

    function tenNewDice(){

        const arr = []

        for(let i=0; i<10; i++){
            arr.push(
                    generateDice()
            )
        }

        return arr
    }

    function changeHeldState(diceId){

        setDiceFace((prevDice) => prevDice.map(item =>{
            if(item.id === diceId){
                return{
                    ...item,
                    isHeld: !item.isHeld
                }
            }
            else{
                return item
            }
        })
        )
    }

    function playNewGame(){
        setDiceFace(prevDiceHeld => prevDiceHeld.map(item => {
            return{
                ...item,
                isHeld: false
            }
        }))
        setDiceMatch(false)
        setDiceFace(tenNewDice())
    }

    const contentVar = (
        <>
            <main className="main-container">
                <div className="parent-div">
                    <div className="header-div">
                        <h2 className="header-game">Tenzies</h2>
                        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                    </div>
                    <div className="dice-holder">
                        <div className="dice-div">
                            {tenDiceInstance}
                        </div>
                    </div>
                    <div className="roll-div">
                        <button onClick={diceMatch ? playNewGame :rollTheDice}>{diceMatch ? 'New Game' : 'Roll'}</button>
                    </div>
                </div>
                {diceMatch && <Confetti className="confetti"/>}
            </main>
        </> 
    )

    return contentVar
}