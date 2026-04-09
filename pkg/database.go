package pkg

import (
	"database/sql"
	"log"
)

var (
	db  *sql.DB
	err error
)

func Connection() (*sql.DB, error) {
	db, err = sql.Open("sqlite3", "test.db")
	if err != nil {
		log.Fatal("Error connecting to database: ", err)
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		log.Fatal("Error pinging database: ", err)
		return nil, err
	}

	return db, nil
}
