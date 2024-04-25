import { Document, Schema, model, Model } from 'mongoose';

const COLLECTION_NAME = "Task";

export interface TaskDocument extends Document {
    taskId: number;
    text: string;
    completed: boolean;
    startDate: Date;
    endDate: Date;
}

const TaskSchema = new Schema<TaskDocument>(
    {
        taskId: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        startDate: {
            type: Date,
            default: Date.now
        },
        endDate: {
            type: Date,
        }
    },
    {
        collection: COLLECTION_NAME
    }
);

export const Task: Model<TaskDocument> = model<TaskDocument>(
    COLLECTION_NAME,
    TaskSchema
);

