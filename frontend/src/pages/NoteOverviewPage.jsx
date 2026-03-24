import { Link, useNavigate, useParams } from "react-router-dom";
import { FaAlignLeft, FaCalendarAlt, FaClock, FaFileAlt } from "react-icons/fa";
import { useNoteQuery } from "../hooks/notes.hooks";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import ReactMarkdown from "react-markdown";

const InfoCard = ({ icon, label, value }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-4">
    <div className="mb-2 flex items-center gap-2 text-blue-600">
      {icon}
      <p className="text-sm font-medium">{label}</p>
    </div>
    <p className="text-lg font-semibold text-gray-900">{value}</p>
  </div>
);

function NoteOverviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const noteQuery = useNoteQuery(id);

  if (noteQuery.isPending) {
    return (
      <main className="px-4 py-8">
        <Loader label="Loading note overview..." />
      </main>
    );
  }

  if (noteQuery.isError || !noteQuery.data) {
    return (
      <main className="px-4 py-8">
        <div className="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white p-6 text-center">
          <p className="text-gray-600">Unable to load note overview.</p>
          <div className="mt-4">
            <Button onClick={() => navigate("/dashboard")} variant="secondary">
              Back
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const note = noteQuery.data;
  const body = note.body || "";
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const chars = body.length;
  const created = note.createdAt ? new Date(note.createdAt).toLocaleString() : "-";
  const updated = note.updatedAt ? new Date(note.updatedAt).toLocaleString() : "-";

  return (
    <main className="px-4 py-6 sm:py-8">
      <div className="mx-auto max-w-4xl space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Note Overview</h1>
            <p className="line-clamp-2 text-sm text-gray-500">{note.title}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to={`/dashboard/notes/${note._id}/edit`}>
              <Button>Edit Note</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary">Back</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard icon={<FaFileAlt />} label="Title Length" value={`${note.title.length} chars`} />
          <InfoCard icon={<FaAlignLeft />} label="Body Words" value={words} />
          <InfoCard icon={<FaCalendarAlt />} label="Created" value={created} />
          <InfoCard icon={<FaClock />} label="Updated" value={updated} />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="mb-3 text-sm font-medium text-gray-700">Body Preview</p>
          <div className="prose max-w-none break-words text-gray-700">
            <ReactMarkdown>{note.body}</ReactMarkdown>
          </div>
          <p className="mt-4 text-sm text-gray-500">Total Characters: {chars}</p>
        </div>
      </div>
    </main>
  );
}

export default NoteOverviewPage;
