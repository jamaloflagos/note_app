const mongoose = require('mongoose')
const { noteModel } = require("../models/noteModel")
const { initSocket } = require('../socket')
const {format} = require("date-fns")
const objectId = mongoose.Types.ObjectId

const io = initSocket()
const getAllNoteController = async(req, res) => {
    const user = req.user
    try {
        const note = await noteModel.find({user}).sort({createdAt: -1})
        // console.log(note.createdAt);
        // console.log(format(note.createdAt));
        
        res.status(200).json(note)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}
const getSingleNoteController = async(req, res) => {
    console.log("get single note request recieved");

    const { _id } = req.params
    console.log(_id)
    if(!objectId.isValid(_id)) {
        return res.status(400).json({error: "invalid ID"})
    }

    try {
        const note = await noteModel.findOne({_id})
        console.log(note);
        res.json({note})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }

    
}

const createNoteController = async(req, res) => {
    const {title, content, category} = req.body 
    try {
        const user = req.user
        console.log(user);
        
        const notes = await noteModel.create({title, content, category, user})
        res.status(200).json(notes)
    } catch (error) { 
        res.status(400).json({error: "All inputs required"})
    }

    console.log("create request recieved");
    
}

const editNoteController = async(req, res) => {
    const { id } = req.params
    if(!objectId.isValid(id)) {
        return res.status(400).json({error: "invalid ID"})
    }

    try {
        const note = await noteModel.findByIdAndUpdate(id, req.body, { new: true })
        res.json({note})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }

    console.log("update request recieved");
    
}

const deleteNoteController = async (req, res) => {
    // const { id } = req.params
    // if(!objectId.isValid(id)) {
    //     return res.status(400).json({error: "invalid ID"})
    // }
    // try {
    //     const note = await noteModel.findByIdAndDelete(id);
    //     if (!note) return res.status(404).json({ error: 'Note not found' });
    //     res.status(204).json(note);
    //   } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ error: 'Server error' });
    //   }

      const { id } = req.params
    if(!objectId.isValid(id)) {
        return res.status(400).json({error: "invalid ID"})
    }

    const note = await noteModel.findByIdAndDelete(id) 
    if(!note) {
        return res.status(400).json({error: "No such note"})
    }
    console.log("delete request recieved");
    

    res.json(note)
      console.log("delte received");
      
}

const searchNoteController = async (req, res) => {
    const { query } = req.query;
    const user = req.user;
    try {
      const notes = await noteModel.find({
        user,
        $or: [ 
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } }
        ]
      });
      res.json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    getAllNoteController,
    getSingleNoteController,
    createNoteController,
    editNoteController,
    deleteNoteController,
    searchNoteController
}