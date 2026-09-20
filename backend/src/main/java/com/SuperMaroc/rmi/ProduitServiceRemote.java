package com.SuperMaroc.rmi;

import com.SuperMaroc.model.Produit;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;

public interface ProduitServiceRemote extends Remote {
    List<Produit> getAll() throws RemoteException;
    Produit get(Long id) throws RemoteException;
    Produit save(Produit p) throws RemoteException;
    Produit update(Long id, Produit p) throws RemoteException;
    void delete(Long id) throws RemoteException;
}