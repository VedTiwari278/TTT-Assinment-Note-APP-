import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import NoteForm from "../components/NoteForm";
import {
  useCreateNoteMutation,
  useNoteQuery,
  useUpdateNoteMutation,
} from "../hooks/notes.hooks";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";

function NoteEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { clearUser } = useAuth();

  const noteQuery = useNoteQuery(id);
  const createMutation = useCreateNoteMutation();
  const updateMutation = useUpdateNoteMutation();

  useEffect(() => {
    if (noteQuery.error?.response?.status === 401) {
      clearUser();
      navigate("/login");
    }
  }, [clearUser, navigate, noteQuery.error]);

  const handleSubmit = async (payload) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync({ id, payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      toast.success(isEditMode ? "Note updated" : "Note created");
      navigate("/dashboard");
    } catch (err) {
      if (err?.response?.status === 401) {
        clearUser();
        navigate("/login");
        return;
      }
      toast.error(err?.response?.data?.message || "Failed to save note");
    }
  };

  const errorMessage =
    noteQuery.error?.response?.data?.message ||
    createMutation.error?.response?.data?.message ||
    updateMutation.error?.response?.data?.message;

  if (isEditMode && noteQuery.isPending) {
    return (
      <main className="flex items-center justify-center py-10">
        <Loader label="Loading note..." />
      </main>
    );
  }

  return (
    <main className="px-4 py-6 sm:py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {isEditMode ? "Edit Note" : "Create Note"}
            </h1>
            <p className="text-sm text-gray-500">Write and manage your notes</p>
          </div>

          <Link to="/dashboard">
            <Button variant="secondary">Back</Button>
          </Link>
        </div>

        {errorMessage && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
            {errorMessage}
          </p>
        )}

        <NoteForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending || updateMutation.isPending}
          editingNote={noteQuery.data || null}
        />
      </div>
    </main>
  );
}

export default NoteEditorPage;
