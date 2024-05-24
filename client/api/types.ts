export interface ILink {
  id: string;
  title: string;
  description: string;
  url: string;
  shortCode: string;
  hasQr: boolean;
  isCustom: boolean;
  isPinned: boolean;
  properties: object;
  team: object;
  analyticsCount?: number;
}
