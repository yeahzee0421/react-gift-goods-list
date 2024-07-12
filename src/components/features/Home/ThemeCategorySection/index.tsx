import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { API_ENDPOINT } from '@/api/constants/apiPath';
import { fetchData } from '@/api/fetchData';
import { getErrorMessage } from '@/api/getErrorMessage';
import type { FetchState } from '@/api/types/fetchState';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { GetThemeListResponse, ThemeList } from '@/types';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  const [fetchState, setFetchState] = useState<FetchState<ThemeList[]>>({
    isLoading: true,
    isError: false,
    isDataNull: false,
    data: null,
    errorMessage: null,
  });

  useEffect(() => {
    const fetchThemeList = async () => {
      try {
        const res = await fetchData<GetThemeListResponse>(API_ENDPOINT.THEMES);

        if (res.ok) {
          const fetchedData = res.data.themes;
          setFetchState({
            isLoading: false,
            isError: false,
            isDataNull: fetchedData.length === 0,
            data: fetchedData,
            errorMessage: null,
          });
        }
      } catch (error) {
        console.error(getErrorMessage(error));
        setFetchState({
          isLoading: false,
          isError: true,
          isDataNull: true,
          data: null,
          errorMessage: getErrorMessage(error),
        });
      }
    };
    fetchThemeList();
  }, []);

  if (fetchState.isLoading) {
    return <div>로딩 중...</div>;
  }

  if (fetchState.isError) {
    return <div>테마 목록을 불러오지 못했습니다.</div>;
  }

  if (fetchState.isDataNull) {
    return <div>테마 목록이 비어있습니다.</div>;
  }

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {fetchState.data?.map((theme) => (
            <Link key={theme.id} to={getDynamicPath.theme(theme.key)}>
              <ThemeCategoryItem image={theme.imageURL} label={theme.label} />
            </Link>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 14px 14px 3px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 45px 52px 23px;
  }
`;
