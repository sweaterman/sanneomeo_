package com.hikers.sanneomeo.controller;

import com.hikers.sanneomeo.service.MountainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mountain")
public class MountainController {
    @Autowired
    MountainService mountainService;

    @GetMapping("/position/{mountainIdx}")
    public ResponseEntity<?> mountainPos(@PathVariable String mountainIdx){

        return ResponseEntity.ok(mountainService.getPos(mountainIdx));
    }
}
