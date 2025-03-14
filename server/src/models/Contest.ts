import mongoose, { Document, Schema } from 'mongoose';

export interface IContest extends Document {
  name: string;
  platform: 'Codeforces' | 'CodeChef' | 'LeetCode';
  startTime: Date;
  endTime: Date;
  duration: number;
  url: string;
  isBookmarked: boolean;
  solutionUrl?: string;
}

const ContestSchema: Schema = new Schema({
  name: { type: String, required: true },
  platform: { 
    type: String, 
    required: true, 
    enum: ['Codeforces', 'CodeChef', 'LeetCode'] 
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  duration: { type: Number, required: true }, // in minutes
  url: { type: String, required: true },
  isBookmarked: { type: Boolean, default: false },
  solutionUrl: { type: String }
});

export default mongoose.model<IContest>('Contest', ContestSchema);
