import { model } from 'mongoose';

import Journal from './Journal';

const JournalModel = model('journals', Journal);

export default JournalModel;
