import React from 'react';
import {compose} from "redux";
import {ProgressBar} from "react-bootstrap";
import {levels} from "../model/levels";

type OuterProps = {
    score: number,
    rank: string,
};

type Props = OuterProps;

function score({score, rank}: Props) {
    return <div>
        <div id="score">Skore: {score}</div>
        <div id="rank">Hodnost: {rank}</div>
        <div>
            <ProgressBar now={levels.getPercentOfNextLevel(score)} />
        </div>
    </div>;
}

const enhance = compose<React.ComponentClass<OuterProps>>(
);

export const Score = enhance(score);
