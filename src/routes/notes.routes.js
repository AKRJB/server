import { Router } from "express";
import {
    createNote,
    updateNote,
    deleteNotes,
    allNotes
} from "../controllers/notes.controller.js";


const router = Router();

router.route("/notes").get(allNotes);
router.route("/addnotes").post(createNote);
router.route("/:noteID").patch(updateNote).delete(deleteNotes);


export default router;