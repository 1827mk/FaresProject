package com.nbu.fares.controller;

import com.nbu.fares.service.RestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by tanaphatdev on 28/4/2559.
 */

@Controller
@RequestMapping("/service")
public class FaresController_Custom_Controller {

    protected static final Logger logger = LoggerFactory.getLogger(FaresController_Custom_Controller.class);

    @Autowired
    protected RestService restService;


}
