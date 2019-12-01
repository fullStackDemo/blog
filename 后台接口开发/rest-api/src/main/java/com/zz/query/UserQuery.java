package com.zz.query;

public class UserQuery {
    
    private String userName;
    
    private String password;
    
    private long userId;
    
    private boolean showPassword;
    
    public boolean isShowPassword() {
        return showPassword;
    }
    
    public void setShowPassword(boolean showPassword) {
        this.showPassword = showPassword;
    }
    
    public long getUserId() {
        return userId;
    }
    
    public void setUserId(long userId) {
        this.userId = userId;
    }
    
    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
}
