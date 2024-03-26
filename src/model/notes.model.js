import mongoose, {Schema} from "mongoose";


const notesSchema = new Schema({

    message:{
        type: String,
        required: true
    }
    
}, { timestamps: true })

export const Notes = mongoose.model("Notes", notesSchema)