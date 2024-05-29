import {DashboardBannerText} from "@/lib/types.ts";

export const STORAGE_KEY_TOKEN = 'lnkc_token';
export const STORAGE_KEY_TEAM = 'lnkc_team';

export const QUERY_KEY_USER_ME = 'users/me';

export const QUERY_KEY_LINKS = 'links';

export const DASHBOARD_BANNER_TEXT: DashboardBannerText = {
  touched: {
    title: 'Viola!',
    description: 'Here’re your shortened links ✨',
  },
  empty: {
    title: 'Ah, dearth!',
    description: 'You currently have no shortened links. Give it a try and start shortening...',
  },
}