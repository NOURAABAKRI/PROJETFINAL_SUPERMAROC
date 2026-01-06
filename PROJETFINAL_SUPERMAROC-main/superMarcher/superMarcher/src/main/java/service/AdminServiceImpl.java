package service;

import dao.ProductDAO;
import dto.ProductDTO;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.List;

public class AdminServiceImpl extends UnicastRemoteObject implements AdminService {

    private ProductDAO productDAO;

    public AdminServiceImpl() throws RemoteException {
        super();
        productDAO = new ProductDAO();
    }

    @Override
    public void ajouteProduit(ProductDTO p) throws RemoteException {
        productDAO.insertProduct(p);
    }

    @Override
    public List<ProductDTO> consulterProduits() throws RemoteException {
        return productDAO.getAllProducts();
    }

    @Override
    public void updateProduct(ProductDTO p) throws RemoteException {
        productDAO.updateProduct(p);
    }

    @Override
    public void supprimerProduct(int productId) throws RemoteException {
        productDAO.deleteProduct(productId);
    }
}