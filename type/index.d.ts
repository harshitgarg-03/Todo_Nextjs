import mongoose from "mongoose";

interface todoSchemsProp extends mongoose.documents {
    title: string,
    description: string,
    priority: string,
    completed: boolean
}    