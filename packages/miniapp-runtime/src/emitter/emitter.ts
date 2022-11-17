import { Events, hooks } from '@ice/shared';

const eventCenter = hooks.call('getEventCenter', Events)!;

export type EventsType = typeof Events;
export { eventCenter, Events };
