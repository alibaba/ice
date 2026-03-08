import React from 'react';

interface ActivityProps {
  mode: string;
  children: React.ReactElement | null;
}

interface ActivityContext {
  active: boolean;
}

const Context = React.createContext<ActivityContext>(null);
// TODO: React 19 支持直接使用 <Context> 替代 <Context.Provider>，当不再需要兼容 React 18 时可简化
const ActivityProvider = Context.Provider;

export const useActive = () => {
  const data = React.useContext(Context);
  return data?.active;
};

export default function Activity({ mode, children }: ActivityProps) {
  const active = mode === 'visible';
  return (
    <ActivityProvider value={{
      active,
    }}
    >
      {/* Additional wrapper for hidden elements */}
      <div style={{ display: active ? 'block' : 'none' }}>
        {children}
      </div>
    </ActivityProvider>
  );
}
