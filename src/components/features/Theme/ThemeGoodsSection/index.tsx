import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { API_ENDPOINT } from '@/api/constants/apiPath';
import { fetchData } from '@/api/fetchData';
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
        if (res) {
          console.log(res);
          setGoodsList(res.products);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchGoodsList();
  }, [themeKey]);

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
