import mongoose from 'mongoose';

import { IWellnessTip } from '../../interfaces';

const WellnessTip = new mongoose.Schema(
    { content: String }
);

export default mongoose.model<IWellnessTip & mongoose.Document>('WellnessTip', WellnessTip);
