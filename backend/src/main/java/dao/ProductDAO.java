package dao;

import dto.ProductDTO;
import util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductDAO {

    // 🔍 Lire tous les produits
    public List<ProductDTO> getAllProducts() {
        List<ProductDTO> list = new ArrayList<>();
        String sql = "SELECT product_id, store_id, category_id, name, price, quantity, description, image_path FROM products";

        try (Connection c = DBConnection.getConnection();
             PreparedStatement ps = c.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                ProductDTO p = new ProductDTO(
                        rs.getInt("product_id"),
                        rs.getInt("store_id"),
                        rs.getInt("category_id"),
                        rs.getString("name"),
                        rs.getDouble("price"),
                        rs.getInt("quantity"),
                        rs.getString("description"),
                        rs.getString("image_path")
                );
                list.add(p);
            }
            System.out.println("✅ Produits trouvés dans DAO : " + list.size());

        } catch (SQLException e) {
            System.err.println("❌ Erreur lors de la récupération des produits : " + e.getMessage());
            e.printStackTrace();
        }
        return list;
    }

    // ➕ Ajouter un produit
    public boolean insertProduct(ProductDTO p) {
        String sql = "INSERT INTO products(store_id, category_id, name, price, quantity, description, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (Connection c = DBConnection.getConnection();
             PreparedStatement ps = c.prepareStatement(sql)) {

            ps.setInt(1, p.getStoreId());
            ps.setInt(2, p.getCategoryId());
            ps.setString(3, p.getName());
            ps.setDouble(4, p.getPrice());
            ps.setInt(5, p.getQuantity());
            ps.setString(6, p.getDescription());
            ps.setString(7, p.getImagePath());

            int rows = ps.executeUpdate();
            return rows > 0;

        } catch (SQLException e) {
            System.err.println("❌ Erreur lors de l'insertion du produit : " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    // ✏️ Mettre à jour un produit
    public boolean updateProduct(ProductDTO p) {
        String sql = "UPDATE products SET store_id=?, category_id=?, name=?, price=?, quantity=?, description=?, image_path=? WHERE product_id=?";

        try (Connection c = DBConnection.getConnection();
             PreparedStatement ps = c.prepareStatement(sql)) {

            ps.setInt(1, p.getStoreId());
            ps.setInt(2, p.getCategoryId());
            ps.setString(3, p.getName());
            ps.setDouble(4, p.getPrice());
            ps.setInt(5, p.getQuantity());
            ps.setString(6, p.getDescription());
            ps.setString(7, p.getImagePath());
            ps.setInt(8, p.getProductId());

            int rows = ps.executeUpdate();
            return rows > 0;

        } catch (SQLException e) {
            System.err.println("❌ Erreur lors de la mise à jour du produit : " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    // ❌ Supprimer un produit
    public boolean deleteProduct(int productId) {
        String sql = "DELETE FROM products WHERE product_id=?";

        try (Connection c = DBConnection.getConnection();
             PreparedStatement ps = c.prepareStatement(sql)) {

            ps.setInt(1, productId);
            int rows = ps.executeUpdate();
            return rows > 0;

        } catch (SQLException e) {
            System.err.println("❌ Erreur lors de la suppression du produit : " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    // 🔍 Trouver un produit par ID
    public ProductDTO findById(int productId) {
        String sql = "SELECT product_id, store_id, category_id, name, price, quantity, description, image_path FROM products WHERE product_id = ?";

        try (Connection c = DBConnection.getConnection();
             PreparedStatement ps = c.prepareStatement(sql)) {

            ps.setInt(1, productId);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                return new ProductDTO(
                        rs.getInt("product_id"),
                        rs.getInt("store_id"),
                        rs.getInt("category_id"),
                        rs.getString("name"),
                        rs.getDouble("price"),
                        rs.getInt("quantity"),
                        rs.getString("description"),
                        rs.getString("image_path")
                );
            }

        } catch (SQLException e) {
            System.err.println("❌ Erreur lors de la recherche du produit : " + e.getMessage());
            e.printStackTrace();
        }

        return null; // produit non trouvé
    }

    // ✏️ Mettre à jour la quantité
    public boolean updateQuantity(int productId, int newQty) {
        String sql = "UPDATE products SET quantity=? WHERE product_id=?";

        try (Connection c = DBConnection.getConnection();
             PreparedStatement ps = c.prepareStatement(sql)) {

            ps.setInt(1, newQty);
            ps.setInt(2, productId);
            int rows = ps.executeUpdate();
            return rows > 0;

        } catch (SQLException e) {
            System.err.println("❌ Erreur lors de la mise à jour de la quantité : " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
}