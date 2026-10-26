import { events } from "../../../Event";
import { resources } from "../../../resource";
import { Sprite } from "../../../spritet";
import { Vector2 } from "../../../vector2";
import { GameOpject } from "../gameObject";

export class Inventory extends GameOpject{
    constructor(){
        super({
            position:new Vector2(0,0)
        });
       
    this.nextId = 0;
    this.items = [];
    this.itemSprites = [];

    this.lifeFrames = 9;
    this.lifeFrame = 0;
    this.lifeSprite = new Sprite({
      resource: resources.images.life,
      frameSize: new Vector2(64, 19),   
      hFrames: 1,
      vFrames: this.lifeFrames,
      frame: 0,
      position: new Vector2(0, 0),
    });
    this.addChild(this.lifeSprite);

      events.on("CHANGE_LIFE", this, data => {
      this.setLifeFrame(this.lifeFrame + data.amount);
    });
     events.on("HERO_PICKS_UP_ITEM",this , data =>{
      this.nextId +=1;  
      this.items.push({ 
      id : this.nextId,
      image : data.image

      });
      this.renderInventory();
        });
        this.renderInventory();
    }


      setLifeFrame(frame) {
    this.lifeFrame = Math.max(0, Math.min(this.lifeFrames - 1, frame));
    this.lifeSprite.frame = this.lifeFrame;
  }

renderInventory(){
 this.itemSprites.forEach(s => s.destroy());
    this.itemSprites = [];

this.items.forEach((item, index)=> {
  const sprite =new Sprite({
        resource : item.images,
        frameSize: new Vector2(64, 19),
         hFrames: 1,
         vFrames: 9,
         frame: 0,
        position: new Vector2 (70+index *20 ,2 ),
        });
        this.itemSprites.push(sprite);
        this.addChild(sprite);
 })
    }


removeFromeInventory(id){
this.items = this.items.filter( item =>  item.id !== id);
this.renderInventory();


}


}
