package dto;

import java.io.Serializable;

public class ProductDTO implements Serializable {
    private static final long serialVersionUID = 1L; // recommandé pour la compatibilité RMI

    private int productId;
    private int storeId;
    private int categoryId;
    private String name;
    private double price;
    private int quantity;
    private String description;
    private String imagePath;

    // --- Constructeurs ---
    public ProductDTO() {
    }

    // Constructeur minimal
    public ProductDTO(int productId, String name, int quantity, double price) {
        this.productId = productId;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }

    // Constructeur complet
    public ProductDTO(int productId, int storeId, int categoryId, String name,
                      double price, int quantity, String description, String imagePath) {
        this.productId = productId;
        this.storeId = storeId;
        this.categoryId = categoryId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.imagePath = imagePath;
    }

    // --- Getters & Setters ---
    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public int getStoreId() { return storeId; }
    public void setStoreId(int storeId) { this.storeId = storeId; }

    public int getCategoryId() { return categoryId; }
    public void setCategoryId(int categoryId) { this.categoryId = categoryId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImagePath() { return imagePath; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }

    @Override
    public String toString() {
        return "ProductDTO{" +
                "productId=" + productId +
                ", storeId=" + storeId +
                ", categoryId=" + categoryId +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", description='" + description + '\'' +
                ", imagePath='" + imagePath + '\'' +
                '}';
    }
}