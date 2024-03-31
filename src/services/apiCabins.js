import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins couldn't be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, editId) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  let imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("Cabins");

  //====  Create new cabin ====
  if (!editId) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  //====  Edit existing cabin ====

  if (editId)
    query = query
      .update({ ...newCabin, image: newCabin.newCabinData.image })
      .eq("id", editId);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabins couldn't be created");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(`${imageName}`, newCabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  //delete the cabin if there was an error updating the image

  if (storageError) {
    await supabase.from("Cabins").delete().eq("id", data.id);
    console.error("data");
    throw new Error("Cabin image couldn't be uploaded. Cabin was not created");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("Cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins couldn't be deleted");
  }

  return data;
}
