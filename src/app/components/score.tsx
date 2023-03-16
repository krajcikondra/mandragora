import React from 'react';
import {compose} from "redux";

type OuterProps = {
    score: number,
    rank: string,
};

type Props = OuterProps;

function score({score, rank}: Props) {
    return <div>
        <div id="score">Skore: {score}</div>
        <div id="rank">Hodnost: {rank}</div>
    </div>;
}

const enhance = compose<React.ComponentClass<OuterProps>>(
);

export const Score = enhance(score);
