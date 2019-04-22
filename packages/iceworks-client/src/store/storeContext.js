import { createContext } from 'react';

/**
 * Creates a Context object.
 * When React renders a component that subscribes to this Context object.
 * it will read the current context value from the closest matching Provider above it in the tree
 */
const StoreContext = createContext();

export default StoreContext;
