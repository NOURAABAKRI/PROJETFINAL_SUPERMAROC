package dto;

import java.io.Serializable;

public class UserDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private int userId;
    private String role;

    // --- Constructeur ---
    public UserDTO(int userId, String role) {
        this.userId = userId;
        this.role = role;
    }

    // --- Getters & Setters ---
    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    @Override
    public String toString() {
        return "UserDTO{" +
                "userId=" + userId +
                ", role='" + role + '\'' +
                '}';
    }
}