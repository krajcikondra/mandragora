import React from 'react';
import {useAppSelector} from "./app/hooks";
import {selectHero, selectMoney, selectRank, selectScore} from "./features/counter/counterSlice";
import {Score} from './app/components/score';
import {Items} from './app/components/items';
import {heroes, Heroes} from "./app/components/heroes";
import {levels} from "./app/model/levels";

import './App.css';

function App() {
  const score = useAppSelector(selectScore);
  const rank = useAppSelector(selectRank);
  const heroName = useAppSelector(selectHero);
  const money = useAppSelector(selectMoney);
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

  return (
      <div id="bodyWrapper" className={`bodyWrapper-${getBg()}`}>
          <div className="container">
              <Score
                  score={score}
                  rank={rank}
                  hero={hero ?? null}
                  money={money}
              />
              <h2 className="mt-3">Milujeme mandragoru</h2>
              {hero ? <Items heroName={heroName} score={score} /> : <Heroes score={score} />}
          </div>
      </div>
  );
}

export default App;
