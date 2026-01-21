import { gql } from "@/lib/gql";
import { useQuery } from "@tanstack/react-query";

interface EpochParamData {
  epoch_param: {
    max_block_size: number;
  }[];
}

type Vars = {
  limit: number;
  orderBy: { epoch_no: "desc" }[];
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
