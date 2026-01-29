--
-- PostgreSQL database dump
--

\restrict xagqBDGhMQxiVKI3dQwP8geJy9HHmkEHLVz9OAdnNSawkd7HxXpTyxaa8q176lP

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 492 (class 1259 OID 20268938)
-- Name: mini_account_detail; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.mini_account_detail AS
 WITH max_epoch AS (
         SELECT max((epoch.no)::integer) AS max_no
           FROM public.epoch
        ), reward_rest_agg AS (
         SELECT r.addr_id,
            sum((r.amount)::numeric) FILTER (WHERE (r.type = 'reserves'::public.rewardtype)) AS reserves,
            sum((r.amount)::numeric) FILTER (WHERE (r.type = 'treasury'::public.rewardtype)) AS treasury,
            sum((r.amount)::numeric) FILTER (WHERE (r.type = 'proposal_refund'::public.rewardtype)) AS proposal_refund
           FROM (public.reward_rest r
             JOIN max_epoch e ON ((r.spendable_epoch <= e.max_no)))
          GROUP BY r.addr_id
        ), rewards_agg AS (
         SELECT r.addr_id,
            sum((r.amount)::numeric) AS rewards
           FROM (public.reward r
             JOIN max_epoch e ON ((r.spendable_epoch <= e.max_no)))
          GROUP BY r.addr_id
        ), withdrawals_agg AS (
         SELECT w.addr_id,
            sum((w.amount)::numeric) AS withdrawals
           FROM public.withdrawal w
          GROUP BY w.addr_id
        ), utxo_agg AS (
         SELECT tx.stake_address_id AS addr_id,
            sum((tx.value)::numeric) AS utxo
           FROM public.tx_out tx
          WHERE (tx.consumed_by_tx_id IS NULL)
          GROUP BY tx.stake_address_id
        )
 SELECT encode((sa.hash_raw)::bytea, 'hex'::text) AS stake_hash,
    sa.view AS stake_view,
        CASE
            WHEN status_t.registered THEN 'registered'::text
            ELSE 'not registered'::text
        END AS status,
    pool_t.delegated_pool,
    vote_t.delegated_drep,
    (((((COALESCE(utxo.utxo, (0)::numeric) + COALESCE(rw.rewards, (0)::numeric)) + COALESCE(rr.reserves, (0)::numeric)) + COALESCE(rr.treasury, (0)::numeric)) - COALESCE(wd.withdrawals, (0)::numeric)))::text AS total_balance,
    (COALESCE(utxo.utxo, (0)::numeric))::text AS utxo,
    (COALESCE(rw.rewards, (0)::numeric))::text AS rewards,
    (COALESCE(wd.withdrawals, (0)::numeric))::text AS withdrawals,
    (((((COALESCE(rw.rewards, (0)::numeric) + COALESCE(rr.reserves, (0)::numeric)) + COALESCE(rr.treasury, (0)::numeric)) + COALESCE(rr.proposal_refund, (0)::numeric)) - COALESCE(wd.withdrawals, (0)::numeric)))::text AS rewards_available,
    (COALESCE((status_t.deposit)::numeric, (0)::numeric))::text AS deposit,
    (COALESCE(rr.reserves, (0)::numeric))::text AS reserves,
    (COALESCE(rr.treasury, (0)::numeric))::text AS treasury,
    (COALESCE(rr.proposal_refund, (0)::numeric))::text AS proposal_refund,
    ( SELECT jsonb_agg(data.*) AS jsonb_agg
           FROM ( SELECT (encode((ma.policy)::bytea, 'hex'::text) || encode((ma.name)::bytea, 'hex'::text)) AS asset_name,
                    sum((mto.quantity)::numeric) AS quantity
                   FROM (((public.tx_out
                     JOIN public.tx ON ((tx_out.tx_id = tx.id)))
                     JOIN public.ma_tx_out mto ON ((mto.tx_out_id = tx_out.id)))
                     JOIN public.multi_asset ma ON ((ma.id = mto.ident)))
                  WHERE ((tx_out.stake_address_id = sa.id) AND (tx_out.consumed_by_tx_id IS NULL))
                  GROUP BY (encode((ma.policy)::bytea, 'hex'::text) || encode((ma.name)::bytea, 'hex'::text))
                 HAVING (sum((mto.quantity)::numeric) > (0)::numeric)) data) AS asset
   FROM (((((((public.stake_address sa
     LEFT JOIN LATERAL ( SELECT (EXISTS ( SELECT 1
                   FROM public.stake_registration sr
                  WHERE ((sr.addr_id = sa.id) AND (NOT (EXISTS ( SELECT 1
                           FROM public.stake_deregistration sd
                          WHERE ((sd.addr_id = sr.addr_id) AND (sd.tx_id > sr.tx_id)))))))) AS registered,
            ( SELECT sr.deposit
                   FROM public.stake_registration sr
                  WHERE ((sr.addr_id = sa.id) AND (NOT (EXISTS ( SELECT 1
                           FROM public.stake_deregistration sd
                          WHERE ((sd.addr_id = sr.addr_id) AND (sd.tx_id > sr.tx_id))))))
                  ORDER BY sr.tx_id DESC
                 LIMIT 1) AS deposit) status_t ON (true))
     LEFT JOIN ( SELECT d.addr_id,
            encode((ph.hash_raw)::bytea, 'hex'::text) AS delegated_pool
           FROM (public.delegation d
             JOIN public.pool_hash ph ON ((ph.id = d.pool_hash_id)))
          WHERE (NOT (EXISTS ( SELECT 1
                   FROM public.delegation d2
                  WHERE ((d2.addr_id = d.addr_id) AND (d2.id > d.id)))))) pool_t ON ((pool_t.addr_id = sa.id)))
     LEFT JOIN ( SELECT dv.addr_id,
            encode((dh.raw)::bytea, 'hex'::text) AS delegated_drep
           FROM (public.delegation_vote dv
             JOIN public.drep_hash dh ON ((dh.id = dv.drep_hash_id)))
          WHERE (NOT (EXISTS ( SELECT 1
                   FROM public.delegation_vote dv1
                  WHERE ((dv1.addr_id = dv.addr_id) AND (dv1.id > dv.id)))))) vote_t ON ((vote_t.addr_id = sa.id)))
     LEFT JOIN rewards_agg rw ON ((rw.addr_id = sa.id)))
     LEFT JOIN withdrawals_agg wd ON ((wd.addr_id = sa.id)))
     LEFT JOIN reward_rest_agg rr ON ((rr.addr_id = sa.id)))
     LEFT JOIN utxo_agg utxo ON ((utxo.addr_id = sa.id)));


