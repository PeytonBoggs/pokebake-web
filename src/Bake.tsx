import { Pokemon } from './Pokemon-Interface';
import { useState } from 'react';

interface BakeProps {
    ingredients: Pokemon[];
}

export default function Bake({ingredients}:BakeProps) {
    const [bake, setBake] = useState<String>("");

    //printBaked changes the state of bake to a string in the form "first-first-last-last" so that the
    //first half of all names go in the first half of the string and vice versa
    function printBaked(){
        console.log(ingredients)
    
        if (ingredients.length === 0) {
            setBake("Choose Pokemon from the menu before baking your cake!");
            return;
        }

        if (ingredients.length === 1) {
            setBake("Congratulations! You've baked " + ingredients[0].name + " cake!");
            return;
        }

        let tempBake: String = "";

        for (let i = ingredients.length - 1; i >= 0; i--) {
            let frontHalf: String = ingredients[i].name.slice(0, (ingredients[i].name.length / 2));
            let backHalf: String = ingredients[i].name.slice((ingredients[i].name.length / 2), ingredients[i].name.length);
            if (tempBake === "") {
                tempBake = frontHalf + "" + backHalf;
            } else {
                tempBake = frontHalf + "-" + tempBake + "-" + backHalf;
            }
        }

        setBake("Congratulations! You've baked " + tempBake + " cake!");
    }

    return (
        <div>
            <br />
            <button className="bakeButton" onClick={printBaked}>Bake</button>
            <h1>{bake}</h1>
        </div>
    )
}