package service;
import dto.ProductDTO;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;

public interface AdminService extends Remote {
    void ajouteProduit(ProductDTO p)throws RemoteException;
    void updateProduct(ProductDTO p) throws RemoteException;
    void supprimerProduct(int ProductId) throws RemoteException;
    List<ProductDTO> consulterProduits() throws RemoteException;
}
