import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import { ThemePageLoading } from '@/components/common/Loader';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  return (
    <Suspense fallback={<ThemePageLoading />}>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </Suspense>
  );
};
