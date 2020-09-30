package com.prevent.log.service;

import com.prevent.log.model.Log;
import com.prevent.log.model.LogDTO;

import java.util.List;
import java.util.Optional;

public interface LogService {

    List<Log> getAllLogs();

    Optional<Log> getLogById(Long id);

    Log saveNewLog(LogDTO logDTO);

    Log updateLog(Log oldLog, LogDTO newLogDTO);

    void deleteLog(Log log);
}
