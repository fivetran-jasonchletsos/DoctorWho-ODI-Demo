-- TARDIS Index File — Snowflake DDL
--
-- Run as ACCOUNTADMIN once. After this, Fivetran lands into bronze_*,
-- dbt builds silver + gold, Cortex Analyst sits on gold.

create warehouse if not exists whoniverse_wh
    warehouse_size = 'x-small'
    auto_suspend = 60
    auto_resume = true
    initially_suspended = true;

create database if not exists whoniverse;
use database whoniverse;

create schema if not exists bronze_wikidata;
create schema if not exists bronze_tardis_wiki;
create schema if not exists bronze_tmdb;
create schema if not exists silver;
create schema if not exists gold;

-- Fivetran-managed Iceberg external volume (points at the S3 + Glue lake)
create external volume if not exists whoniverse_lake
    storage_locations = (
        (
            name = 's3-lake'
            storage_provider = 's3'
            storage_base_url = 's3://doctorwho-odi-lake/'
            storage_aws_role_arn = 'arn:aws:iam::<account>:role/whoniverse-snowflake-iceberg'
            storage_aws_external_id = '<random>'
        )
    )
    allow_writes = false;

-- Fivetran writer role
create role if not exists fivetran_writer;
grant usage on warehouse whoniverse_wh to role fivetran_writer;
grant usage on database whoniverse to role fivetran_writer;
grant usage on schema whoniverse.bronze_wikidata     to role fivetran_writer;
grant usage on schema whoniverse.bronze_tardis_wiki  to role fivetran_writer;
grant usage on schema whoniverse.bronze_tmdb         to role fivetran_writer;
grant create table, modify on schema whoniverse.bronze_wikidata     to role fivetran_writer;
grant create table, modify on schema whoniverse.bronze_tardis_wiki  to role fivetran_writer;
grant create table, modify on schema whoniverse.bronze_tmdb         to role fivetran_writer;

-- dbt role
create role if not exists dbt_runner;
grant usage on warehouse whoniverse_wh to role dbt_runner;
grant usage on database whoniverse to role dbt_runner;
grant usage on all schemas in database whoniverse to role dbt_runner;
grant select on all tables in database whoniverse to role dbt_runner;
grant create table, create view, create dynamic table on schema whoniverse.silver to role dbt_runner;
grant create table, create view, create dynamic table on schema whoniverse.gold   to role dbt_runner;
grant modify on schema whoniverse.silver to role dbt_runner;
grant modify on schema whoniverse.gold   to role dbt_runner;

-- Cortex Analyst role (read-only on gold)
create role if not exists cortex_reader;
grant usage on warehouse whoniverse_wh to role cortex_reader;
grant usage on database whoniverse to role cortex_reader;
grant usage on schema whoniverse.gold to role cortex_reader;
grant select on all tables in schema whoniverse.gold to role cortex_reader;
grant select on future tables in schema whoniverse.gold to role cortex_reader;
