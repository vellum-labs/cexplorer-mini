##  cardano-db-sync

We need some changes in cardano-db-sync config file in insert_options part as following:

```json
{
...
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
    "pool_stats": "enable",

	}
...
}
```
