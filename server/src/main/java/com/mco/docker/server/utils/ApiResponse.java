package com.mco.docker.server.utils;

public class ApiResponse {
    private String text;
    private TypesResponse type;
    private Object result;

    public ApiResponse(String text, TypesResponse type) {
        this.text = text;
        this.type = type;
    }

    public ApiResponse(Object result, String text, TypesResponse type) {
        this.result = result;
        this.text = text;
        this.type = type;
    }

    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public TypesResponse getType() {
        return type;
    }

    public void setType(TypesResponse type) {
        this.type = type;
    }
}
