package dto;

import java.io.Serializable;

public class ProductDTO implements Serializable {
    private int productId;
    private String name;
    private int quantity;
    private double price ;

    public ProductDTO() {}

    public ProductDTO(int productId, String name, int quantity, double price) {
        this.productId = productId;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }

    public int getProductId() {
        return productId;
    }

    public String getName() {
        return name;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getPrice() {
        return price;
    }

   }
