Database Songs
create table songs(ID SERIAL PRIMARY KEY not null unique, title VARCHAR not null, artist VARCHAR not null, notes VARCHAR);

insert into songs(title, artist, notes) values ('Surrender', 'Cheap Trick', null), ('Can I Kick It?', 'A Tribe Called Quest', null), ('Lust For Life', 'Iggy Pop', null), ('The Passenger', 'Iggy Pop', 'This one is weird');

insert into artists (name) values ('Cheap Trick'), ('A Tribe Called Quest'), ('Iggy Pop');

insert 

create table artists(ID SERIAL PRIMARY KEY not null unique, name VARCHAR not null);

create user monkey with password 'monkey';

grant all privileges on songs to monkey;

Keep working on getting this up to speed on the backend

2065464559