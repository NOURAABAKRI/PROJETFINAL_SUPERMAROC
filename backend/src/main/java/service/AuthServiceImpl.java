package service;

import dto.UserDTO;
import rmi.AuthService;
import util.DBConnection;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.sql.*;

public class AuthServiceImpl extends UnicastRemoteObject implements AuthService {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthServiceImpl() throws RemoteException {
        super();
    }

    @Override
    public UserDTO login(String username, String password) throws RemoteException {
        String sql = "SELECT employee_id, role, password FROM employees WHERE username=?";

        try (Connection c = DBConnection.getConnection();
             PreparedStatement ps = c.prepareStatement(sql)) {

            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();

            if (rs.next() && passwordEncoder.matches(password, rs.getString("password"))) {
                return new UserDTO(rs.getInt("employee_id"), rs.getString("role").toUpperCase());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}