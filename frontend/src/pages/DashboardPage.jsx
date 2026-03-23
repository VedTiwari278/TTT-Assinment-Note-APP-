import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useDeleteNoteMutation, useNotesQuery } from "../hooks/notes.hooks";
import SearchBar from "../components/SearchBar";
import NoteCard from "../components/NoteCard";
import Loader from "../components/ui/Loader";
import Pagination from "../components/Pagination";
import NoDataFound from "../components/ui/NoDataFound";

function DashboardPage() {
  const navigate = useNavigate();
  const { clearUser } = useAuth();

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const notesQuery = useNotesQuery({ page, limit, search });
  const deleteMutation = useDeleteNoteMutation();

  const notes = notesQuery.data?.data || [];
  const pagination = notesQuery.data?.pagination || {
    total: 0,
    totalPages: 1,
    page,
    limit,
  };

  const handleReset = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Note deleted");
    } catch (err) {
      if (err?.response?.status === 401) {
        clearUser();
        navigate("/login");
        return;
      }
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <section className="px-4 py-4">
      <div className="mx-auto mb-4 max-w-6xl">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onReset={handleReset}
        />
      </div>

      <div className="mx-auto max-w-6xl">
        {notesQuery.isPending ? (
          <Loader label="Loading notes..." />
        ) : notes.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={(item) => navigate(`/dashboard/notes/${item._id}/edit`)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <NoDataFound />
        )}
      </div>

      <div className="py-4 mb-10 flex justify-center">
        <Pagination
          page={pagination.page || page}
          totalPages={pagination.totalPages || 1}
          total={pagination.total || 0}
          isLoading={notesQuery.isFetching}
          onPrev={() => setPage((prev) => prev - 1)}
          onNext={() => setPage((prev) => prev + 1)}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </section>
  );
}

export default DashboardPage;
