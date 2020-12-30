package com.sportapp.demo.controllers.media;

import com.sportapp.demo.services.media.FileUploadService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/media/file/upload")
public class FileUploadController {

  FileUploadService fileUploadService;

  public FileUploadController(FileUploadService fileUploadService) {
    this.fileUploadService = fileUploadService;
  }

  @Transactional
  @PostMapping("/news-cover")
  public ResponseEntity<?> uploadNewsCover(@RequestParam("file") MultipartFile file) {
    return fileUploadService.uploadNewsCover(file);
  }

}
