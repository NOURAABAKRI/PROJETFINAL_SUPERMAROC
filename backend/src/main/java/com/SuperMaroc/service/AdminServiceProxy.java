package com.SuperMaroc.service;

import dto.ProductDTO;
import service.AdminService;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

import java.rmi.Naming;
import java.util.Collections;
import java.util.List;

@Service
public class AdminServiceProxy {

    private AdminService remote;

    @PostConstruct
    public void init() {
        try {
            // Connexion au service RMI
            remote = (AdminService) Naming.lookup("rmi://localhost:1099/AdminService");
            System.out.println("✅ Connexion RMI AdminService réussie");
        } catch (Exception e) {
            System.err.println("❌ Impossible de se connecter au AdminService : " + e.getMessage());
            remote = null;
        }
    }

    public List<ProductDTO> getProduits() {
        if (remote == null) {
            System.err.println("⚠️ Service RMI non disponible (getProduits)");
            return Collections.emptyList();
        }
        try {
            return remote.consulterProduits();
        } catch (Exception e) {
            throw new RuntimeException("Erreur RMI consulterProduits", e);
        }
    }

    public void ajouterProduit(ProductDTO p) {
        if (remote == null) {
            System.err.println("⚠️ Service RMI non disponible (ajouterProduit)");
            return;
        }
        try {
            remote.ajouteProduit(p);
            System.out.println("✅ Produit ajouté via RMI");
        } catch (Exception e) {
            throw new RuntimeException("Erreur RMI ajouteProduit", e);
        }
    }

    public void updateProduit(ProductDTO p) {
        if (remote == null) {
            System.err.println("⚠️ Service RMI non disponible (updateProduit)");
            return;
        }
        try {
            remote.updateProduct(p);
            System.out.println("✅ Produit mis à jour via RMI");
        } catch (Exception e) {
            throw new RuntimeException("Erreur RMI updateProduct", e);
        }
    }

    public void supprimerProduit(int id) {
        if (remote == null) {
            System.err.println("⚠️ Service RMI non disponible (supprimerProduit)");
            return;
        }
        try {
            remote.supprimerProduct(id);
            System.out.println("✅ Produit supprimé via RMI");
        } catch (Exception e) {
            throw new RuntimeException("Erreur RMI supprimerProduct", e);
        }
    }
}