package util;

import util.DBConnection;
import java.sql.*;

public class TestDB {

    public static void main(String[] args) {
        System.out.println("test DB lance :");
        try (Connection c = DBConnection.getConnection()) {

            if (c != null) {
                System.out.println("✅ Connexion MySQL réussie");

                Statement st = c.createStatement();
                ResultSet rs = st.executeQuery(
                    "SELECT product_id, name, quantity FROM products"
                );

                while (rs.next()) {
                    System.out.println(
                        rs.getInt("product_id") + " | " +
                        rs.getString("name") + " | " +
                        rs.getInt("quantity")
                    );
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}