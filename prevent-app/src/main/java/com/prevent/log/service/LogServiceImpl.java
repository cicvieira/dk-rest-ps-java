package com.prevent.log.service;

import com.prevent.log.model.Log;
import com.prevent.log.model.LogDTO;
import com.prevent.log.repository.LogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LogServiceImpl implements LogService {

    private final LogRepository logRepository;

    @Override
    @Transactional
    public List<Log> getAllLogs() {
        List<Log> logsList = new ArrayList<>();
        logRepository.findAll().forEach(logsList::add);
        return logsList;
    }

    @Override
    @Transactional
    public Optional<Log> getLogById(Long id) {
        return logRepository.findById(id);
    }

    @Override
    @Transactional
    public Log saveNewLog(LogDTO logDTO) { return logRepository.save(convertDTOToLog(logDTO));
    }

    @Override
    @Transactional
    public Log updateLog(Log oldLog, LogDTO newLogDTO) { return logRepository.save(updateLogFromDTO(oldLog, newLogDTO));
    }

    @Override
    @Transactional
    public void deleteLog(Log log) {
        logRepository.delete(log);
    }

    private Log convertDTOToLog(LogDTO logDTO) {
        Log log = new Log();
        log.setData(logDTO.getData());
        log.setIp(logDTO.getIp());
        log.setRequest(logDTO.getRequest());
        log.setStatus(logDTO.getStatus());
        log.setUseragent(logDTO.getUseragent());
        return log;
    }

    private Log updateLogFromDTO(Log log, LogDTO logDTO){
        if(Optional.ofNullable(logDTO.getData()).isPresent()){
            log.setData(logDTO.getData());
        }

        if (Optional.ofNullable((logDTO.getIp())).isPresent()) {
            log.setIp(logDTO.getIp());
        }

        if (Optional.ofNullable((logDTO.getRequest())).isPresent()) {
            log.setRequest(logDTO.getRequest());
        }

        if (Optional.ofNullable((logDTO.getStatus())).isPresent()) {
            log.setStatus(logDTO.getStatus());
        }

        if (Optional.ofNullable((logDTO.getUseragent())).isPresent()) {
            log.setUseragent(logDTO.getUseragent());
        }
        return log;
    }
}
