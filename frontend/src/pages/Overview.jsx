import { Link } from "react-router-dom";
import { FaBookOpen, FaClock, FaCalendarAlt, FaAlignLeft } from "react-icons/fa";
import { useNotesOverviewQuery } from "../hooks/notes.hooks";
import Loader from "../components/ui/Loader";

const StatCard = ({ icon, label, value, subtitle }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="mb-3 flex items-center gap-2 text-blue-600">
      {icon}
      <p className="text-sm font-medium">{label}</p>
    </div>
    <p className="text-2xl font-semibold text-gray-900">{value}</p>
    {subtitle ? <p className="mt-1 text-sm text-gray-500">{subtitle}</p> : null}
  </div>
);

function Overview() {
  const notesQuery = useNotesOverviewQuery();
  const notes = notesQuery.data || [];

  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const notesThisWeek = notes.filter(
    (note) => note.createdAt && new Date(note.createdAt) >= sevenDaysAgo
  ).length;

  const totalWords = notes.reduce((acc, note) => {
    const words = (note.body || "").trim().split(/\s+/).filter(Boolean).length;
    return acc + words;
  }, 0);

  const avgWords = notes.length ? Math.round(totalWords / notes.length) : 0;

  const latestUpdated = notes
    .map((note) => note.updatedAt)
    .filter(Boolean)
    .sort((a, b) => new Date(b) - new Date(a))[0];

  if (notesQuery.isPending) {
    return (
      <main className="px-4 py-8">
        <Loader label="Loading overview..." />
      </main>
    );
  }

  return (
    <main className="px-4 py-6 sm:py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Notes Overview</h1>
            <p className="text-sm text-gray-500">Quick insight into your notes activity.</p>
          </div>
          <Link
            to="/dashboard"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<FaBookOpen />}
            label="Total Notes"
            value={notes.length}
            subtitle="All saved notes"
          />
          <StatCard
            icon={<FaCalendarAlt />}
            label="This Week"
            value={notesThisWeek}
            subtitle="Created in last 7 days"
          />
          <StatCard
            icon={<FaAlignLeft />}
            label="Avg Words"
            value={avgWords}
            subtitle="Average per note"
          />
          <StatCard
            icon={<FaClock />}
            label="Last Updated"
            value={latestUpdated ? new Date(latestUpdated).toLocaleDateString() : "-"}
            subtitle="Most recent edit date"
          />
        </div>
      </div>
    </main>
  );
}

export default Overview;
