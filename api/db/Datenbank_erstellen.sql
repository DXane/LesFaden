CREATE TABLE Benutzer(
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Benutzername TEXT NOT NULL,
    Password TEXT NOT NULL,
    Link_Profilbild TEXT DEFAULT "./img/insert-profile-pic.jpg",
    About TEXT,
    Datum DATE NOT NULL
);

CREATE TABLE Threads(
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Thread_Titel TEXT NOT NULL CHECK(LENGTH(Thread_Titel)<=250),
    Thread_Text TEXT NOT NULL,
    Creator_ID INTEGER DEFAULT 0,
    Datum DATE NOT NULL,
    Punkte INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (Creator_ID) REFERENCES Benutzer(ID)
);

CREATE TABLE Freunde(
    ID INTEGER NOT NULL,
    Benutzer_ID INTEGER NOT NULL,
    FOREIGN KEY (ID) REFERENCES Benutzer(ID)
);

CREATE TABLE Kommentare(
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Kommentartext TEXT NOT NULL,
    Datum DATE NOT NULL,
    Benutzer_ID INTEGER NOT NULL,
    Parent_ID INTEGER NOT NULL,
    THREAD_ID INTEGER NOT NULL,
    FOREIGN KEY (THREAD_ID) REFERENCES Threads(ID),
    FOREIGN KEY (Benutzer_ID) REFERENCES Benutzer(ID)
);

CREATE TABLE Nachrichten (
	ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	Nachrichttitel TEXT NOT NULL,
	Nachrichttext TEXT NOT NULL,
	Datum NUMERIC NOT NULL,
	SenderID INTEGER NOT NULL,
	EmpfaengerID INTEGER NOT NULL,
	FOREIGN KEY (SenderID) REFERENCES Benutzer(ID),
	FOREIGN KEY (EmpfaengerID) REFERENCES Benutzer(ID)
);

INSERT INTO Freunde VALUES(1,'["2"]');

INSERT INTO Benutzer VALUES(0,'Anonymus','','./img/insert-profile-pic.jpg','Alle ohne Account','2020-06-08T16:08:59.172Z');
INSERT INTO Benutzer VALUES(1,'Bernd','9lFMRrcz0YPom6++tNn2d7L4YdPYRTCM2nELiQfOMNXtCu+1hV9ZPxo45GNRz9Y5ZShZe/q9V7yruWbXWye3zQ==','./img/brot.jpeg','Es besteht aus Weizen','2020-06-08T17:00:17.624Z');


