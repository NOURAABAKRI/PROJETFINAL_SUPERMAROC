package rmi;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import service.AdminService;
import service.AdminServiceImpl;
import service.AuthServiceImpl;
import service.ClientService;
import service.ClientServiceImpl;
import util.DBConnection;
import java.sql.Connection;

public class RMIServer {
    public static void main(String[] args) {
        try {
            Registry reg = LocateRegistry.createRegistry(1099);

            reg.rebind("AuthService", new AuthServiceImpl());
            reg.rebind("ClientService", new ClientServiceImpl());
            reg.rebind("AdminService", new AdminServiceImpl());

            System.out.println("Serveur RMI démarré");
// Test de connexion JDBC
            Connection conn = DBConnection.getConnection();
            if (conn != null) {
                System.out.println("Connexion JDBC réussie !");
                conn.close();
            } else {
                System.out.println("Échec de la connexion JDBC.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}