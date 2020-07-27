package com.sportapp.demo.models.dtos.social;

import javax.validation.constraints.NotBlank;

public class CommentPostDto {

    @NotBlank
    private String value;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
