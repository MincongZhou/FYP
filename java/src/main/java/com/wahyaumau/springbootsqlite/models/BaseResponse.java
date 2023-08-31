package com.wahyaumau.springbootsqlite.models;

import lombok.Data;

@Data                   // generate getter and setter
public class BaseResponse {
    private String code;
    private String message;
    private Object data;

    // Receive codes and messages as parameters and assign them to the appropriate fields
    public BaseResponse(String code, String message) {
        this.code = code;
        this.message = message;
    }

    // Receive codes, messages and data as parameters and assign them to the appropriate fields
    public BaseResponse(String code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}