package com.sportapp.demo.services.media;

import com.amazonaws.AmazonClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.util.IOUtils;
import com.sportapp.demo.exceptions.InvalidFileException;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.integration.http.multipart.UploadedMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileUploadService {

  @Value("${S3MediaBucketName}")
  private String mediaBucketName;

  private final AmazonS3 amazonS3;

  AwsUtils awsUtils;

  public FileUploadService(AwsUtils awsUtils) {
    this.awsUtils = awsUtils;
    this.amazonS3 = awsUtils.setAmazonS3Client();
  }

  public ResponseEntity<?> uploadImage(MultipartFile file, String directory, String prefix) {
    try {
      verifyImage(file);
      String fileName = generateFileName(directory, prefix);
      uploadFileToS3(file, fileName);

      return new ResponseEntity<>(getResourceUrl(fileName), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public ResponseEntity<?> uploadFromUrl(String imageUrl, String directory, String prefix) {
    try {
      URL url = new URL(imageUrl);
      byte[] binary = IOUtils.toByteArray(url.openStream());
      UploadedMultipartFile multipartFile = new UploadedMultipartFile(binary, getContentType(url),
          "file", generateFileName(directory, prefix));

      return uploadImage(multipartFile, directory, prefix);
    } catch (MalformedURLException e) {
      return new ResponseEntity<>("Malformed image url", HttpStatus.INTERNAL_SERVER_ERROR);
    } catch (IOException e) {
      return new ResponseEntity<>("Wrong file", HttpStatus.BAD_REQUEST);
    }
  }

  private String getContentType(URL url) throws IOException {
    HttpURLConnection connection = (HttpURLConnection)  url.openConnection();
    connection.setRequestMethod("HEAD");
    connection.connect();
    String contentType = connection.getContentType();
    connection.disconnect();
    return contentType;
  }

  private String generateFileName(String directory, String prefix) {
    return "images/" + directory + "/" + prefix + "_" +
        System.currentTimeMillis() + "_" + UUID.randomUUID().toString();
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

  private void uploadFileToS3(MultipartFile multipartFile, String fileName)
      throws IOException, AmazonClientException, InterruptedException {

    TransferManager transferManager = TransferManagerBuilder.standard()
        .withS3Client(amazonS3)
        .withMultipartUploadThreshold((long) (5 * 1024 * 1025))
        .build();

    PutObjectRequest request = createPutObjectRequest(multipartFile, fileName);
    transferManager.upload(request).waitForCompletion();
  }

  private PutObjectRequest createPutObjectRequest(MultipartFile multipartFile, String fileName)
      throws IOException {
    ObjectMetadata objectMetadata = new ObjectMetadata();
    objectMetadata.setContentLength(multipartFile.getSize());
    objectMetadata.setContentType(multipartFile.getContentType());
    return new PutObjectRequest(mediaBucketName, fileName, multipartFile.getInputStream(),
        objectMetadata)
        .withCannedAcl(CannedAccessControlList.PublicRead);
  }

  private String getResourceUrl(String fileName) {
    AmazonS3Client amazonS3Client = (AmazonS3Client) amazonS3;
    return amazonS3Client.getResourceUrl(mediaBucketName, fileName);
  }

}
