package com.intelliarts.conflab.core;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.PrintWriter;
import java.io.StringWriter;

@Controller
public class WebPage {

    @RequestMapping("/")
    public String getMainPage() {
        return "index.html";
    }

    @ExceptionHandler
    public String handleError(Exception ex) {
        StringWriter writer = new StringWriter();
        ex.printStackTrace(new PrintWriter(writer));
        return writer.toString();
    }
}