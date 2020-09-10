package com.sportapp.demo.services.registration;

import com.sportapp.demo.models.registration.OnRegistrationCompleteEvent;
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

  private static final String SUBJECT = "Potwierdzenie rejestracji w SportApp";

  private final UserService userService;
  private final JavaMailSender mailSender;

  public RegistrationListener(UserService userService,
      JavaMailSender mailSender) {
    this.userService = userService;
    this.mailSender = mailSender;
  }

  @Override
  public void onApplicationEvent(OnRegistrationCompleteEvent event) {
    this.confirmRegistration(event);
  }

  private void confirmRegistration(OnRegistrationCompleteEvent event) {
    User user = event.getUser();
    String token = UUID.randomUUID().toString();
    userService.createVerificationToken(user, token);

    String confirmationUrl = getConfirmationUrl(event.getAppUrl(), token);
    sendMail(user.getEmail(), getMessage(confirmationUrl));
  }

  private void sendMail(String email, String text) {
    SimpleMailMessage mail = new SimpleMailMessage();
    mail.setTo(email);
    mail.setSubject(SUBJECT);
    mail.setText(text);
    mailSender.send(mail);
  }

  private String getConfirmationUrl(String appUrl, String token) {
    return appUrl + "/registrationConfirm?token=" + token;
  }

  private String getMessage(String confirmationUrl) {
    String message = "Wejdź w poniższy link aby aktywować konto:\n" + confirmationUrl;
    return message;
  }

}
