import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useEditSettings() {
  const queryClient = useQueryClient();

  const { mutate: editSetting, isLoading: isEditing } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("New cabin successfully edited!");
      queryClient.invalidateQueries({ queryKey: ["Settings"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editSetting, isEditing };
}
