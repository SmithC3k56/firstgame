import { _decorator, Vec2, Vec3, AnimationClip,Contact2DType,Collider2D,AnimationState,UIOpacity, Animation, Component, Node, CCFloat, instantiate, Prefab, Label, BoxCollider2D, Intersection2D } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('StarAnimationCtr')
export class StarAnimationCtr extends Component {

    @property(Node)
    animResult: Node = null;

    @property(Prefab)
    starPre;

    @property(Label)
    scoreLb;

    @property(Node)
    player: Node = null;

    @property(CCFloat)
    pickRadius = 0;

    
    playerColider: BoxCollider2D;
    starColider: BoxCollider2D;

    opacityNum:number = 255;
    // game = null;
    // opacityComponent = null; 
    
    getPlayerDistance(): number {
        const playerPos: Vec3 = this.player.getPosition();

        const diff = new Vec3();
        diff.set(this.node.position.x - playerPos.x, this.node.position.y - playerPos.y, 0);
        const dist = diff.length();
        return dist;

    }

    onPicked() {
        // this.game.spawnNewStar();
        // this.game.gainScore();
        this.node.destroy();
    }
   

    start() {
        this.playerColider = this.player.getComponent(BoxCollider2D);
        this.starColider = this.node.getComponent(BoxCollider2D);


        // Lấy Animation Component của Node
        const animationComponent = this.animResult.getComponent(Animation);

        // Chơi animation với tên "star"
        animationComponent.play("star");

        // Thiết lập Wrap Mode của animation thành Normal
        animationComponent.getState("star").wrapMode = AnimationClip.WrapMode.Loop;

         // Registering callback functions for a single collider
         let collider = this.getComponent(Collider2D);
    
    }






    

    update(deltaTime: number) {
        // console.log("distance: "+ this.getPlayerDistance());
        // if (this.getPlayerDistance() < this.pickRadius) {
        //     this.onPicked();
        //     return;
        // }

        // const opacityRatio = 1 - deltaTime ;
        
        // const minOpacity = 50;

        this.starColider.worldPoints;
        if(Intersection2D.polygonPolygon(this.starColider.worldPoints,this.playerColider.worldPoints)){
            this.node.active = false;

         
                this.node.setPosition(new Vec3(100,100,this.node.position.z)) ;
                this.node.active = true;
            
            this.scoreLb.string = "Score: "+ 1;

        }
        

        if(this.opacityNum>=50){
         this.opacityNum = this.opacityNum - deltaTime;
        }else{
            this.spawnNewStar();
            this.opacityNum = 255;
        }
        // console.log("deltaTime: "+ this.opacityNum);
         
         this.node.getComponent(UIOpacity).opacity = this.opacityNum;
    }

    spawnNewStar(){
        var spawnNewX =this.randomInRange(-600,600);
        var spawnNewY =this.randomInRange(0,200);
        this.node.setPosition(new Vec3(spawnNewX,spawnNewY,this.node.position.z));
    }

     randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }


}


