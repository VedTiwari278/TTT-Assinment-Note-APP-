import {
  createNoteService,
  getAllNotesService,
  getNoteByIdService,
  updateNoteService,
  deleteNoteService,
} from "../service/notes.service.js";
import { getPaginationParams } from "../utils/pagination.js";

export const createNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, body, description } = req.body;
    const finalBody = body ?? description;

    if (!title || !finalBody) {
      return res.status(400).json({
        success: false,
        message: "Title and body are required",
      });
    }

    const note = await createNoteService({
      user: userId,
      title,
      body: finalBody,
    });

    return res.status(201).json({
      success: true,
      data: note,
      message: "Notes created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in create notes API",
    });
  }
};

export const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page, limit } = getPaginationParams(req.query);
    const { search = "" } = req.query;
    const { notes, total } = await getAllNotesService({
      userId,
      page,
      limit,
      search,
    });

    return res.status(200).json({
      success: true,
      data: notes,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      message: notes.length ? "Notes fetched successfully" : "No Data Found",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in get notes API",
    });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, body, description } = req.body;

    const note = await updateNoteService(id, userId, {
      title,
      body: body ?? description,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "No note found",
      });
    }

    return res.status(200).json({
      success: true,
      data: note,
      message: "Notes updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating note",
    });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const note = await getNoteByIdService(id, userId);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "No note found",
      });
    }

    return res.status(200).json({
      success: true,
      data: note,
      message: "Note fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching note",
    });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const note = await deleteNoteService(id, userId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "No note found",
      });
    }

    return res.status(200).json({
      success: true,
      data: note,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Service unavailable",
    });
  }
};
