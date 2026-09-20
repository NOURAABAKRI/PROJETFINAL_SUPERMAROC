package dto;

import java.io.Serializable;

public class OrderItemRequestDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private int productId;
    private int quantity;

    public OrderItemRequestDTO() {
    }

    public OrderItemRequestDTO(int productId, int quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}