import React from 'react';
import {useDispatch} from "react-redux";
import {setHero} from "../../features/counter/counterSlice";
import {HeroComponent} from "./hero-component";
import {levels} from "../model/levels";

type OuterProps = {
    score: number,
};

type Props = OuterProps;

export type Hero = {
    imgSrc: string,
    name: string,
    minScore: number,
};

export type HeroName = string;

export const heroes: Hero[] = [
    {imgSrc: '/hero/marek.png', name: 'Marek', minScore: 0},
    {imgSrc: '/hero/david.jpeg', name: 'David', minScore: levels.level2},
    {imgSrc: '/hero/honza.png', name: 'Honza', minScore: levels.level3},
    {imgSrc: '/hero/franta.png', name: 'Franta', minScore: levels.level4},
    {imgSrc: '/hero/sasa.png', name: 'Saša', minScore: levels.level5},
    {imgSrc: '/hero/zuzka.png', name: 'Zuzka', minScore: levels.level6},
    {imgSrc: '/hero/american.png', name: 'Rudi', minScore: levels.level7},
    {imgSrc: '/hero/krysa.png', name: 'Krysa', minScore: levels.level8},
];

export const Heroes = ({score}: Props) => {
    const dispatch = useDispatch();

    const select = (hero: Hero) => {
        dispatch(setHero(hero.name));
    };

    return (
        <div>
            <h2>Vyber si postavu</h2>
            <div className="items">
                {heroes.map(hero => <HeroComponent
                    hero={hero}
                    onSelect={select}
                    disabled={score < hero.minScore}
                />)}
            </div>
        </div>
    );
}
