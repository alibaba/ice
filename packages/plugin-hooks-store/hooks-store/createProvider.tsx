import React, { Context } from 'react';
import Executor from './executor';
import Dispatcher from './dispatcher';
import { Hooks } from './types';

export default function(context: Context<Dispatcher>, dispatcher: Dispatcher, hooks: Hooks) {
  return ({ children }: { children: React.ReactNode }) => {
    return (
      <context.Provider value={dispatcher}>
        {Object.keys(hooks).map(namespace => {
          const useValue = hooks[namespace];
          return (
            <Executor
              key={namespace}
              namespace={namespace}
              useValue={useValue}
              onUpdate={(val) => {
                dispatcher.data[namespace] = val;
                dispatcher.update(namespace);
              }}
            />
          );
        })}
        {children}
      </context.Provider>
    );
  };
}
