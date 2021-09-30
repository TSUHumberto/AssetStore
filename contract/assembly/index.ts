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

import { PersistentUnorderedMap,PersistentMap,PersistentVector  } from "near-sdk-as";
import { Context, logging, storage } from 'near-sdk-as'

const DEFAULT_MESSAGE = 'Hello'

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


class TokenMetadata {
  title: string|null; // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
  description: string|null; // free-form description
  media: string|null; // URL to associated media, preferably to decentralized, content-addressed storage
  media_hash: string|null; // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
  copies: number; // number of copies of this set of metadata in existence when token was minted.
}

type AccountId = string
type TokenId = string
let map = new PersistentMap<TokenId, AccountId>('Tokens')


export function nft_transfer(
  receiver_id: string,
  token_id: string,
):void {
  var solicita:string =Context.sender;
  if(map.getSome(token_id)==solicita){
    map.set(token_id,receiver_id);
  }
}

export function crear_nft(id_token:string,id_cuenta:string):void{
  map.set(id_token,id_cuenta);
}

export function obtener_nft(id_token:string):string{
  return "El token pertenece a: "+map.getSome(id_token);
}