import { Notes } from "../models/notes.model.js";

export const createNoteService = async (data) => {
  return await Notes.create(data);
};

export const getNoteByIdService = async (id, userId) => {
  return await Notes.findOne({ _id: id, user: userId }).select("-__v");
};

export const getAllNotesService = async ({
  userId,
  page,
  limit,
  search = "",
}) => {
  const skip = (page - 1) * limit;
  const query = { user: userId };

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const [notes, total] = await Promise.all([
    Notes.find(query)
      .select("-__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Notes.countDocuments(query),
  ]);

  return { notes, total };
};

export const updateNoteService = async (id, userId, data) => {
  const payload = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined)
  );

  return await Notes.findOneAndUpdate({ _id: id, user: userId }, payload, {
    new: true,
  });
};

export const deleteNoteService = async (id, userId) => {
  return await Notes.findOneAndDelete({ _id: id, user: userId });
};
