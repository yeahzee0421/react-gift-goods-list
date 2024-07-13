import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { API_ENDPOINT } from '@/api/constants/apiPath';
import { fetchData } from '@/api/fetchData';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import { type GoodsData, type RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

const fetchGoodsList = async (filterOption: RankingFilterOption) => {
  const params = {
    targetType: filterOption.targetType,
    rankType: filterOption.rankType,
  };
  const { data } = await fetchData<GoodsData[]>(API_ENDPOINT.RANKING, params);
  return data;
};

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const { data, error, isLoading } = useQuery<GoodsData[]>({
    queryKey: ['goodsList', filterOption],
    queryFn: () => fetchGoodsList(filterOption),
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>상품 목록 로딩 에러</div>;
  }
  if (!data) {
    return <div>상품 목록이 비어있습니다.</div>;
  }

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <GoodsRankingList goodsList={data} />;
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 0 16px 32px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 0 16px 80px;
  }
`;

const Title = styled.h2`
  color: #000;
  width: 100%;
  text-align: left;
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;

  @media screen and (min-width: ${breakpoints.sm}) {
    text-align: center;
    font-size: 35px;
    line-height: 50px;
  }
`;
