export class RateLimiter {
  private static readonly WINDOW_MS = 60 * 60 * 1000;
  private static readonly MAX_REQUESTS = 4000;
  private static requests = new Map<string, number[]>();

  private static prune(endpoint: string, now: number): number[] {
    const windowStart = now - this.WINDOW_MS;
    const list = this.requests.get(endpoint) ?? [];
    const pruned = list.filter((ts) => ts > windowStart);
    this.requests.set(endpoint, pruned);
    return pruned;
  }

  static canMakeRequest(endpoint: string): boolean {
    const now = Date.now();
    const recent = this.prune(endpoint, now);
    return recent.length < this.MAX_REQUESTS;
  }

  static recordRequest(endpoint: string): void {
    const now = Date.now();
    const recent = this.prune(endpoint, now);

    if (recent.length >= this.MAX_REQUESTS) {
      return;
    }

    recent.push(now);
    this.requests.set(endpoint, recent);
  }

  static getRemainingRequests(endpoint: string): number {
    const now = Date.now();
    const recent = this.prune(endpoint, now);
    const remaining = this.MAX_REQUESTS - recent.length;
    return remaining > 0 ? remaining : 0;
  }
}
