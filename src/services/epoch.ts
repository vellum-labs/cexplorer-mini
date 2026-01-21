import { gql } from "@/lib/gql";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export interface EpochData {
  no: number;
  start_time: string;
  end_time: string;
  out_sum: number;
  fees: number;
  tx_count: number;
  blk_count: number;
}

export interface EpochListData {
  epoch: EpochData[];
}

export interface EpochParamDetail {
  id: number;
  epoch_no: number;
  min_fee_a: number;
  min_fee_b: number;
  max_block_size: number;
  max_tx_size: number;
  max_bh_size: number;
  key_deposit: number;
  pool_deposit: number;
  max_epoch: number;
  optimal_pool_count: number;
  influence: number;
  monetary_expand_rate: number;
  treasury_growth_rate: number;
  decentralisation: number;
  protocol_major: number;
  protocol_minor: number;
  min_utxo_value: number;
  min_pool_cost: number;
  nonce: string;
  cost_model_id: number;
  price_mem: number;
  price_step: number;
  max_tx_ex_mem: number;
  max_tx_ex_steps: number;
  max_block_ex_mem: number;
  max_block_ex_steps: number;
  max_val_size: number;
  collateral_percent: number;
  max_collateral_inputs: number;
  block_id: number;
  extra_entropy: string | null;
  coins_per_utxo_size: number;
  pvt_motion_no_confidence: number;
  pvt_committee_normal: number;
  pvt_committee_no_confidence: number;
  pvt_hard_fork_initiation: number;
  dvt_motion_no_confidence: number;
  dvt_committee_normal: number;
  dvt_committee_no_confidence: number;
  dvt_update_to_constitution: number;
  dvt_hard_fork_initiation: number;
  dvt_p_p_network_group: number;
  dvt_p_p_economic_group: number;
  dvt_p_p_technical_group: number;
  dvt_p_p_gov_group: number;
  dvt_treasury_withdrawal: number;
  committee_min_size: number;
  committee_max_term_length: number;
  gov_action_lifetime: number;
  gov_action_deposit: number;
  drep_deposit: number;
  drep_activity: number;
  pvtpp_security_group: number;
  min_fee_ref_script_cost_per_byte: number;
}

export interface AdaPots {
  id: number;
  slot_no: number;
  epoch_no: number;
  treasury: number;
  reserves: number;
  rewards: number;
  utxo: number;
  deposits_stake: number;
  fees: number;
  block_id: number;
  deposits_drep: number;
  deposits_proposal: number;
}

export interface EpochStat {
  stake: number;
}

export interface EpochDetailData {
  start_time: string;
  end_time: string;
  blk_count: number;
  tx_count: number;
  fees: number;
  stat: EpochStat;
  epoch_param: EpochParamDetail[];
  ada_pots: AdaPots[];
}

export interface EpochDetailResponse {
  mini_epoch_detail: EpochDetailData[];
}

interface EpochParamData {
  epoch_param: {
    max_block_size: number;
  }[];
}

type Vars = {
  limit: number;
  orderBy: { epoch_no: "desc" }[];
};

const EPOCH_LIST_QUERY = `
  query GetEpochs($limit: Int!, $offset: Int!, $orderBy: [epoch_order_by!]!) {
    epoch(limit: $limit, offset: $offset, order_by: $orderBy) {
      no
      start_time
      end_time
      out_sum
      fees
      tx_count
      blk_count
    }
  }
`;

type EpochListVars = {
  limit: number;
  offset: number;
  orderBy: { no: "desc" }[];
};

export const useFetchEpochList = (limit: number) => {
  return useInfiniteQuery<EpochListData, Error>({
    queryKey: ["epochs", limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      gql<EpochListData, EpochListVars>(EPOCH_LIST_QUERY, {
        limit,
        offset: pageParam as number,
        orderBy: [{ no: "desc" }],
      }),

    getNextPageParam: (lastPage, allPages) => {
      const received = lastPage.epoch?.length ?? 0;

      if (received < limit) return undefined;

      return allPages.length * limit;
    },

    refetchOnWindowFocus: true,
    refetchInterval: 20000,
  });
};

const EPOCH_DETAIL_QUERY = `
  query GetEpochDetail($epochNo: Int!) {
    mini_epoch_detail(where: {no: {_eq: $epochNo}}) {
      start_time
      end_time
      blk_count
      tx_count
      fees
      stat
      epoch_param
      ada_pots
    }
  }
`;

type EpochDetailVars = {
  epochNo: number;
};

export const useFetchEpochDetail = (epochNo: string | number) => {
  const epochNumber = typeof epochNo === "string" ? parseInt(epochNo, 10) : epochNo;

  return useQuery<EpochDetailResponse, Error>({
    queryKey: ["epochDetail", epochNumber],
    queryFn: () =>
      gql<EpochDetailResponse, EpochDetailVars>(EPOCH_DETAIL_QUERY, {
        epochNo: epochNumber,
      }),
    enabled: !isNaN(epochNumber),
    refetchOnWindowFocus: true,
  });
};

export const useFetchEpochParam = () => {
  const EPOCH_PARAM_QUERY = `
    query GetEpochParams($limit: Int!, $orderBy: [epoch_param_order_by!]!) {
        epoch_param(limit: $limit, order_by: $orderBy) {
            max_block_size
        }
    }
    `;

  return useQuery({
    queryKey: ["epoch_params"],
    queryFn: () =>
      gql<EpochParamData, Vars>(EPOCH_PARAM_QUERY, {
        limit: 1,
        orderBy: [{ epoch_no: "desc" }],
      }),
  });
};
