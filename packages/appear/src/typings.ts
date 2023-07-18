import type * as React from 'react';

export interface AppearProps {
  children: React.ReactElement;
  /**
   * Triggered when the element enters the visible area.
   * @param {CustomEvent} e
   * @returns {void}
   */
  onAppear?: (e: CustomEvent) => void;
  /**
   * Triggered when the element leaves the visible area.
   * @param {CustomEvent} e
   * @returns {void}
   */
  onDisappear?: (e: CustomEvent) => void;
}
