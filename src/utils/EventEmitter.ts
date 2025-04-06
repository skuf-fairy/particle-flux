export type EventCallback = <D>(data: D) => void;

export class EventEmitter {
  private events: Map<string, EventCallback[]> = new Map();

  public on(event: string, callback: EventCallback): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
  }

  public off(event: string, callback: EventCallback): void {
    const callbacks = this.events.get(event);
    if (!callbacks) return;

    this.events.set(
      event,
      callbacks.filter((cb) => cb !== callback),
    );
  }

  public emit<D>(event: string, data: D): void {
    const callbacks = this.events.get(event);
    if (!callbacks) return;

    callbacks.forEach((callback) => callback(data));
  }
}
