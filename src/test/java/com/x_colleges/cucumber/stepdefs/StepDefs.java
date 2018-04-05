package com.x_colleges.cucumber.stepdefs;

import com.x_colleges.LogWorkApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = LogWorkApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
