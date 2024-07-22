export const API_ENDPOINT = {
  THEMES: '/api/v1/themes',
  RANKING: '/api/v1/ranking/products',
  THEME_PRODUCTS: (themeKey: string) => `/api/v1/themes/${themeKey}/products`,
};
