package rmi;

import dto.ProductDTO;
import service.ClientService;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.List;

public class RMIClient {

    public static void main(String[] args) {
        try {
            // 1️⃣ Connexion au registry RMI
            Registry registry = LocateRegistry.getRegistry("localhost", 1099);
            System.out.println("✅ Client RMI démarré");

            // 2️⃣ Récupération du service
            ClientService service = (ClientService) registry.lookup("ClientService");

            // 3️⃣ Lecture initiale
            List<ProductDTO> products = service.consulterProduits();
            System.out.println("Client: produits reçus = " + products.size());
            for (ProductDTO p : products) {
                System.out.println(p);
            }

            // 4️⃣ Ajout au panier
            int productId = 1;
            int quantity = 2;
            service.ajouterAuPanier(productId, quantity);
            System.out.println("✅ Produit ajouté au panier : " + productId + " (x" + quantity + ")");

            // 5️⃣ Ajout d’un nouveau produit (si AdminService accessible)
            /*
            ProductDTO newProduct = new ProductDTO(0, 1, 2, "Produit Test", 9.99, 10, "Produit inséré via RMI", "test.jpg");
            service.ajouteProduit(newProduct);
            System.out.println("✅ Nouveau produit inséré");
            */

            // 6️⃣ Vérification après ajout
            products = service.consulterProduits();
            System.out.println("📦 Produits après ajout :");
            for (ProductDTO p : products) {
                System.out.println(p.getProductId() + " | " + p.getName() + " | " + p.getQuantity());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}