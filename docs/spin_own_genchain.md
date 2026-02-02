# Instructions on How to Spin Up Your Own Genesis Chain and Run a Local Mini Explorer on It

## Introduction

This guide provides step-by-step instructions for setting up a private Cardano testnet (genesis chain) using Docker and running a local mini explorer on it using the cexplorer-mini project. The genesis chain is a private Shelley testnet starting from the genesis block. The mini explorer is based on cardano-db-sync, Hasura GraphQL Engine, and the cexplorer-mini frontend, which allows you to query and view blockchain data locally.

This setup is for the cexplorer-mini project (https://github.com/vellum-labs/cexplorer-mini), providing a lightweight way to explore a custom genesis chain.

**Note:** This assumes a Linux environment, but adaptations can be made for other OS. All commands are run in a terminal. Ensure cardano-node and cardano-db-sync versions are compatible (e.g., latest stable for Shelley-era private net).

## Prerequisites

- Docker and Docker Compose installed.
- Git installed.
- Node.js and pnpm installed (for the frontend).
- Basic knowledge of command-line tools.
- Sufficient disk space (at least 10GB for DB sync).
- PostgreSQL installed (or use Docker for it).
- Access to Cardano binaries (we'll build or download them).

## Step 1: Set Up the Genesis Chain (Private Testnet)

We'll use a Docker-based setup to run two nodes in a private network.

### 1.1 Clone the Repository

Clone the shelley-private-testnet repository:

```
git clone https://github.com/ItFlyingStart/shelley-private-testnet.git
cd shelley-private-testnet/script
```

### 1.2 Start Docker Containers

Build and start the containers:

```
docker-compose up -d
```

Verify containers are running:

```
docker ps
```

You should see `node1` and `node2`.

### 1.3 Connect to Node1

```
docker exec -it node1 bash
```

All subsequent commands in this step are run inside the node1 container unless specified.

### 1.4 Generate Genesis Files

Create default folders and files:

```
cardano-cli shelley genesis create --genesis-dir config/shared/ --testnet-magic 42
```

### 1.5 Generate Keys

- Genesis keys:

```
cardano-cli shelley genesis key-gen-genesis --verification-key-file config/shared/genesis-keys/genesis1.vkey --signing-key-file config/shared/genesis-keys/genesis1.skey
cardano-cli shelley genesis key-gen-genesis --verification-key-file config/shared/genesis-keys/genesis2.vkey --signing-key-file config/shared/genesis-keys/genesis2.skey
```

- Delegate keys:

```
cardano-cli shelley genesis key-gen-delegate --verification-key-file config/shared/delegate-keys/delegate1.vkey --signing-key-file config/shared/delegate-keys/delegate1.skey --operational-certificate-issue-counter config/shared/delegate-keys/delegate-opcert1.counter
cardano-cli shelley genesis key-gen-delegate --verification-key-file config/shared/delegate-keys/delegate2.vkey --signing-key-file config/shared/delegate-keys/delegate2.skey --operational-certificate-issue-counter config/shared/delegate-keys/delegate-opcert2.counter
```

- UTxO keys:

```
cardano-cli shelley genesis key-gen-utxo --verification-key-file config/shared/utxo-keys/utxo1.vkey --signing-key-file config/shared/utxo-keys/utxo1.skey
cardano-cli shelley genesis key-gen-utxo --verification-key-file config/shared/utxo-keys/utxo2.vkey --signing-key-file config/shared/utxo-keys/utxo2.skey
```

### 1.6 Prepare Nodes

- KES keys:

```
cardano-cli shelley node key-gen-KES --verification-key-file config/node1/kes.vkey --signing-key-file config/node1/kes.skey
cardano-cli shelley node key-gen-KES --verification-key-file config/node2/kes.vkey --signing-key-file config/node2/kes.skey
```

- VRF keys:

```
cardano-cli shelley node key-gen-VRF --verification-key-file config/node1/vrf.vkey --signing-key-file config/node1/vrf.skey
cardano-cli shelley node key-gen-VRF --verification-key-file config/node2/vrf.vkey --signing-key-file config/node2/vrf.skey
```

- Issue op certs:

```
cardano-cli shelley node issue-op-cert --hot-kes-verification-key-file config/node1/kes.vkey --cold-signing-key-file config/shared/delegate-keys/delegate1.skey --operational-certificate-issue-counter config/shared/delegate-keys/delegate-opcert1.counter --kes-period 0 --out-file config/node1/cert
cardano-cli shelley node issue-op-cert --hot-kes-verification-key-file config/node2/kes.vkey --cold-signing-key-file config/shared/delegate-keys/delegate2.skey --operational-certificate-issue-counter config/shared/delegate-keys/delegate-opcert2.counter --kes-period 0 --out-file config/node2/cert
```

### 1.7 Configure Topology (Optional)

If needed, update `topology.json` with correct IPs.

### 1.8 Run the Nodes

Generate genesis with supply:

```
cardano-cli shelley genesis create --genesis-dir config/shared/ --supply 8000000000000 --testnet-magic 42
```

Start node1 (in a screen session):

```
screen -S executor
cardano-node run --config config/node1/config.json --topology config/node1/topology.json --database-path db --socket-path db/node.sock --shelley-kes-key config/node1/kes.skey --shelley-vrf-key config/node1/vrf.skey --shelley-operational-certificate config/node1/cert --port 3001
```

Detach with Ctrl+A+D.

Repeat for node2 in its container (port 3002).

Your genesis chain is now running!

## Step 2: Set Up cardano-db-sync

cardano-db-sync syncs data from the node to PostgreSQL.

### 2.1 Set Up PostgreSQL

Install PostgreSQL locally or use Docker. Create a database (e.g., `cexplorer_db`).

For example, using Docker:

```
docker run -d --name postgres -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 postgres
```

Create DB and user (adjust credentials as needed):

```
docker exec -it postgres psql -U postgres -c "CREATE DATABASE cexplorer_db;"
docker exec -it postgres psql -U postgres -c "CREATE USER graphql WITH PASSWORD 'graphql';"
docker exec -it postgres psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE cexplorer_db TO graphql;"
```

### 2.2 Install cardano-db-sync

Clone the repo:

```
git clone https://github.com/IntersectMBO/cardano-db-sync.git
cd cardano-db-sync
```

Build with Nix or from source (see repo docs). Or download binary from releases.

Assume binary is in PATH.

### 2.3 Configure and Run

Update your config.json to point to your node's socket (e.g., /path/to/db/node.sock) and PostgreSQL (e.g., postgres://graphql:graphql@localhost:5432/cexplorer_db).

Add the following to the "insert_options" section in config.json:

```json
"insert_options": {
  "tx_out": {
    "value": "consumed"
  },
  "ledger": "enable",
  "shelley": {
    "enable": true
  },
  "multi_asset": {
    "enable": true
  },
  "metadata": {
    "enable": true
  },
  "plutus": {
    "enable": true
  },
  "governance": "enable",
  "pool_stat": "enable",
  "pool_stats": "enable"
}
```

Run:

```
cardano-db-sync --config your-config.json --socket-path /path/to/node.sock --schema-dir schema/
```

It will start syncing from genesis.

### 2.4 Import Views

Once synced, import the required views into your PostgreSQL database. Download and run the SQL script:

```
curl -O https://raw.githubusercontent.com/vellum-labs/cexplorer-mini/main/docs/views.sql
docker exec -it postgres psql -U graphql -d cexplorer_db -f views.sql
```

(Note: The views.sql creates necessary views like mini_account_detail, mini_address_tx_list, etc.)

## Step 3: Set Up Hasura GraphQL Engine

Use Docker to run Hasura connected to your PostgreSQL.

### 3.1 Create docker-compose.yml for Hasura

Based on the example:

```yaml
version: "3.9"
services:
  hasura:
    image: hasura/graphql-engine:v2.25.1
    network_mode: "host"
    environment:
      HASURA_GRAPHQL_DATABASE_URL: postgres://graphql:graphql@127.0.0.1:5432/cexplorer_db
      HASURA_GRAPHQL_ENABLE_CONSOLE: "false"
      HASURA_GRAPHQL_DEV_MODE: "false"
      HASURA_GRAPHQL_ADMIN_SECRET: "your-hasura-admin-secret-here"
```

Adjust the DATABASE_URL and ADMIN_SECRET as per your setup.

### 3.2 Run Hasura

```
docker-compose up -d
```

The GraphQL endpoint will be at http://localhost:8080/v1/graphql.

**Security Note:** Never expose Hasura publicly without proper security (e.g., admin secret, roles, JWT).

## Step 4: Set Up cexplorer-mini Frontend

### 4.1 Clone the Repository

```
git clone https://github.com/vellum-labs/cexplorer-mini.git
cd cexplorer-mini
```

### 4.2 Update to Latest

```
git pull origin main
```

### 4.3 Set Environment Variables

Create a .env file:

```
VITE_GQL_ENDPOINT="http://localhost:8080/v1/graphql"
VITE_HASURA_ADMIN_SECRET="your-hasura-admin-secret-here"
```

(Omit VITE_HASURA_ADMIN_SECRET if not using one.)

### 4.4 Install Dependencies

```
pnpm install
```

### 4.5 Run the Development Server

```
npm run dev
```

Access the mini explorer at http://localhost:5173.

For production build:

```
pnpm build
```

Files in /dist/.

## Step 5: Test and Explore

- Create transactions on the chain as per the testnet tutorial.
- Use the mini explorer to view blocks, transactions, accounts, etc.

## Troubleshooting

- Ensure node socket is accessible by db-sync.
- Check Hasura logs for DB connection issues.
- Verify views are imported correctly in PostgreSQL.
- For more details, refer to official Cardano docs and cexplorer-mini README.

## Cleanup

Stop nodes and containers:

```
docker-compose down
```

This completes the setup for your local genesis chain with cexplorer-mini!