INSERT INTO Threads VALUES(1,'Test1','Test3',0,'2020-06-08T16:18:10.260Z',-1);
INSERT INTO Threads VALUES(3,'Das ist ein interesanter Titel','Das ist ein interesanter Text',1,'2020-05-14T20:38:19Z',30);
INSERT INTO Threads VALUES(4,'Was geht?','Diesen Montag',0,'2020-01-23T13:09:49Z',0);
INSERT INTO Threads VALUES(5,'Das ist ein langer Text','Mein Name ist Rainer „mit ai ganz wichtig“ Winkler. Ich bin 31 Jahre alt. Mein Haus ist im Südwesten von Emskirchen, wo alle Schanzen sind und ich bin nicht verheiratet. Ich bin arbeitslos und streame auf junau, und bin daher immer zu Hause. Ich rauche und trinke gelegentlich. Ich gehe zu verschiedenen Zeiten ins Bett und scheiße auf meinen Schlaf. Nach einem großen Ofenkäse und ungefähr zwanzig Minuten „Dehnungsübungen“ habe ich normalerweise kein Problem bis zum Abend zu schlafen. Wie ein Nilpferd wache ich abends mit Schmerzen und müde auf. Bei meiner letzten Untersuchung hat der Arzt nur den Kopf geschüttelt. Ich versuche zu erklären, dass ich eine Person bin, die sich wünscht ein sehr ruhiges Leben zu führen. Ich sorge dafür mich mit irgendwelchen Hatern zu beschäftigen und dabei zu gewinnen oder zu verlieren, was mir Schlaf raubt. Das ist wie ich mit der Gesellschaft umgehe und ich weiß was mich glücklich macht. Allerdings, wenn ich mal kämpfe, bin ich auf ewig UNBESIEGT!',0,'2019-07-26T18:52:56Z',10);
INSERT INTO Threads VALUES(6,'Eine Kopiernudel auf angelsächsisch',replace('In most cases it isn''t the Doctor that does this. I was put in this position as a Respiratory Therapist and disagreed highly with pulling the plug on this patient as he was responsive, was weaning off the Vent, and it wasn''t until the patient was starting to turn the corner that the patients family decided to (in my books) kill him. The patient was worth a considerable amount and had a lot of assets which I felt played into the families decision to terminate Ventilatory support.\n\nSo, I refused when the Doctor ordered me too. Yeah, you can imagine the shit storm I started. I literally said, "You want to kill him then you do it."He started yelling at me and asked me to show him and I said, "I won''t show you how to do that. Religiously (this was bullshit as I''m not religious at all), ethically, and morally I will not help you in any way, shape, or form kill this man."\n\nAnother Respiratory Therapist had showed up by then and the Doctor ordered him to do it and he said, "I can''t do it either."\n\nSo, now the Doctor and by this time the Nursing Supervisor were facing a mass rebellion by the Respiratory Therapy staff because other Respiratory Therapist had started to hear of little ol me giving the high hat to a leading Doctor of our hospital. The Doctor was fuming mad and the Nursing Supervisor was pretty much going, "WTF?"\n\nSo, our Supervisor ended up having to drive down from his house in the middle of the night (it was about an hour away) to come handle this rising escalating situation. And he was the one who terminated the Ventilatory support.\n\nGod he was fucking pissed off at me. I still remember me yelling at him and him yelling at me and me saying, "You say you are so religious well you just fucking killed a man. What the hell you going to say to your god now?"\n\nI was on the short bus to being out of there at that point but honestly I was already getting to that point and with me once I get to that point then all fucks given are gone.\n\nSo, I ended up calling Ombudsman not just on this but on another situation with a different patient involving ants which once again got the hospital in a mass fury and even though it was supposed to be anonymous I was the only one complaining about the ant situation leading up to the Inspections.\n\nSo, I had a target on my back and they began looking for any excuse to fire me. They ended up getting these two shit bags (one of which I helped out and kept from getting fired) to lie about me and that was it. Between personal problems and this shit I really kind of lost it and I cursed all three of them all at the same time. Fuck if I know where it came from or why but it came from somewhere deep.\n\nI opened the door to the office as the Supervisor sat there (I hadn''t clocked in yet) and said, "By the name of Jehovah and God Almighty I curse you, you, and you. You for knowingly going along with this facade to try and get me fired. You for lying, and you... You I curse most of all the worst of all punishments for your betrayal and lies," then I turned around and said, "I quit." I walked over to the workload I was supposed to be doing and dropped it into the supervisors lap and said, "And now you can do that workload."Walked over, blacked out my name from the schedule, and left.\n\nOne year later, I returned at night to see my friends and the first thing they said was, "What did you do?" Then they went into what happened the month after I left.\nThe Supervisors house burnt down and he lost everything.\nThe one guy who lied got caught lying about another patient that ended up causing substantial harm and he lost his license.\nThe one guy I considered a friend.. He had a massive MI and ended up on a ventilator for six months slowly declining and died. He got bed sores, infections, etc. His last six months of life were hell.\n\nOne thing I took away from all of that. It will take a hell of a lot for me to curse anybody ever like that again.I''m not religious mind you and I really don''t know where all of that came from but man... If that was coincidence it sure was one hell of a one and everybody working there thought I was the reason.\n\nYeah, that was probably my most epic, "I quit." moment.','\n',char(10)),0,'2020-05-11T05:14:01Z',1);
INSERT INTO Threads VALUES(7,'Hallo','Das ist keine Übung',0,'2020-06-04T23:44:52.873Z',2);
INSERT INTO Threads VALUES(8,'Warum liegt hier Stroh?','ALARM! ALARM!',0,'2020-06-05T00:23:11.553Z',69);
INSERT INTO Threads VALUES(9,'Teset','Was geht alter',0,'2020-06-05T01:00:58.262Z',420);
INSERT INTO Threads VALUES(10,'Dieser Titel ist so lang das er am ende abschnitten wird und das will sehen denn dann seid ihr daran interessiert was im Rest steht, jedoch muss man dann auf den Eintrag und das will jetzt auch keiner und es ist nur eine ''null''','Irgendein Latein text um mehr Text in das Feld zu besorgen',0,'2019-11-05T14:22:09Z',-696);
INSERT INTO Threads VALUES(11,'Ein Emotie','👍👍👍 Auf jedenfall stabile Aktion!!!😍😍😍Endlich ist durch Protest in unserem Land🔥🔥🔥 Das Rassismus Problem Übersee gelöst worden 🎉 GEIL🍑🍑🍑 Endlich verhält man sich solidarisch! Hier ist es ja genau so wie in den USA. Deutschland 😩😩 ist ja auch ständig durch morderne Polizisten in den Nachrichten. 😠😠😠 Jetzt endlich, keine Chance mehr für Rassimus🌞🌞🌞🌞, welcher in unserem Deutschland 😩😩😩, genau so ausgeprägt ist wie in anderen Orten, da die gleichen 🧐🧐🧐 sozio-ökonomischen und historischen Kontexte, auf der ganzen Welt herrschen. 👏 Jetzt haben wir Polizeigewalt aufgehalten 🙌🙌🙌🙌 Wir haben 😛😛😛  den gleich ausgeprägtem Rassismus und die exakt selbe Art der Polizeigewalt 👮👮👮👎👎 gestoppt. 🛑🛑🙅 In Deutschland 🇩🇪🇩🇪🇩🇪 und in den US(b)A(hh)! 🇺🇸🇺🇸Trunp hat gerade getwittert: "sorry, i will remove racism". Das nur haben NUR WIR erreicht, durch eine Massenversammlung, in Deutschland 😩, während einer Pandemie 🚑. Gut das Trump immer ARD (Staatsfernsehen) schaut. Gutes getan, Gewissen gestärkt! 😬😬📏 RACISM IS NO MORE!!!',1,'2020-06-11T21:42:22.093Z',88);

