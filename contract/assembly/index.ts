import { PersistentUnorderedMap,PersistentMap,PersistentVector  } from "near-sdk-as";
import { Context, logging, storage } from 'near-sdk-as'

//
class VirtualAsset{
  id:number;
  title: string;
  description: string;
  media: string;
  media_hash: string;
  copies: number;
}


type AccountId = string
let map = new PersistentMap<AccountId,VirtualAsset>('Tokens')

/*
export function nft_transfer(
  receiver_id: string,
  token_id: string,
):void {
  var solicita:string =Context.sender;
  if(map.getSome(token_id)==solicita){
    map.set(token_id,receiver_id);
  }
}*/


export function crear_vasset(id_cuenta:string, vasset:VirtualAsset):void{
  map.set(id_cuenta,vasset);
}

export function obtener_nft(id_token:string):string{
  return "El token pertenece a: "+map.getSome(id_token);
}