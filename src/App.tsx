import React from 'react';
import {useAppSelector} from "./app/hooks";
import {
    selectAddictionLevel,
    selectHealth,
    selectHero,
    selectMoney,
    selectRank,
} from './app/store/playerSlice';
import {Score} from './app/components/score';
import {Items} from './app/components/items';
import {heroes, Heroes} from "./app/components/heroes";

import './App.css';
import {Store} from "./app/components/store";
import {selectOpenStore} from "./app/store/storeSlice";
import {Layout} from "./app/components/layout";

function App() {
  const rank = useAppSelector(selectRank);
  const heroName = useAppSelector(selectHero);
  const money = useAppSelector(selectMoney);
  const health = useAppSelector(selectHealth);
  const isStoreOpen = useAppSelector(selectOpenStore);
  const addictionLevel = useAppSelector(selectAddictionLevel);
  const hero = heroName ? heroes.find(h => h.name === heroName) : null;

  const render = (): React.ReactElement => {
      if (isStoreOpen) {
          return <Store />;
      }

      if (hero) {
          return <Items heroName={heroName} />;
      }
      return <Heroes />;
  };

  return (
      <Layout>
          <Score
              rank={rank}
              hero={hero ?? null}
              money={money}
              health={health}
              addictionLevel={addictionLevel}
          />
          <h2 className="mt-3">Milujeme mandragoru</h2>
          {render()}
      </Layout>
  );
}

export default App;
