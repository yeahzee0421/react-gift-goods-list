import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { API_ENDPOINT } from '@/api/constants/apiPath';
import { fetchData } from '@/api/fetchData';
import { getErrorMessage } from '@/api/getErrorMessage';
import type { FetchState } from '@/api/types/fetchState';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GetGoodsDataResponse, GoodsData } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [fetchState, setFetchState] = useState<FetchState<GoodsData[]>>({
    isLoading: true,
    isError: false,
    isDataNull: false,
    data: null,
    errorMessage: null,
  });

  useEffect(() => {
    const params = {
      maxResults: 20,
    };
    const fetchGoodsList = async () => {
      try {
        const res = await fetchData<GetGoodsDataResponse>(
          API_ENDPOINT.THEME_PRODUCTS(themeKey),
          params,
        );
        if (res.ok) {
          const fetchedData = res.data.products;
          setFetchState({
            isLoading: false,
            isError: false,
            isDataNull: fetchData.length === 0,
            data: fetchedData,
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
    fetchGoodsList();
  }, [themeKey]);

  if (fetchState.isLoading) {
    return <div>로딩 중...</div>;
  }

  if (fetchState.isError) {
    return <div>테마 상품 목록을 불러오지 못했습니다.</div>;
  }

  if (fetchState.isDataNull) {
    return <div>테마 상품 목록이 비어있습니다.</div>;
  }

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {fetchState.data?.map(({ id, imageURL, name, price, brandInfo }) => (
            <DefaultGoodsItems
              key={id}
              imageSrc={imageURL}
              title={name}
              amount={price.sellingPrice}
              subtitle={brandInfo.name}
            />
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;
