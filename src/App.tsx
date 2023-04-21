import React from 'react';
import {useAppSelector} from "./app/hooks";
import {
    selectHealth,
    selectHero,
    selectMoney,
    selectOpenStore,
    selectRank,
    selectScore
} from "./features/counter/counterSlice";
import {Score} from './app/components/score';
import {Items} from './app/components/items';
import {heroes, Heroes} from "./app/components/heroes";
import {levels} from "./app/model/levels";

import './App.css';
import {Store} from "./app/components/store";

function App() {
  const score = useAppSelector(selectScore);
  const rank = useAppSelector(selectRank);
  const heroName = useAppSelector(selectHero);
  const money = useAppSelector(selectMoney);
  const health = useAppSelector(selectHealth);
  const isStoreOpen = useAppSelector(selectOpenStore);
  const hero = heroName ? heroes.find(h => h.name === heroName) : null;

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

  const render = (): React.ReactElement => {
      if (isStoreOpen) {
          return <Store />;
      }

      if (hero) {
          return <Items heroName={heroName} score={score} />;
      }
      return <Heroes score={score} />;
  };

  return (
      <div id="bodyWrapper" className={`bodyWrapper-${getBg()}`}>
          <div className="container">
              <Score
                  score={score}
                  rank={rank}
                  hero={hero ?? null}
                  money={money}
                  health={health}
              />
              <h2 className="mt-3">Milujeme mandragoru</h2>
              {render()}
          </div>
      </div>
  );
}

export default App;
