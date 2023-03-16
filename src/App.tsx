import React from 'react';
import {useAppSelector} from "./app/hooks";
import {selectRank, selectScore} from "./features/counter/counterSlice";
import {Score} from './app/components/score';
import {Items} from './app/components/items';

import './App.css';

function App() {
  const score = useAppSelector(selectScore);
  const rank = useAppSelector(selectRank);
  return (
      <div className="container">
        <Score score={score} rank={rank} />
        <h2 className="mt-3">Milujeme mandragoru</h2>
        <Items score={score} />
      </div>
  );
}

export default App;
