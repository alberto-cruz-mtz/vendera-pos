package core

import (
	"database/sql"
	"fmt"
	"log/slog"

	_ "modernc.org/sqlite"
)

var db *sql.DB

func InitDB() error {
	if db != nil {
		return nil
	}

	var err error

	dsn := "vendera.db?_pragma=journal_mode(WAL)&_pragma=foreign_keys(ON)"

	db, err = sql.Open("sqlite", dsn)
	if err != nil {
		slog.Error("Failed to connect to database:", err)
		return fmt.Errorf("open db: %w", err)
	}

	if err = db.Ping(); err != nil {
		slog.Error("Failed to ping database:", err)
		return fmt.Errorf("ping db: %w", err)
	}

	db.SetMaxOpenConns(1)

	slog.Info("Connected to database established successfully")
	return nil
}

func GetConnection() *sql.DB {
	if db == nil {
		slog.Warn("Database connection is not initialized")
	}
	return db
}

func CloseConnection() {
	if db == nil {
		return
	}

	slog.Info("Closing database connection")
	if err := db.Close(); err != nil {
		slog.Error("Failed to close database connection:", err)
		return
	}

	slog.Info("Database connection closed successfully")
}
