'use server'

import { revalidateTag } from "next/cache";

export async function deleteWishItem(id: string){
  await fetch(`http://localhost:3001/api/wishlist/${id}`, {
    method: "DELETE",
  });
}


