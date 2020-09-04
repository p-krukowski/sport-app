package com.sportapp.demo.services.registration;

import com.sportapp.demo.models.social.User;
import com.sportapp.demo.services.social.UserService;
import java.util.UUID;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class RegistrationListener implements
    ApplicationListener<OnRegistrationCompleteEvent> {

  private UserService service;
  private JavaMailSender mailSender;

  public RegistrationListener(UserService service,
      JavaMailSender mailSender) {
    this.service = service;
    this.mailSender = mailSender;
  }

  @Override
  public void onApplicationEvent(OnRegistrationCompleteEvent event) {
    this.confirmRegistration(event);
  }

  private void confirmRegistration(OnRegistrationCompleteEvent event) {
    User user = event.getUser();
    String token = UUID.randomUUID().toString();
    service.createVerificationToken(user, token);

    String recipientAddress = user.getEmail();
    String subject = "Potwierdzenie rejestracji";
    String confirmationUrl
        = event.getAppUrl() + "/registrationConfirm?token=" + token;
    String message = "Wejdź w poniższy link aby aktywować konto:\n" + confirmationUrl;

    SimpleMailMessage email = new SimpleMailMessage();
    email.setTo(recipientAddress);
    email.setSubject(subject);
    email.setText(message);
    mailSender.send(email);
  }
}
