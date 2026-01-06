package rmi;

import dto.ProductDTO;
import service.AdminService;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.List;

public class RMIAdmin {
    public static void main(String[] args) {
        try {
            // Connexion au registry RMI
            Registry registry = LocateRegistry.getRegistry("localhost", 1099);
            System.out.println("✅ Admin RMI démarré");

            // Récupération du service Admin
            AdminService admin = (AdminService) registry.lookup("AdminService");

            // Ajout d’un produit de test
            ProductDTO p = new ProductDTO(
                0, 1, 2, "Produit Test", 9.99, 10,
                "Produit inséré via RMI", "test.jpg"
            );
            admin.ajouteProduit(p);
            System.out.println("✅ Produit inséré");

            // Vérification
            List<ProductDTO> produits = admin.consulterProduits();
            System.out.println("📦 Produits en base :");
            for (ProductDTO prod : produits) {
                System.out.println(prod.getProductId() + " | " + prod.getName() + " | " + prod.getQuantity());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}