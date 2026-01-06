// src/main/java/com/SuperMaroc/controller/TestController.java
package com.SuperMaroc.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
public class TestController {
    
    @GetMapping("/hello")
    public String hello() {
        return "✅ TestController fonctionne!";
    }
    
    @GetMapping("/check")
    public String check() {
        return "{\"status\":\"OK\",\"message\":\"API test endpoint\"}";
    }
}