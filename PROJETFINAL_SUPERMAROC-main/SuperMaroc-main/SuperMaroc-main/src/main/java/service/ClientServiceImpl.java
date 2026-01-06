 package service;
import dao.ProductDAO;
import dto.ProductDTO;

import java.rmi.server.UnicastRemoteObject;
import java.rmi.RemoteException;
import java.util.List;

public class ClientServiceImpl extends UnicastRemoteObject
        implements ClientService {

    private ProductDAO dao = new ProductDAO();

    public ClientServiceImpl() throws RemoteException {}

    @Override
    public List<ProductDTO> consulterProduits() {
    List<ProductDTO> produits = dao.getAllProducts();
    System.out.println("Service: produits envoyés = " + produits.size());
    return produits;
}
    @Override
    public void ajouterAuPanier(int productId, int qte) {
        List<ProductDTO> products = dao.getAllProducts();

        for (ProductDTO p : products) {
            if (p.getProductId() == productId) {
                int newQty = p.getQuantity() - qte;
                dao.updateQuantity(productId, newQty);
                break;
            }
       }
    }
}


