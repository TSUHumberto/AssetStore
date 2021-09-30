/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */
import { PersistentUnorderedMap,PersistentMap  } from "near-sdk-as";
import { Context, logging, storage } from 'near-sdk-as'

const DEFAULT_MESSAGE = 'Hello'

class Token{
  id: string;
  owner_id: string;
  metadata:TokenMetadata;
}

class NFTContractMetadata {
  spec: string; // required, essentially a version like "nft-1.0.0"
  name: string; // required, ex. "Mochi Rising — Digital Edition" or "Metaverse 3"
  symbol: string; // required, ex. "MOCHI"
  icon: string|null; // Data URL
  base_uri: string|null; // Centralized gateway known to have reliable access to decentralized storage assets referenced by `reference` or `media` URLs
  reference: string|null; // URL to a JSON file with more info
  reference_hash: string|null; // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
}

export function getGreeting(accountId: string): string | null {

  // storage for simple contracts.
  // If you have something more complex, check out persistent collections:
  // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
  return storage.get<string>(accountId, DEFAULT_MESSAGE)
}

export function setGreeting(message: string): void {
  const account_id = Context.sender

  // Use logging.log to record logs permanently to the blockchain!
  logging.log(
    'Saving greeting "' + message + '" for account "' + account_id + '"'
  )

  storage.set(account_id, message)
}

type TokenMetadata ={
  title: string|null; // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
  description: string|null; // free-form description
  media: string|null; // URL to associated media, preferably to decentralized, content-addressed storage
  media_hash: string|null; // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
  copies: number; // number of copies of this set of metadata in existence when token was minted.
}

let map =  new PersistentMap<string, TokenMetadata>("Tokens"); // choose a unique prefix per collection

export function nft_transfer(
  receiver_id: string,
  token_id: string,
  
):void {
  const invoca = Context.sender;
  let token:TokenMetadata=map.getSome(invoca);
  map.set(receiver_id,token);
  map.delete(invoca);
}

export function crear_nft(id_cuenta:string,metadatos:TokenMetadata):void{
  map.set(id_cuenta, metadatos);
}

export function obtener_nft(id_cuenta:string):TokenMetadata{
  return map.getSome(id_cuenta);
}

export function obtener():TokenMetadata{
  const invoca = Context.sender;

  return map.getSome(invoca);
}