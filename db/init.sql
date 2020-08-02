create type "Type" as enum ('MANGA', 'MANHWA');

create table "File"
(
    filename text   not null,
    id       serial not null
        constraint "File_pkey"
            primary key,
    mimetype text   not null,
    path     text   not null
);

create table "Comic"
(
    "coverId" integer
        constraint "Comic_coverId_fkey"
            references "File"
            on update cascade on delete set null,
    id        serial not null
        constraint "Comic_pkey"
            primary key,
    name      text   not null,
    slug      text   not null,
    text      text   not null,
    type      "Type" not null
);

create unique index "Comic.name"
    on "Comic" (name);

create unique index "Comic.slug"
    on "Comic" (slug);

create unique index "File.path"
    on "File" (path);

create table "Chapter"
(
    "comicId" integer not null
        constraint "Chapter_comicId_fkey"
            references "Comic"
            on update cascade on delete cascade,
    id        serial  not null
        constraint "Chapter_pkey"
            primary key,
    name      text    not null
);

create unique index "Chapter.comicId_name"
    on "Chapter" ("comicId", name);

create table "Page"
(
    "chapterId" integer
        constraint "Page_chapterId_fkey"
            references "Chapter"
            on update cascade on delete set null,
    height      integer not null,
    id          serial  not null
        constraint "Page_pkey"
            primary key,
    "imageId"   integer not null
        constraint "Page_imageId_fkey"
            references "File"
            on update cascade on delete cascade,
    number      integer not null,
    width       integer not null
);

