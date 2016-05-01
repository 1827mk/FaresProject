package com.nbu.fares.controller;

import com.nbu.fares.service.RestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by tanaphatdev on 28/4/2559.
 */
@Controller
@RequestMapping("/faresRequest")
public class FaresController_Controller {
    @Autowired
    protected RestService restService;

    @RequestMapping(value="/showFares",produces = "text/html")
    public String service1(Model uiModel){
        return "faresed/showFares";
    }
}
