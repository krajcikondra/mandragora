import React from 'react';
import {Hero} from './heroes';
import classNames from "classnames";

type OuterProps = {
    hero: Hero;
    disabled?: boolean;
    onSelect(hero: Hero): void;
};

type Props = OuterProps;

export const HeroComponent = ({hero, onSelect, disabled}: Props) => {
    const click = () => {
        if (disabled) {
            return;
        }
        onSelect(hero);
    };
    return (
        <div
            className={classNames('hero', disabled && 'hero--disabled')}
            onClick={click}
        >
            <img width={150} height={150} src={hero.imgSrc} alt="" />
            <div className="text-center">
                {hero.name}
            </div>
        </div>
    );
}
