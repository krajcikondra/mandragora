import React from 'react';
import {compose} from "redux";
import classNames from 'classnames';
import {connect} from "react-redux";

import {RootState} from "../store";
import {incrementByAmount, incrementMoneyByAmount} from "../../features/counter/counterSlice";
import {mandragora} from "../model/mandragora";
import {Activity} from "./items";

type OuterProps = {
    activity: Activity,
};

type StateProps = {
    score: number,
};

type DispatchProps = {
    increaseScore(amount: number): void,
    increaseMoney(amount: number): void,
};

type Props = OuterProps & StateProps & DispatchProps;

function item({activity, increaseScore, increaseMoney, score}: Props) {
    const {unlockFrom, audioName, title, type, earning, points} = activity;
    const disabled = unlockFrom && unlockFrom > score;
    const click = () => {
        if (disabled) {
            return;
        }

        if (type === 'normal') {
            mandragora.play(activity, increaseScore, increaseMoney);
        }

        if (audioName === 'random') {
            mandragora.playRandom(activity.points, increaseScore);
        } else if (audioName === 'story') {
            mandragora.playStory(activity.points, increaseScore);
        }
    };

    return (
        <div
            className={classNames('item', disabled && 'disabled')}
            data-name={audioName}
            onClick={click}
        >
            <div>
                <div>{title}</div>
                {disabled && unlockFrom && <div className="subtitle">{unlockFrom}+</div>}
                {earning && <span className="earning">{earning} Kč</span>}
                {points && <span className="points">{points}</span>}
            </div>
        </div>
    );
}

const mapStateToProps = (state: RootState): StateProps => ({
    score: state.counter.score,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    increaseScore: (amount: number) => dispatch(incrementByAmount(amount)),
    increaseMoney: (amount: number) => dispatch(incrementMoneyByAmount(amount)),
});

const enhance = compose<React.ComponentClass<OuterProps>>(
    connect(mapStateToProps, mapDispatchToProps),
);

export const Item = enhance(item);
