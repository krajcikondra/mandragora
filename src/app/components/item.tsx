import React from 'react';
import {compose} from "redux";
import classNames from 'classnames';
import {connect} from "react-redux";
import {Col} from "react-bootstrap";

import {RootState} from "../store";
import {incrementByAmount} from "../../features/counter/counterSlice";
import {mandragora} from "../model/mandragora";
import {Activity} from "./items";

type OuterProps = {
    activity: Activity,
};

type StateProps = {
    score: number,
};

type DispatchProps = {
    increase(amount: number): void,
};

type Props = OuterProps & StateProps & DispatchProps;

function item({activity, increase, score}: Props) {
    const {unlockFrom, audioName, title, type} = activity;
    const disabled = unlockFrom && unlockFrom > score;
    const click = () => {
        if (disabled) {
            return;
        }

        if (type === 'normal') {
            mandragora.play(activity, increase);
        }

        if (audioName === 'random') {
            mandragora.playRandom(activity.points, increase);
        } else if (audioName === 'story') {
            mandragora.playStory(activity.points, increase);
        }
    };

    return (
        <Col
            xs={6}
            sm={4}
            md={3}
            xl={2}
            className={classNames('item', disabled && 'disabled')}
            data-name={audioName}
            onClick={click}
        >
            <div>
                <div>{title}</div>
                {disabled && unlockFrom && <div className="subtitle">{unlockFrom}+</div>}
            </div>
        </Col>
    );
}

const mapStateToProps = (state: RootState): StateProps => ({
    score: state.counter.score,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    increase: (amount: number) => dispatch(incrementByAmount(amount)),
});

const enhance = compose<React.ComponentClass<OuterProps>>(
    connect(mapStateToProps, mapDispatchToProps),
);

export const Item = enhance(item);
