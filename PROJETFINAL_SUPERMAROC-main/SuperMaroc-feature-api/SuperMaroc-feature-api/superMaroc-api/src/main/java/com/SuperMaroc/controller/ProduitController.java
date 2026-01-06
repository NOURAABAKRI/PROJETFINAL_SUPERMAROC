package com.SuperMaroc.controller;

import com.SuperMaroc.model.Produit;
import com.SuperMaroc.service.ProduitService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
@RequiredArgsConstructor
public class ProduitController {

    private final ProduitService service;

    @GetMapping
    public List<Produit> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Produit get(@PathVariable Long id) {
        return service.get(id);
    }

    @PostMapping
    public Produit add(@RequestBody Produit p) {
        return service.save(p);
    }

    @PutMapping("/{id}")
    public Produit update(@PathVariable Long id, @RequestBody Produit p) {
        return service.update(id, p);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
