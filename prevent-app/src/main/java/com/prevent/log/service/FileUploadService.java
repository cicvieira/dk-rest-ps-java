package com.prevent.log.service;

import com.prevent.log.controller.FileUploadController;
import com.prevent.log.model.LogDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.StringTokenizer;
import java.util.stream.Collectors;

@Service
public class FileUploadService {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    private final LogService logservice;

    @Autowired
    private Environment env;

    public FileUploadService(LogService logservice) {
        this.logservice = logservice;
    }

    public String uploadFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(env.getProperty("file.upload-dir")).toAbsolutePath().normalize();
            Path targetLocation = fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            logger.info(String.valueOf(targetLocation));

            if (file.isEmpty()) {
                logger.info("Not file");
            }else{
                readlog(targetLocation);
            }

        } catch (Exception ex) {
            System.out.println("Exception:" + ex);
        }
        return fileName;
    }

    public List<String> getFiles() throws IOException {

        return Files.walk(Paths.get(env.getProperty("file.upload-dir")))
                .filter(Files::isRegularFile)
                .map(file -> file.getFileName().toString())
                .collect(Collectors.toList());
    }

    public Resource loadFileAsResource(String fileName) throws MalformedURLException {
        Path fileStorageLocation = Paths.get(env.getProperty("file.upload-dir"))
                .toAbsolutePath().normalize();
        Path filePath = fileStorageLocation.resolve(fileName).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        if (resource.exists()) {
            return resource;
        }
        return null;
    }

    public void readlog ( Path path )
    {
        String strline = null;
        try (BufferedReader reader = Files.newBufferedReader( path )) {
            StringTokenizer st = null;

            String data;
            String ip;
            String request;
            String status;
            String useragent;

            while ((strline = reader.readLine()) != null) {

                st = new StringTokenizer(strline, "|");

                while (st.hasMoreTokens()) {

                    data = st.nextToken();
                    ip = st.nextToken();
                    request = st.nextToken();
                    status = st.nextToken();
                    useragent = st.nextToken();

                    System.out.println("Dta " + data);
                    System.out.println("Ip " + ip);
                    System.out.println("Request " + request);
                    System.out.println("Status " + status);
                    System.out.println("UserAgent " + useragent);

                    SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
                    Date dt = formato.parse(data);

                    LogDTO log = new LogDTO();
                    log.setData(dt);
                    log.setIp(ip);
                    log.setRequest(request);
                    log.setStatus(status);
                    log.setUseragent(useragent);
                    logservice.saveNewLog(log);
                }

            }

        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
    }

}
