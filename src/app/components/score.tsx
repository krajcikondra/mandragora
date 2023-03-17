import React from 'react';
import {compose} from "redux";
import {ProgressBar} from "react-bootstrap";
import {levels} from "../model/levels";
import {Hero} from "./heroes";

type OuterProps = {
    score: number,
    rank: string,
    hero: Hero|null,
};

type Props = OuterProps;

function score({score, rank, hero}: Props) {
    return <div>
        <ProgressBar now={levels.getPercentOfNextLevel(score)} />
        <div id="score">
            {hero && <img width={40} height={40} src={hero?.imgSrc} alt="" />}
            <span className="px-2">Skore: {score}</span>
        </div>
        <div id="rank">Hodnost: {rank}</div>
    </div>;
}

const enhance = compose<React.ComponentClass<OuterProps>>(
);

export const Score = enhance(score);
