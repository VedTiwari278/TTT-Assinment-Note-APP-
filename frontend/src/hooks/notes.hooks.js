import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";

export const notesQueryKey = ({ page, limit, search }) => [
  "notes",
  { page, limit, search },
];

const fetchNotes = async ({ queryKey }) => {
  const [, paramsObj] = queryKey;
  const params = new URLSearchParams({
    page: String(paramsObj.page),
    limit: String(paramsObj.limit),
  });

  if (paramsObj.search) {
    params.set("search", paramsObj.search);
  }

  const { data } = await api.get(`/notes/get?${params.toString()}`);
  return data;
};

export const useNotesQuery = ({ page, limit, search }) =>
  useQuery({
    queryKey: notesQueryKey({ page, limit, search }),
    queryFn: fetchNotes,
    staleTime: 30 * 1000,
  });

export const useNotesOverviewQuery = () =>
  useQuery({
    queryKey: ["notes", "overview"],
    queryFn: async () => {
      const { data } = await api.get("/notes/get?page=1&limit=500");
      return data.data || [];
    },
    staleTime: 30 * 1000,
  });

export const useNoteQuery = (id) =>
  useQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      const { data } = await api.get(`/notes/get/${id}`);
      return data.data;
    },
    enabled: Boolean(id),
  });

export const useCreateNoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => api.post("/notes/create", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

export const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => api.put(`/notes/update/${id}`, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note", variables.id] });
    },
  });
};

export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/notes/delete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
