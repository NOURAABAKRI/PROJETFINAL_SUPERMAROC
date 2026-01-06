package rmi;

import dto.UserDTO;
import java.rmi.Remote;
import java.rmi.RemoteException;

public interface AuthService extends Remote {
    UserDTO login(String username, String password) throws RemoteException;
}