ALTER VIEW public.mini_account_detail OWNER TO postgres;

--
-- TOC entry 502 (class 1259 OID 32581486)
-- Name: mini_address_tx_list; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.mini_address_tx_list AS
 SELECT DISTINCT txo.tx_id,
    txo.address,
    txo.stake_address_id,
    sa.view AS stake_address,
    tx.hash AS tx_hash,
    b.hash AS block_hash,
    b."time" AS block_time,
    b.block_no,
    b.epoch_no AS epoch,
    tx.size AS tx_size,
    txo.value,
    tx.out_sum
   FROM (((public.tx_out txo
     LEFT JOIN public.tx ON ((tx.id = txo.tx_id)))
     LEFT JOIN public.stake_address sa ON ((sa.id = txo.stake_address_id)))
     LEFT JOIN public.block b ON ((b.id = tx.block_id)))
  ORDER BY txo.tx_id DESC;


ALTER VIEW public.mini_address_tx_list OWNER TO postgres;

--
-- TOC entry 497 (class 1259 OID 30255267)
-- Name: mini_asset_detail; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.mini_asset_detail AS
 SELECT id,
    encode((policy)::bytea, 'HEX'::text) AS policy,
    encode((name)::bytea, 'hex'::text) AS name,
    fingerprint,
    ( SELECT sum((ma_tx_mint.quantity)::numeric) AS sum
           FROM public.ma_tx_mint
          WHERE (ma_tx_mint.ident = ma.id)) AS quantity,
    ( SELECT json_agg(mtm.*) AS json_agg
           FROM ( SELECT mtm_1.quantity,
                    encode((tx.hash)::bytea, 'hex'::text) AS encode
                   FROM (public.ma_tx_mint mtm_1
                     LEFT JOIN public.tx ON ((tx.id = mtm_1.tx_id)))
                  WHERE (mtm_1.ident = ma.id)) mtm
          ORDER BY ma.id DESC
         LIMIT 50) AS mint
   FROM public.multi_asset ma;


ALTER VIEW public.mini_asset_detail OWNER TO postgres;

--
-- TOC entry 501 (class 1259 OID 32577223)
-- Name: mini_asset_tx_list; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.mini_asset_tx_list AS
 SELECT ma.fingerprint,
    ma.id AS asset_id,
    mto.quantity,
    tx.hash AS tx_hash,
    b.hash AS block_hash,
    b."time" AS block_time,
    b.block_no,
    b.epoch_no AS epoch,
    tx.size AS tx_size,
    tx.id AS tx_id,
    ma.policy AS asset_policy,
    ma.name AS asset_name,
    tx.out_sum
   FROM (((public.ma_tx_out mto
     LEFT JOIN public.multi_asset ma ON ((ma.id = mto.ident)))
     LEFT JOIN public.tx ON ((tx.id = mto.tx_out_id)))
     LEFT JOIN public.block b ON ((b.id = tx.block_id)))
  ORDER BY mto.id DESC;


