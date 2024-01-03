"use server";
import { cookies } from "next/headers";

export async function getKeyCookie(keyName: string) {
    const cookieStore = cookies();
    const key = cookieStore.get(keyName);
    if(!key?.value){
        //console.log("Undefined");
        return undefined
        
    }
    //console.log(key?.value);
    return key?.value;
    
}

export async function setKeyCookie(keyName: string, keyValue: string) {
    const cookieStore = cookies();
    const key = cookieStore.get(keyName);
    if(!key?.value){
        cookieStore.set(keyName, keyValue, {
            secure: true,
        });
        
        console.log("Set");
        return true;
    }
    console.log(key?.value);
}
