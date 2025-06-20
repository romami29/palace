package merch

type ProductRepository interface {
	GetByID(id string) (*Product, error)
	GetAll() ([]Product, error)
	Create(product *Product) error
	Update(product *Product) error
	Delete(id string) error
}

// ProductService provides methods to manage products using a repository.
type ProductService struct {
	repo ProductRepository
}

// NewProductService initializes a new ProductService.
func NewProductService(repo ProductRepository) *ProductService {
	return &ProductService{repo: repo}
}

// CreateProduct adds a new product.
func (s *ProductService) CreateProduct(product *Product) error {
	return s.repo.Create(product)
}

// GetProduct retrieves a product by its ID.
func (s *ProductService) GetProductById(id string) (*Product, error) {
	return s.repo.GetByID(id)
}

// UpdateProduct modifies an existing product.
func (s *ProductService) UpdateProduct(updated *Product) error {
	return s.repo.Update(updated)
}

// DeleteProduct removes a product by its ID.
func (s *ProductService) DeleteProduct(id string) error {
	return s.repo.Delete(id)
}