ALTER VIEW public.mini_asset_tx_list OWNER TO postgres;

--
-- TOC entry 490 (class 1259 OID 17918461)
-- Name: mini_block_detail; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.mini_block_detail AS
 SELECT b.id AS block_id,
    b.block_no,
    encode((b.hash)::bytea, 'hex'::text) AS block_hash,
    b.epoch_no,
    b.slot_no,
    b.epoch_slot_no,
    b."time" AS block_time,
    b.tx_count,
    b.size AS block_size,
    b.proto_major,
    b.proto_minor,
    b.op_cert_counter,
    b.vrf_key,
    ep_json.epoch_param,
    tx_json.tx_data,
    json_build_object('hash', encode((sl.hash)::bytea, 'hex'::text), 'description', sl.description) AS slot_leader
   FROM (((public.block b
     LEFT JOIN LATERAL ( SELECT json_agg(ep.*) AS epoch_param
           FROM public.epoch_param ep
          WHERE ((ep.epoch_no)::integer = (b.epoch_no)::integer)) ep_json ON (true))
     LEFT JOIN LATERAL ( SELECT json_agg(json_build_object('hash', encode((tx.hash)::bytea, 'hex'::text), 'size', tx.size, 'out_sum', tx.out_sum, 'fee', tx.fee)) AS tx_data
           FROM public.tx
          WHERE (tx.block_id = b.id)) tx_json ON (true))
     LEFT JOIN public.slot_leader sl ON ((sl.id = b.slot_leader_id)));


ALTER VIEW public.mini_block_detail OWNER TO postgres;

--
-- TOC entry 491 (class 1259 OID 19672636)
-- Name: mini_epoch_detail; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.mini_epoch_detail AS
 SELECT e.id,
    e.out_sum,
    e.fees,
    e.tx_count,
    e.blk_count,
    e.no,
    e.start_time,
    e.end_time,
    ep_json.epoch_param,
    ap_json.ada_pots,
    ( SELECT json_build_object('stake', sum((pool_stat.stake)::numeric)) AS stat
           FROM public.pool_stat
          WHERE ((pool_stat.epoch_no)::integer = (e.no)::integer)
          GROUP BY pool_stat.epoch_no) AS stat
   FROM ((public.epoch e
     LEFT JOIN LATERAL ( SELECT json_agg(ep.*) AS epoch_param
           FROM public.epoch_param ep
          WHERE ((ep.epoch_no)::integer = (e.no)::integer)) ep_json ON (true))
     LEFT JOIN LATERAL ( SELECT json_agg(ap.*) AS ada_pots
           FROM public.ada_pots ap
          WHERE ((ap.epoch_no)::integer = (e.no)::integer)) ap_json ON (true));


ALTER VIEW public.mini_epoch_detail OWNER TO postgres;

--
-- TOC entry 493 (class 1259 OID 23991850)
-- Name: mini_get_address; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.mini_get_address AS
 SELECT DISTINCT address,
    ( SELECT sum((tx_out.value)::numeric) AS sum
           FROM public.tx_out
          WHERE (((tx_out.address)::text = (txo.address)::text) AND (tx_out.consumed_by_tx_id IS NULL))) AS balance,
    ( SELECT jsonb_agg(data.*) AS jsonb_agg
           FROM ( SELECT (encode((ma.policy)::bytea, 'hex'::text) || encode((ma.name)::bytea, 'hex'::text)) AS asset_name,
                    sum((mto.quantity)::numeric) AS quantity
                   FROM (((public.tx_out
                     JOIN public.tx ON ((tx_out.tx_id = tx.id)))
                     JOIN public.ma_tx_out mto ON ((mto.tx_out_id = tx_out.id)))
                     JOIN public.multi_asset ma ON ((ma.id = mto.ident)))
                  WHERE ((tx_out.consumed_by_tx_id IS NULL) AND ((tx_out.address)::text = (txo.address)::text))
                  GROUP BY (encode((ma.policy)::bytea, 'hex'::text) || encode((ma.name)::bytea, 'hex'::text))
                 HAVING (sum((mto.quantity)::numeric) > (0)::numeric)) data) AS asset
   FROM public.tx_out txo;


ALTER VIEW public.mini_get_address OWNER TO postgres;

