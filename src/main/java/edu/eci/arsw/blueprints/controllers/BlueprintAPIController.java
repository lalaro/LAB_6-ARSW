package edu.eci.arsw.blueprints.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.services.BlueprintsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
/**
 *
 * @author hcadavid
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/blueprints")
public class BlueprintAPIController {

    @Autowired
    BlueprintsServices bps;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getAllBlueprints() {
        try {
            return new ResponseEntity<>(bps.getAllBlueprints(), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/{author}", method = RequestMethod.GET)
    public ResponseEntity<?> getBlueprintsByAuthor(@PathVariable("author") String author) {
        try {
            // Obtenemos los planos como un Set
            Set<Blueprint> blueprintSet = bps.getBlueprintsByAuthor(author);
            // Convertimos el Set a una List
            List<Blueprint> blueprints = new ArrayList<>(blueprintSet);
            // Retornamos la lista de planos en formato JSON
            return new ResponseEntity<>(blueprints, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/{author}/{bpname}", method = RequestMethod.GET)
    public ResponseEntity<?> getBlueprint(@PathVariable("author") String author, @PathVariable("bpname") String bpname) {
        try {
            return new ResponseEntity<>(bps.getBlueprint(author, bpname), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> addNewBlueprint(@RequestBody Blueprint blueprint) {
        try {
            // Registrar el nuevo plano en el sistema
            bps.addNewBlueprint(blueprint);
            // Retorna 201 Created si la operación es exitosa
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            // Retorna 403 Forbidden si hay un error al persistir (por ejemplo, si ya existe el plano)
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }
}
