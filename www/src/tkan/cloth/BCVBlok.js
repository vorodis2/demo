


export class BCVBlok {
    constructor(par) {
        this.type = "BCVBlok";
        var self = this;
        this.par=par
        this.bool=false;
        this.bool1=false;
        this.boolFinal=false;

        this.idArr=-1
        this.name="f"
        this.array=[]
        this.v=new THREE.Vector3()

        this.vector=new THREE.Vector3()
        this.set=function(ii,index){
            let oi={ii:ii, index:index}
            this.array.push(oi);
        }


        /////////////////
        this.arrSher=[]
        this.addSher=function(sher){
            this.arrSher.push(sher);
        }

        this.arrSher1=[]
        this.addSher1=function(sher){
            this.arrSher1.push(sher);
        }


        this.korectPosition=function(){



            if(this.par.par.par.boolMerging==false){
                if(this.arrSher1.length==0){
                    this.vector.set(0,0,0)
                }else{                
                    this.vector.set(this.arrSher1[0].pnWorld.x,this.arrSher1[0].pnWorld.y,this.arrSher1[0].pnWorld.z)
                }

             
                return
            }

            this.vector.set(0,0,0)
            if(this.arrSher.length!==0){
                this.korectP1()
                        
                this.vector.set(this.arrSher[0].pnWorld.x,this.arrSher[0].pnWorld.y,this.arrSher[0].pnWorld.z)
            }
           
        }


        var db=null
        this.korectP1=function(){
            if(db===null){
                db=0;
                for (var i = 0; i < this.arrSher.length; i++) {
                    db+=this.arrSher[i].dist
                }
                for (var i = 0; i < this.arrSher.length; i++) {
                    this.arrSher[i].distPtrosent=this.arrSher[i].dist/db;
                }
            }

            this.vector.set(0,0,0)
            for (var i = 0; i < this.arrSher.length; i++) {
                this.vector.x+=this.arrSher[i].pnWorld.x*this.arrSher[i].distPtrosent
                this.vector.y+=this.arrSher[i].pnWorld.y*this.arrSher[i].distPtrosent
                this.vector.y+=this.arrSher[i].pnWorld.y*this.arrSher[i].distPtrosent
            }
        }


    }
}



