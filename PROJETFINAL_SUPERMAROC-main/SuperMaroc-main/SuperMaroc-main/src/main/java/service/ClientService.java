/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package service;

import dto.ProductDTO;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;

public interface ClientService extends Remote {
    List<ProductDTO> consulterProduits() throws RemoteException;
    void ajouterAuPanier(int productId, int qte) throws RemoteException;
}
