import mongoose from 'mongoose';

const machineSchema = new mongoose.Schema({
    ip: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const Machine = mongoose.models.Machine || mongoose.model('Machine', machineSchema);
export default Machine;
