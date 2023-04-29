import React from 'react';
import {compose} from "redux";
import {useDispatch} from "react-redux";

import {
    decreaseMoneyByAmount, increaseDrugCounter,
    increaseHealth,
    openStore, selectAddictionLevel,
    selectMoney, setAddictionLevel, setDrugCounter,
} from "../../features/counter/counterSlice";
import {useAppSelector} from "../hooks";
import {audioPlayer} from "../model/audio-player";
import {mandragoraStorage} from "../model/mandragora-storage";

type OuterProps = {
};

type StoreItem = {
    img: string,
    name: 'heroin'|'kondomy'|'guru',
    title: string,
    price: number,
    count: number,
    description: string,
};

type Props = OuterProps;

const getIncreaseHeroinHealth = (addictionLevel: number): number => {
    if (addictionLevel === 0) {
        return 10;
    } else if (addictionLevel === 1) {
        return 8;
    } else if (addictionLevel === 2) {
        return 4;
    } else if (addictionLevel === 3) {
        return 3;
    } else if (addictionLevel === 4) {
        return 2;
    }
    return 0;
}

function MyStore(_: Props) {
    const dispatch = useDispatch();
    const money = useAppSelector(selectMoney);
    const addictionLevel = useAppSelector(selectAddictionLevel);

    const buyItem = (item: StoreItem) => {
        if (money < item.price) {
            alert('Nemáš dostatek peněz');
            return;
        }

        if (item.name === 'heroin') {
            dispatch(increaseHealth(getIncreaseHeroinHealth(addictionLevel)));
            audioPlayer.playSniff();
            dispatch(increaseDrugCounter(1));
        } else if (item.name === 'guru') {
            audioPlayer.play('12.mp3');
            dispatch(setDrugCounter(0));
            dispatch(setAddictionLevel(0));
            alert('Guru Jára tě za chvíli odháčkuje a zbaví tě drogové závislosti.')
        }

        dispatch(decreaseMoneyByAmount(item.price));
        mandragoraStorage.decreaseMoney(item.price);
    };
    const items: StoreItem[] = [
        // {
        //     img: '/assets/kondomy.jpg',
        //     name: 'kondomy',
        //     title: 'Kondomy (20ks)',
        //     price: 200,
        //     count: 20,
        //     description: 'Ochrání zdraví při sexu',
        // },
        {
            img: '/assets/heroin.jpg',
            name: 'heroin',
            title: 'Heroin',
            price: 2000,
            count: 0,
            description: 'Jedna dávka tě nakopne o +10 zdraví',
        },
        {
            img: '/assets/guru.jpeg',
            name: 'guru',
            title: 'Léčba drogové závislosti',
            price: 25000,
            count: 0,
            description: 'Guru Jára vyléčí tvoji drogovou závislost.',
        },
    ];

    const closeStore = () => {
        dispatch(openStore(false));
    };

    return <div className="mt-5">
        <h2 className="text-white">Mandragora store</h2>
        <div className="text-center">
            <div className="items">
                {items.map(item => <div onClick={() => buyItem(item)} className="hero">
                    <img width="150" height="150" src={item.img} alt="" title={item.description} />
                    <div className="text-center">{item.title}</div>
                    <div className="text-center">{item.price} CZK</div>
                </div>)}
            </div>

            <button
                className="btn btn-secondary mt-3"
                onClick={closeStore}
            >Opustit obchod</button>
        </div>
    </div>;
}

const enhance = compose<React.ComponentClass<OuterProps>>(
);

export const Store = enhance(MyStore);
