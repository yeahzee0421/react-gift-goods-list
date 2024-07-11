import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import apiClient from '@/api';
import { API } from '@/api/constants/apiPath';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GetGoodsDataResponse, GoodsData } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchGoodsList = async () => {
      try {
        const res = await apiClient.get<GetGoodsDataResponse>(API.THEME_PRODUCTS(themeKey), {
          params: {
            maxResults: 20,
          },
        });
        console.log(res.data.products);
        setGoodsList(res.data.products);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGoodsList();
  }, [themeKey]);

  if (isLoading) {
    return <div>Loading...</div>;
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
          {goodsList.map(({ id, imageURL, name, price, brandInfo }) => (
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