INSERT INTO Kommentare VALUES(1,'Hallo Kommentar 1','2020-06-08T16:24:08.366Z',0,0,1);
INSERT INTO Kommentare VALUES(2,'Hallo Kommentar 1','2020-06-08T16:24:38.411Z',0,1,1);
INSERT INTO Kommentare VALUES(3,'Hallo Test1','2020-06-08T16:29:14.888Z',1,2,1);
INSERT INTO Kommentare VALUES(4,'Hallo bänder','2020-06-08T17:04:47.660Z',1,0,5);
INSERT INTO Kommentare VALUES(5,'Test','2020-06-09T20:26:22.869Z',0,0,1);
INSERT INTO Kommentare VALUES(6,'Test','2020-06-09T20:27:41.276Z',0,4,3);
INSERT INTO Kommentare VALUES(7,'Test','2020-06-09T20:27:49.114Z',0,5,5);
INSERT INTO Kommentare VALUES(8,'Test','2020-06-09T20:28:08.441Z',0,0,10);
INSERT INTO Kommentare VALUES(9,'Man das sind viele emotes','2020-06-11T21:42:40.381Z',1,0,11);
INSERT INTO Kommentare VALUES(10,'WAS GEHTS DICH AN WAS ICH MIT MEINEN WUNDERSCHÖNEN PERLEN MACH11!!! ES SIND MEINE NICHT DEINE PERLEN!!!! KARLA HAT DESHALB RUDI GEHOLT!!!2213','2020-06-11T21:43:40.324Z',0,9,11);

INSERT INTO Nachrichten VALUES(1,'Test','Leer','2020-06-08T17:10:41.611Z',1,1);
INSERT INTO Nachrichten VALUES(2,'Hallo','Das ist eine Testnachricht','2020-06-09T20:28:23.632Z',0,1);