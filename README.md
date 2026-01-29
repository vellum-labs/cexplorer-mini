# Cexplorer Mini

**Lightweight** and fast frontend for exploring the Cardano blockchain – optimized especially for **local development** environments (your own cardano-node + db-sync + Hasura instance).

> This mini version is a simplified, faster, and significantly lighter alternative inspired by the full-featured explorer at **[cexplorer.io](https://cexplorer.io)**.  
> Ideal for developers running their own local/testnet chain.

## Features
- Real-time Cardano blockchain data
- Explorer for transactions, addresses, blocks, assets, epochs, stake pools, etc.
- Clean, minimal and performant UI
- Powered by Hasura GraphQL

## Prereq
- cardano-node (version compatible with your network)
- cardano-db-sync (synced with the node)
   -  config changes: https://github.com/vellum-labs/cexplorer-mini/blob/main/docs/db-sync-extra.md
   -  imported views into postgresql: https://github.com/vellum-labs/cexplorer-mini/blob/main/docs/views.sql 
- Hasura GraphQL Engine (v2.x or v3.x) – exposed at e.g. `http://localhost:8080/v1/graphql`
   - docker install example: https://github.com/vellum-labs/cexplorer-mini/blob/main/docs/docker_hasura.md

## Quick Start

```bash
# 1. Clone git repo
git clone https://github.com/vellum-labs/cexplorer-mini
cd cexplorer-mini

# 2. Get latest version
git pull origin main

# 3. Set required environment variables
export VITE_GQL_ENDPOINT="http://your-own-cardano-graphql-instance/v1/graphql"
export VITE_HASURA_ADMIN_SECRET="your-hasura-admin-secret-here" # "" if is not used secret

# Alternative (create .env file in project root):
# echo "VITE_GQL_ENDPOINT=https://mini-gql.cexplorer.io/v1/graphql" > .env
# echo "VITE_HASURA_ADMIN_SECRET=xxxx" >> .env

# 4. Install dependencies
pnpm install

# 5. Start development server
npm run dev # in some cases, initially you need run this for a few seconds

# 6. Build / dev
pnpm build
# or  pnpm dev - http://localhost:5173 (default Vite port)
```

The production-ready files will be in the /dist/ folder.

## Tech Stack
- Vite + React + TypeScript
- Hasura GraphQL (backend data layer)
- Package manager: pnpm

## Security
- Never expose your Hasura instance publicly without proper protection!
- Hasura gives full access to your database via GraphQL by default. Without roles, permissions, JWT or allow-lists, anyone can read/write/delete data.
- Use admin secret (strongly recommended) or switch to proper authentication (JWT / webhook).
- For public-facing deployments consider:Hasura Cloud with built-in security
- Reverse proxy + rate limiting
- Strict RBAC + query allow-lists
 
Do not use an empty HASURA_GRAPHQL_ADMIN_SECRET in production.

## About & Funding & Disclaimer

Cexplorer Mini is **fully funded** through a grant from **Cardano Catalyst**, the community-driven treasury and innovation program of the Cardano blockchain. The entire development was supported by the Cardano community via Catalyst votes and funding rounds.

The project is **100% open source** and licensed under the **[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)** — a permissive license that allows broad reuse, modification, and distribution (including in commercial products), as long as the original copyright and license notices are preserved.

The software is provided **as-is**, without any warranties, express or implied. The authors, contributors, and funding entities (including Cardano Catalyst and the Cardano community) bear **no responsibility** or liability whatsoever for any damages — direct, indirect, incidental, special, consequential, or otherwise — arising from the use, misuse, or inability to use this software. This includes (but is not limited to) financial losses, data inaccuracies, business interruptions, reliance on displayed blockchain information, or any other issues.  

Users must independently verify all blockchain data, transactions, addresses, and any other information with official Cardano nodes, multiple explorers, or trusted sources. No guarantees are made regarding uptime, correctness, security, or fitness for any particular purpose.

Made with ❤️ for the Cardano community


