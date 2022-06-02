CREATE TABLE "to-do-list" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"status" BOOLEAN DEFAULT FALSE
	);
	
	INSERT INTO "to-do-list"
		("task")
	VALUES ('Finish the weekend challenge', 'Drink margaritas', 'Go Fishing', 'Sit back and relax');

		