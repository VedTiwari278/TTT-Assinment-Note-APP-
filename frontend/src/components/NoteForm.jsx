import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "./ui/Button";

function NoteForm({ onSubmit, isLoading, editingNote }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editingNote) {
      reset({
        title: editingNote.title,
        body: editingNote.body,
      });
    }
  }, [editingNote, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" rounded-xl p-5 space-y-4 "
    >
      <div>
        <input
          type="text"
          placeholder="Title"
          {...register("title", {
            required: "Title is required",
          })}
          className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Write your note..."
          rows={5}
          {...register("body", {
            required: "Body is required",
          })}
          className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.body && (
          <p className="text-xs text-red-500 mt-1">{errors.body.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Note"}
      </Button>
    </form>
  );
}

export default NoteForm;
