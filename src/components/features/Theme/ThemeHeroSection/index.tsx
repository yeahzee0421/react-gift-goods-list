import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { API_ENDPOINT } from '@/api/constants/apiPath';
import { fetchData } from '@/api/fetchData';
import { getErrorMessage } from '@/api/getErrorMessage';
import type { FetchState } from '@/api/types/fetchState';
import { Container } from '@/components/common/layouts/Container';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { GetThemeDataResponse } from '@/types';
import { type ThemeData } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeHeroSection = ({ themeKey }: Props) => {
  const [fetchState, setFetchState] = useState<FetchState<ThemeData>>({
    isLoading: true,
    isError: false,
    isDataNull: false,
    data: null,
    errorMessage: null,
  });

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const res = await fetchData<GetThemeDataResponse>(API_ENDPOINT.THEMES);
        if (res.ok) {
          const theme = getCurrentTheme(themeKey, res.data.themes);
          setFetchState({
            isLoading: false,
            isError: false,
            isDataNull: theme === null,
            data: theme || null,
            errorMessage: null,
          });
        }
      } catch (error) {
        console.error(error);
        setFetchState({
          isLoading: false,
          isError: true,
          isDataNull: true,
          data: null,
          errorMessage: getErrorMessage(error),
        });
      }
    };

    fetchThemeData();
  }, [themeKey]);

  if (fetchState.isLoading) {
    return <div>로딩 중...</div>;
  }

  if (fetchState.isError) {
    return <div>테마 섹션을 불러오지 못했습니다.</div>;
  }

  if (fetchState.isDataNull) {
    return <div>테마 섹션이 비어있습니다.</div>;
  }

  if (!fetchState?.data?.key) {
    return <Navigate to={RouterPath.home} />;
  }

  const { backgroundColor, label, title, description } = fetchState.data;
  return (
    <Wrapper backgroundColor={backgroundColor}>
      <Container>
        <Label>{label}</Label>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section<{ backgroundColor: string }>`
  padding: 27px 20px 23px;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 50px 20px;
  }
`;

const Label = styled.p`
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.7);

  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 20px;
    line-height: 24px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  color: #fff;
  font-size: 18px;
  line-height: 26px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;

  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 30px;
    line-height: 40px;
    padding-top: 12px;
    word-break: break-word;
  }
`;

const Description = styled.p`
  padding-top: 5px;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.55);
  word-break: break-all;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding-top: 12px;
    font-size: 24px;
    line-height: 32px;
  }
`;

export const getCurrentTheme = (themeKey: string, themeList: ThemeData[]): ThemeData | null => {
  return themeList.find((theme) => theme.key === themeKey) || null;
};
