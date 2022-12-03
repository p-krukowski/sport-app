package com.sportapp.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
class ConfigController {

  @GetMapping("favicon.ico")
  @ResponseBody
  void returnNoFavicon() {
  }
}
