import org.springframework.stereotype.Service;
import java.util.List;
import dto.ProductDTO;
import dao.ProductDAO;

@Service
public class ProductService {

    private final ProductDAO productDAO;

    public ProductService(ProductDAO productDAO) {
        this.productDAO = productDAO;
    }

    public List<ProductDTO> getAllProducts() {
        return productDAO.getAllProducts();
    }

    public ProductDTO getProduct(int id) {
        return productDAO.findById(id);
    }

    public void addProduct(ProductDTO product) {
        productDAO.insertProduct(product);
    }

    public void updateProduct(ProductDTO product) {
        productDAO.updateProduct(product);
    }

    public void deleteProduct(int id) {
        productDAO.deleteProduct(id);
    }
}