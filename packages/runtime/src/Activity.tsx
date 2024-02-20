import React from 'react';

interface ActivityProps {
  mode: string;
  children: React.ReactElement | null;
}

interface ActivityContext {
  active: boolean;
}

const Context = React.createContext<ActivityContext>(null);
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
