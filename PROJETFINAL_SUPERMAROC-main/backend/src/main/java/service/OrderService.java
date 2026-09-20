package service;

import dto.OrderRequestDTO;
import dto.OrderResultDTO;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface OrderService extends Remote {

    OrderResultDTO createOrder(OrderRequestDTO request) throws RemoteException;
}