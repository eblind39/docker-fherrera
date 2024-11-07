// import { syncDB } from "../../tasks/sync-db"
const { syncDB } = require('../../tasks/sync-db');

describe('Pruebas en sync-db', () => {
    it('debe ejecutar el proceso 2 veces', () => {
        syncDB();
        const times = syncDB();
        
        console.log(`Se llamó: ${times}`);
        expect(times).toBe(2);
    })
})