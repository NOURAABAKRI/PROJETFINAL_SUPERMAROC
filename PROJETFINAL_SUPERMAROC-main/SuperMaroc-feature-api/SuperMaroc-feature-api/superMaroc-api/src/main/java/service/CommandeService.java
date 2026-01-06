package com.supermaroc.service;

import com.supermaroc.model.Commande;
import com.supermaroc.repository.CommandeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommandeService {

    private final CommandeRepository repo;

    public Commande create(Commande c) {
        c.setDateCommande(new Date());
        c.setEtat("EN_ATTENTE");
        return repo.save(c);
    }

    public List<Commande> getAll() {
        return repo.findAll();
    }

    public Commande get(Long id) {
        return repo.findById(id).orElseThrow();
    }
}