--
-- TOC entry 496 (class 1259 OID 30240085)
-- Name: mini_pool_detail; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.mini_pool_detail AS
 SELECT ph.view,
    ph.id AS pool_hash_id,
    sl.id AS slot_leader_id,
    encode((ph.hash_raw)::bytea, 'hex'::text) AS encode,
    sl.description,
    ( SELECT json_agg(data.*) AS json_agg
           FROM ( SELECT ps.epoch_no,
                    ps.number_of_blocks,
                    ps.number_of_delegators,
                    ps.stake,
                    ps.voting_power
                   FROM public.pool_stat ps
                  WHERE (ps.pool_hash_id = ph.id)
                  ORDER BY ps.epoch_no DESC) data) AS stat,
    ( SELECT json_agg(data.*) AS json_agg
           FROM ( SELECT encode((pu.vrf_key_hash)::bytea, 'hex'::text) AS vrf_key_hash,
                    pu.pledge,
                    pu.active_epoch_no,
                    pu.margin,
                    pu.fixed_cost,
                    sa.view AS reward_address,
                    ( SELECT json_agg(pa.view) AS json_agg
                           FROM ( SELECT sa_1.view
                                   FROM (public.pool_owner po
                                     LEFT JOIN public.stake_address sa_1 ON ((sa_1.id = po.addr_id)))
                                  WHERE (po.pool_update_id = pu.id)) pa) AS owner
                   FROM (public.pool_update pu
                     LEFT JOIN public.stake_address sa ON ((sa.id = pu.reward_addr_id)))
                  WHERE (pu.hash_id = ph.id)
                  ORDER BY pu.id DESC) data) AS cert
   FROM (public.slot_leader sl
     LEFT JOIN public.pool_hash ph ON ((ph.id = sl.pool_hash_id)));


ALTER VIEW public.mini_pool_detail OWNER TO postgres;

--
-- TOC entry 500 (class 1259 OID 30773364)
-- Name: mini_redeemer_list; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.mini_redeemer_list AS
 SELECT r.id,
    r.tx_id,
    r.unit_mem,
    r.unit_steps,
    r.fee,
    r.purpose,
    r.index,
    r.script_hash,
    r.redeemer_data_id,
    encode((tx.hash)::bytea, 'hex'::text) AS tx_hash,
    b."time",
    encode((b.hash)::bytea, 'hex'::text) AS block_hash,
    b."time" AS block_time,
    b.block_no AS block_height
   FROM ((public.redeemer r
     LEFT JOIN public.tx ON ((tx.id = r.tx_id)))
     LEFT JOIN public.block b ON ((b.id = tx.block_id)));


ALTER VIEW public.mini_redeemer_list OWNER TO postgres;

--
-- TOC entry 499 (class 1259 OID 30709449)
-- Name: mini_script_detail; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.mini_script_detail AS
 SELECT s.id,
    encode((s.hash)::bytea, 'hex'::text) AS script_hash,
    encode((tx.hash)::bytea, 'hex'::text) AS creation_tx_hash,
    (s.type)::text AS type,
    s.json AS value,
    encode(s.bytes, 'hex'::text) AS bytes,
    s.serialised_size AS size
   FROM (public.script s
     JOIN public.tx ON ((tx.id = s.tx_id)));


ALTER VIEW public.mini_script_detail OWNER TO postgres;

