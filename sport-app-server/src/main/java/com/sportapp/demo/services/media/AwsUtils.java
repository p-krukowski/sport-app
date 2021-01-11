package com.sportapp.demo.services.media;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AwsUtils {

  @Value("${S3AccessKey}")
  private String s3AccessKey;
  @Value("${S3SecretKey}")
  private String s3SecretKey;

  public AmazonS3 setAmazonS3Client() {
    AWSCredentials awsCredentials = new BasicAWSCredentials(s3AccessKey, s3SecretKey);
    return AmazonS3ClientBuilder
        .standard()
        .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
        .withRegion(Regions.EU_CENTRAL_1)
        .build();
  }

}
