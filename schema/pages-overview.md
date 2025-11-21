# CExplorer-Mini – Pages & Features (Final Specification)

This document lists all pages that will be available in CExplorer-Mini.  
Everything is built exclusively on top of cardano-graphql (no db-sync), which makes the explorer extremely lightweight, fast to start and perfect for local or low-resource environments.

Small operational adjustments may still happen during development depending on the exact shape of data returned by the chosen cardano-graphql version and available client libraries.

## 1. Home / Dashboard (`/`)

Quick, real-time snapshot of the Cardano mainnet.

- Current epoch + progress bar  
- Latest block height & hash  
- Current slot and time to next epoch  
- Selection of useful protocol parameters (slot duration, epoch length, decentralisation `d`, …)  
- Table of the last 10 blocks (height, epoch/slot, transactions, size, producer)

## 2. Epoch Detail (`/epoch/:epochNo`)

Everything you need to know about a specific epoch.

**Overview tab**
- Epoch number, start/end time  
- Total blocks, total transactions, total output value  
- Top 10 performing pools (ticker + blocks produced)

**Blocks tab**
- Fully paginated list of every block in the epoch

## 3. Block Detail (`/block/:hash` or `/block/:height`)

Complete view of a single block.

**Overview tab**
- Block height, hash, epoch, slot, timestamp  
- Block size, transaction count  
- Producer pool (ticker + pool ID)  
- Links to previous / next block

**Transactions tab**
- Paginated list of all transaction hashes contained in the block (fee + size columns)

## 4. Transaction Detail (`/transaction/:hash`)

Clear and fast transaction summary.

**Overview tab**
- Transaction hash, block link, inclusion time  
- Fee, size, TTL  
- Total output value

**Outputs tab**
- List of receiving addresses with exact amounts (ADA + native tokens)

**Assets tab** (appears only when tokens are moved)
- Clean table of every native asset transferred in this transaction

## 5. Address Detail (`/address/:bech32`)

Current on-chain state of any Cardano address.

**Summary tab**
- Address, type (payment / stake / script)  
- Current total balance  
- Associated stake key (when present)

**UTxOs tab**
- Complete list of current unspent outputs belonging to the address  
  (tx hash + index, value, assets)

**Assets tab**
- All native tokens currently held by the address with quantities

## 6. Stake Pool Detail (`/pool/:bech32PoolId`)

Live view of any stake pool.

**Overview tab**
- Pool ID (bech32), ticker/name (when metadata is available)  
- Pledge, fixed cost, margin  
- Current live stake and delegator count

**Blocks tab**
- Recent blocks produced by this pool (latest first)

## 7. Asset Detail (`/asset/:policyId/:assetName` or `/asset/:fingerprint`)

On-chain information about any native token.

- Policy ID + asset name (hex + readable when possible)  
- Asset fingerprint  
- Total minted amount  
- Current circulating supply (calculated from live UTxOs)  
- Minting policy script (when present)  
- Most recent mint/burn transaction

## 8. Global Search (`/search?q=…`)

One search bar to rule them all – just paste anything:

- block hash → Block Detail  
- block height → Block Detail  
- transaction hash → Transaction Detail  
- address → Address Detail  
- pool ID → Stake Pool Detail  
- asset fingerprint or policy+name → Asset Detail  
- epoch number → Epoch Detail  

Smart detection + instant redirect (or tiny disambiguation list when needed).

## 9. Network Stats (`/network`)

Lightweight global numbers, always up-to-date.

- Current epoch & slot  
- Active stake pools  
- Total live stake  
- Circulating supply  
- Treasury & reserves balance  

## 10. About (`/about`)

- What CExplorer-Mini is  
- Technology stack (cardano-graphql only)  
- Why it’s perfect for local/offline/low-resource use  
- Link to GitHub repository  
- License (MIT)  
- Small thank-you to Project Catalyst Fund 14 for funding the project

We are excited to deliver a clean, fast and 100% self-contained Cardano explorer that anyone can run on a laptop or small server in seconds!
