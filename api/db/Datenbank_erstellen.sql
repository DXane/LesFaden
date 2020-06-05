CREATE TABLE Benutzer(
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Benutzername TEXT NOT NULL,
    Password TEXT NOT NULL,
    Link_Profilbild TEXT,
    Datum DATE NOT NULL,
    FID INTEGER NOT NULL
);

CREATE TABLE Freunde(
    ID INTEGER NOT NULL,
    Benutzer_ID INTEGER NOT NULL,
    FOREIGN KEY (ID) REFERENCES Benutzer(ID)
);

CREATE TABLE Threads(
    ID INTEGER NOT NULL PRIMARY KEY,
    Thread_Titel TEXT NOT NULL CHECK(LENGTH(Thread_Titel)<=250),
    Thread_Text TEXT NOT NULL,
    Creator_ID INTEGER DEFAULT 0,
    Datum DATE NOT NULL,
    Punkte INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (Creater_ID) REFERENCES Benutzer(ID)
);

CREATE TABLE Kommentare(
    ID INTEGER NOT NULL PRIMARY KEY,
    Kommentartext TEXT NOT NULL,
    Datum DATE NOT NULL,
    Benutzer_ID INTEGER NOT NULL,
    Parent_ID INTEGER NOT NULL,
    THREAD_ID INTEGER NOT NULL,
    FOREIGN KEY (THREAD_ID) REFERENCES Threads(ID),
    FOREIGN KEY (Benutzer_ID) REFERENCES Benutzer(ID)
);