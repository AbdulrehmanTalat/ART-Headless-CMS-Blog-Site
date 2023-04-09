import { createClient } from "contentful";
export default class ContentService {
    static get instance() {
      return new ContentService();
    }
  
    client = createClient({
        space: 'aktq9vvjkxu5',
        accessToken: 'JpDhyTdHDUhtu9A5Rkn2l-kbxIs61j4NBWHKH4enX7I'
    });
    async getEntriesByType<T>(type: string) {
      return (
        await this.client.getEntries<T>({
          content_type: type,
        })
      ).items;
    }
  }