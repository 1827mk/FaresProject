package com.nbu.fares.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class RestService extends AbstractFaresEngine {

    static Logger logger = LoggerFactory.getLogger(RestService.class);

//    public ResponseEntity<String> findAllEquipment1(){
//        RestTemplate restTemplate = new RestTemplate();
//        String url = "http://" + this.HRMSServer + "/equipments/findAllEquipment";
//        System.out.print("REST:"+url);
//        return getResultStringByTypeHttpMethodAndBodyContent("", HttpMethod.GET,url,restTemplate);
//    }
//
//    public ResponseEntity<String> findAllEquipmenttype(){
//        RestTemplate restTemplate = new RestTemplate();
//        String url = "http://" + this.HRMSServer + "/equipmenttypes/findAllEquipmenttype";
////        System.out.print("REST:"+url);
//        return getResultStringByTypeHttpMethodAndBodyContent("", HttpMethod.GET,url,restTemplate);
//    }
//
//    public ResponseEntity<String> findIdDateByDate(String date,Long idSeedRice){
//        RestTemplate restTemplate = new RestTemplate();
//        String url = "http://" + this.HRMSServer + "/dateprices/findIdDateByDate?date="+date+"&idSeedRice="+idSeedRice;
//        return getResultStringByTypeHttpMethodAndBodyContent("", HttpMethod.GET,url,restTemplate);
//    }



}