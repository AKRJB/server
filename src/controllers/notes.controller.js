import { Notes } from "../model/notes.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { isValidObjectId } from "mongoose";


const createNote = asyncHandler(async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            throw new ApiError(400, "Title is required");
        }

        const note = await Notes.create({
            message
        });

        if (!note) {
            throw new ApiError(500, "Failed to create note. Please try again.");
        }

        return res
           .status(200)
           .json(new ApiResponse(200, {note}, "Note created successfully"));
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
    }
});

const updateNote = asyncHandler(async(req, res) => {
    const { message } = req.body;
    const { noteID } = req.params;

    if(!message){
      message.text
    }

    if (!isValidObjectId(noteID)) {
        throw new ApiError(400, "Invalid Note Id");
    }

    const note  = await Notes.findById(noteID);

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    const updatedNote = await Notes.findByIdAndUpdate(
        noteID,
        {
            $set: {
                message
            },
        },
        {new: true}
    );

    if (!updatedNote) {
        throw new ApiError(500, "Failed to edit note please try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedNote, "Note updated successfully"));
});

const deleteNotes = asyncHandler(async(req, res) => {
    const { noteID } = req.params;

    if (!isValidObjectId(noteID)) {
        throw new ApiError(400, "Invalid Note Id");
    }

    const note = await Notes.findById(noteID);

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    await Notes.findByIdAndDelete(noteID);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Note deleted successfully"));
});

const allNotes = asyncHandler(async (req, res) => {
    try {
        const notes = await Notes.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export{
    createNote,
    updateNote,
    deleteNotes,
    allNotes
}