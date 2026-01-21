// import { gql } from "@/lib/gql";
// import { useInfiniteQuery } from "@tanstack/react-query";

// export interface TxListData {}

// type Vars = {
//   limit: number;
//   offset: number;
// };

// const TX_LIST_QUERY = `
//     query GetTxList(limit: Int!, offset: Int!) {
//         tx(limit: $limit, offset: $offset) {
//             hash
//             out_sum
//             fee
//             size
//             script_size
//         }
//     }
// `;

// export const useFetchTxList = (limit: number) => {
//   return useInfiniteQuery<TxListData, Error>({
//     queryKey: ["tx", limit],
//     queryFn: ({ pageParam }) =>
//       gql<TxListData, Vars>(TX_LIST_QUERY, {
//         limit,
//         offset: pageParam,
//       }),
//     getNextPageParam: (lastPage, allPages) => {
//       const received = lastPage.block?.length ?? 0;

//       if (received < limit) return undefined;

//       return allPages.length * limit;
//     },

//     refetchOnWindowFocus: true,
//     refetchInterval: 20000,
//   });
// };
