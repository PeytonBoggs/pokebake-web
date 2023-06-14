import { Pokemon } from './Pokemon-Interface';
import { useState } from 'react';

interface BakeProps {
    ingredients: Pokemon[];
}

export default function Bake({ingredients}:BakeProps) {
    const [bake, setBake] = useState<string>("");

    function printBaked(){
        let tempBake: string = "";

        for (let i = 0; i < ingredients.length; i++) {
            tempBake += ingredients[i].name.slice(0, (ingredients[i].name.length / 2));
            tempBake += "-"
        }
        
        tempBake = tempBake.slice(0, tempBake.length - 1);

        for (let i = ingredients.length - 1; i >= 0; i--) {
            tempBake += "-"
            tempBake += ingredients[i].name.slice((ingredients[i].name.length / 2), ingredients[i].name.length);           
        }

        setBake("Congratulations! You've created " + tempBake + " stew!");
    }

    return (
        <div>
            <br />
            <button className="bakeButton" onClick={() => printBaked()}>Bake</button>
            <h1>{bake}</h1>
        </div>
    )
}