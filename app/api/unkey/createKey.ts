import { Unkey } from "@unkey/api";
import { useAuth } from "@clerk/nextjs";
export async function createKey() {
    
    const rootKey = process.env.UNKEY_ROOT_KEY;
    const apiId = process.env.UNKEY_API_ID;
    const { isLoaded, userId, sessionId, getToken } = await useAuth();
    
    const expDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    if(!rootKey) {
        throw new Error("Root key not found but required");
    }
    if(!apiId){
        throw new Error("API ID not found but required");
    }
    if (!userId) {
      throw new Error("User ID not found but required");
    }
    const unkey = new Unkey({ rootKey });
    const created = await unkey.keys.create({
        apiId: apiId,
        prefix: "hugs",
        byteLength: 16,
        ownerId: userId,
        meta: {
        message: "AI Powered using HuggingFace",
        },
        expires: expDate.getUTCMilliseconds(),
        ratelimit: {
        type: "fast",
        limit: 10,
        refillRate: 1,
        refillInterval: 1000,
        },
        remaining: 1000,
    });

    if (userId) {
        localStorage.setItem("key", created.toString());
    }

    return created
}
