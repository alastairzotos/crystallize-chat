import { env } from "../misc/env"

export class HttpService {
  async getChannels(): Promise<string[]> {
    const res = await fetch(`${env.httpUrl}/channels`);
    return await res.json();
  }
}
