package main

import (
	"context"
	"fmt"
	"log/slog"
	"vendera-pos/internal/core"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	if err := core.InitDB(); err != nil {
		slog.Error("Application startup failed due to database initialization error")
		return
	}
}

func (a *App) shutdown(ctx context.Context) {
	slog.Info("Application shutdown started")
	core.CloseConnection()
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
