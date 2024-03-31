import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins couldn't be loaded");
  }
  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("Cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    throw new Error("Cabins couldn't be created");
  }

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
