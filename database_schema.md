Database Songs
create table songs(ID SERIAL PRIMARY KEY not null unique, title VARCHAR not null, artist VARCHAR not null, notes VARCHAR, SID int not null default 0);

insert into songs(title, artist, notes) values ('I Want You to Want Me', 'Cheap Trick', null), ('Scenario', 'A Tribe Called Quest', null), ('Fastlove', 'George Michael', null), ('Freya', 'The Sword', 'This one is weird');

create table artists(ID SERIAL PRIMARY KEY not null unique, name VARCHAR not null, SID int not null default 0, numsongs int not null default 0);

insert into artists (name) values ('Cheap Trick'), ('A Tribe Called Quest'), ('George Michael'), ('The Sword');

insert 


create user monkey with password 'monkey';

grant all privileges on songs to monkey;

Keep working on getting this up to speed on the backend

2065464559

0-<Chuck Berry: 1

Chuck Berry-<H: 2

H-<Leann Rimes: 3

Leann Rimes-<Patty Smyth: 4

Patty Smyth-<T: 5

T-Beyond: 6

Database: 1
Cyan: 2
Green: 3
Puce: 4
Charcoal: 5
Brown: 6