import { supabase } from "../../../src/supabase.js";

export async function uploadPostImage(file) {
    const ext = file.name.split(".").pop();
    const filePath = `posts/${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage
        .from("Post")
        .upload(filePath, file, {
            cacheControl: "31536000",
            upsert: false,
        });

    if (error) {
        throw error;
    }

    const { data } = supabase.storage.from("Post").getPublicUrl(filePath);

    return data.publicUrl;
}