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

    public ResponseEntity<String> findAllFaresFromEngine(){
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://" + this.HRMSServer + "/fareses/findAllFares";
        System.out.print("REST:"+url);
        return getResultStringByTypeHttpMethodAndBodyContent("", HttpMethod.GET,url,restTemplate);
    }

    public ResponseEntity<String> findFaresFromEngine(String code){
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://" + this.HRMSServer + "/fareses/findFaresByCode/"+code;
        return getResultStringByTypeHttpMethodAndBodyContent("parameters", HttpMethod.GET,url,restTemplate);
    }


}