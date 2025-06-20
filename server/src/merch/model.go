package merch

type Product struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Type        string  `json:"type"`
	Image       string  `json:"image"`
	Price       float64 `json:"price"`
}
