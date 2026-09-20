package dao;

import dto.OrderItemRequestDTO;
import dto.OrderRequestDTO;
import dto.OrderResultDTO;
import util.DBConnection;

import java.math.BigDecimal;
import java.sql.*;
import java.util.List;

public class OrderDAO {

    public OrderResultDTO createOrder(OrderRequestDTO request) throws SQLException {

        if (request == null || request.getItems() == null || request.getItems().isEmpty()) {
            throw new SQLException("Order must contain at least one product.");
        }

        Connection connection = DBConnection.getConnection();

        if (connection == null) {
            throw new SQLException("Unable to connect to the database.");
        }

        try (connection) {
            connection.setAutoCommit(false);

            try {
                List<OrderItemRequestDTO> items = request.getItems();

                Integer storeId = null;
                BigDecimal totalPrice = BigDecimal.ZERO;

                String productSql =
                        "SELECT store_id, price, quantity " +
                        "FROM products WHERE product_id = ? FOR UPDATE";

                for (OrderItemRequestDTO item : items) {

                    if (item.getQuantity() <= 0) {
                        throw new SQLException("Invalid quantity for product " + item.getProductId());
                    }

                    try (PreparedStatement ps = connection.prepareStatement(productSql)) {
                        ps.setInt(1, item.getProductId());

                        try (ResultSet rs = ps.executeQuery()) {

                            if (!rs.next()) {
                                throw new SQLException("Product not found: " + item.getProductId());
                            }

                            int productStoreId = rs.getInt("store_id");
                            BigDecimal price = rs.getBigDecimal("price");
                            int availableQuantity = rs.getInt("quantity");

                            if (storeId == null) {
                                storeId = productStoreId;
                            } else if (storeId != productStoreId) {
                                throw new SQLException(
                                        "All products in an order must belong to the same store."
                                );
                            }

                            if (availableQuantity < item.getQuantity()) {
                                throw new SQLException(
                                        "Insufficient stock for product " + item.getProductId()
                                );
                            }

                            BigDecimal subtotal =
                                    price.multiply(BigDecimal.valueOf(item.getQuantity()));

                            totalPrice = totalPrice.add(subtotal);
                        }
                    }
                }

                int orderId;

                String orderSql =
                        "INSERT INTO orders (store_id, employee_id, total_price) " +
                        "VALUES (?, NULL, ?)";

                try (PreparedStatement ps = connection.prepareStatement(
                        orderSql, Statement.RETURN_GENERATED_KEYS)) {

                    ps.setInt(1, storeId);
                    ps.setBigDecimal(2, totalPrice);
                    ps.executeUpdate();

                    try (ResultSet keys = ps.getGeneratedKeys()) {
                        if (!keys.next()) {
                            throw new SQLException("Unable to create order.");
                        }

                        orderId = keys.getInt(1);
                    }
                }

                String itemSql =
                        "INSERT INTO order_items (order_id, product_id, quantity, subtotal) " +
                        "VALUES (?, ?, ?, ?)";

                String updateStockSql =
                        "UPDATE products SET quantity = quantity - ? " +
                        "WHERE product_id = ? AND quantity >= ?";

                for (OrderItemRequestDTO item : items) {

                    BigDecimal price;

                    try (PreparedStatement ps = connection.prepareStatement(
                            "SELECT price FROM products WHERE product_id = ?")) {

                        ps.setInt(1, item.getProductId());

                        try (ResultSet rs = ps.executeQuery()) {
                            if (!rs.next()) {
                                throw new SQLException("Product not found.");
                            }

                            price = rs.getBigDecimal("price");
                        }
                    }

                    BigDecimal subtotal =
                            price.multiply(BigDecimal.valueOf(item.getQuantity()));

                    try (PreparedStatement ps = connection.prepareStatement(itemSql)) {
                        ps.setInt(1, orderId);
                        ps.setInt(2, item.getProductId());
                        ps.setInt(3, item.getQuantity());
                        ps.setBigDecimal(4, subtotal);
                        ps.executeUpdate();
                    }

                    try (PreparedStatement ps = connection.prepareStatement(updateStockSql)) {
                        ps.setInt(1, item.getQuantity());
                        ps.setInt(2, item.getProductId());
                        ps.setInt(3, item.getQuantity());

                        if (ps.executeUpdate() != 1) {
                            throw new SQLException(
                                    "Unable to update stock for product " + item.getProductId()
                            );
                        }
                    }
                }

                connection.commit();

                return new OrderResultDTO(orderId, totalPrice);

            } catch (Exception e) {
                connection.rollback();

                if (e instanceof SQLException) {
                    throw (SQLException) e;
                }

                throw new SQLException("Order creation failed.", e);
            }
        }
    }
}