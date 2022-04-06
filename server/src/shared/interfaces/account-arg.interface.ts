import * as mongoose from 'mongoose'
import { CsvRow } from './csv-row.interface'

export interface AccountArg {
  user: mongoose.Types.ObjectId,
  policy_id: mongoose.Types.ObjectId,
  agent?: mongoose.Types.ObjectId,
  row: CsvRow
}