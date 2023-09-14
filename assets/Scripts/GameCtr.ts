import { _decorator, Prefab,Label,Component, AudioClip,Node,instantiate  } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameCtr')
export class GameCtr extends Component {

    @property(Prefab)
    starPrefab = null;

    @property
    maxStarDuration = 0;

    @property
    minStarDuration = 0;

    @property(Node)
    ground = null;

    @property(Node)
    player = null;

    @property(Label)
    scoreDisplay = null;

    @property(AudioClip)
    scoreAudio = null;

    groundY = 0;
    timer = 0;
    starDuration = 0;
    score = 0;

}


