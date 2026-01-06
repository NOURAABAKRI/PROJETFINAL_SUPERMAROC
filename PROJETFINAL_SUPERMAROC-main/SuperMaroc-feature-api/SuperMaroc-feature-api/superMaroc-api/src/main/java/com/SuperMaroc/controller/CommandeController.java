package com.SuperMaroc.controller;

import com.SuperMaroc.model.Commande;
import com.SuperMaroc.service.CommandeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commandes")
@RequiredArgsConstructor
public class CommandeController {

    private final CommandeService service;

    @PostMapping
    public Commande create(@RequestBody Commande c) {
        return service.create(c);
    }

    @GetMapping
    public List<Commande> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Commande get(@PathVariable Long id) {
        return service.get(id);
    }
}

