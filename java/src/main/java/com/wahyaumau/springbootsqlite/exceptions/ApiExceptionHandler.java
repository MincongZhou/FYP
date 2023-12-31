package com.wahyaumau.springbootsqlite.exceptions;

import com.wahyaumau.springbootsqlite.models.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice               // Global Exception Handling
public class ApiExceptionHandler {

    @ExceptionHandler(value = NotFoundException.class)          // 404
    public ResponseEntity<ErrorResponse> handleNotFound(NotFoundException e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(value = Exception.class)                  // 500
    public ResponseEntity<ErrorResponse> handleException(Exception e){
        return ResponseEntity.internalServerError().body(new ErrorResponse(e.getMessage()));
    }
}
