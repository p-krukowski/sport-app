package com.sportapp.demo.services.media;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.File;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class FileUploadService {

  public ResponseEntity<?> uploadFile(File file) {
    try {
      String fileName = "images/" + System.currentTimeMillis() + "_" + file.getName();
      AmazonS3 amazonS3Client = setAmazonS3Client();
      uploadFileToS3(file, fileName, amazonS3Client);

      return new ResponseEntity<>("${S3MediaUrl}" + fileName, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private void uploadFileToS3(File file, String fileName, AmazonS3 amazonS3Client) {
    PutObjectRequest request = new PutObjectRequest("${S3MediaBucketName}", fileName, file)
        .withCannedAcl(CannedAccessControlList.PublicRead);
    amazonS3Client.putObject(request);
  }

  private AmazonS3 setAmazonS3Client() {
    AWSCredentials awsCredentials = new BasicAWSCredentials("${S3AccessKey}",
        "${S3SecretKey}");
    return AmazonS3ClientBuilder.standard()
        .withCredentials(new AWSStaticCredentialsProvider(awsCredentials)).build();
  }
}
