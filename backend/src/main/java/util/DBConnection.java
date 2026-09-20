package util;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {

    private static final String URL =
    "jdbc:mysql://localhost:3306/supermaroc?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC";
    private static final String USER = System.getenv().getOrDefault("DB_USERNAME", "root");
    private static final String PASSWORD = System.getenv("DB_PASSWORD");

    public static Connection getConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("Connexion MySQL réussie !");
            return conn;
        } catch (Exception e) {
            System.err.println("Erreur de connexion MySQL : " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}