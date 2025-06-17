package events

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

type EventHandler struct {
	service *EventService
}

func NewEventHandler(service *EventService) *EventHandler {
	return &EventHandler{service: service}
}

func (h *EventHandler) GetUpcomingEvents(w http.ResponseWriter, r *http.Request) {
	events, err := h.service.GetUpcomingEvents()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(events)
}

func (h *EventHandler) GetEventByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	event, err := h.service.GetEventByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(event)
}
