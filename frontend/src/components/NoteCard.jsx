import ReactMarkdown from "react-markdown";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

function NoteCard({ note, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <article className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition space-y-4">
      
      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
        {note.title}
      </h3>

      <div className="prose max-w-none text-sm text-gray-600 prose-p:my-2 prose-headings:text-gray-800 line-clamp-3">
        <ReactMarkdown>{note.body}</ReactMarkdown>
      </div>

      <div className="flex items-center justify-between pt-2">
        
        <span className="text-xs text-gray-400">
          {note.updatedAt
            ? new Date(note.updatedAt).toLocaleDateString()
            : ""}
        </span>

        <div className="flex gap-2">
          
          <Button
            onClick={() => onEdit(note)}
            className="flex items-center gap-1"
          >
            <FiEdit size={14} />
            Edit
          </Button>

          <Button
            onClick={() => onDelete(note._id)}
            variant="danger"
            className="flex items-center gap-1"
          >
            <FiTrash2 size={14} />
            Delete
          </Button>

          <Button
            onClick={() => navigate(`/dashboard/notes/${note._id}/overview`)}
            variant="secondary"
            className="flex items-center gap-1"
          >
            <FiEye size={14} />
            View
          </Button>

        </div>
      </div>
    </article>
  );
}

export default NoteCard;
