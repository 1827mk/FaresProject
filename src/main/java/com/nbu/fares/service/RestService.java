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
//        System.out.print("REST:"+url+"restTemplate"+restTemplate);
        return getResultStringByTypeHttpMethodAndBodyContent("", HttpMethod.GET,url,restTemplate);
    }
    public ResponseEntity<String> findAllSourceFromEnging(){
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://" + this.HRMSServer + "/locations/findAllCustom";
//        System.out.print("REST:"+url);
        return getResultStringByTypeHttpMethodAndBodyContent("", HttpMethod.GET,url,restTemplate);
    }

    public ResponseEntity<String> searchAll(String source , String destination){
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://" + this.HRMSServer + "/faresesEngine/searchAll/"+source+"/"+destination;
//        logger.error("searchAll =="+source+"=="+destination+"=="+"\n");
        return getResultStringByTypeHttpMethodAndBodyContent("parameters", HttpMethod.GET,url,restTemplate);
    }


    public ResponseEntity<String> searchByTrans(String source , String destination ,String tranCodes){
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://" + this.HRMSServer + "/faresesEngine/searchByTrans/"+source+"/"+destination+"/"+tranCodes;
//        logger.error("searchTransport =="+source+"=="+destination+"=="+tranCode+"=="+"\n");
        return getResultStringByTypeHttpMethodAndBodyContent("parameters", HttpMethod.GET,url,restTemplate);
    }

    public ResponseEntity<String> searchFlightTransport(String source , String destination ,String trainCode , String busCode){
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://" + this.HRMSServer + "/faresesEngine/searchFlightTransport/"+source+"/"+destination+"/"+trainCode+"/"+busCode;
//        logger.error("searchFlightTransport =="+source+"=="+destination+"=="+trainCode+"=="+busCode+"=="+"\n");
        return getResultStringByTypeHttpMethodAndBodyContent("parameters", HttpMethod.GET,url,restTemplate);
    }

}