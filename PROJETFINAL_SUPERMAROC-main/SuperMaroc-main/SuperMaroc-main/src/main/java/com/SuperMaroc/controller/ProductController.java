import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import dto.ProductDTO;
import dao.ProductDAO;

@CrossOrigin(origins = "http://localhost:5050") 
@RestController
@RequestMapping("/api/admin/produits")
public class ProductController {

    @Autowired
    private ProductDAO productDAO;

    // GET all products
    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productDAO.getAllProducts();
    }

    // GET one product by ID
    @GetMapping("/{id}")
    public ProductDTO getProduct(@PathVariable int id) {
        return productDAO.findById(id);
    }

 @PostMapping
public ProductDTO addProduct(@RequestBody ProductDTO product) {
    if (productDAO.insertProduct(product)) {
        return product;
    } else {
        throw new RuntimeException("Erreur lors de l'insertion du produit");
    }
}

 @PutMapping("/{id}")
    public ProductDTO updateProduct(@PathVariable int id, @RequestBody ProductDTO product) {
        product.setProductId(id);
        if (productDAO.updateProduct(product)) {
            return product;
        } else {
            throw new RuntimeException("Erreur lors de la mise à jour du produit");
        }
    }

@DeleteMapping("/{id}")
public void deleteProduct(@PathVariable int id) {
    if (!productDAO.deleteProduct(id)) {
        throw new RuntimeException("Erreur lors de la suppression du produit");
    }
}
}