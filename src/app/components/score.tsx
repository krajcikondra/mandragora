import React from 'react';
import {compose} from "redux";
import {ProgressBar} from "react-bootstrap";
import {useDispatch} from "react-redux";

import {levels} from "../model/levels";
import {Hero} from "./heroes";
import {setHero} from "../../features/counter/counterSlice";

type OuterProps = {
    score: number,
    rank: string,
    hero: Hero|null,
    money: number|null,
};

type Props = OuterProps;

function MyScore({score, rank, hero, money}: Props) {
    const dispatch = useDispatch();

    const resetHero = () => {
        dispatch(setHero(null));
    };

    return <div>
        <ProgressBar now={levels.getPercentOfNextLevel(score)} />
        <div id="score">
            {hero && <img onClick={resetHero} width={40} height={40} src={hero?.imgSrc} alt="" />}
            <span className="px-2">Skore: {score}</span>
            <div>Peníze: {money} Kč</div>
        </div>
        <div id="rank">Hodnost: {rank}</div>
    </div>;
}

const enhance = compose<React.ComponentClass<OuterProps>>(
);

export const Score = enhance(MyScore);
