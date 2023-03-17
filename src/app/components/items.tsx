import React from 'react';
import {compose} from "redux";
import {Item} from "./item";
import {levels} from "../model/levels";

type OuterProps = {
    score: number,
};

type Props = OuterProps;
export type Activity = NormalActivity | ExtraActivity;

type NormalActivity = {
    type: 'normal',
    audioName: string,
    title: string,
    points: number,
    unlockFrom?: number,
};

type ExtraActivity = {
    type: 'extra',
    audioName: 'random'|'story',
    title: string,
    points: number,
    unlockFrom?: number,
};

function items() {
    const itemsData: Activity[] = [
        {type: 'normal', audioName: "1.mp3", title: "Ty by ses mi hodil", points: 5},
        {type: 'normal', audioName: "2.mp3", title: "Pěknej kluk", points: 5},
        {type: 'normal', audioName: "3.mp3", title: "Ty by ses mi fakt hodil", points: 5},
        {type: 'normal', audioName: "4.mp3", title: "U mě vyděláš spoustu prachů", points: 5},
        {type: 'normal', audioName: "5.mp3", title: "Ty seš fakt hezkej kluk", points: 5},
        {type: 'normal', audioName: "6.mp3", title: "Tak jak seš tady dlouho", points: 5},
        {type: 'normal', audioName: "7.mp3", title: "Ty seš takovej zajíček", points: 5},
        {type: 'normal', audioName: "8.mp3", title: "Neboj se, já tě vyškolím", points: 5},
        {type: 'normal', audioName: "9.mp3", title: "Ja bych si dal panáka", points: 5},
        {type: 'normal', audioName: "10.mp3", title: "Dobrou noc", points: 5},
        {type: 'normal', audioName: "11.mp3", title: "Nechtěj mě nasrat", points: 5, unlockFrom:  levels.level1},
        {type: 'normal', audioName: "12.mp3", title: "Já už budu", points: 5, unlockFrom:  levels.level1},
        {type: 'normal', audioName: "13.mp3", title: "Všechno se naučíš", points: 5, unlockFrom:  levels.level1},
        {type: 'normal', audioName: "14.mp3", title: "Umej si ten ksicht", points: 5, unlockFrom:  levels.level1},
        {type: 'normal', audioName: "15.mp3", title: "Půjčíš nám ty kluky", points: 5, unlockFrom:  levels.level1},
        {type: 'normal', audioName: "17.mp3", title: "Jdeme do plnejch", points: 5, unlockFrom:  levels.level1},
        {type: 'normal', audioName: "18.mp3", title: "Říkáš že všechno jo?", points: 5, unlockFrom:  levels.level1},
        {type: 'normal', audioName: "19.mp3", title: "Ládínek, to je pusinka", points: 5, unlockFrom:  levels.level1},
        {type: 'normal', audioName: "20.mp3", title: "Your balls are too much big", points: 5, unlockFrom:  levels.level1},
        {type: 'normal', audioName: "21.mp3", title: "Your tastickles are too big", points: 5, unlockFrom:  levels.level2},
        {type: 'normal', audioName: "22.mp3", title: "Pro mě je to jasný", points: 5, unlockFrom:  levels.level2},
        {type: 'normal', audioName: "23.mp3", title: "Táta točí novou kovbojku", points: 5, unlockFrom:  levels.level2},
        {type: 'normal', audioName: "24.mp3", title: "Hezký herečky", points: 5, unlockFrom:  levels.level2},
        {type: 'normal', audioName: "25.mp3", title: "Necháš se mrdat?", points: 5, unlockFrom:  levels.level2},
        {type: 'normal', audioName: "26.mp3", title: "Heteráci, těm je všechno jedno", points: 5, unlockFrom:  levels.level2},
        {type: 'normal', audioName: "27.mp3", title: "Komu nebude stát nedostane ani korunu", points: 5, unlockFrom:  levels.level2},
        {type: 'normal', audioName: "28.mp3", title: "Kdo z vás se nechá mrdat", points: 5, unlockFrom:  levels.level2},
        {type: 'normal', audioName: "29.mp3", title: "Dostaneš nejvíc peněz", points: 5, unlockFrom:  levels.level2},
        {type: 'normal', audioName: "30.mp3", title: "Se taky nechám prcat", points: 5, unlockFrom:  levels.level2},
        {type: 'normal', audioName: "31.mp3", title: "Postavte si čuráky", points: 5, unlockFrom:  levels.level3},
        {type: 'normal', audioName: "32.mp3", title: "Musíme ještě dneska to poslat do Německa", points: 5, unlockFrom:  levels.level3},
        {type: 'normal', audioName: "33.mp3", title: "Doufam, že mi to do pusy stříkat nebude", points: 5, unlockFrom:  levels.level3},
        {type: 'normal', audioName: "34.mp3", title: "Kuř ho pěkně hluboko", points: 5, unlockFrom:  levels.level3},
        {type: 'normal', audioName: "35.mp3", title: "To je vono", points: 5, unlockFrom:  levels.level3},
        {type: 'normal', audioName: "36.mp3", title: "Teď natočíme ten výstřik", points: 5, unlockFrom:  levels.level3},
        {type: 'normal', audioName: "37.mp3", title: "Jestli si ho nepostavíš", points: 5, unlockFrom:  levels.level3},
        {type: 'normal', audioName: "38.mp3", title: "Kurva 10 vteřin", points: 5, unlockFrom:  levels.level3},
        {type: 'normal', audioName: "39.mp3", title: "Honit", points: 10, unlockFrom:  levels.level3},
        {type: 'normal', audioName: "40.mp3", title: "Ty starýho filmaře nebudeš učit", points: 5, unlockFrom:  levels.level3},
        {type: 'normal', audioName: "41.mp3", title: "Budeme točit tu šukačku", points: 5, unlockFrom:  levels.level4},
        {type: 'normal', audioName: "42.mp3", title: "Otoč se a budeme točit tu šukačku", points: 5, unlockFrom:  levels.level4},
        {type: 'normal', audioName: "43.mp3", title: "Nebo ty Jonáši", points: 5, unlockFrom:  levels.level4},
        {type: 'normal', audioName: "44.mp3", title: "Ty vaše svěrače budeme muset otevřít", points: 5, unlockFrom:  levels.level4},
        {type: 'extra', audioName: "random", title: "RANDOM", points: 5, unlockFrom:  levels.level5},
        {type: 'extra', audioName: "story", title: "STORY", points: 15, unlockFrom:  levels.level6},
    ];

    return (
        <div className="items">
            {itemsData.map((item, key) => <Item
                activity={item}
                key={key}
            />)}
        </div>
    );
}

const enhance = compose<React.ComponentClass<OuterProps>>(
);

export const Items = enhance(items);