--
-- TOC entry 498 (class 1259 OID 30354214)
-- Name: mini_tx_detail; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.mini_tx_detail AS
 SELECT encode((tx.hash)::bytea, 'hex'::text) AS tx_hash,
    encode((block.hash)::bytea, 'hex'::text) AS block_hash,
    block.block_no AS block_height,
    block.epoch_no,
    block.epoch_slot_no AS epoch_slot,
    block.slot_leader_id,
    ph.view AS minted_by,
    block.slot_no AS absolute_slot,
    (EXTRACT(epoch FROM block."time"))::integer AS tx_timestamp,
    tx.block_index AS tx_block_index,
    tx.size AS tx_size,
    (tx.out_sum)::text AS total_output,
    (tx.fee)::text AS fee,
    (tx.deposit)::text AS deposit,
    (tx.invalid_before)::text AS invalid_before,
    (tx.invalid_hereafter)::text AS invalid_after,
    COALESCE(( SELECT jsonb_agg(sub.ci) AS jsonb_agg
           FROM ( SELECT jsonb_build_object('payment_addr', jsonb_build_object('bech32', tx_out.address, 'cred', encode((tx_out.payment_cred)::bytea, 'hex'::text)), 'stake_addr', stake_address.view, 'tx_hash', encode((parent_tx.hash)::bytea, 'hex'::text), 'tx_index', tx_out.index, 'value', (tx_out.value)::text, 'datum_hash', encode((tx_out.data_hash)::bytea, 'hex'::text), 'inline_datum',
                        CASE
                            WHEN (tx_out.inline_datum_id IS NULL) THEN NULL::jsonb
                            ELSE jsonb_build_object('bytes', encode(datum.bytes, 'hex'::text), 'value', datum.value)
                        END, 'reference_script',
                        CASE
                            WHEN (tx_out.reference_script_id IS NULL) THEN NULL::jsonb
                            ELSE jsonb_build_object('hash', encode((script.hash)::bytea, 'hex'::text), 'bytes', encode(script.bytes, 'hex'::text), 'value', script.json, 'type', (script.type)::text, 'size', script.serialised_size)
                        END, 'asset_list', COALESCE(( SELECT jsonb_agg(jsonb_build_object('policy_id', encode((ma.policy)::bytea, 'hex'::text), 'asset_name', encode((ma.name)::bytea, 'hex'::text), 'fingerprint', ma.fingerprint, 'decimals', 0, 'quantity', (mto.quantity)::text)) AS jsonb_agg
                           FROM (public.ma_tx_out mto
                             JOIN public.multi_asset ma ON ((ma.id = mto.ident)))
                          WHERE (mto.tx_out_id = tx_out.id)), '[]'::jsonb)) AS ci
                   FROM (((((public.collateral_tx_in cti
                     JOIN public.tx_out ON (((tx_out.tx_id = cti.tx_out_id) AND ((tx_out.index)::smallint = (cti.tx_out_index)::smallint))))
                     JOIN public.tx parent_tx ON ((parent_tx.id = tx_out.tx_id)))
                     LEFT JOIN public.stake_address ON ((stake_address.id = tx_out.stake_address_id)))
                     LEFT JOIN public.datum ON ((datum.id = tx_out.inline_datum_id)))
                     LEFT JOIN public.script ON ((script.id = tx_out.reference_script_id)))
                  WHERE (cti.tx_in_id = tx.id)) sub), '[]'::jsonb) AS collateral_inputs,
    ( SELECT jsonb_build_object('payment_addr', jsonb_build_object('bech32', tx_out.address, 'cred', encode((tx_out.payment_cred)::bytea, 'hex'::text)), 'stake_addr', stake_address.view, 'tx_hash', encode((tx.hash)::bytea, 'hex'::text), 'tx_index', tx_out.index, 'value', (tx_out.value)::text, 'datum_hash', encode((tx_out.data_hash)::bytea, 'hex'::text), 'inline_datum',
                CASE
                    WHEN (tx_out.inline_datum_id IS NULL) THEN NULL::jsonb
                    ELSE jsonb_build_object('bytes', encode(datum.bytes, 'hex'::text), 'value', datum.value)
                END, 'reference_script',
                CASE
                    WHEN (tx_out.reference_script_id IS NULL) THEN NULL::jsonb
                    ELSE jsonb_build_object('hash', encode((script.hash)::bytea, 'hex'::text), 'bytes', encode(script.bytes, 'hex'::text), 'value', script.json, 'type', (script.type)::text, 'size', script.serialised_size)
                END, 'asset_list', COALESCE(( SELECT jsonb_agg(jsonb_build_object('policy_id', encode((ma.policy)::bytea, 'hex'::text), 'asset_name', encode((ma.name)::bytea, 'hex'::text), 'fingerprint', ma.fingerprint, 'decimals', 0, 'quantity', (mto.quantity)::text)) AS jsonb_agg
                   FROM (public.ma_tx_out mto
                     JOIN public.multi_asset ma ON ((ma.id = mto.ident)))
                  WHERE (mto.tx_out_id = tx_out.id)), '[]'::jsonb)) AS jsonb_build_object
           FROM (((public.collateral_tx_out tx_out
             LEFT JOIN public.stake_address ON ((stake_address.id = tx_out.stake_address_id)))
             LEFT JOIN public.datum ON ((datum.id = tx_out.inline_datum_id)))
             LEFT JOIN public.script ON ((script.id = tx_out.reference_script_id)))
          WHERE (tx_out.tx_id = tx.id)
         LIMIT 1) AS collateral_output,
    COALESCE(( SELECT jsonb_agg(sub.ri) AS jsonb_agg
           FROM ( SELECT jsonb_build_object('payment_addr', jsonb_build_object('bech32', tx_out.address, 'cred', encode((tx_out.payment_cred)::bytea, 'hex'::text)), 'stake_addr', stake_address.view, 'tx_hash', encode((parent_tx.hash)::bytea, 'hex'::text), 'tx_index', tx_out.index, 'value', (tx_out.value)::text, 'datum_hash', encode((tx_out.data_hash)::bytea, 'hex'::text), 'inline_datum',
                        CASE
                            WHEN (tx_out.inline_datum_id IS NULL) THEN NULL::jsonb
                            ELSE jsonb_build_object('bytes', encode(datum.bytes, 'hex'::text), 'value', datum.value)
                        END, 'reference_script',
                        CASE
                            WHEN (tx_out.reference_script_id IS NULL) THEN NULL::jsonb
                            ELSE jsonb_build_object('hash', encode((script.hash)::bytea, 'hex'::text), 'bytes', encode(script.bytes, 'hex'::text), 'value', script.json, 'type', (script.type)::text, 'size', script.serialised_size)
                        END, 'asset_list', COALESCE(( SELECT jsonb_agg(jsonb_build_object('policy_id', encode((ma.policy)::bytea, 'hex'::text), 'asset_name', encode((ma.name)::bytea, 'hex'::text), 'fingerprint', ma.fingerprint, 'decimals', 0, 'quantity', (mto.quantity)::text)) AS jsonb_agg
                           FROM (public.ma_tx_out mto
                             JOIN public.multi_asset ma ON ((ma.id = mto.ident)))
                          WHERE (mto.tx_out_id = tx_out.id)), '[]'::jsonb)) AS ri
                   FROM (((((public.reference_tx_in rti
                     JOIN public.tx_out tx_out ON (((tx_out.tx_id = rti.tx_out_id) AND ((tx_out.index)::smallint = (rti.tx_out_index)::smallint))))
                     JOIN public.tx parent_tx ON ((parent_tx.id = tx_out.tx_id)))
                     LEFT JOIN public.stake_address ON ((stake_address.id = tx_out.stake_address_id)))
                     LEFT JOIN public.datum ON ((datum.id = tx_out.inline_datum_id)))
                     LEFT JOIN public.script ON ((script.id = tx_out.reference_script_id)))
                  WHERE (rti.tx_in_id = tx.id)) sub), '[]'::jsonb) AS reference_inputs,
    COALESCE(( SELECT jsonb_agg(sub.i) AS jsonb_agg
           FROM ( SELECT jsonb_build_object('payment_addr', jsonb_build_object('bech32', tx_out.address, 'cred', encode((tx_out.payment_cred)::bytea, 'hex'::text)), 'stake_addr', stake_address.view, 'tx_hash', encode((parent_tx.hash)::bytea, 'hex'::text), 'tx_index', tx_out.index, 'value', (tx_out.value)::text, 'datum_hash', encode((tx_out.data_hash)::bytea, 'hex'::text), 'inline_datum',
                        CASE
                            WHEN (tx_out.inline_datum_id IS NULL) THEN NULL::jsonb
                            ELSE jsonb_build_object('bytes', encode(datum.bytes, 'hex'::text), 'value', datum.value)
                        END, 'reference_script',
                        CASE
                            WHEN (tx_out.reference_script_id IS NULL) THEN NULL::jsonb
                            ELSE jsonb_build_object('hash', encode((script.hash)::bytea, 'hex'::text), 'bytes', encode(script.bytes, 'hex'::text), 'value', script.json, 'type', (script.type)::text, 'size', script.serialised_size)
                        END, 'asset_list', COALESCE(( SELECT jsonb_agg(jsonb_build_object('policy_id', encode((ma.policy)::bytea, 'hex'::text), 'asset_name', encode((ma.name)::bytea, 'hex'::text), 'fingerprint', ma.fingerprint, 'decimals', 0, 'quantity', (mto.quantity)::text)) AS jsonb_agg
                           FROM (public.ma_tx_out mto
                             JOIN public.multi_asset ma ON ((ma.id = mto.ident)))
                          WHERE (mto.tx_out_id = tx_out.id)), '[]'::jsonb)) AS i
                   FROM ((((public.tx_out
                     JOIN public.tx parent_tx ON ((parent_tx.id = tx_out.tx_id)))
                     LEFT JOIN public.stake_address ON ((stake_address.id = tx_out.stake_address_id)))
                     LEFT JOIN public.datum ON ((datum.id = tx_out.inline_datum_id)))
                     LEFT JOIN public.script ON ((script.id = tx_out.reference_script_id)))
                  WHERE (tx_out.consumed_by_tx_id = tx.id)) sub), '[]'::jsonb) AS inputs,
    COALESCE(( SELECT jsonb_agg(sub.o) AS jsonb_agg
           FROM ( SELECT jsonb_build_object('payment_addr', jsonb_build_object('bech32', tx_out.address, 'cred', encode((tx_out.payment_cred)::bytea, 'hex'::text)), 'stake_addr', stake_address.view, 'tx_hash', encode((tx.hash)::bytea, 'hex'::text), 'tx_index', tx_out.index, 'value', (tx_out.value)::text, 'datum_hash', encode((tx_out.data_hash)::bytea, 'hex'::text), 'inline_datum',
                        CASE
                            WHEN (tx_out.inline_datum_id IS NULL) THEN NULL::jsonb
                            ELSE jsonb_build_object('bytes', encode(datum.bytes, 'hex'::text), 'value', datum.value)
                        END, 'reference_script',
                        CASE
                            WHEN (tx_out.reference_script_id IS NULL) THEN NULL::jsonb
                            ELSE jsonb_build_object('hash', encode((script.hash)::bytea, 'hex'::text), 'bytes', encode(script.bytes, 'hex'::text), 'value', script.json, 'type', (script.type)::text, 'size', script.serialised_size)
                        END, 'asset_list', COALESCE(( SELECT jsonb_agg(jsonb_build_object('policy_id', encode((ma.policy)::bytea, 'hex'::text), 'asset_name', encode((ma.name)::bytea, 'hex'::text), 'fingerprint', ma.fingerprint, 'decimals', 0, 'quantity', (mto.quantity)::text)) AS jsonb_agg
                           FROM (public.ma_tx_out mto
                             JOIN public.multi_asset ma ON ((ma.id = mto.ident)))
                          WHERE (mto.tx_out_id = tx_out.id)), '[]'::jsonb)) AS o
                   FROM (((public.tx_out
                     LEFT JOIN public.stake_address ON ((stake_address.id = tx_out.stake_address_id)))
                     LEFT JOIN public.datum ON ((datum.id = tx_out.inline_datum_id)))
                     LEFT JOIN public.script ON ((script.id = tx_out.reference_script_id)))
                  WHERE (tx_out.tx_id = tx.id)) sub), '[]'::jsonb) AS outputs,
    COALESCE(( SELECT jsonb_agg(jsonb_build_object('amount', (withdrawal.amount)::text, 'stake_addr', stake_address.view)) AS jsonb_agg
           FROM (public.withdrawal
             JOIN public.stake_address ON ((stake_address.id = withdrawal.addr_id)))
          WHERE (withdrawal.tx_id = tx.id)), '[]'::jsonb) AS withdrawals,
    COALESCE(( SELECT jsonb_agg(jsonb_build_object('policy_id', encode((ma.policy)::bytea, 'hex'::text), 'asset_name', encode((ma.name)::bytea, 'hex'::text), 'fingerprint', ma.fingerprint, 'decimals', 0, 'quantity', (ma_tx_mint.quantity)::text)) AS jsonb_agg
           FROM (public.ma_tx_mint
             JOIN public.multi_asset ma ON ((ma.id = ma_tx_mint.ident)))
          WHERE (ma_tx_mint.tx_id = tx.id)), '[]'::jsonb) AS assets_minted,
    ( SELECT jsonb_object_agg((tx_metadata.key)::text, tx_metadata.json) AS jsonb_object_agg
           FROM public.tx_metadata
          WHERE (tx_metadata.tx_id = tx.id)) AS metadata,
    COALESCE(( SELECT jsonb_agg(sub.cert) AS jsonb_agg
           FROM ( SELECT jsonb_build_object('index', sr.cert_index, 'type', 'stake_registration', 'info', jsonb_build_object('stake_address', sa.view)) AS cert
                   FROM (public.stake_registration sr
                     JOIN public.stake_address sa ON ((sa.id = sr.addr_id)))
                  WHERE (sr.tx_id = tx.id)
                UNION ALL
                 SELECT jsonb_build_object('index', sd.cert_index, 'type', 'stake_deregistration', 'info', jsonb_build_object('stake_address', sa.view)) AS jsonb_build_object
                   FROM (public.stake_deregistration sd
                     JOIN public.stake_address sa ON ((sa.id = sd.addr_id)))
                  WHERE (sd.tx_id = tx.id)) sub), '[]'::jsonb) AS certificates,
    COALESCE(( SELECT jsonb_agg(jsonb_build_object('script_hash', encode((script.hash)::bytea, 'hex'::text), 'script_json', script.json)) AS jsonb_agg
           FROM public.script
          WHERE ((script.tx_id = tx.id) AND (script.type = 'timelock'::public.scripttype))), '[]'::jsonb) AS native_scripts,
    COALESCE(( SELECT jsonb_agg(sub.pc) AS jsonb_agg
           FROM ( SELECT jsonb_build_object('address', inout_tx_out.address, 'script_hash', encode((script.hash)::bytea, 'hex'::text), 'bytecode', encode(script.bytes, 'hex'::text), 'size', script.serialised_size, 'valid_contract', tx.valid_contract) AS pc
                   FROM (public.script
                     JOIN public.tx_out inout_tx_out ON ((inout_tx_out.reference_script_id = script.id)))
                  WHERE ((script.tx_id = tx.id) AND (script.type = ANY (ARRAY['plutusV1'::public.scripttype, 'plutusV2'::public.scripttype, 'plutusV3'::public.scripttype])))) sub), '[]'::jsonb) AS plutus_contracts
   FROM (((public.tx
     JOIN public.block ON ((block.id = tx.block_id)))
     LEFT JOIN public.slot_leader sl ON ((sl.id = block.slot_leader_id)))
     LEFT JOIN public.pool_hash ph ON ((ph.id = sl.pool_hash_id)));


