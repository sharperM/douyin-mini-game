import { _decorator, Button, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('douyinTestPanel')
export class douyinTestPanel extends Component {

    @property({type:Button,tooltip:"login"})
    loginBtn:Button = null;

    @property({type:Button,tooltip:"share"})
    shareBtn:Button = null;



    start() {
        this.loginBtn.getComponentInChildren(Label).string = "login";
        this.loginBtn.node.on(Button.EventType.CLICK,()=>{
            if (tt)
            {
                tt.login({
                    force: true,
                    success(res) {
                        console.log(`login 调用成功${res.code} ${res.anonymousCode}`);
                    },
                    fail(res) {
                        console.log(`login 调用失败`);
                    },
                    });
            }
        },this);
    }

    update(deltaTime: number) {
        
    }
}


