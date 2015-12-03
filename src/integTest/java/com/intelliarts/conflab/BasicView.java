package com.intelliarts.conflab;

import com.intelliarts.conflab.utils.ScreenShotOnFailure;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.isIn;
import static org.hamcrest.core.Is.is;

public class BasicView {
    private static FirefoxDriver driver;

    private final WebElement logo = driver.findElement(By.xpath("html/body/nav/div/div/div[1]/a"));
    private final WebElement loginLogout = driver.findElement(By.id("loginLogout"));
    private final WebElement navbar = driver.findElement(By.cssSelector(".nav.nav-sidebar"));

    @Rule
    public ScreenShotOnFailure failure = new ScreenShotOnFailure(driver);

    @BeforeClass
    public static void setUp() throws Exception {
        driver = new FirefoxDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("http://localhost:8080");
    }

    @AfterClass
    public static void tearDown() throws Exception {
        driver.quit();
    }

    @Test
    public void pageTitle() throws Exception {
        assertThat(driver.getTitle(), is("ConfLab main page"));
    }

    @Test
    public void brandHasAppropriateCssStyle() throws Exception {
        assertThat(logo.getAttribute("class"), is("navbar-brand"));
    }

    @Test
    public void brandIsCorrect() throws Exception {
        assertThat(logo.getText(), is("ConfLabs"));
    }

    @Test
    public void loginLink() throws Exception {
        assertThat(loginLogout.isDisplayed(), is(true));
    }

    @Test
    public void sidebarHasConferences() throws Exception {
        assertThat("Conferences", isIn(getNavbarLinks()));
    }

    @Test
    public void sidebarHasSpeakers() throws Exception {
        assertThat("Speakers", isIn(getNavbarLinks()));
    }

    // If case this test failed, please specify correct expectedLinksCount and
    // add test to check if navbar has new link
    @Test
    public void navbarHasTwoLinks() throws Exception {
        int expectedLinksCount = 2;
        assertThat(getNavbarLinks().size(), equalTo(expectedLinksCount));
    }

    private List<String> getNavbarLinks() {
        List<WebElement> navbarElements = navbar.findElements(By.xpath("//li"));
        return navbarElements.stream().map(WebElement::getText).collect(Collectors.toList());
    }
}