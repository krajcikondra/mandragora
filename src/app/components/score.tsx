import React from 'react';
import {ProgressBar} from "react-bootstrap";
import {useDispatch} from "react-redux";

import {levels} from '../model/levels';
import {Hero} from './heroes';
import {selectScore, setHero} from '../store/playerSlice';
import {openStore, selectOpenStore} from '../store/storeSlice';
import {useAppSelector} from '../hooks';

type OuterProps = {
    rank: string,
    hero: Hero|null,
    money: number|null,
    health: number,
    addictionLevel: number,
};

type Props = OuterProps;

export function Score({rank, hero, money, health, addictionLevel}: Props) {
    const dispatch = useDispatch();
    const isStoreOpen = useAppSelector(selectOpenStore);
    const score = useAppSelector(selectScore);

    const resetHero = () => {
        dispatch(setHero(null));
        dispatch(openStore(false));
    };

    const goToStore = () => {
        dispatch(openStore(!isStoreOpen));
    };

    return <div>
        <ProgressBar now={levels.getPercentOfNextLevel(score)} />
        <div id="score">
            <span className="text-danger cursor-pointer" onClick={goToStore}> STORE </span>
            <span> Peníze: {money} Kč</span>
            <span> &nbsp;&nbsp;&nbsp;Zdraví: {health}% &nbsp;&nbsp;&nbsp;</span>
            {Boolean(addictionLevel) && <span title="Čím vyšší závislost máš tím hůř se léčíš." className="px-2">Závislost: {addictionLevel}/5</span>}
            <span className="px-2">Skore: {score}</span>
            <span id="rank">&nbsp;&nbsp;&nbsp;Hodnost: {rank}&nbsp;&nbsp;</span>
            {hero && <img onClick={resetHero} width={40} height={40} src={hero?.imgSrc} alt="" />}
        </div>
    </div>;
}
