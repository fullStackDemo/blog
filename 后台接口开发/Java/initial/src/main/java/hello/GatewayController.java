package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GatewayController {
    
    @Autowired
    private ConfigBeanProp configBeanProp;
    
    @RequestMapping("gateway")
    public String gateway() {
        return "name=" + configBeanProp.getName();
    }
}
