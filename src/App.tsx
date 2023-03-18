import React from 'react';
import {useAppSelector} from "./app/hooks";
import {selectHero, selectRank, selectScore} from "./features/counter/counterSlice";
import {Score} from './app/components/score';
import {Items} from './app/components/items';

import './App.css';
import {heroes, Heroes} from "./app/components/heroes";

function App() {
  const score = useAppSelector(selectScore);
  const rank = useAppSelector(selectRank);
  const heroName = useAppSelector(selectHero);
  const hero = heroName ? heroes.find(h => h.name === heroName) : null;

  return (
      <div className="container">
        <Score
            score={score}
            rank={rank}
            hero={hero ?? null}
        />
        <h2 className="mt-3">Milujeme mandragoru</h2>
          {hero ? <Items heroName={heroName} score={score} /> : <Heroes score={score} />}
      </div>
  );
}

export default App;
