package com.SuperMaroc.service;

import com.SuperMaroc.model.Produit;
import com.SuperMaroc.repository.ProduitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProduitService {

    private final ProduitRepository repo;

    public List<Produit> getAll() {
        return repo.findAll();
    }

    public Produit get(Long id) {
        return repo.findById(id).orElseThrow();
    }

    public Produit save(Produit p) {
        return repo.save(p);
    }

    public Produit update(Long id, Produit p) {
        p.setId(id);
        return repo.save(p);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}

