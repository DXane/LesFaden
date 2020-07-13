const functions=require('./functions'); 
const axios = require ("axios");

  // Testing Asynchroneous calls
  test('get a Thread', () => {
    var id =1;
    return functions.fetchThread(id).
        then(data => {
          expect(data.data.daten.id).toBe(id);
          expect(data.data.nachricht).toBe("OK");
          expect(data.data.fehler).toBe(false);
          expect(typeof data.data.daten.thread_titel).toBe('string');
          expect(typeof data.data.daten.thread_text).toBe('string');
          expect(typeof data.data.daten.datum).toBe('string');
        })
  });

  test('get a User', () => {
    var id =0;
    return functions.fetchUser(id).
        then(data => {
          expect(data.data.daten.id).toBe(id);
          expect(data.data.nachricht).toBe("OK");
          expect(data.data.fehler).toBe(false);
          expect(typeof data.data.daten.benutzername).toBe('string');
          expect(typeof data.data.daten.about).toBe('string');
          expect(typeof data.data.daten.datum).toBe('string');
        })
  });

  test('create a User', () => {
    return functions.createUser().
        then(data => {
          expect(data.data.nachricht).toBe("OK");
          expect(data.data.fehler).toBe(false);
        })
  });


