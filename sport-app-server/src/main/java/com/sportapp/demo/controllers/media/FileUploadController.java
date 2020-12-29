package com.sportapp.demo.controllers.media;

import com.sportapp.demo.services.media.FileUploadService;
import java.io.File;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/media/file")
public class FileUploadController {

  FileUploadService fileUploadService;

  public FileUploadController(FileUploadService fileUploadService) {
    this.fileUploadService = fileUploadService;
  }

  @PostMapping("/upload")
  public ResponseEntity<?> uploadFile(@RequestParam("file") File file) {
    return fileUploadService.uploadFile(file);
  }

}
