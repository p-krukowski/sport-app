package com.sportapp.demo.controllers.media;

import com.sportapp.demo.services.media.FileDeleteService;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/media/file/delete")
@RequiredArgsConstructor
class FileDeleteController {

  private final FileDeleteService fileDeleteService;

  @Transactional
  @DeleteMapping("/news-cover")
  ResponseEntity<?> deleteNewsCoverFromUrl(@RequestBody String imageUrl) {
    return fileDeleteService.deleteNewsCover(imageUrl);
  }
}
