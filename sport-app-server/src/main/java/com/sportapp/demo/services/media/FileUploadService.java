package com.sportapp.demo.services.media;

import com.amazonaws.AmazonClientException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.sportapp.demo.exceptions.InvalidFileException;
import java.io.IOException;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileUploadService {

  @Value("${S3MediaBucketName}")
  private String mediaBucketName;
  @Value("${S3MediaUrl}")
  private String mediaUrl;
  @Value("${S3AccessKey}")
  private String s3AccessKey;
  @Value("${S3SecretKey}")
  private String s3SecretKey;

  public ResponseEntity<?> uploadNewsCover(MultipartFile file) {
    try {
      verifyImage(file);
      String fileName = "images/news-covers/news_cover_" +
          System.currentTimeMillis() + "_" + UUID.randomUUID().toString();
      uploadFile(file, fileName);

      return new ResponseEntity<>(mediaUrl + fileName, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private void verifyImage(MultipartFile file) throws InvalidFileException {
    try {
      if (!file.getContentType().matches("image/\\S+")) {
        throw new InvalidFileException("Illegal file type");
      }
    } catch (NullPointerException e) {
      throw new InvalidFileException("Unknown content type");
    }
  }

  private void uploadFile(MultipartFile file, String fileName)
      throws IOException, InterruptedException {
    AmazonS3 amazonS3Client = setAmazonS3Client();
    uploadFileToS3(file, fileName, amazonS3Client);
  }

  private void uploadFileToS3(MultipartFile multipartFile, String fileName,
      AmazonS3 amazonS3Client)
      throws IOException, AmazonClientException, InterruptedException {

    TransferManager transferManager = TransferManagerBuilder.standard()
        .withS3Client(amazonS3Client)
        .withMultipartUploadThreshold((long) (5 * 1024 * 1025))
        .build();

    PutObjectRequest request = createRequest(multipartFile, fileName);
    transferManager.upload(request).waitForCompletion();
  }

  private PutObjectRequest createRequest(MultipartFile multipartFile, String fileName)
      throws IOException {
    ObjectMetadata objectMetadata = new ObjectMetadata();
    objectMetadata.setContentLength(multipartFile.getSize());
    objectMetadata.setContentType(multipartFile.getContentType());
    return new PutObjectRequest(mediaBucketName, fileName, multipartFile.getInputStream(),
        objectMetadata)
        .withCannedAcl(CannedAccessControlList.PublicRead);
  }

  private AmazonS3 setAmazonS3Client() {
    AWSCredentials awsCredentials = new BasicAWSCredentials(s3AccessKey, s3SecretKey);
    return AmazonS3ClientBuilder
        .standard()
        .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
        .withRegion(Regions.EU_CENTRAL_1)
        .build();
  }
}
