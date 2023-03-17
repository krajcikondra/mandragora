import React from 'react';
import {Hero} from './heroes';

type OuterProps = {
    hero: Hero;
    onSelect(hero: Hero): void;
};

type Props = OuterProps;

export const HeroComponent = ({hero, onSelect}: Props) => {
    return (
        <div
            className="hero"
            onClick={() => onSelect(hero)}
        >
            <img width={150} height={150} src={hero.imgSrc} alt="" />
            <div className="text-center">
                {hero.name}
            </div>
        </div>
    );
}
