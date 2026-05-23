create table "USER"(
	"ID" BIGINT generated always as identity primary key,
	"DOCUMENT" VARCHAR(20) not null,
	"NAMES" VARCHAR(400) not null,
	"EMAIL" VARCHAR(100) not null,
	"ADDRESS" VARCHAR(400) not null 
);


create table "PRODUCT"(
	"ID" BIGINT generated always as identity primary key,
	"CODE" VARCHAR(100) not null unique,
	"NAME" VARCHAR(100) not null UNIQUE,
	"DESCRIPTION" VARCHAR(400),
	"STOCK" INT not null,
	"PRICE" INT not null
);

create table "INVOICE"(
	"ID" BIGINT generated always as identity primary key,
	"ID_USER" BIGINT not null,
	"DATE_INVOICE" TIMESTAMP not null
);

create table "DETAIL_INVOICE"(
	"ID" BIGINT generated always as identity primary key,
	"ID_INVOICE" BIGINT not  null,
	"ID_PRODUCT" BIGINT not null,
	"ID_USER" BIGINT not null,
	"QUANTITY" INT not null,
	"PRICE_UNITARY" INT not null
);
alter table "DETAIL_INVOICE" add foreign key ("ID_INVOICE") references "INVOICE"("ID");
alter table "DETAIL_INVOICE" add foreign key ("ID_PRODUCT") references "PRODUCT"("ID");
alter table "DETAIL_INVOICE" add foreign key ("ID_USER") references "USER"("ID");





alter table "INVOICE" add foreign key ("ID_USER") references "USER"("ID");