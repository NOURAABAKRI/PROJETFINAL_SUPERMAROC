package dto;

import java.io.Serializable;
import java.util.List;

public class OrderRequestDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private List<OrderItemRequestDTO> items;

    public OrderRequestDTO() {
    }

    public OrderRequestDTO(List<OrderItemRequestDTO> items) {
        this.items = items;
    }

    public List<OrderItemRequestDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequestDTO> items) {
        this.items = items;
    }
}