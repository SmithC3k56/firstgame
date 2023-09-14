import { _decorator, BoxCollider, Input, Contact2DType, Collider2D, PhysicsSystem2D, IPhysics2DContact, ITriggerEvent, Animation, AnimationClip, input, ICollisionEvent, Component, Vec3, easing, AudioSource, KeyCode, Node, macro, AudioClip, tween, v3, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('playerCtr')
export class playerCtr extends Component {


    @property(Node)
    animResult: Node = null;

    @property({ type: Number })
    jumpHeight: 150;

    @property({ type: Number })
    jumpDuration: 30;

    @property({ type: Number })
    maxMoveSpeed: 0;

    @property({ type: Number })
    accel: 1;

    @property({ type: Number })
    xSpeed;


    accRight: boolean = false;
    accLeft: boolean = false;

    runJumpAction() {

        // Create the jumpUp tween
        var jumpUp = tween().by(this.jumpDuration, { position: new Vec3(this.node.position.x + + this.xSpeed, this.jumpHeight, this.node.position.z) }, { easing: 'sineOut' });


        var jumpDown = tween().by(this.jumpDuration, { position: new Vec3(this.node.position.x + this.xSpeed, -this.jumpHeight, this.node.position.z) }, { easing: 'sineIn' });


        // Create a sequence of jumpUp and jumpDown actions
        const sequence = tween()
            .sequence(jumpUp, jumpDown);

        // Create a repeat forever tween
        tween(this.node)
            .call(() => this.runJumpAction).start();
    }


    playJumpSound() {

        const audioSource: AudioSource = this.node.getComponent(AudioSource);
        if (audioSource) {
            // audioSource.clip = this.jumpAudio;
            audioSource.play();

        }
    }
    onCollisionEnter(other, self) {
        console.log("Trigger entered");
        // Bạn có thể thực hiện các hành động tùy ý ở đây
    }
    onLoad() {
        this.accLeft = false;
        this.accRight = false;
        this.xSpeed = 0;

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }



    private onTriggerStay(event: ITriggerEvent) {
        console.log(event.type, event);
    }


    onKeyDown(event) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                // console.log("Pressed key A");
                this.accLeft = true;
                this.xSpeed *= -1;
                // this.moveCharacter(-1);
                break;
            case KeyCode.KEY_D:
                // console.log("Pressed key D");
                this.accRight = true;
                // this.moveCharacter(1);
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                // console.log("Pressed key A");

                this.accLeft = false;
                break;
            case KeyCode.KEY_D:
                // console.log("Pressed key D");

                this.accRight = false;
                break;
        }
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(dt: number) {
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }

        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        var pos = this.node.position.clone();

        pos.x = pos.x + this.xSpeed * dt;
        this.node.setPosition(pos);
        this.moveCharacter(pos.x)
        // console.log(this.node.position);
    }

    moveCharacter(direction: number) {
        tween(this.node)
            .to(0.2, { x: this.node.x + direction * this.xSpeed })
            .start();
    }

    private onCollision(event: ICollisionEvent) {
        console.log(event.type, event);
        console.log("here!");
    }

}


