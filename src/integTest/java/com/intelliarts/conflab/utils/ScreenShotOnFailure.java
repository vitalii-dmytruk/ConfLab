package com.intelliarts.conflab.utils;

import org.apache.commons.io.FileUtils;
import org.junit.rules.MethodRule;
import org.junit.runners.model.FrameworkMethod;
import org.junit.runners.model.Statement;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class ScreenShotOnFailure implements MethodRule {

    private WebDriver driver;

    public ScreenShotOnFailure(WebDriver driver) {
        this.driver = driver;
    }

    public Statement apply(final Statement statement, final FrameworkMethod frameworkMethod, final Object o) {
        return new Statement() {
            @Override
            public void evaluate() throws Throwable {
                try {
                    statement.evaluate();
                } catch (Throwable t) {
                    // exception will be thrown only when a test fails.
                    captureScreenShot(frameworkMethod.getName());
                    // rethrow to allow the failure to be reported by JUnit
                    throw t;
                }
            }

            public void captureScreenShot(String fileName) throws IOException {
                File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
                String currentDir = System.getProperty("user.dir");
                String timeStamp = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss").format(Calendar.getInstance().getTime());
                try {
                    // e.g. navbarHasTwoLinks2015-12-01_16:00:27.png
                    FileUtils.copyFile(scrFile, new File(currentDir + "/screenshots/" + fileName + timeStamp + ".png"));
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
        };
    }
}