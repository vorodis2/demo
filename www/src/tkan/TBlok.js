


export class TBlok {
    constructor(par) {
        this.type = "TBlok";
        var self = this;
        this.par = par;
        this.param = this.par.param;
        this.content3d = new THREE.Object3D()
        this.par.content3d.add(this.content3d)
        this.op3d = new THREE.Object3D()
        this.content3d.add(this.op3d)
        this.bodyConfig = new OIMO.RigidBodyConfig()
        this.bodyConfig.type = OIMO.RigidBodyType.DYNAMIC;
        this._parent = par
        this.isMouseReturn = true
        this.bodyLeft = null;
        this.bodyDown = null;
        this.sahJoint = 0
        if(this.par.boolSah){this.sahJoint = 1}
        this.wh = this.par.wh   
        this.boolDebug = this.par.boolDebug   
     
        let o = {}
        o.w = this.par.sw;
        o.h = 1
        o.d = this.par.sh;
        this._active = false;

        this.vOld=new THREE.Vector3()
        let ro=0
        this.getOtOld=function(){
            ro=0
            ro+=Math.abs(this.content3d.position.x-this.vOld.x)
            ro+=Math.abs(this.content3d.position.y-this.vOld.y)
            ro+=Math.abs(this.content3d.position.z-this.vOld.z)
            return ro
        }
        

        this.init = function() {
            let o = { tip: "box", w: this.par.osw, h: this.wh, d: this.par.osh }
            
            if(this.par.boolSphere){
                o = { tip: "sphere", w: this.wh, h: this.wh, d: this.wh }
            }
            this.body = new OIMO.RigidBody(this.bodyConfig)
            this.shape = this.par.bhBlok.getShape(o)
            
            this.body.addShape(this.shape);
            if(this.boolDebug) this.content3d.add(this.shape.c3d)
            this.shape.mesh.tkan = this.par
            this.shape.v2Collision = parseInt(this.par.v2Collision, 2); //1 
            this.arrJoint = []
            for (var i = 0; i < 6; i++) {
                var jc = new OIMO.SphericalJointConfig();
                jc.rigidBody2 = this.body
                jc.allowCollision = false;
                jc.localAnchor2 = new OIMO.Vec3(0, 0, 0);
                jc.localAnchor1 = new OIMO.Vec3(0, 0, 0);
                let mouseJoint = new OIMO.SphericalJoint(jc);
                mouseJoint.idArr = i
                
                this.arrJoint.push(mouseJoint)
                this.korektJ(mouseJoint)
            }
        }

        this.kill = function() {
            this.par.content3d.remove(this.content3d)
           
            for (var i = 0; i < this.arrJoint.length; i++) {
                if (this.arrJoint[i]._b1) {
                    oWord.mJoint.remove(this.arrJoint[i])
                }
                if(this.boolDebug){
                    if (this.arrJoint[i].cn1.parent) this.arrJoint[i].cn1.parent.remove(this.arrJoint[i].cn1)
                    if (this.arrJoint[i].cn2.parent) this.arrJoint[i].cn2.parent.remove(this.arrJoint[i].cn2)
                }
                
            }
            window.oWord.physicsWorld.removeRigidBody(this.body);
            window.oWord.physicsWorld.addRigidBody(this.body);
            
        }



        this.setIJ = function(pi, pj) {          
            this.op3d.position.z = -(pi * this.par.osh) + this.par.osh / 2
            this.op3d.position.x = (pj * this.par.osw) - this.par.osw / 2
        }


        var ww, hh, ww2, hh2
        this.korektJ = function(j) {
            ww = this.par.osw / 2 * this.par._scale
            hh = this.par.osh / 2 * this.par._scale
            ww2 = -(this.par.osw / 2 + this.par.osw / 2 * (1 - this.par._scale))
            hh2 = -(this.par.osh / 2 + this.par.osh / 2 * (1 - this.par._scale))

            if (this.sahJoint == 0) {
                if (j.idArr == 0) { //лево верх
                    this.setPositionJoint(j, ww, this.par._zdvigY, 0, 1)
                    this.setPositionJoint(j, ww2, this.par._zdvigY, 0, 2)
                }
                if (j.idArr == 2) { //низ лево
                    this.setPositionJoint(j, 0, this.par._zdvigY, hh2, 1)
                    this.setPositionJoint(j, 0, this.par._zdvigY, hh, 2)
                }
            } else {
                if (j.idArr == 0) { //лево верх
                    this.setPositionJoint(j, ww, this.par._zdvigY, hh, 1)
                    this.setPositionJoint(j, ww2, this.par._zdvigY, hh, 2)
                }
                if (j.idArr == 1) { //лево низ
                    this.setPositionJoint(j, ww, this.par._zdvigY, hh2, 1)
                    this.setPositionJoint(j, ww2, this.par._zdvigY, hh2, 2)
                }
                if (j.idArr == 2) { //низ лево
                    this.setPositionJoint(j, ww2, this.par._zdvigY, hh2, 1)
                    this.setPositionJoint(j, ww2, this.par._zdvigY, hh, 2)
                }
                if (j.idArr == 3) { //низ право
                    this.setPositionJoint(j, ww, this.par._zdvigY, hh2, 1)
                    this.setPositionJoint(j, ww, this.par._zdvigY, hh, 2)
                }
            }
            let gg = j.getSpringDamper()
            gg.frequency = this.par._frequency
        }



        this.clear = function() {
            this.active = false;
        }


        this.dragA = function() {
            if (this._active == true) {
                window.oWord.physicsWorld.addRigidBody(this.body);
            } else {
                for (var i = 0; i < this.arrJoint.length; i++) {
                    if (this.arrJoint[i]._b1) {
                        oWord.mJoint.remove(this.arrJoint[i])
                    }
                    if(this.boolDebug){
                        if (this.arrJoint[i].cn1.parent) this.arrJoint[i].cn1.parent.remove(this.arrJoint[i].cn1)
                        if (this.arrJoint[i].cn2.parent) this.arrJoint[i].cn2.parent.remove(this.arrJoint[i].cn2)
                    }
                }
                window.oWord.physicsWorld.removeRigidBody(this.body);
            }
        }


        this.dragDin = function() {
            for (var i = 0; i < this.arrJoint.length; i++) {
                this.korektJ(this.arrJoint[i])
            }
     
            if(this.old_mass==undefined){
                
                this.old_mass=this.body._mass;
                this.old_invMass=this.body._invMass;

            }
            this.body._mass=this.old_mass*this.par._scaleMass/100
            this.body._invMass=this.old_invMass*this.par._scaleMass/100
              
            
        }


        this.positStart = new THREE.Vector3()
        this.setXYZ = function(x, y, z) {
            this.body.setPosition(new OIMO.Vec3(x, y, z))
            this.content3d.position.set(x, y, z)
            this.positStart.set(x, y, z) 
        }
        this.setRotationXYZ = function(x, y, z, w) {
            this.body.setOrientation(new OIMO.Quat(x, y, z,w))
            this.content3d.quaternion.set(x, y, z, w)
            
        }

        let jc
        this.setTBlok = function(tb, b) {
            if (b) {
                jc = this.arrJoint[0]
                jc._b1 = tb.body;
                oWord.mJoint.add(jc)
                if(this.boolDebug){
                    tb.content3d.add(jc.cn1)
                    this.content3d.add(jc.cn2)
                }
                if (this.sahJoint == 0) return

                jc = this.arrJoint[1]
                jc._b1 = tb.body;
                oWord.mJoint.add(jc)
                if(this.boolDebug){
                     tb.content3d.add(jc.cn1)
                    this.content3d.add(jc.cn2)
                }
               
            } else {
                jc = this.arrJoint[2]
                jc._b1 = tb.body;
                oWord.mJoint.add(jc)
                if(this.boolDebug){
                    tb.content3d.add(jc.cn1)
                    this.content3d.add(jc.cn2)
                }

                if (this.sahJoint == 0) return

                jc = this.arrJoint[3]
                jc._b1 = tb.body;
                oWord.mJoint.add(jc)
                if(this.boolDebug){
                    tb.content3d.add(jc.cn1)
                    this.content3d.add(jc.cn2)
                }
            }
        }


        this.stopBlok = function(b) {
           

            if(this.mass!=0){  
                if(b){
                    if(this.oldObj==undefined){
                        this.oldObj={}
                        this.oldObj._invMass=this.body._invMass;
                        this.oldObj._mass=this.body._mass;
                        this.oldObj._type=this.body._type;
                    }
                    this.body._invMass=0;
                    this.body._mass=8000000000;
                    this.body._type=1;
                }else{
                    if(this.oldObj!==undefined){
                        this.body._invMass=this.oldObj._invMass
                        this.body._mass=this.oldObj._mass
                        this.body._type=this.oldObj._type
                    }
                } 
            }
        }




        let p, q
        this.update = function(b) {
            if (this.body.isSleeping() == true) {
                return
            }
            p = this.body.getPosition()
            this.content3d.position.set(p.x, p.y, p.z);
            q = this.body.getOrientation();
            this.content3d.quaternion.set(q.x, q.y, q.z, q.w);
        }


        var sp;
        this.setPositionJoint = function(joint, x, y, z, _sp) {
            sp = 2;
            if (_sp) sp = _sp    
            joint["_localAnchor" + sp + "X"] = x
            joint["_localAnchor" + sp + "Y"] = y
            joint["_localAnchor" + sp + "Z"] = z
            if (joint["cn" + sp]) joint["cn" + sp].position.set(x, y, z)
        }


        this.blokPlus = null;
        this.setLine = function(bLineEntr, d) {
            var jc = new OIMO.SphericalJointConfig();
            jc.rigidBody1 = bLineEntr.par.bhBlok.body
            jc.rigidBody2 = this.body
            jc.allowCollision = false;
            jc.springDamper.frequency = this.par._frequency;
            jc.localAnchor1 = new OIMO.Vec3(0, d, 2);
            jc.localAnchor2 = new OIMO.Vec3(0, 0, 0);
            let mouseJoint = new OIMO.SphericalJoint(jc);
            this.shape.v2Collision = parseInt("00000000", 2); //1 
            oWord.physicsWorld.addJoint(mouseJoint);
        }
    }


    set active(v) {
        if (this._active != v) {
            this._active = v;
            this.dragA()
        }
    }
    get active() { return this._active; }
}