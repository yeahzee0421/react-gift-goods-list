import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';

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

const fetchGoodsData = async (themeKey: string) => {
  const params = {
    maxResults: 20,
  };
  const { data } = await fetchData<GetGoodsDataResponse>(
    API_ENDPOINT.THEME_PRODUCTS(themeKey),
    params,
  );
  return data.products;
};
export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { data } = useSuspenseQuery<GoodsData[]>({
    queryKey: ['goodsData'],
    queryFn: () => fetchGoodsData(themeKey),
  });

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
          {data.map(({ id, imageURL, name, price, brandInfo }) => (
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
