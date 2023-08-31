package com.wahyaumau.springbootsqlite.controllers;

import com.wahyaumau.springbootsqlite.models.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.EventListener;

@RestController
public class FileUploadController {


    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private ResourceLoader resourceLoader;

    @PostMapping("/upload")                     // Handling POST requests
    public BaseResponse uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Get filename
            String fileName = file.getOriginalFilename();
            // Constructing file save paths
            Resource resource = resourceLoader.getResource(uploadDir);
            String filePath = resource.getFile().getAbsolutePath() + File.separator + fileName;
            // Save file
            file.transferTo(new File(filePath));
            // Returns the file URL
            int port = request.getServerPort();
            return new BaseResponse("200", "error", String.format("http://127.0.0.1:%d/images/%s", port, fileName));
        } catch (IOException e) {
            e.printStackTrace();
            return new BaseResponse("502", "error");
        }
    }
}