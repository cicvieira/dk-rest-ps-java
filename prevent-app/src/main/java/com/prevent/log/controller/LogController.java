package com.prevent.log.controller;

import com.prevent.log.model.Log;
import com.prevent.log.model.LogDTO;
import com.prevent.log.service.LogService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/logs")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class LogController {

    private final LogService logService;

    @GetMapping("/")
    @ApiOperation(value="View a list of all logs", response = Log.class, responseContainer = "List")
    public ResponseEntity<?> getAllLogs(){
        try {
            return new ResponseEntity<>(
                    logService.getAllLogs(),
                    HttpStatus.OK);
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @GetMapping("/{id}")
    @ApiOperation(value="Find a log info by its id", response = Log.class)
    public ResponseEntity<?> getLog(@PathVariable Long id){
        try {
            Optional<Log> optLog = logService.getLogById(id);
            if (optLog.isPresent()) {
                return new ResponseEntity<>(
                        optLog.get(),
                        HttpStatus.OK);
            } else {
                return noLogFoundResponse(id);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @PostMapping("/")
    @ApiOperation(value="Save new log", response = Log.class)
    public ResponseEntity<?> createLog(@RequestBody LogDTO logDTO){
        try {
            return new ResponseEntity<>(
                    logService.saveNewLog(logDTO),
                    HttpStatus.CREATED);
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @PutMapping("/{id}")
    @ApiOperation(value="Update a log with specific id", response = Log.class)
    public ResponseEntity<?> updateLog(@PathVariable Long id, @RequestBody LogDTO logDTO){
        try {
            Optional<Log> optLog = logService.getLogById(id);
            if (optLog.isPresent()) {
                return new ResponseEntity<>(
                        logService.updateLog(optLog.get(), logDTO),
                        HttpStatus.OK);
            } else {
                return noLogFoundResponse(id);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value="Delete Log with specific id", response = String.class)
    public ResponseEntity<?> deleteLog(@PathVariable Long id){
        try {
            Optional<Log> optLog = logService.getLogById(id);
            if (optLog.isPresent()) {
                logService.deleteLog(optLog.get());
                return new ResponseEntity<>(id,HttpStatus.OK);
            } else {
                return noLogFoundResponse(id);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    private ResponseEntity<String> errorResponse(){
        return new ResponseEntity<>("Something went wrong :(", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<String> noLogFoundResponse(Long id){
        return new ResponseEntity<>("No log found with id: " + id, HttpStatus.NOT_FOUND);
    }

}