ALTER VIEW public.mini_tx_detail OWNER TO postgres;

--
-- TOC entry 503 (class 1259 OID 32597089)
-- Name: mini_utxo; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.mini_utxo AS
 SELECT address,
    ( SELECT json_agg(data.*) AS json_agg
           FROM ( SELECT (sum((tx_out.value)::numeric))::text AS sum,
                    bool_or(tx_out.address_has_script) AS has_script,
                    COALESCE(json_agg(json_build_object('tx_hash', encode((tx.hash)::bytea, 'hex'::text), 'tx_index', tx_out.index, 'block_height', block.block_no, 'block_time', (EXTRACT(epoch FROM block."time"))::integer, 'value', (tx_out.value)::text, 'datum_hash', encode((tx_out.data_hash)::bytea, 'hex'::text), 'asset_list', COALESCE(( SELECT json_agg(json_build_object('name', (encode((ma.policy)::bytea, 'hex'::text) || encode((ma.name)::bytea, 'hex'::text)), 'quantity', mtx.quantity)) AS json_agg
                           FROM (public.ma_tx_out mtx
                             JOIN public.multi_asset ma ON ((ma.id = mtx.ident)))
                          WHERE (mtx.tx_out_id = tx_out.id)), json_build_array()))), '[]'::json) AS utxo_set
                   FROM ((public.tx_out
                     JOIN public.tx ON ((tx_out.tx_id = tx.id)))
                     JOIN public.block ON ((block.id = tx.block_id)))
                  WHERE ((tx_out.address)::text = (txo.address)::text)) data) AS utxo_list
   FROM public.tx_out txo;


