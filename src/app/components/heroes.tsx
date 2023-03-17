import React from 'react';
import {useDispatch} from "react-redux";
import {setHero} from "../../features/counter/counterSlice";
import {HeroComponent} from "./hero-component";

type OuterProps = {
};

type Props = OuterProps;

export type Hero = {
    imgSrc: string,
    name: string,
};

export const heroes: Hero[] = [
    {imgSrc: '/hero/krysa.png', name: 'Krysa'},
    {imgSrc: '/hero/franta.png', name: 'Franta'},
    {imgSrc: '/hero/david.jpeg', name: 'David'},
    {imgSrc: '/hero/sasa.png', name: 'Saša'},
    {imgSrc: '/hero/honza.png', name: 'Honza'},
    {imgSrc: '/hero/marek.png', name: 'Marek'},
];

export const Heroes = () => {
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
                />)}
            </div>
        </div>
    );
}
