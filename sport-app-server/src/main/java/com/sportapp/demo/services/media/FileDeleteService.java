package com.sportapp.demo.services.media;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class FileDeleteService {

  @Value("${S3MediaBucketName}")
  private String mediaBucketName;
  @Value("${S3MediaUrl}")
  private String mediaUrl;

  AwsUtils awsUtils;

  public FileDeleteService(AwsUtils awsUtils) {
    this.awsUtils = awsUtils;
  }

  public ResponseEntity<?> deleteNewsCover(String url) {
    try {
      AmazonS3 s3Client = awsUtils.setAmazonS3Client();
      s3Client.deleteObject(new DeleteObjectRequest(mediaBucketName, getKeyNameFromUrl(url)));

      return new ResponseEntity<>(HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private String getKeyNameFromUrl(String url) {
    return url.substring(mediaUrl.length());
  }

}
