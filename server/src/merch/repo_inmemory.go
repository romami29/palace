package merch

import (
	"errors"
	"sync"
)

type InMemoryProductRepository struct {
	mu       sync.RWMutex
	products map[string]*Product
}

func NewInMemoryProductRepository() *InMemoryProductRepository {
	return &InMemoryProductRepository{
		products: make(map[string]*Product),
	}
}

func (r *InMemoryProductRepository) GetByID(id string) (*Product, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	product, exists := r.products[id]
	if !exists {
		return nil, errors.New("product not found")
	}
	return product, nil
}

func (r *InMemoryProductRepository) GetAll() ([]Product, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	var result []Product
	for _, product := range r.products {
		result = append(result, *product)
	}
	return result, nil
}

func (r *InMemoryProductRepository) Create(product *Product) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, exists := r.products[product.ID]; exists {
		return errors.New("product already exists")
	}
	r.products[product.ID] = product
	return nil
}

func (r *InMemoryProductRepository) Update(product *Product) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, exists := r.products[product.ID]; !exists {
		return errors.New("product not found")
	}
	r.products[product.ID] = product
	return nil
}

func (r *InMemoryProductRepository) Delete(id string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, exists := r.products[id]; !exists {
		return errors.New("product not found")
	}
	delete(r.products, id)
	return nil
}
