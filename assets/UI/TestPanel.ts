import { _decorator, Button, Component, Node, Prefab, resources, TTFFont } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TestPanel')
export class TestPanel extends Component {

    @property({type:Button,tooltip:"douyingTestPanel"})
    douyingTestPanel:Button = null;

    @property({type:Button,tooltip:"weixinTestPanel"})
    weixinTestPanel:Button = null;

    start() {
        console.log("TestPanel start");
        console.log("tt",typeof tt !== 'undefined');
        console.log("wx",typeof wx !== 'undefined');
        if (typeof tt == 'undefined')
        {
            this.douyingTestPanel.node.active = false;
        }
        if(typeof wx == 'undefined')
        {
            this.weixinTestPanel.node.active = false;
        }
        this.douyingTestPanel.node.on(Button.EventType.CLICK,()=>{
            resources.load("UI/douyinTestPanel",Prefab,function (err, prefab)  {
                this.node.addChild(prefab.instantiate());
        }.bind(this));
        },this);

        this.weixinTestPanel.node.on(Button.EventType.CLICK,()=>{
            cc.director.loadScene("weixinTestScene");
        },this);


    }

    update(deltaTime: number) {
        
    }
}


