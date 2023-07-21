const express = require("express")
const { auth } = require("../middlewares/auth")
const { getAllNoteController, getSingleNoteController, createNoteController, editNoteController, deleteNoteController, searchNoteController } = require("../controllers/noteController")
const noteRouter = express.Router()

noteRouter.use(auth)

// get all notes
noteRouter.get("/", getAllNoteController)

// get single note
noteRouter.get("/:_id", getSingleNoteController)

// create note
noteRouter.post("/create", createNoteController)

// edit note
noteRouter.patch("/:id", editNoteController)

// delete note 
noteRouter.delete("/:id", deleteNoteController)

// search note 
noteRouter.get("/search", searchNoteController)

module.exports = {
    noteRouter
}