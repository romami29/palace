package events

import (
	"palace/src/artists"
	"time"
)

type Event struct {
	ID          string           `json:"id"`
	Name        string           `json:"name"`
	Description string           `json:"description"`
	Date        time.Time        `json:"date"`
	Artists     []artists.Artist `json:"artists"`
}
