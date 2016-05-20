package com.nbu.fares.controller;

import com.nbu.fares.service.RestService;
import flexjson.JSONSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by tanaphatdev on 28/4/2559.
 */

@Controller
@RequestMapping("/service")
public class FaresController_Custom_Controller {

    static Logger logger = LoggerFactory.getLogger(FaresController_Custom_Controller.class);

    @Autowired
    protected RestService restService;

    @RequestMapping(value = "/findAllFares",method = RequestMethod.GET,headers = "Accept=application/json")
        public ResponseEntity<String> findAllFares(){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
    return restService.findAllFaresFromEngine();
    }

    @RequestMapping(value = "/findFares", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> findFares(@RequestParam(value = "faresCode",required = false)String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> result = null;
        try{
            logger.info("==============find by code================");
            System.out.print("findFares controller"+code+"\n");
            return   restService.findFaresFromEngine(code);
        }catch (Exception e){
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

}
