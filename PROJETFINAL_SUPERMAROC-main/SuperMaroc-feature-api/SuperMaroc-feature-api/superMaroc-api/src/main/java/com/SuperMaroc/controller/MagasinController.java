package com.SuperMaroc.controller;

import com.SuperMaroc.model.Magasin;
import com.SuperMaroc.service.MagasinService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/magasins")
@RequiredArgsConstructor
public class MagasinController {

    private final MagasinService service;

    @GetMapping
    public List<Magasin> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Magasin add(@RequestBody Magasin m) {
        return service.save(m);
    }
}

