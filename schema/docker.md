
### Docker initial example

```env
# ───────────────────────────────
# 1. General / Docker settings
# ───────────────────────────────
COMPOSE_PROJECT_NAME=cexplorer-mini
NETWORK_MODE=mainnet               # mainnet | preprod | preview | own

# ───────────────────────────────
# 2. Cardano Node (read-only relay)
# ───────────────────────────────
CARDANO_NODE_SOCKET_PATH=/ipc/node.socket
CARDANO_NODE_CONFIG_URL=https://book.world.dev.cardano.org/environments/preprod/config.json
CARDANO_NODE_TOPOLOGY_URL=https://book.world.dev.cardano.org/environments/preprod/topology.json

# Genesis hashes (auto-filled by startup script for each network)
CARDANO_GENESIS_HASH_MAINNET=5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940e
CARDANO_GENESIS_HASH_PREPROD=2518a0d61b4b5d1ec3d8f4e9c9f5e6ab0d2f6e8f5c5d5e8f5c5d5e8f5c5d5e8f
CARDANO_GENESIS_HASH_PREVIEW=8a4a23c6b6e6f8e5d6f8e5d6f8e5d6f8e5d6f8e5d6f8e5d6f8e5d6f8e5d6f8e5
CARDANO_GENESIS_HASH_OWN=0

# ───────────────────────────────
# 3. API Layer 
# ───────────────────────────────
GRAPHQL_PORT=3100

# ───────────────────────────────
# 4. Frontend
# ───────────────────────────────
FRONTEND_PORT=3000

# Auto-detect API URL for frontend at build time
VITE_API_URL=http://localhost:${USE_GRAPHQL==true ? GRAPHQL_PORT : REST_EXPLORER_PORT}
VITE_GRAPHQL_URL=http://localhost:${GRAPHQL_PORT}/graphql

# ───────────────────────────────
# 5. Resource limits (safe defaults for laptop)
# ───────────────────────────────
CARDANO_NODE_MEMORY=4g
GRAPHQL_MEMORY=4g
FRONTEND_MEMORY=1g
