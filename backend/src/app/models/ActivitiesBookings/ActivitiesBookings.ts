import mongoose from 'mongoose';

import { IActivitiesBookings } from '../../interfaces';

const ActivitiesBookings = new mongoose.Schema(
    { content: String }
);

export default mongoose.model<IActivitiesBookings & mongoose.Document>('ActivitiesBookings', ActivitiesBookings);
