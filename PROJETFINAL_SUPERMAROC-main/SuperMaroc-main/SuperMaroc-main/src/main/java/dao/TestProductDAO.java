package dao;

import dto.ProductDTO;
import java.util.List;

public class TestProductDAO {
    public static void main(String[] args) {
        ProductDAO dao = new ProductDAO();
        List<ProductDTO> produits = dao.getAllProducts();

        System.out.println("Produits trouvés = " + produits.size());
        for (ProductDTO p : produits) {
            System.out.println(p);
        }
    }
}