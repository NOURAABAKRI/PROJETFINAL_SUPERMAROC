package service;

import dao.OrderDAO;
import dto.OrderRequestDTO;
import dto.OrderResultDTO;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.sql.SQLException;

public class OrderServiceImpl extends UnicastRemoteObject implements OrderService {

    private final OrderDAO orderDAO = new OrderDAO();

    public OrderServiceImpl() throws RemoteException {
        super();
    }

    @Override
    public OrderResultDTO createOrder(OrderRequestDTO request) throws RemoteException {
        try {
            return orderDAO.createOrder(request);
        } catch (SQLException e) {
            throw new RemoteException(e.getMessage(), e);
        }
    }
}