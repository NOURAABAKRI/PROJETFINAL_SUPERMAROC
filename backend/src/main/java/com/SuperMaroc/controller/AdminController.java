package com.SuperMaroc.controller;

import com.SuperMaroc.service.AdminServiceProxy;
import dto.ProductDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/produits")
public class AdminController {

    private final AdminServiceProxy adminService;

    // Injection du proxy
    public AdminController(AdminServiceProxy adminService) {
        this.adminService = adminService;
    }

    // 🔍 GET : consulter tous les produits
    @GetMapping
    public List<ProductDTO> getProduits() {
        System.out.println("➡️ REST GET produits appelé");
        return adminService.getProduits();
    }

    // ➕ POST : ajouter un produit
    @PostMapping
    public void ajouterProduit(@RequestBody ProductDTO p) {
        System.out.println("➡️ REST POST ajouter produit appelé");
        adminService.ajouterProduit(p);
    }

    // ✏️ PUT : mettre à jour un produit
    @PutMapping
    public void updateProduit(@RequestBody ProductDTO p) {
        System.out.println("➡️ REST PUT update produit appelé");
        adminService.updateProduit(p);
    }

    // ❌ DELETE : supprimer un produit par ID
    @DeleteMapping("/{id}")
    public void supprimerProduit(@PathVariable int id) {
        System.out.println("➡️ REST DELETE supprimer produit appelé");
        adminService.supprimerProduit(id);
    }
}