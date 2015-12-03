package com.intelliarts.conflab;

import com.intelliarts.conflab.utils.ScreenShotOnFailure;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.concurrent.TimeUnit;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class LoginPageTest {

    static FirefoxDriver driver;

    private final WebElement loginField = driver.findElement(By.id("username"));
    private final WebElement passwordField = driver.findElement(By.id("password"));
    private final WebElement loginButton = driver.findElement(By.id("signIn"));

    @Rule
    public ScreenShotOnFailure failure = new ScreenShotOnFailure(driver);

    @BeforeClass
    public static void setUp() throws Exception {
        driver = new FirefoxDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("http://localhost:8080/#login");
    }

    @AfterClass
    public static void tearDown() throws Exception {
        driver.quit();
    }

    @Test
    public void loginFieldVisible() throws Exception {
        assertThat(loginField.isDisplayed(), is(true));
    }

    @Test
    public void passwordFieldVisible() throws Exception {
        assertThat(passwordField.isDisplayed(), is(true));
    }

    @Test
    public void passwordFieldHasPasswordType() throws Exception {
        assertThat(passwordField.getAttribute("type"), is("password"));
    }

    @Test
    public void loginButtonVisible() throws Exception {
        assertThat(loginButton.isDisplayed(), is(true));
    }
}
