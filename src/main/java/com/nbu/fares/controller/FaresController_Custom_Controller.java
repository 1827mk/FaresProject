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
        try{
            return restService.findAllFaresFromEngine();
        }catch (Exception e){
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @RequestMapping(value = "/findAllSource",method = RequestMethod.GET,headers = "Accept=application/json")
    public ResponseEntity<String> findAllSource(){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        try{
            return restService.findAllSourceFromEnging();
        }catch (Exception e){
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @RequestMapping(value = "/searchAll", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> searchAll(@RequestParam(value = "source",required = false)String source,
                                            @RequestParam(value = "destination",required = false)String destination) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> result = null;
        try{
//            logger.error("searchAll =="+source+"=="+destination+"=="+"\n");
            return   restService.searchAll(source,destination);
        }catch (Exception e){
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @RequestMapping(value = "/searchTransport", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> searchTransport(@RequestParam(value = "source",required = false)String source,
                                              @RequestParam(value = "destination",required = false)String destination,
                                              @RequestParam(value = "tranCodes",required = false)String tranCodes) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> result = null;
        try{
//            logger.error("searchPlane =="+source+"=="+destination+"=="+tranCode+"=="+"\n");
            return   restService.searchTransport(source,destination,tranCodes);
        }catch (Exception e){
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @RequestMapping(value = "/searchFlightTransport", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> searchFlightTransport(@RequestParam(value = "source",required = false)String source,
                                                  @RequestParam(value = "destination",required = false)String destination,
                                                  @RequestParam(value = "trainCode",required = false)String trainCode,
                                                  @RequestParam(value = "busCode",required = false)String busCode) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String> result = null;
        try{
//            logger.error("searchPlane =="+source+"=="+destination+"=="+trainCode+"=="+busCode+"=="+"\n");
            return   restService.searchFlightTransport(source,destination,trainCode,busCode);
        }catch (Exception e){
            return new ResponseEntity<String>("{\"ERROR\":" + e.getMessage() + "\"}", headers, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


}
