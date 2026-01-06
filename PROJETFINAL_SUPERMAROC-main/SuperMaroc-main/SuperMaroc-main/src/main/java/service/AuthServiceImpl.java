package service;

import dto.UserDTO;
import rmi.AuthService;
import util.DBConnection;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.sql.*;

public class AuthServiceImpl extends UnicastRemoteObject implements AuthService {

    public AuthServiceImpl() throws RemoteException {
        super();
    }

    @Override
    public UserDTO login(String username, String password) throws RemoteException {
        String sql = "SELECT role FROM employees WHERE username=? AND password=?";

        try (Connection c = DBConnection.getConnection();
             PreparedStatement ps = c.prepareStatement(sql)) {

            ps.setString(1, username);
            ps.setString(2, password);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                return new UserDTO(1, rs.getString("role").toUpperCase());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}