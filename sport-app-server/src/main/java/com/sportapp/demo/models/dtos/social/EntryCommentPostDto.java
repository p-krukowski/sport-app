package com.sportapp.demo.models.dtos.social;

import javax.validation.constraints.NotBlank;

public class EntryCommentPostDto {

    @NotBlank
    private String value;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
