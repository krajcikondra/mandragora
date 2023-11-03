import {levels} from "../model/levels";
import {useAppSelector} from "../hooks";
import {selectScore} from "../store/playerSlice";
import {ReactNode} from "react";

type Props = {
    children: ReactNode,
};

export const Layout = ({children}: Props) => {
    const score = useAppSelector(selectScore);

    const getBg = (): number => {
        if (score >= levels.level6) {
            return 3;
        } else if (score >= levels.level5) {
            return 2
        } else if (score >= levels.level4) {
            return 1;
        }
        return 0;
    };

    console.log('vykresluju layout');

    return <div id="bodyWrapper" className={`bodyWrapper-${getBg()}`}>
        <div className="container">
            {children}
        </div>
    </div>
}