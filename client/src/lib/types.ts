export type DashboardBannerTextKey = 'touched' | 'empty';
export type DashboardBannerTextValue = {
  title: string;
  description: string;
};
export type DashboardBannerText = Record<DashboardBannerTextKey, DashboardBannerTextValue>;