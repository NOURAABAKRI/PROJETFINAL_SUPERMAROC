package dto;

import java.io.Serializable;
import java.math.BigDecimal;

public class OrderResultDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private int orderId;
    private BigDecimal totalPrice;

    public OrderResultDTO() {
    }

    public OrderResultDTO(int orderId, BigDecimal totalPrice) {
        this.orderId = orderId;
        this.totalPrice = totalPrice;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }
}