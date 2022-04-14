import { Low, JSONFile } from 'lowdb'



// Lowdb setup, use JSOn file for storage
const adapter = new JSONFile('db.json')
const db = new Low(adapter)


// reads data from our storage file (if one exists)
// the data that was read will go into 'db.data'
await db.read()


// set default data, if needed
db.data = db.data || []


export default db