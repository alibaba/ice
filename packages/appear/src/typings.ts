export interface AppearProps {
  children: React.ReactElement;
  /**
   * 元素进入可视区域触发的事件
   * @param {CustomEvent} e
   * @returns {void}
   */
  onAppear?: (e: CustomEvent) => void;
  /**
   * 元素离开可视区域触发的事件
   * @param {CustomEvent} e
   * @returns {void}
   */
  onDisappear?: (e: CustomEvent) => void;
}
