# CExplorer-Mini – Frontend Development Instructions

Welcome to the frontend of **Cexplorer-mini** – the fastest, fully local Cardano explorer that anyone can run on a laptop in seconds.

### Project Philosophy
- Lightning-fast (even on modest hardware)
- Works 100 % offline / localhost
- Data source = cardano-graphql + Ogmios (no db-sync)
- Show less data rather than more → speed & simplicity first
- Positive, clean user experience (never “data unavailable”)

### Tech Stack (locked – no additions without discussion)
- React 18 + TypeScript
- Vite (dev server + build)
- React Router v6.4+
- Tailwind CSS v3.4+ (no component library – we stay tiny)
- Zustand – global lightweight state
- Lucide-react icons

### Routing – exact paths (alphabetically sorted, do not change)

| Path                           | Component                  | Notes                                   |
|--------------------------------|----------------------------|---------------------------------------------------|
| `/`                            | `HomeDashboard.tsx`        |                                                   |
| `/about`                       | `About.tsx`                |                                                   |
| `/address/:bech32`             | `AddressDetail.tsx`        | Payment / base address                            |
| `/asset/:fingerprint`          | `AssetDetail.tsx`          | Alternative URL                                   |
| `/asset/:policyId/:name`       | `AssetDetail.tsx`          | Policy ID + asset name (hex)                      |
| `/block/:id`                   | `BlockDetail.tsx`          | `:id` = hash or block height                      |
| `/drep/:drepId`                | `DRepDetail.tsx`           | TBD if implement this page; DRep ID (bech32 or hex)              |
| `/epoch/:no`                   | `EpochDetail.tsx`          | Epoch number                                      |
| `/network`                     | `NetworkStats.tsx`         |                                                   |
| `/pool/:poolId`                | `PoolDetail.tsx`           | bech32 pool ID                                    |
| `/search`                      | `SearchResult.tsx`         | Handles redirects internally                      |
| `/stake/:stakeKey`             | `StakeAddressDetail.tsx`   | Stake key (bech32, starts with `stake_`)          |
| `/transaction/:hash`           | `TransactionDetail.tsx`    |                                                   |

### Data Fetching – strict rules
- Every page must use its own hook from `src/api/queries/`
  - `useStakeAddress.ts`, `useDRep.ts`, etc.
- Default `staleTime: 30_000` (30 seconds)
- Infinite scroll only on:
  - Block → Transactions tab
  - Epoch → Blocks tab
  - Stake Address → Rewards history (when implemented)
- Always show Skeleton UI (minimum 3 rows)
- On error → friendly toast “Node is syncing… retrying”

### Design & UX Rules
- Mobile-first (fully usable at 360 px width)
- Dark mode by default, light mode toggle in header
- All hashes, addresses, stake keys, DRep IDs → copy-to-clipboard on click
- Shorten strings: `shortenHash(str, 10)` → `cardano…abc123`
- Amounts: `formatAda(lovelace, { compact: true })`
- Internal navigation = `<Link>` only (no full page reloads)

### Global Search automatically recognises
- `addr1…` → `/address/…`
- `stake1…` → `/stake/…`
- `drep1…` or hex DRep → `/drep/…`
- `pool1…` → `/pool/…`
- block hash / height → `/block/…`
- transaction hash → `/transaction/…`
- asset fingerprint → `/asset/…`

Happy coding – let’s keep it fast, beautiful and 100 % local!