ALTER VIEW public.mini_utxo OWNER TO postgres;

--
-- TOC entry 4117 (class 0 OID 0)
-- Dependencies: 492
-- Name: TABLE mini_account_detail; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.mini_account_detail TO graphql;


--
-- TOC entry 4118 (class 0 OID 0)
-- Dependencies: 502
-- Name: TABLE mini_address_tx_list; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.mini_address_tx_list TO graphql;


--
-- TOC entry 4119 (class 0 OID 0)
-- Dependencies: 497
-- Name: TABLE mini_asset_detail; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.mini_asset_detail TO graphql;


--
-- TOC entry 4120 (class 0 OID 0)
-- Dependencies: 501
-- Name: TABLE mini_asset_tx_list; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.mini_asset_tx_list TO graphql;


--
-- TOC entry 4121 (class 0 OID 0)
-- Dependencies: 490
-- Name: TABLE mini_block_detail; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.mini_block_detail TO graphql;


--
-- TOC entry 4122 (class 0 OID 0)
-- Dependencies: 491
-- Name: TABLE mini_epoch_detail; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.mini_epoch_detail TO graphql;


--
-- TOC entry 4123 (class 0 OID 0)
-- Dependencies: 493
-- Name: TABLE mini_get_address; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.mini_get_address TO graphql;


--
-- TOC entry 4124 (class 0 OID 0)
-- Dependencies: 496
-- Name: TABLE mini_pool_detail; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.mini_pool_detail TO graphql;


--
-- TOC entry 4125 (class 0 OID 0)
-- Dependencies: 500
-- Name: TABLE mini_redeemer_list; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.mini_redeemer_list TO graphql;


--
-- TOC entry 4126 (class 0 OID 0)
-- Dependencies: 499
-- Name: TABLE mini_script_detail; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.mini_script_detail TO graphql;


--
-- TOC entry 4127 (class 0 OID 0)
-- Dependencies: 498
-- Name: TABLE mini_tx_detail; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.mini_tx_detail TO graphql;


--
-- TOC entry 4128 (class 0 OID 0)
-- Dependencies: 503
-- Name: TABLE mini_utxo; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.mini_utxo TO graphql;


-- Completed on 2026-01-29 08:47:17

--
-- PostgreSQL database dump complete
--

\unrestrict xagqBDGhMQxiVKI3dQwP8geJy9HHmkEHLVz9OAdnNSawkd7HxXpTyxaa8q176lP

