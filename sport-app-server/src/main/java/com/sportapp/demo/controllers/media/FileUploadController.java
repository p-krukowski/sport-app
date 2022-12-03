package com.sportapp.demo.controllers.media;

import com.sportapp.demo.services.media.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/media/file/upload")
@RequiredArgsConstructor
class FileUploadController {

  private final FileUploadService fileUploadService;

  @Transactional
  @PostMapping("/news-cover")
  @PreAuthorize("isAuthenticated()")
  ResponseEntity<?> uploadNewsCover(@RequestParam("file") MultipartFile file) {
    return fileUploadService.uploadImage(file, "news-covers", "news_cover");
  }

  @Transactional
  @PostMapping("/news-cover/external-source")
  @PreAuthorize("isAuthenticated()")
  ResponseEntity<?> uploadNewsCoverFromExternalSource(@RequestParam String imageUrl) {
    return fileUploadService.uploadFromUrl(imageUrl, "news-covers", "news_cover");
  }

  @Transactional
  @PostMapping("/entry-image")
  @PreAuthorize("isAuthenticated()")
  ResponseEntity<?> uploadEntryImage(@RequestParam("file") MultipartFile file) {
    return fileUploadService.uploadImage(file, "entry-images", "entry_image");
  }

  @Transactional
  @PostMapping("/entry-image/external-source")
  @PreAuthorize("isAuthenticated()")
  ResponseEntity<?> uploadEntryImageFromExternalSource(@RequestParam String imageUrl) {
    return fileUploadService.uploadFromUrl(imageUrl, "entry-images", "entry_image");
  }

}
