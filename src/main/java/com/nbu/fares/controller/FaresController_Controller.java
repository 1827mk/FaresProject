package com.nbu.fares.controller;

import com.nbu.fares.service.RestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by tanaphatdev on 28/4/2559.
 */
@Controller
@RequestMapping("/fares")
public class FaresController_Controller {
    @Autowired
    protected RestService restService;
//    @RequestMapping(value="/service1",produces = "text/html")
//    public String service1(Model uiModel){
//        return "service/service1";
//    }
//
//    @RequestMapping(value="/service2",produces = "text/html")
//    public String service2(Model uiModel){
//        return "service/service2";
//    }
//
//    @RequestMapping(value="/service3",produces = "text/html")
//    public String service3(Model uiModel){
//        return "service/service3";
//    }
//
//    @RequestMapping(value = "/findAllEquipment1",method = RequestMethod.GET,headers = "Accept=application/json")
//    public ResponseEntity<String> findAllEquipment1(){
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Type", "application/json; charset=utf-8");
//        return restService.findAllEquipment1();
//    }
//
//    @RequestMapping(value = "/findAllEquipmenttype",method = RequestMethod.GET,headers = "Accept=application/json")
//    public ResponseEntity<String> findAllEquipmenttype(){
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Type", "application/json; charset=utf-8");
//        return restService.findAllEquipmenttype();
//    }
}
