import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { API_ENDPOINT } from '@/api/constants/apiPath';
import { fetchData } from '@/api/fetchData';
import { getErrorMessage } from '@/api/getErrorMessage';
import type { FetchState } from '@/api/types/fetchState';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { GetGoodsDataResponse } from '@/types';
import { type GoodsData, type RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const [fetchState, setFetchState] = useState<FetchState<GoodsData[]>>({
    isLoading: true,
    isError: false,
    isDataNull: false,
    data: null,
    errorMessage: null,
  });

  useEffect(() => {
    const params = {
      targetType: filterOption.targetType,
      rankType: filterOption.rankType,
    };
    const fetchGoodsList = async () => {
      try {
        const res = await fetchData<GetGoodsDataResponse>(API_ENDPOINT.RANKING, params);
        if (res.ok) {
          const fetchedData = res.data.products;
          setFetchState({
            isLoading: false,
            isError: false,
            isDataNull: fetchedData.length === 0,
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
  }, [filterOption]);

  if (fetchState.isLoading) {
    return <div>로딩 중...</div>;
  }

  if (fetchState.isError) {
    return <div>상품 목록을 불러오지 못했습니다.</div>;
  }

  if (fetchState.isDataNull || fetchState.data === null) {
    return <div>상품 목록이 비어있습니다.</div>;
  }

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <GoodsRankingList goodsList={fetchState.data} />;
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
