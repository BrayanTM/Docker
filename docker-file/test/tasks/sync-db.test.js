const { syncDB } = require("../../tasks/sync-db");

describe('Pruebas en sync-DB', () => {

    test('Debería incrementar el contador en 1 cada vez que se llama', () => {
        syncDB();
        syncDB();
        expect(syncDB()).toBe(3);
    });
});